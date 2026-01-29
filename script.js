// Quiz answers
const answers = {
    1: 'b', // Конфіденційність
    2: 'b', // Фішинг
    3: 'c', // 12 символів
    4: 'b', // Програма-вимагач
    5: 'c', // WPA3
    6: 'b', // Пароль + додатковий фактор
    7: 'b', // Відключитися від мережі
    8: 'a', // Вразливість без патча
    9: 'b', // 3-2-1
    10: 'a' // Віртуальна приватна мережа
};

const explanations = {
    1: {
        correct: 'Правильно! CIA означає: Confidentiality (Конфіденційність), Integrity (Цілісність), Availability (Доступність).',
        incorrect: 'Неправильно. "C" означає Confidentiality (Конфіденційність) - захист інформації від несанкціонованого доступу.'
    },
    2: {
        correct: 'Правильно! Фішинг - це шахрайська техніка, що використовує підроблені листи та сайти для крадіжки даних.',
        incorrect: 'Неправильно. Фішинг - це атака через підроблені електронні листи та веб-сайти.'
    },
    3: {
        correct: 'Правильно! Сучасні рекомендації вказують мінімум 12 символів для надійного пароля.',
        incorrect: 'Неправильно. Рекомендована мінімальна довжина надійного пароля - 12 символів.'
    },
    4: {
        correct: 'Правильно! Ransomware (програма-вимагач) шифрує файли та вимагає викуп за розшифрування.',
        incorrect: 'Неправильно. Ransomware - це програма-вимагач, що шифрує дані жертви.'
    },
    5: {
        correct: 'Правильно! WPA3 - найновіший та найбезпечніший стандарт шифрування Wi-Fi.',
        incorrect: 'Неправильно. WPA3 є найбезпечнішим стандартом. WEP застарілий, WPA має вразливості.'
    },
    6: {
        correct: 'Правильно! 2FA поєднує пароль з додатковим фактором (SMS, додаток, ключ).',
        incorrect: 'Неправильно. 2FA = щось, що ви знаєте (пароль) + щось, що маєте (телефон, ключ).'
    },
    7: {
        correct: 'Правильно! Відключення від мережі зупинить можливу крадіжку даних.',
        incorrect: 'Неправильно. Перше - ізолюйте пристрій від мережі, щоб зупинити атаку.'
    },
    8: {
        correct: 'Правильно! Zero-day - вразливість, для якої ще немає патча від розробника.',
        incorrect: 'Неправильно. Zero-day означає, що розробник мав "нуль днів" на виправлення.'
    },
    9: {
        correct: 'Правильно! 3-2-1: 3 копії даних, 2 типи носіїв, 1 копія офлайн/віддалено.',
        incorrect: 'Неправильно. Правило 3-2-1 - золотий стандарт резервного копіювання.'
    },
    10: {
        correct: 'Правильно! VPN (Virtual Private Network) створює зашифрований тунель для інтернет-трафіку.',
        incorrect: 'Неправильно. VPN - віртуальна приватна мережа для безпечного з\'єднання.'
    }
};

// Track quiz progress
let answeredQuestions = 0;
const totalQuestions = 10;

let correctAnswers = 0;

function checkAnswer(question, answer) {
    const resultElement = document.getElementById(`result${question}`);
    const questionElement = document.querySelector(`[data-question="${question}"]`);
    const buttons = questionElement.querySelectorAll('button');

    // Check if already answered
    if (questionElement.classList.contains('answered')) return;
    questionElement.classList.add('answered');

    // Disable all buttons after answer
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.cursor = 'default';
    });

    answeredQuestions++;

    if (answer === answers[question]) {
        correctAnswers++;
        resultElement.textContent = explanations[question].correct;
        resultElement.className = 'quiz-result correct';
        buttons.forEach(btn => {
            if (btn.textContent.startsWith(answer + ')')) {
                btn.classList.add('correct');
            }
        });
    } else {
        resultElement.textContent = explanations[question].incorrect;
        resultElement.className = 'quiz-result incorrect';
        buttons.forEach(btn => {
            if (btn.textContent.startsWith(answer + ')')) {
                btn.classList.add('incorrect');
            }
            if (btn.textContent.startsWith(answers[question] + ')')) {
                btn.classList.add('correct');
            }
        });
    }

    // Show final score if all questions answered
    if (answeredQuestions === totalQuestions) {
        showQuizScore();
    }
}

function showQuizScore() {
    const scoreElement = document.getElementById('quizScore');
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    let message = '';
    let color = '';

    if (percentage >= 90) {
        message = 'Відмінно! Ви експерт з кібербезпеки!';
        color = '#10b981';
    } else if (percentage >= 70) {
        message = 'Добре! Ви маєте хороші знання.';
        color = '#2563eb';
    } else if (percentage >= 50) {
        message = 'Непогано, але є що покращити.';
        color = '#f59e0b';
    } else {
        message = 'Рекомендуємо перечитати матеріал.';
        color = '#ef4444';
    }

    scoreElement.innerHTML = `
        <div style="color: ${color}">
            Ваш результат: ${correctAnswers}/${totalQuestions} (${percentage}%)
        </div>
        <div style="font-size: 1rem; margin-top: 0.5rem; font-weight: normal;">
            ${message}
        </div>
    `;
    scoreElement.classList.add('visible');
}

// Smooth scroll for navigation
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards and elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.card, .principle, .threat, .tip, .quiz-question, .comparison-table, .hardening-tips li, .os-card, .vpn-card, .provider-item, .iot-tip, .social-do, .social-dont, .social-threat, .wifi-risk, .phishing-sign, .step, .resource-link, .glossary-item, .ransomware-card, .type-card, .protection-item, .mobile-card, .right-item, .privacy-check, .rule, .manager, .bad-passwords');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // Open the first tab by default
    const defaultTab = document.querySelector('.tab-link');
    if (defaultTab) {
        defaultTab.click();
    }
});

// Password strength checker (bonus feature)
function checkPasswordStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const levels = ['Дуже слабкий', 'Слабкий', 'Середній', 'Хороший', 'Сильний', 'Дуже сильний'];

    return {
        score: strength,
        level: levels[Math.min(strength, levels.length - 1)]
    };
}

// Password checker UI
const passwordInput = document.getElementById('passwordInput');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

if (passwordInput) {
    passwordInput.addEventListener('input', function () {
        const password = this.value;
        updatePasswordStrength(password);
        updateCriteria(password);
    });
}

function updatePasswordStrength(password) {
    if (!password) {
        strengthBar.style.width = '0';
        strengthText.textContent = 'Введіть пароль для перевірки';
        strengthText.style.color = '#64748b';
        return;
    }

    const result = checkPasswordStrength(password);
    const percentage = (result.score / 6) * 100;

    strengthBar.style.width = percentage + '%';

    const colors = ['#ef4444', '#ef4444', '#f59e0b', '#f59e0b', '#10b981', '#10b981'];
    strengthBar.style.background = colors[result.score] || colors[0];
    strengthText.style.color = colors[result.score] || colors[0];
    strengthText.textContent = result.level;
}

function updateCriteria(password) {
    const criteria = {
        length: password.length >= 12,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numbers: /[0-9]/.test(password),
        special: /[^a-zA-Z0-9]/.test(password)
    };

    for (const [key, met] of Object.entries(criteria)) {
        const element = document.getElementById(key);
        if (element) {
            if (met) {
                element.classList.add('met');
                element.querySelector('span').textContent = '✓';
            } else {
                element.classList.remove('met');
                element.querySelector('span').textContent = '○';
            }
        }
    }
}

function togglePassword() {
    const input = document.getElementById('passwordInput');
    const btn = document.getElementById('toggleBtn');

    if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
    } else {
        input.type = 'password';
        btn.textContent = '👁️';
    }
}

// Glossary search function
// Store original HTML of glossary items
const glossaryItems = document.querySelectorAll('.glossary-item');
const originalGlossaryHtml = {};
glossaryItems.forEach((item, index) => {
    originalGlossaryHtml[index] = item.innerHTML;
});

function highlightText(text, filter) {
    if (!filter) return text;
    const regex = new RegExp(filter, 'gi');
    return text.replace(regex, match => `<span class="highlight">${match}</span>`);
}

function filterGlossary() {
    const searchInput = document.getElementById('glossarySearch');
    const filter = searchInput.value.toLowerCase();

    glossaryItems.forEach((item, index) => {
        const termElement = item.querySelector('strong');
        const definitionElement = item.querySelector('p');

        const originalTerm = termElement.textContent;
        const originalDefinition = definitionElement.textContent;

        const termMatch = originalTerm.toLowerCase().includes(filter);
        const definitionMatch = originalDefinition.toLowerCase().includes(filter);

        if (termMatch || definitionMatch) {
            item.classList.remove('hidden');
            termElement.innerHTML = highlightText(originalTerm, filter);
            definitionElement.innerHTML = highlightText(originalDefinition, filter);
        } else {
            item.classList.add('hidden');
        }

        // Restore original content if filter is empty
        if (!filter) {
            item.innerHTML = originalGlossaryHtml[index];
            item.classList.remove('hidden');
        }
    });
}

// Console easter egg
console.log('%c🔐 Вітаємо в світі кібербезпеки!', 'font-size: 20px; color: #2563eb; font-weight: bold;');
console.log('%cПам\'ятайте: безпека починається з вас!', 'font-size: 14px; color: #10b981;');
console.log('%cПроект розширено: 15+ розділів, 10 питань квізу, 20+ термінів глосарію', 'font-size: 12px; color: #64748b;');

// Tab functionality for Messengers and Browsers section
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Set default active tab on load
document.addEventListener('DOMContentLoaded', (event) => {
    if (defaultTab) {
        defaultTab.click();
    }
});

// Back to Top Button functionality
const backToTopBtn = document.getElementById('backToTopBtn');

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
}

backToTopBtn.addEventListener('click', () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});

// Highlight active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7 // Highlight when 70% of the section is visible
};

const observerNav = new IntersectionObserver((entries, observerNav) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.id;
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(currentId)) {
                    link.classList.add('active');
                }
            });
        }
    });
}, options);

sections.forEach(section => {
    observerNav.observe(section);
});

// Scroll Progress Bar functionality
window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('progressBar');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = progress + '%';
});

// Hamburger Menu Functionality
const hamburger = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});
