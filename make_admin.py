import sqlite3
import sys

def make_user_admin(email):
    if not email:
        print("Ошибка: Укажите email пользователя в качестве аргумента.")
        print("Пример: python make_admin.py admin@example.com")
        return

    conn = sqlite3.connect('feliz_wine_bar.db')
    cursor = conn.cursor()

    # Пытаемся добавить колонку
    try:
        cursor.execute('ALTER TABLE users ADD COLUMN is_admin INTEGER NOT NULL DEFAULT 0')
        print("Колонка 'is_admin' успешно добавлена в таблицу 'users'.")
        # --- КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ ---
        # Немедленно сохраняем изменение схемы в базе данных
        conn.commit()
    except sqlite3.OperationalError:
        # Колонка уже существует, это нормально. Ничего не делаем.
        pass

    # Теперь, когда колонка точно существует и сохранена, назначаем права администратора
    cursor.execute("UPDATE users SET is_admin = 1 WHERE email = ?", (email,))
    
    if cursor.rowcount == 0:
        print(f"Ошибка: Пользователь с email '{email}' не найден.")
    else:
        # Сохраняем второе изменение (установку флага)
        conn.commit()
        print(f"Пользователь с email '{email}' успешно назначен администратором.")
    
    conn.close()

if __name__ == '__main__':
    user_email = sys.argv[1] if len(sys.argv) > 1 else None
    make_user_admin(user_email)