// Переключение темы
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

// Проверяем сохранённую тему в localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

// Обработчик клика по кнопке
themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Добавляем класс для анимации
    this.classList.add('theme-rotate');
    
    // Убираем класс после анимации
    setTimeout(() => {
        this.classList.remove('theme-rotate');
    }, 400);
});

// Функция обновления иконки
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }
}

// Автоматическое определение системной темы
if (!savedTheme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }
}

// Анимация подчеркивания ника
const usernameContainer = document.querySelector('.username-container');
const usernameText = document.querySelector('.username-text');

if (usernameContainer && usernameText) {
    usernameContainer.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = (x / rect.width) * 100;
        
        usernameText.style.setProperty('--mouse-x', `${percent}%`);
    });
    
    usernameContainer.addEventListener('mouseleave', function() {
        usernameText.style.setProperty('--mouse-x', '50%');
    });
}

// Анимация подчеркивания для фразы
const aboutContent = document.querySelector('.about-content');
const aboutText = document.querySelector('.about-text');

if (aboutContent && aboutText) {
    aboutContent.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = (x / rect.width) * 100;
        
        aboutText.style.setProperty('--mouse-x', `${percent}%`);
    });
    
    aboutContent.addEventListener('mouseleave', function() {
        aboutText.style.setProperty('--mouse-x', '50%');
    });
}

// Отслеживание курсора с усиленным поворотом плитки
const mainCard = document.getElementById('mainCard');

function handleMouseMove(e) {
    if (!mainCard) return;
    
    const cardRect = mainCard.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    
    const mouseX = e.clientX - cardCenterX;
    const mouseY = e.clientY - cardCenterY;
    
    const rotateY = (mouseX / cardRect.width) * 15;
    const rotateX = -(mouseY / cardRect.height) * 10;
    const translateZ = 20;
    
    mainCard.style.transform = `
        perspective(1000px)
        translateY(-8px)
        translateZ(${translateZ}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
    `;
    
    mainCard.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.25)';
    mainCard.style.filter = 'brightness(1.05)';
}

function handleMouseLeave() {
    if (!mainCard) return;
    
    mainCard.style.transform = 'perspective(1000px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg)';
    mainCard.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
    mainCard.style.filter = 'brightness(1)';
    mainCard.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    setTimeout(() => {
        mainCard.style.transition = 'all 0.5s ease, transform 0.1s ease';
    }, 600);
}

function handleMouseEnter() {
    if (!mainCard) return;
    
    mainCard.style.transition = 'transform 0.1s ease, filter 0.3s ease';
    mainCard.style.boxShadow = '0 18px 40px rgba(0, 0, 0, 0.18)';
}

// Добавляем обработчики событий
if (mainCard) {
    mainCard.addEventListener('mousemove', handleMouseMove);
    mainCard.addEventListener('mouseleave', handleMouseLeave);
    mainCard.addEventListener('mouseenter', handleMouseEnter);
}

// Минимальная версия
document.querySelector('.username-container')?.addEventListener('click', function() {
    const text = this.querySelector('.username-text').textContent.trim();
    navigator.clipboard.writeText(text).then(() => {
        this.classList.add('copied');
        setTimeout(() => this.classList.remove('copied'), 600);
    });
});

document.querySelector('.about-content')?.addEventListener('click', function() {
    const text = this.querySelector('.about-text').textContent.trim();
    navigator.clipboard.writeText(text).then(() => {
        this.classList.add('copied');
        setTimeout(() => this.classList.remove('copied'), 600);
    });
});

// Анимация поворота плитки с реакцией на поворот телефона
function handleDeviceOrientation(event) {
    if (!mainCard) return;
    
    // Получаем данные гироскопа
    const beta = event.beta;  // Наклон вперед-назад (-180 до 180)
    const gamma = event.gamma; // Наклон влево-вправо (-90 до 90)
    
    // Ограничиваем значения для плавности
    const limitedBeta = Math.max(Math.min(beta, 30), -30);
    const limitedGamma = Math.max(Math.min(gamma, 30), -30);
    
    // Преобразуем в значения поворота
    const rotateX = limitedBeta * 0.5; // Уменьшаем коэффициент для плавности
    const rotateY = limitedGamma * 0.8;
    
    // Применяем трансформацию
    mainCard.style.transform = `
        perspective(1000px)
        translateY(-8px)
        translateZ(20px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
    `;
    
    // Добавляем параллакс эффект для теней
    const shadowX = limitedGamma * 0.5;
    const shadowY = limitedBeta * 0.3;
    
    mainCard.style.boxShadow = `
        ${shadowX}px ${shadowY}px 50px rgba(0, 0, 0, 0.25),
        0 0 0 1px rgba(255, 255, 255, 0.1)
    `;
}

// Функция для проверки поддержки DeviceOrientation
function initDeviceOrientation() {
    if (typeof DeviceOrientationEvent !== 'undefined' && 
        typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS 13+ - нужно запрашивать разрешение
        const button = document.createElement('button');
        button.innerHTML = '🎮 Включить 3D эффект';
        button.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--accent-color);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            font-family: 'Nunito', sans-serif;
            font-weight: 600;
            cursor: pointer;
            z-index: 1000;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        `;
        
        button.addEventListener('click', async () => {
            try {
                const permission = await DeviceOrientationEvent.requestPermission();
                if (permission === 'granted') {
                    window.addEventListener('deviceorientation', handleDeviceOrientation);
                    button.remove();
                    showOrientationToast('3D эффект активирован! Поворачивайте телефон 🎮');
                }
            } catch (error) {
                console.error('Ошибка доступа к гироскопу:', error);
                showOrientationToast('Не удалось включить 3D эффект 😔');
            }
        });
        
        document.body.appendChild(button);
        
    } else if ('DeviceOrientationEvent' in window) {
        // Android и другие поддерживающие браузеры
        window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
}

// Всплывающее уведомление
function showOrientationToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-family: 'Nunito', sans-serif;
        font-size: 14px;
        z-index: 10000;
        backdrop-filter: blur(10px);
        text-align: center;
        animation: fadeInOut 3s ease-in-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Добавляем CSS анимацию для уведомления
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(style);

// Обработчик изменения ориентации экрана
function handleOrientationChange() {
    if (!mainCard) return;
    
    // Небольшая анимация при смене ориентации
    mainCard.style.transition = 'all 0.5s ease';
    setTimeout(() => {
        mainCard.style.transition = 'transform 0.1s ease, filter 0.3s ease';
    }, 500);
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Запускаем отслеживание ориентации устройства
    initDeviceOrientation();
    
    // Отслеживаем изменение ориентации экрана
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Также отслеживаем resize для надежности
    window.addEventListener('resize', handleOrientationChange);
});

// Обновляем обработчики мыши - добавляем проверку на мобильные устройства
function handleMouseMove(e) {
    if (!mainCard) return;
    
    // На мобильных устройствах отключаем реакцию на мышь если включен гироскоп
    if (isMobileDevice() && window.deviceOrientationActive) {
        return;
    }
    
    const cardRect = mainCard.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    
    const mouseX = e.clientX - cardCenterX;
    const mouseY = e.clientY - cardCenterY;
    
    const rotateY = (mouseX / cardRect.width) * 15;
    const rotateX = -(mouseY / cardRect.height) * 10;
    const translateZ = 20;
    
    mainCard.style.transform = `
        perspective(1000px)
        translateY(-8px)
        translateZ(${translateZ}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
    `;
    
    mainCard.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.25)';
    mainCard.style.filter = 'brightness(1.05)';
}

// Проверка на мобильное устройство
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Флаг активности гироскопа
window.deviceOrientationActive = false;

// Обновляем обработчик deviceorientation
const originalHandleDeviceOrientation = handleDeviceOrientation;
handleDeviceOrientation = function(event) {
    window.deviceOrientationActive = true;
    originalHandleDeviceOrientation(event);
};
