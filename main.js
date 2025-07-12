// main.js
// Данные меню (можно оставить здесь или загружать с сервера)
const menuData = [
    {
        category: "Завтрак / Breakfast",
        items: [
            { name: "Clătită cu somon", description: "Блинчики с лососем / Pancake with salmon", weight: "125 gr.", price: 90 },
            { name: "Clătită cu piept de pui", description: "Блинчик с куриной грудкой / Pancake with chicken breast", weight: "200 gr.", price: 75 },
            { name: "Ou poșat cu somon și salată", description: "Яйцо-пашот с лососем и салатом / Salmon and poached egg, salad", price: 75 },
            { name: "Ouă prătite ,ochiuri cu bacon ,roșii și castraveți", description: "Яичница с беконом, помидорами и огурцами / Fried eggs with bacon, tomatoes and cucumbers", price: 65 },
            { name: "Brânzoaice dulci cu smântână", description: "Сладкие сырки со сметаной / Cottage cheese pancakes", price: 65 }
        ]
    },
    {
        category: "Закуски / Appetizers",
        items: [
            { name: "Bruschete cu prosciutto si rucola", description: "Брускетта с прошутто и рукколой / Bruschetta with prosciutto and arugula", weight: "150 gr.", price: 80 },
            { name: "Bruschete cu ficat de pui ,pate", description: "Брускетта с паштетом из куриной печени / Bruschetta with chicken liver pâté", weight: "150/80", price: 110 },
            { name: "Tartar de somon cu cremă de brânză si pesto", description: "Тартар из лосося с сырным кремом и песто / Salmon tartare with cream cheese and pesto", weight: "180gr/30", price: 150 },
            { name: "Tartar de vită", description: "Тартар из говядины / Beef tartare", weight: "150/30", price: 120 },
            { name: "Spring rolls cu creveți", description: "Спринг-роллы с креветками / Spring rolls with shrimp", weight: "180/30gr", price: 105 },
            { name: "Bruschete cu ardei și verdeață", description: "Брускетта с перцем и зеленью / Bruschetta with peppers and greens", weight: "150gr.", price: 70 },
            { name: "Bruschete cu somon si castravete", description: "Брускетта с лососем и огурцом / Bruschetta with salmon and cucumber", weight: "150gr.", price: 90 },
            { name: "Platou cu cascaval", description: "Сырное ассорти / Cheese platter", weight: "450 gr.", price: 235 },
            { name: "Platou cu salamuri crud afumate", description: "Ассорти сырокопченая колбаса / Cold cuts platter", weight: "210gr.", price: 235 },
            { name: "Platou la vin", description: "Тарелка к вину / Wine platter", weight: "400gr", price: 265 }
        ]
    },
    {
        category: "Салаты / Salads",
        items: [
            { name: "Salată de vinete AL FRESCO", description: "Баклажан по-итальянски / Italian Eggplant Salad", price: 120 },
            { name: "Salata fermierului cu mozzarella", description: "Салат 'Фермерский' с моцареллой / Farmer's salad with mozzarella", weight: "330 gr.", price: 95 },
            { name: "Salată cu file de curcan cu sos cu nucușoară", description: "Салат с филе индейки в соусе с мускатным орехом / Salad with turkey fillet and nutmeg sauce", weight: "350gr", price: 120 },
            { name: "Salată de vițel cu vânătă delicioasă caramelizată", description: "Салат с телятиной и карамелизированным баклажаном / Veal salad with delicious caramelized eggplant", weight: "270gr", price: 120 },
            { name: "Caesar cu pui", description: "Салат 'Цезарь' с курицей / Caesar salad with chicken", weight: "300 gr.", price: 115 },
            { name: "Salată grecească", description: "Греческий салат / Greek salad", weight: "300 gr.", price: 95 }
        ]
    },
    {
        category: "Супы / Soups",
        items: [
            { name: "Borș roșu ucrainesc cu smântână,slănină,pâine", description: "Украинский борщ со сметаной, салом и хлебом", weight: "400100gr", price: 95 },
            { name: "Supă cremă de ciuperci", description: "Крем-суп из грибов / Cream of mushroom soup", weight: "ingredient/30gr", price: 95 },
            { name: "Supă cremă de cartof cu praz si creveți", description: "Крем-суп из картофеля с луком-пореем и креветками", weight: "350 gr", price: 95 },
            { name: "Zeamă", description: "'Зама' / Moldavian soup", weight: "400gr.", price: 65 },
            { name: "Ciorbă rădăuțeană", description: "Рэдэуцкая чорба / ingredient soup", weight: "ingredientgr.", price: ingredient },
            { name: "Supă cremă de dovleac cu bacon", description: "Крем-суп из тыквы с беконом / Cream of pumpkin soup with bacon", weight: "ingredientgr", price: 60 },
            { name: "Soleancă", description: "Солянка / Solyanka", weight: "ingredientgr.", price: 70 }
        ]
    },
    {
        category: "Морепродукты и Рыба / Seafood and Fish",
        items: [
             { name: "Creveți saganaki", description: "Креветки 'Саганаке' / Saganaki shrimp", weight: "350 gr", price: 130 },
             { name: "Creveți tempura cu cartof dip fries și sos", description: "Креветки 'Темпура' с картофелем фри и соусом", weight: "6 buc/150/50 gr.", price: 145 },
             { name: "Creveți în stil toscan", description: "Креветки в тосканском стиле / Tuscan-style shrimp", weight: "250gr", price: 150 },
             { name: "Soute cu creveți și midii în sos (2 pers.)", description: "Соте из креветок и мидий в соусе (на 2 персоны)", weight: "1 kg.", price: 370 },
             { name: "Platou de fructe de mare în sos alb Dorblu (4-5 pers.)", description: "Тарелка морепродуктов в белом соусе с дорблю (на 4-5 персон)", weight: "1.5kg", price: 699 },
             { name: "Platou creveți Tempura cu sos (2 pers.)", description: "Тарелка креветок 'Темпура' с соусом (на 2 персоны)", weight: "500 gr.", price: 300 },
             { name: "Fileu de Șalău cu legume batonette", description: "Филе судака с овощами 'батонетт'", weight: "250 gr.", price: 130 },
             { name: "Fileu de Doradă cu legume julien", description: "Филе дорадо с овощами 'жюльен'", price: 180 },
             { name: "Somon cu broccoli", description: "Лосось с брокколи / Salmon with broccoli", weight: "250 gr.", price: 210 }
        ]
    },
    {
        category: "Паста / Pasta",
        items: [
            { name: "Funchoza Creveți", description: "Фунчоза с креветками / Funchoza with shrimp", price: 120 },
            { name: "Funchoza Pui", description: "Фунчоза с курицей / Funchoza with chicken", price: 105 },
            { name: "Funchoza Vită", description: "Фунчоза с говядиной / Funchoza with beef", price: 105 },
            { name: "Pasta cu midii și creveți", description: "Паста с мидиями и креветками / Pasta with mussels and shrimp", weight: "350 gr.", price: 140 },
            { name: "Tagliatelle cu creveți în sos alb", description: "Тальятелле с креветками в белом соусе / Tagliatelle with shrimp in white sauce", weight: "400 gr.", price: 120 },
            { name: "Pasta carbonara", description: "Паста 'Карбонара' / Carbonara pasta", weight: "350 gr.", price: 95 }
        ]
    },
    {
        category: "Мясные блюда / Meat Dishes",
        items: [
            { name: "Aripioare de pui K.F.C.", description: "Куриные крылышки K.F.C. / BBQ chicken wings", weight: "210/30gr", price: 85 },
            { name: "Costițe BBQ cu varză și castrăciți și castrăciți", description: "Ребрышки BBQ с квашеной капустой и маринованным огурцом", price: 165 },
            { name: "File de pui în sufleu de cașcaval cu sos de spanac", description: "Куриное филе в суфле из сыра со шпинатным соусом", price: 135 },
            { name: "File de Rață Chutney cu mere și muștar", description: "Утиное филе с чатни из яблок и горчицы", weight: "310gr/20gr", price: 195 },
            { name: "Frigărui de pui cu salată pe lipie", description: "Шашлык из курицы с салатом на лепешке", weight: "350gr.", price: 125 },
            { name: "Piept de pui în stil toscan cu sos alb și ciuperci", description: "Куриная грудка в тосканском стиле с белым соусом и грибами", weight: "300 gr.", price: 125 },
            { name: "Frigărui de porc pe lipie", description: "Шашлык из свинины на лепешке / Pork skewers on flatbread", weight: "350 gr.", price: 165 },
            { name: "Ciolan de porc cu varză murată și polenta", description: "Свиная рулька с квашеной капустой и полентой", weight: "350 gr.", price: 210 },
            { name: "File mignon cu piure cu trufe", description: "Филе миньон с трюфельным пюре / Filet mignon with truffle purée", weight: "340gr", price: 190 },
            { name: "Obrăjori de vițel cu piure cu trufe", description: "Телячьи щечки с картофельным пюре с трюфелями", weight: "330gr", price: 150 },
            { name: "Steag de vită cu cartof și adjică", description: "Стейк из говядины с картофелем и аджикой", weight: "350gr.", price: 190 },
            { name: "Quesadilla cu pui", description: "Кесадилья с курицей / Quesadilla with chicken", weight: "280/30gr", price: 85 }
        ]
    },
    {
        category: "Бургеры и другое / Burgers & More",
        items: [
            { name: "Burger cu carne de vită marmorată, cartofi pai și sos", description: "Бургер с мраморной говядиной, картофелем фри и соусом", price: 115 },
            { name: "Burger de pui, cartofi pai și sos", description: "Бургер с курицей, картофелем фри и соусом", price: 100 },
            { name: "Nuggets cu cartofi pai", description: "Наггетсы с картофелем фри / Nuggets with fries", weight: "350 gr.", price: 95 },
            { name: "Cartofi pai", description: "Картофель фри / French fries", weight: "200 gr.", price: 50 }
        ]
    },
    {
        category: "Десерты / Desserts",
        items: [
            { name: "Clătită cu banană/fructe de pădure/vișină/ и маскарпоне", description: "Блинчик с бананом/лесными ягодами/вишней и маскарпоне", weight: "180 gr.", price: 70 },
            { name: "Clătită cu banană și nuttela", description: "Блинчик с бананом и Нутеллой / Pancake with banana and Nutella", weight: "150gr", price: 70 },
            { name: "Lava-cake de ciocolată", description: "Лава-кейк из шоколада / Chocolate lava cake", weight: "100/30gr", price: 70 },
            { name: "Înghețată în asortiment (Betty-Ice)", description: "Мороженое в ассортименте (3 шарика) / Assorted ice cream (3 scoops)", weight: "3 bile", price: 60 }
        ]
    },
    {
        category: "Напитки / Drinks",
        subcategories: [
            {
                name: "Кофе / Coffee",
                items: [
                    { name: "Espresso", price: 30 },
                    { name: "Espresso cu lapte", price: 30 },
                    { name: "Espresso Dublu", price: 40 },
                    { name: "Americano", price: 30 },
                    { name: "Americano cu lapte", price: 35 },
                    { name: "Cappuccino", price: 35 },
                    { name: "Caffe latte", price: 45 },
                    { name: "Ice latte", price: 45 },
                    { name: "Ciocolată cu lapte", price: 45 }
                ]
            },
            {
                name: "Чай / Tea",
                items: [
                    { name: "Ceai Aloe Vera", weight: "400 ml", price: 70 },
                    { name: "Ceai de cătină", weight: "400 ml", price: 70 },
                    { name: "Ceai Fructul pasiunii", weight: "400ml", price: 70 },
                    { name: "Ceai de zmeură", price: 70 },
                    { name: "Ceai în asortiment", price: 30 },
                    { name: "Ceai în asortiment infuzie", weight: "400 ml", price: 40 }
                ]
            }
        ]
    },
];


/// --- Глобальные переменные ---
let cart = [];
let isLoginMode = true;

// --- Утилиты ---
function toggleModal(modalId) {
    document.getElementById(modalId)?.classList.toggle('hidden');
}

function switchAuthMode() {
    isLoginMode = !isLoginMode;
    document.getElementById('login-form').classList.toggle('hidden');
    document.getElementById('register-form').classList.toggle('hidden');
    document.getElementById('auth-title').textContent = isLoginMode ? 'Вход' : 'Регистрация';
    document.getElementById('auth-switch-button').textContent = isLoginMode ? 'Регистрация' : 'Войти';
}

async function handleFormSubmit(url, body) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const result = await response.json();
        if (!result.success) {
            console.error(`Ошибка от ${url}:`, result.message);
        }
        return result;
    } catch (error) {
        console.error(`Сетевая ошибка при запросе к ${url}:`, error);
        return { success: false, message: 'Ошибка сети. Проверьте консоль.' };
    }
}

// --- Логика меню и корзины ---
async function renderMenu() {
    const menuContent = document.getElementById('menu-content');
    const categoryList = document.getElementById('category-list');
    if (!menuContent || !categoryList) return;

    try {
        // Меню теперь хранится прямо здесь, в JS, для максимальной стабильности
        const menuData = {
            "Завтрак / Breakfast": [
                { id: 1, name: "Clătită cu somon", description: "Блинчики с лососем", price: 90, image_url: "https://placehold.co/400x400/1a1a1a/99631d?text=Feliz" },
                { id: 2, name: "Clătită cu piept de pui", description: "Блинчик с куриной грудкой", price: 75, image_url: "https://placehold.co/400x400/1a1a1a/99631d?text=Feliz" }
            ],
            "Закуски / Appetizers": [
                { id: 3, name: "Bruschete cu prosciutto", description: "Брускетта с прошутто", price: 80, image_url: "https://placehold.co/400x400/1a1a1a/99631d?text=Feliz" }
            ],
            "Салаты / Salads": [
                 { id: 4, name: "Caesar cu pui", description: "Салат Цезарь с курицей", price: 115, image_url: "https://placehold.co/400x400/1a1a1a/99631d?text=Feliz" }
            ]
        };

        categoryList.innerHTML = '';
        menuContent.innerHTML = '';

        Object.keys(menuData).forEach((category, index) => {
            const categoryId = `category-${index}`;
            const categoryLink = document.createElement('a');
            categoryLink.href = `#${categoryId}`;
            categoryLink.className = `category-link block text-lg font-semibold text-gray-300 hover:text-white hover:bg-brand-gold p-3 rounded-lg mb-2 transition-all ${index === 0 ? 'active' : ''}`;
            categoryLink.textContent = category.split('/')[0].trim();
            categoryLink.onclick = (e) => {
                e.preventDefault();
                document.querySelector(e.target.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
                document.querySelectorAll('.category-link').forEach(link => link.classList.remove('active'));
                e.target.classList.add('active');
            };
            categoryList.appendChild(categoryLink);

            let itemsHTML = '';
            menuData[category].forEach(item => {
                itemsHTML += `
                    <div class="bg-[#2a2a2a] rounded-lg shadow-lg overflow-hidden flex transform hover:-translate-y-1 transition-transform">
                        <img src="${item.image_url}" alt="${item.name}" class="w-1/3 h-full object-cover">
                        <div class="p-4 flex flex-col justify-between w-2/3">
                            <div><h4 class="text-xl font-semibold text-white">${item.name}</h4><p class="text-gray-400 text-sm mt-1 mb-2">${item.description || ''}</p></div>
                            <div class="flex justify-between items-center mt-2">
                                <p class="text-xl font-bold text-brand-gold">${item.price} MDL</p>
                                <button onclick='addToCart(${JSON.stringify(item)})' class="bg-brand-dark-teal text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-600 transition">В корзину</button>
                            </div>
                        </div>
                    </div>`;
            });
            menuContent.innerHTML += `<div id="${categoryId}" class="mb-12 scroll-mt-24"><h3 class="text-3xl font-bold text-white mb-8 border-l-4 border-brand-gold pl-4">${category}</h3><div class="grid grid-cols-1 lg:grid-cols-2 gap-6">${itemsHTML}</div></div>`;
        });
    } catch (error) {
        console.error("Не удалось отобразить меню:", error);
        menuContent.innerHTML = "<p class='text-red-500 text-center'>Не удалось загрузить меню. Пожалуйста, попробуйте позже.</p>";
    }
}

function toggleCart() { document.getElementById('cart-sidebar')?.classList.toggle('translate-x-full'); }
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) existingItem.quantity++; else cart.push({ ...product, quantity: 1 });
    updateCart();
}
function changeQuantity(productId, amount) {
    const item = cart.find(item => item.id === productId);
    if (item) { item.quantity += amount; if (item.quantity <= 0) cart = cart.filter(i => i.id !== productId); }
    updateCart();
}
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    if (!cartItemsContainer || !cartCount || !cartTotal) return;
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-400 text-center mt-8">Ваша корзина пуста</p>';
        document.getElementById('checkout-button').disabled = true;
    } else {
        cart.forEach(item => {
            cartItemsContainer.innerHTML += `<div class="flex items-center justify-between mb-4"><div><p class="font-semibold text-white">${item.name}</p><p class="text-sm text-gray-400">${item.price} MDL</p></div><div class="flex items-center"><button onclick="changeQuantity(${item.id}, -1)" class="w-7 h-7 bg-gray-700 text-white rounded">-</button><span class="w-8 text-center font-bold">${item.quantity}</span><button onclick="changeQuantity(${item.id}, 1)" class="w-7 h-7 bg-gray-700 text-white rounded">+</button></div></div>`;
        });
        document.getElementById('checkout-button').disabled = false;
    }
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = `${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)} MDL`;
}

// --- Инициализация ---
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    updateCart();
    
    document.getElementById('login-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const result = await handleFormSubmit('/api/login', { email: document.getElementById('login-email').value, password: document.getElementById('login-password').value });
        if (result.success) window.location.reload();
        else alert(result.message);
    });
    document.getElementById('register-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const result = await handleFormSubmit('/api/register', { name: document.getElementById('reg-name').value, email: document.getElementById('reg-email').value, phone: document.getElementById('reg-phone').value, password: document.getElementById('reg-password').value });
        if (result.success) window.location.reload();
        else alert(result.message);
    });
    document.getElementById('logout-button')?.addEventListener('click', () => handleFormSubmit('/api/logout', {}).then(() => window.location.href = "/"));
    document.getElementById('logout-button-mobile')?.addEventListener('click', () => document.getElementById('logout-button').click());

    document.getElementById('checkout-button')?.addEventListener('click', () => { if (cart.length > 0) toggleModal('checkout-modal'); });
    
    document.getElementById('checkout-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const result = await handleFormSubmit('/api/place_order', { name: document.getElementById('checkout-name').value, phone: document.getElementById('checkout-phone').value, address: document.getElementById('checkout-address').value, cart: cart });
        if (result.success) { toggleModal('checkout-modal'); cart = []; updateCart(); e.target.reset(); alert(result.message); }
        else { alert(result.message); }
    });

    // Мобильное меню
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    menuBtn?.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuBtn.querySelector('i').classList.toggle('fa-bars');
        menuBtn.querySelector('i').classList.toggle('fa-times');
    });
});
