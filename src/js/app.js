/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
// import MousePRLX from './libs/parallaxMouse'
// import AOS from 'aos'
// import Swiper, { Navigation, Pagination } from 'swiper';

import BaseHelpers from './helpers/BaseHelpers.js';
import PopupManager from './modules/PopupManager';

BaseHelpers.checkWebpSupport();

BaseHelpers.addTouchClass();

BaseHelpers.addLoadedClass();

BaseHelpers.headerFixed();

/**
 * Открытие/закрытие модальных окон
 * Чтобы модальное окно открывалось и закрывалось
 * На окно повешай атрибут data-popup="<название окна>"
 * На кнопку, которая вызывает окно повешай атрибут data-type="<название окна>"

 * На обертку(.popup) окна добавь атрибут '[data-close-overlay]'
 * На кнопку для закрытия окна добавь класс '.button-close'
 * */
new PopupManager();


/**
 *  Библиотека для анимаций
 *  документация: https://michalsnik.github.io/aos
 * */
// AOS.init();

/**
 * Параллакс мышей
 * */
// new MousePRLX();

//language
const buttons = document.querySelectorAll('.language-buttons button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

//slider
const slides = document.querySelectorAll('.slide');
const progressPoints = document.querySelectorAll('.progress-point');

let currentIndex = 0;
let touchStartX = null;

function updateSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    updateProgressPoints();
}

function updateProgressPoints() {
    progressPoints.forEach((point, index) => {
        const progress = point.querySelector('.progress');
        if (index === currentIndex) {
            progress.style.width = '100%';
        } else {
            progress.style.width = '0';
        }
    });
}

updateSlide(currentIndex);

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

document.addEventListener('mousedown', (e) => {
    touchStartX = e.clientX;
});

document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    handleSwipe(touchEndX);
});

document.addEventListener('mouseup', (e) => {
    const touchEndX = e.clientX;
    handleSwipe(touchEndX);
});

function handleSwipe(touchEndX) {
    const touchDiffX = touchEndX - touchStartX;

    if (touchDiffX > 50) {
        prevSlide();
    } else if (touchDiffX < -50) {
        nextSlide();
    }

    touchStartX = null;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide(currentIndex);
}

function handleProgressPointClick(index) {
    currentIndex = index;
    updateSlide(currentIndex);
}

progressPoints.forEach((point, index) => {
    point.addEventListener('click', () => {
        handleProgressPointClick(index);
    });
});

//cookie
document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.querySelector('.cookie-banner');
    const cookieAcceptButton = document.querySelector('.cookie-accept-button');

    cookieBanner.classList.add('active');

    cookieAcceptButton.addEventListener('click', () => {
        cookieBanner.classList.remove('active');
    });
});

//form
const phoneNumberInput = document.getElementById("phoneNumber");

function addPrefixOnClick() {
    if (!phoneNumberInput.value.startsWith("+380")) {
        phoneNumberInput.value = "+380" + phoneNumberInput.value;
        phoneNumberInput.classList.add('error');
    }
}

phoneNumberInput.addEventListener("click", addPrefixOnClick);

phoneNumberInput.addEventListener("input", function () {
    let inputValue = phoneNumberInput.value;
    let numericValue = inputValue.replace(/[^0-9+]/g, '');

    if (!numericValue.startsWith("+380")) {
        numericValue = "+380" + numericValue.substr(3);
    }

    if (numericValue.length === 13) {
        phoneNumberInput.classList.remove('error');
    } else {
        phoneNumberInput.classList.add('error');
    }

    phoneNumberInput.value = numericValue;
});

const nameInput = document.getElementById("name");
nameInput.addEventListener("input", function () {
    const inputValue2 = nameInput.value;

    if (inputValue2.length > 3) {
        nameInput.classList.remove('error');
    } else {
        nameInput.classList.add('error');
    }
});


//popup
document.getElementById("phoneForm").addEventListener("submit", function(event) {
    event.preventDefault();

    document.getElementById("popup-body").style.display = "none";
    document.getElementById("close-popup").style.display = "none";
    document.getElementById("phoneForm").reset();

    document.getElementById("thanksMessage").style.display = "flex";

    setTimeout(function() {
        document.getElementById("thanksMessage").style.display = "none";
        document.getElementById("popup-body").style.display = "block";
        document.getElementById("close-popup").style.display = "block";
        document.getElementById("popupClose").classList.remove("is-open");
        let lock = document.querySelector('.lock');
        if (lock) {
            lock.classList.remove('lock');
        }
    }, 3000);
});


//burger menu
const burgerButton = document.getElementById("burgerButton");
const headerMobile = document.querySelector(".header-mobile");

burgerButton.addEventListener("click", function() {
    burgerButton.classList.toggle("cross");
    headerMobile.classList.toggle("show");
});






