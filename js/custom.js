var sliderWidth = $('.slider_wrapper').width();
let timeout;
let password = $('#password');
var tabWidth = $('.tab__content').width();

var slideCounter = 0;

$(window).resize(() => {
    sliderWidth = $('.slider_wrapper').width();
})

//onclick
slideChange = () => {
    $('.slider_wrapper').css('transform', `translateX(${-sliderWidth * slideCounter}px)`);
}

for (let index = 0; index < $('.slider__item').length; index++) {
    let html = `<button class="slide__dots-btn" aria-label="slide button ${index + 1}" data-slide='${index}'></button>`
    $('.slide__dots').append(html);
}

$('.slide__dots-btn').each(function () {
    $(this).on('click', function (e) {
        if (!$(this).hasClass('activeSlide')) {
            $(this).addClass('activeSlide');
            $(this).siblings().removeClass('activeSlide');
            slideCounter = $(this).data('slide');
            slideChange();
        }
    })
})

$('.tablink').each(function () {
    $(this).on('click', function (e) {
        e.preventDefault();
        if (!$(this).hasClass('activeTab')) {
            $(this).addClass('activeTab');
            $(this).parent('li').siblings().find('.activeTab').removeClass('activeTab');
            let othertab = $(this).parent('li').siblings().find('a').attr('href');
            let tabpane = $(this).attr('href')
            $(tabpane).show();
            $(othertab).hide();
            $(tabpane).addClass('activeTabContent');
            $(othertab).removeClass('activeTabContent');
        }
        TabsliderChange()
    });
});

//tabslider
TabsliderChange = () => {
    const tabslide = $('.tab__content-tab.activeTabContent .brand_slider');
    const tabItem = $('.tab__content-tab.activeTabContent .brand__img-items');
    $(window).resize(() => {
        tabWidth = $('.tab__content').width();
    })
    let tabCounter = 0;
    let mql = window.matchMedia('(min-width: 992px)')
    tabChange = () => {
        tabslide.css('transform', `translateX(${(-tabWidth * tabCounter) / (mql.matches ? 5 : 3)}px`)
    }
    $('.slidenext').on('click', () => {
        if (tabCounter === tabItem.length - 1) {
            tabCounter = 0;
        }
        else {

            tabCounter++;
        }
        tabChange();
    });

    $('.slideprev').on('click', () => {
        if (tabCounter === 0) {

            tabCounter = tabItem.length - 1;
        }
        else {
            tabCounter--;
        }
        tabChange();
    });
}

TabsliderChange();
$('.mobile-trigger').on('click', () => {
    $(this).toggleClass('active-re');
    $('.header__nav--lists').toggleClass('mobileMenuActive')
});


let strongPassword = /[!~!@#$%^&_]/m;
var passval;
StrengthChecker = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        if (passval.length > 8 && passval.match(strongPassword)) {
            $('.popup__message--fail').removeClass('msgpopupActive');
        } else if (passval.length === 0) {
            $('#StrengthDisp').text('8 digit password with must use of some special characters such as ~!@#$%^&*_');
            $('.popup__message--fail').removeClass('msgpopupActive');
        } else {
            $('.popup__message--fail p').text(`You must enter with these character ~!@#$%^&*_ with minimum 8 character`);
            $('.popup__message--fail').addClass('msgpopupActive');
        }
    }, 100);

}

password.on("input", () => { passval = password.val(); StrengthChecker() });

$('[name="cpwd"]').on("input", () => {
    if (passval.length > 8) {
        if (passval === $('[name="cpwd"]').val()) {
            $('input[type="submit"]').removeAttr('disabled');
            $('.popup__message--fail').removeClass('msgpopupActive');
        }
        else {
            $('.popup__message--fail p').text(`Password Matches not`);
            $('.popup__message--fail').addClass('msgpopupActive');
            $('input[type="submit"]').attr('disabled', true);
        }
    }
});



$('[name="email"]').on("input", () => {
    let emailvalue = this.value.toLowerCase();
    if (!emailvalue.match(/(\<|^)[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})(\>|$)/i)) {
        $('.popup__message--fail p').text(`email address not valid`);
        $('.popup__message--fail').addClass('msgpopupActive');
    }
    else {
        $('.popup__message--fail').removeClass('msgpopupActive');
    }
});

$("#textCount").on("input", () => {
    var maxLength = 200;
    var strLength = $("#textCount").val().length;
    var charRemain = (maxLength - strLength);
    $("#counterText").html(`${charRemain === 0 ? maxLength : charRemain} / ${maxLength}  (Run time character count)`);
})

$('.inquire__frm').on("submit", (e) => {
    e.preventDefault();
    $('.popup__message--success p').text(`Success Submit Message`);
    $('.popup__message--success').addClass('msgpopupActive');
    setTimeout(() => {
        $('.popup__message--success').removeClass('msgpopupActive');
    }, 3000);
});

$('.header__nav--listItem > a').click(() => {
    $(this).next('ul').slideDown();
    $(this).parent().siblings().find('ul').slideUp();
});

function changeTheme() {
    let theme = localStorage.getItem('setTheme');
    if (theme === 'dark') {
        $('html').addClass('dark');
    }
}
changeTheme();
$('.themechange').on('click', function () {
    if ($('html').hasClass('dark')) {
        localStorage.setItem('setTheme', 'light');
        $('html').addClass('light');
        $('html').removeClass('dark');
        $(this).find('svg.light').removeClass('d-none').addClass('d-block');
        $(this).find('svg.dark').addClass('d-none').removeClass('d-block')
    }
    else {
        localStorage.setItem('setTheme', 'dark');
        changeTheme();
        $('html').removeClass('light');
        $('html').addClass('dark');
        $(this).find('svg.dark').removeClass('d-none').addClass('d-block')
        $(this).find('svg.light').addClass('d-none').removeClass('d-block')
    }
})


