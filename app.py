from flask import Flask, render_template, request, jsonify, session, redirect, url_for, send_from_directory
import sqlite3
from functools import wraps
import logging
import json
from collections import defaultdict

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

logging.basicConfig(level=logging.DEBUG)

# Порядок категорий для сортировки
CATEGORY_ORDER = [
    "Завтрак / Breakfast", "Супы / Soups", "Закуски / Appetizers",
    "Салаты / Salads", "Морепродукты и Рыба / Seafood and Fish",
    "Паста / Pasta", "Мясные блюда / Meat Dishes",
    "Бургеры и другое / Burgers & More", "Десерты / Desserts",
    "Кофе / Coffee", "Чай / Tea", "Напитки / Drinks",
    "Белое вино / White Wines", "Красное вино / Red Wines",
    "Розовое вино / Rose Wines", "Игристые вина / Sparkling Wines",
    "Коктейли / Cocktails", "Пиво и закуски / Beer & Snacks"
]

def get_db_connection():
    conn = sqlite3.connect('feliz_wine_bar.db')
    conn.row_factory = sqlite3.Row
    return conn

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('is_admin'):
            app.logger.warning('Unauthorized access attempt to admin page.')
            return redirect(url_for('menu'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def home():
    user_info = None
    if 'user_id' in session:
        conn = get_db_connection()
        user_info = conn.execute('SELECT * FROM users WHERE id = ?', (session['user_id'],)).fetchone()
        conn.close()
    return render_template('index.html', user_info=user_info)

@app.route('/menu')
def menu():
    user_info = None
    if 'user_id' in session:
        conn = get_db_connection()
        user_info = conn.execute('SELECT * FROM users WHERE id = ?', (session['user_id'],)).fetchone()
        conn.close()
    return render_template('menu.html', user_info=user_info)

@app.route('/profile')
def profile():
    if 'user_id' not in session:
        return redirect(url_for('menu'))
    conn = get_db_connection()
    user_info = conn.execute('SELECT * FROM users WHERE id = ?', (session['user_id'],)).fetchone()
    orders_raw = conn.execute('SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC', (session['user_id'],)).fetchall()
    conn.close()
    orders = [dict(o) for o in orders_raw]
    for order in orders:
        order['order_details'] = json.loads(order['order_details'])
    return render_template('profile.html', user_info=dict(user_info), orders=orders)

@app.route('/api/get_menu')
def get_menu():
    try:
        is_food = request.args.get('is_food', '1') == '1'

        food_categories = [
            "Завтрак / Breakfast", "Супы / Soups", "Закуски / Appetizers",
            "Салаты / Salads", "Морепродукты и Рыба / Seafood and Fish",
            "Паста / Pasta", "Мясные блюда / Meat Dishes",
            "Бургеры и другое / Burgers & More", "Десерты / Desserts"
                                ]
        drink_categories = [
            "Кофе / Coffee", "Чай / Tea", "Соки и Вода / Juices & Water",
            "Пиво и закуски / Beer & Snacks", "Безалкогольные коктейли / Non-alcoholic cocktails",
            "Алкогольные коктейли / Alcoholic cocktails", "Виски / Whisky",
            "Коньяк / Divin", "Игристые / Sparkling", 
            "Белые вина / White Wines",  # Было "Белое вино / White Wines"
    "Красные вина / Red Wines",   # Было "Красное вино / Red Wines"
    "Розовые вина / Rosé Wines" 
        ]

        target_categories = food_categories if is_food else drink_categories
        
        placeholders = ', '.join(['?'] * len(target_categories))
        conn = get_db_connection()
        
        query = f'''
            SELECT * FROM menu_items 
            WHERE category IN ({placeholders}) 
            ORDER BY 
                CASE category {' '.join([f"WHEN '{cat}' THEN {i}" for i, cat in enumerate(target_categories)])} END,
                name
        '''
        
        items = conn.execute(query, target_categories).fetchall()
        conn.close()

        menu_by_category = defaultdict(list)
        for item in items:
            menu_by_category[item['category']].append(dict(item))

        sorted_menu = []
        for cat in target_categories:
            if cat in menu_by_category:
                sorted_menu.append({
                    'category': cat,
                    'items': menu_by_category[cat]
                })

        return jsonify(sorted_menu)
    except Exception as e:
        app.logger.error(f"Get menu error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE email = ? AND password = ?', (data.get('email'), data.get('password'))).fetchone()
        conn.close()
        if user:
            session['user_id'] = user['id']
            session['is_admin'] = bool(user['is_admin'])
            return jsonify({'success': True})
        return jsonify({'success': False, 'message': 'Неверный email или пароль.'})
    except Exception as e:
        app.logger.error(f"Login error: {e}")
        return jsonify({'success': False, 'message': 'Произошла ошибка на сервере.'}), 500

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        name, email, phone, password = data.get('name'), data.get('email'), data.get('phone'), data.get('password')
        if not all([name, email, phone, password]):
            return jsonify({'success': False, 'message': 'Все поля обязательны для заполнения.'}), 400
        conn = get_db_connection()
        conn.execute('INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)', (name, email, phone, password))
        conn.commit()
        user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
        session['user_id'] = user['id']
        session['is_admin'] = bool(user['is_admin'])
        conn.close()
        return jsonify({'success': True, 'message': 'Регистрация прошла успешно!'})
    except sqlite3.IntegrityError:
        return jsonify({'success': False, 'message': 'Пользователь с таким email уже существует.'}), 409
    except Exception as e:
        app.logger.error(f"Registration error: {e}")
        return jsonify({'success': False, 'message': 'Произошла ошибка на сервере.'}), 500

@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'success': True})

@app.route('/api/place_order', methods=['POST'])
def place_order():
    try:
        data = request.get_json()
        user_id = session.get('user_id')
        name, phone, address, cart = data.get('name'), data.get('phone'), data.get('address'), data.get('cart', [])
        if not all([name, phone, address, cart]):
            return jsonify({'success': False, 'message': 'Все поля обязательны и корзина не может быть пустой.'}), 400
        
        order_details = json.dumps(cart, ensure_ascii=False)
        total_price = sum(float(item['price']) * int(item.get('quantity', 1)) for item in cart)
        conn = get_db_connection()
        conn.execute('INSERT INTO orders (user_id, customer_name, customer_phone, customer_address, order_details, total_price) VALUES (?, ?, ?, ?, ?, ?)',
                     (user_id, name, phone, address, order_details, total_price))
        conn.commit()
        conn.close()
        return jsonify({'success': True, 'message': 'Спасибо, ваш заказ принят!'})
    except Exception as e:
        app.logger.error(f"Place order error: {e}")
        return jsonify({'success': False, 'message': 'Произошла ошибка при оформлении заказа.'}), 500

# Admin routes
@app.route('/admin/dashboard')
@admin_required
def admin_dashboard():
    conn = get_db_connection()
    orders_raw = conn.execute('SELECT o.*, u.email as user_email FROM orders o LEFT JOIN users u ON o.user_id = u.id ORDER BY o.id DESC').fetchall()
    categories = [row['category'] for row in conn.execute('SELECT DISTINCT category FROM menu_items').fetchall()]
    menu_items = [dict(item) for item in conn.execute('SELECT * FROM menu_items ORDER BY category, name').fetchall()]
    conn.close()
    orders = [dict(row) for row in orders_raw]
    for order in orders:
        order['order_details'] = json.loads(order['order_details'])
    return render_template('admin_dashboard.html', orders=orders, categories=categories, menu_items=menu_items)

@app.route('/admin/update_status/<int:order_id>', methods=['POST'])
@admin_required
def update_order_status(order_id):
    try:
        new_status = request.json.get('status')
        if not new_status: return jsonify({'success': False, 'message': 'Статус не указан'}), 400
        conn = get_db_connection()
        conn.execute('UPDATE orders SET status = ? WHERE id = ?', (new_status, order_id))
        conn.commit()
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        app.logger.error(f"Update status error for order {order_id}: {e}")
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/admin/delete_order/<int:order_id>', methods=['POST'])
@admin_required
def delete_order(order_id):
    try:
        conn = get_db_connection()
        conn.execute('DELETE FROM orders WHERE id = ?', (order_id,))
        conn.commit()
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        app.logger.error(f"Delete order error for order {order_id}: {e}")
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/admin/get_menu_item/<int:item_id>')
@admin_required
def get_menu_item(item_id):
    try:
        conn = get_db_connection()
        item = conn.execute('SELECT * FROM menu_items WHERE id = ?', (item_id,)).fetchone()
        conn.close()
        if item:
            return jsonify({
                'success': True,
                'item': dict(item)
            })
        return jsonify({'success': False, 'message': 'Товар не найден'}), 404
    except Exception as e:
        app.logger.error(f"Get menu item error: {e}")
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/admin/add_menu_item', methods=['POST'])
@admin_required
def add_menu_item():
    try:
        data = request.get_json()
        name = data.get('name')
        description = data.get('description')
        price = float(data.get('price'))
        category = data.get('category') or data.get('new_category')
        image_url = data.get('image_url')
        is_food = int(data.get('is_food', 1))
        
        if not all([name, price, category]):
            return jsonify({'success': False, 'message': 'Необходимо указать название, цену и категорию'}), 400
            
        conn = get_db_connection()
        conn.execute('''INSERT INTO menu_items 
                      (name, description, price, category, image_url, is_food) 
                      VALUES (?, ?, ?, ?, ?, ?)''',
                     (name, description, price, category, image_url, is_food))
        conn.commit()
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        app.logger.error(f"Add menu item error: {e}")
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/admin/edit_menu_item/<int:item_id>', methods=['POST'])
@admin_required
def edit_menu_item(item_id):
    try:
        data = request.get_json()
        name = data.get('name')
        description = data.get('description')
        price = float(data.get('price'))
        category = data.get('category') or data.get('new_category')
        image_url = data.get('image_url')
        is_food = int(data.get('is_food', 1))
        
        if not all([name, price, category]):
            return jsonify({'success': False, 'message': 'Необходимо указать название, цену и категорию'}), 400
            
        conn = get_db_connection()
        conn.execute('''UPDATE menu_items 
                      SET name = ?, description = ?, price = ?, category = ?, image_url = ?, is_food = ?
                      WHERE id = ?''',
                     (name, description, price, category, image_url, is_food, item_id))
        conn.commit()
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        app.logger.error(f"Edit menu item error: {e}")
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/admin/delete_menu_item/<int:item_id>', methods=['POST'])
@admin_required
def delete_menu_item(item_id):
    try:
        conn = get_db_connection()
        conn.execute('DELETE FROM menu_items WHERE id = ?', (item_id,))
        conn.commit()
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        app.logger.error(f"Delete menu item error: {e}")
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/admin/delete_category', methods=['POST'])
@admin_required
def delete_category():
    try:
        data = request.get_json()
        category = data.get('category')
        if not category:
            return jsonify({'success': False, 'message': 'Категория не указана'}), 400
            
        conn = get_db_connection()
        conn.execute('UPDATE menu_items SET category = ? WHERE category = ?', 
                   ('Без категории', category))
        conn.commit()
        conn.close()
        return jsonify({'success': True})
    except Exception as e:
        app.logger.error(f"Delete category error: {e}")
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/admin/update_category_order', methods=['POST'])
@admin_required
def update_category_order():
    try:
        new_order = request.json.get('order')
        if not new_order:
            return jsonify({'success': False, 'message': 'Порядок категорий не указан'}), 400
            
        return jsonify({'success': True, 'message': 'Порядок категорий обновлен'})
    except Exception as e:
        app.logger.error(f"Update category order error: {e}")
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/admin/update_item_order', methods=['POST'])
@admin_required
def update_item_order():
    try:
        data = request.json
        item_id = data.get('item_id')
        new_category = data.get('category')
        new_position = data.get('position')
        
        if not all([item_id, new_category, new_position is not None]):
            return jsonify({'success': False, 'message': 'Не все параметры указаны'}), 400
            
        conn = get_db_connection()
        conn.execute('UPDATE menu_items SET category = ? WHERE id = ?', 
                   (new_category, item_id))
        conn.commit()
        conn.close()
        
        return jsonify({'success': True})
    except Exception as e:
        app.logger.error(f"Update item order error: {e}")
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(debug=True)