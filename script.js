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