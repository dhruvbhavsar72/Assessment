let slide = document.querySelector('.slider_wrapper');
const slideItem = document.querySelectorAll('.slider__item');
const sliderWidth = document.querySelector('.slide-container').clientWidth;
const slidedots = document.querySelector('.slide__dots');

let timeout;
let password = document.getElementById('password')
let strengthBadge = document.getElementById('StrengthDisp');
let textCount = document.getElementById("textCount");
let counterText = document.getElementById('counterText');
let inquireForm = document.querySelector('.inquire__frm');
let confirmpassword = document.getElementsByName('cpwd')[0];

const tabWidth = document.querySelector('.tab__content').clientWidth;
const prevbtn = document.querySelector('.slideprev');
const nextbtn = document.querySelector('.slidenext');


var slideCounter = 0;

//onclick
slideChange = () => {
    slide.style.transform = 'translateX(' + (-sliderWidth * slideCounter) + 'px)';
}

for (let index = 0; index < slideItem.length; index++) {
    let html = `<button class="slide__dots-btn" aria-label="slide button ${index + 1}" data-slide='${index}'></button>`
    slidedots.insertAdjacentHTML("beforeend", `${html}`);
}

let btndots = document.querySelectorAll('.slide__dots-btn');

btndots.forEach((i) => {

    i.addEventListener('click', function (e) {
        let activebtn = document.querySelector('.slide__dots-btn.activeSlide');
        activebtn ? activebtn.classList.remove('activeSlide') : e.currentTarget.classList.add('activeSlide');
        slideCounter = +this.dataset.slide;
        slideChange();
    })
});

let tablink = document.querySelectorAll('.tablink');

tablink.forEach((i) => {

    i.addEventListener('click', function (e) {
        e.preventDefault()
        let activebtn = document.querySelector('.tablink.activeTab');
        activebtn.classList.remove('activeTab'); e.currentTarget.classList.add('activeTab');
        document.querySelector('.tab__content-tab.activeTabContent').classList.remove('activeTabContent');
        document.querySelector(e.currentTarget.hash).classList.add('activeTabContent');
        TabsliderChange()
    })
});

//tabslider
function TabsliderChange() {
    const tabslide = document.querySelector('.tab__content-tab.activeTabContent .brand_slider');
    const tabItem = document.querySelectorAll('.tab__content-tab.activeTabContent .brand__img-items');

    let tabCounter = 0;

    tabChange = () => {
        tabslide.style.transform = 'translateX(' + ((-tabWidth * tabCounter) / 5) + 'px)';
    }
    nextbtn.addEventListener('click', () => {
        if (tabCounter < tabItem.length) {
            tabCounter++;
        }
        else {
            tabCounter = 0;
        }
        tabChange();
    });

    prevbtn.addEventListener('click', () => {
        if (tabCounter > 0) {
            tabCounter--;
        }
        else {
            tabCounter = tabItem.length;
        }

        tabChange();
    });
}

TabsliderChange();

document.querySelector('.mobile-trigger').addEventListener('click', function () {
    this.classList.toggle('active-re');
    document.querySelector('.header__nav--lists').classList.toggle('mobileMenuActive')
});


let strongPassword = /[!~!@#$%^&_]/m;
function StrengthChecker() {

    clearTimeout(timeout);
    timeout = setTimeout(() => {
        if (password.value.match(strongPassword) && password.value.length > 8) {
            strengthBadge.textContent = 'Strong';
            $('.popup__message--fail').animate({ right: -100 + '%' }, 0.8);
        }
        else if (password.value.length === 0) {
            strengthBadge.textContent = '8 digit password with must use of some special characters such as ~!@#$%^&*_';
            $('.popup__message--fail').animate({ right: -100 + '%' }, 0.8);
        } else {
            $('.popup__message--fail p').text(`You must enter with these character ~!@#$%^&*_`);
            $('.popup__message--fail').animate({ right: 0 }, 0.8);
            //strengthBadge.textContent = '8 digit password with must use of some special characters such as ~!@#$%^&*_'
        }
    }, 500);

}

password.addEventListener("input", () => { StrengthChecker() });



confirmpassword.addEventListener("input", () => {
    if (password.value === confirmpassword.value) {
        $('input[type="submit"]').removeAttr('disabled');
        $('.popup__message--fail').animate({ right: -100 + '%' }, 0.8);
    }
    else {
        $('.popup__message--fail p').text(`Password Matches not`);
        $('.popup__message--fail').animate({ right: 0 }, 0.8);
    }
});

textCount.addEventListener("input", () => {
    var maxLength = 200;
    var strLength = textCount.value.length;
    var charRemain = (maxLength - strLength);
    counterText.innerHTML = `${charRemain === 0 ? maxLength : charRemain} / ${maxLength}  (Run time character count)`;
})

inquireForm.addEventListener("submit", function (e) {
    e.preventDefault();
    $('.popup__message--success p').text(`Success Submit Message`);
    $('.popup__message--success').animate({ right: 0 }, 800);
    setTimeout(() => {
        $('.popup__message--success').animate({ right: -100 + '%' }, 800);
    }, 3000);
});

$('.header__nav--listItem > a').click(function () {
    $(this).next('ul').slideDown();
    $(this).parent().siblings().find('ul').slideUp();
});

function changeTheme() {
    let theme = localStorage.getItem('setTheme');
    if (theme === 'dark') {
        $('html').addClass('dark');
    }
    $('html.dark').css({ 'filter': 'invert(1)', 'background': '#000' });
    $('html.dark img').css({ 'filter': 'invert(1)' });
}

changeTheme();
$('.themechange').on('click', function () {

    
    if($('html').hasClass('dark')){
        localStorage.setItem('setTheme', 'light');
        $('html').addClass('light');
        $('html').removeClass('dark');
        $('html.light').css({ 'filter': 'unset', 'background': '#fff' });
        $('html.light img').css({ 'filter': 'unset' });
        $(this).html(`<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        width="24" height="24">
        <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke="#0ea5e9"></path>
        <path stroke="#0ea5e9"
            d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
            class="stroke-sky-500"></path>
    </svg>`)
    }
    else{
        localStorage.setItem('setTheme', 'dark');
        changeTheme();
        $(this).html(`<svg viewBox="0 0 24 24" fill="none" width="24" height="24">
    <path fill="#38bdf833" fill-rule="evenodd" clip-rule="evenodd" d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z" class="fill-sky-400/20"></path>
    <path fill="#0ea5e9" d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z" class="fill-sky-500"></path>
    <path fill="#0ea5e9" fill-rule="evenodd" clip-rule="evenodd" d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z" class="fill-sky-500"></path></svg>`)
    }
    
    
})


