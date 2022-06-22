function SlickSlider() { }

SlickSlider.initSlick = function () {
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        spaceBetween: 10,
        slidesPerGroup: 1,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        //navigation: {
        //    nextEl: '.swiper-button-next',
        //    prevEl: '.swiper-button-prev',
        //},
    });
}



SlickSlider.initSlickAction = function () {
    var swiper = new Swiper('#SwiperAction', {
        slidesPerView: 4,
        spaceBetween: 10,
        slidesPerGroup: 1,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        //navigation: {
        //    nextEl: '.swiper-button-next',
        //    prevEl: '.swiper-button-prev',
        //},
    });
}


SlickSlider.initSlickResolution = function () {
    var swiper = new Swiper('#SwiperResolution', {
        slidesPerView: 4,
        spaceBetween: 10,
        slidesPerGroup: 1,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
            el: '#PaginationResolution',
            clickable: true,
        },
        //navigation: {
        //    nextEl: '#SwiperNextResolution',
        //    prevEl: '#SwiperPreviousResolution',
        //},
    });
}


SlickSlider.initSlickProduct = function () {
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 5,
        spaceBetween: 0,
        slidesPerGroup: 1,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        //navigation: {
        //    nextEl: '.swiper-button-next',
        //    prevEl: '.swiper-button-prev',
        //},
    });
}


SlickSlider.initSlickOutStanding = function () {
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 2,
        spaceBetween: 3,
        slidesPerGroup: 1,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        //navigation: {
        //    nextEl: '.swiper-button-next',
        //    prevEl: '.swiper-button-prev',
        //},
    });
}


SlickSlider.initSlickOutStanding2 = function () {
    var swiper = new Swiper('.swiper-container2', {
        slidesPerView: 4,
        spaceBetween: 4,
        slidesPerGroup: 1,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        //navigation: {
        //    nextEl: '.swiper-button-next',
        //    prevEl: '.swiper-button-prev',
        //},
    });
}

