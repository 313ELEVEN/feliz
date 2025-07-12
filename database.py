import sqlite3

def get_db_connection():
    conn = sqlite3.connect('feliz_wine_bar.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Таблица пользователей
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT NOT NULL,
            password TEXT NOT NULL,
            is_admin INTEGER NOT NULL DEFAULT 0
        )
    ''')

    # Таблица заказов
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            customer_name TEXT NOT NULL,
            customer_phone TEXT NOT NULL,
            customer_address TEXT NOT NULL,
            order_details TEXT NOT NULL,
            total_price REAL NOT NULL,
            status TEXT NOT NULL DEFAULT 'Новый',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    # Таблица для меню
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS menu_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            category TEXT NOT NULL,
            image_url TEXT,
            is_food INTEGER DEFAULT 1
        )
    ''')
    
    # Добавляем тестового администратора
    try:
        cursor.execute("INSERT INTO users (name, email, phone, password, is_admin) VALUES (?, ?, ?, ?, ?)",
                      ("Admin", "admin@feliz.md", "123456789", "123", 1))
    except sqlite3.IntegrityError:
        pass  # Админ уже существует
    
    conn.commit()
    conn.close()
    print("База данных успешно инициализирована.")

def import_menu_from_file():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Проверяем, есть ли уже данные в меню
    cursor.execute("SELECT COUNT(*) FROM menu_items")
    if cursor.fetchone()[0] > 0:
        print("Меню уже загружено, пропускаем импорт")
        conn.close()
        return
    
    print("Импорт меню из файла...")
    with open('apikey.txt', 'r', encoding='utf-8') as f:
        current_category = ""
        is_food = True
        
        food_categories = [
            "Завтрак / Breakfast", "Супы / Soups", "Закуски / Appetizers",
            "Салаты / Salads", "Морепродукты и Рыба / Seafood and Fish",
            "Паста / Pasta", "Мясные блюда / Meat Dishes",
            "Бургеры и другое / Burgers & More", "Десерты / Desserts"
        ]
        
        for line in f:
            line = line.strip()
            if not line:
                continue
            
            # Определяем категорию
            if not any(c.isdigit() for c in line) and " - " not in line and "/" in line:
                current_category = line
                is_food = current_category in food_categories
                continue
            
            # Обрабатываем блюдо
            if " - " in line:
                parts = line.split(" - ")
                name = parts[0].strip()
                price = parts[1].replace("MDL", "").strip()
                
                # Читаем следующую строку как описание
                description = f.readline().strip()
                
                # Вставляем в базу данных
                cursor.execute('''
                    INSERT INTO menu_items 
                    (name, description, price, category, image_url, is_food)
                    VALUES (?, ?, ?, ?, ?, ?)
                ''', (
                    name, 
                    description, 
                    price, 
                    current_category, 
                    f"https://placehold.co/200x200/1a1a1a/99631d?text={name.split()[0]}", 
                    int(is_food)
                ))
    
    conn.commit()
    conn.close()
    print("Меню успешно импортировано")

if __name__ == '__main__':
    init_db()
    import_menu_from_file()