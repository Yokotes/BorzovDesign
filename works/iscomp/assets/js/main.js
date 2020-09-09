$(document).ready(()=>{
    // Header settings
    var
        burger          = $('.burger-btn'),
        hidden_menu     = $('.hidden-menu'),
        hidden_header   = $('.hidden-header');

    burger.click(()=>{
        burger.toggleClass('active');
        hidden_menu.toggleClass('show');
    });

    $(window).scroll((e)=> {
        if ($(window).scrollTop() > 0) {
            hidden_header.addClass('show');
        }
        else if (!hidden_menu.hasClass('show')) {
            hidden_header.removeClass('show');
        }
    });

    // Navigation settings
    var
        nav_elems        = $('[data-to]'),
        scroll_labels    = $('[data-section]');

    nav_elems.click(function (e) {
        e.preventDefault();
        hidden_menu.removeClass('show');
        burger.removeClass('active');

        let 
            section = $(this).data()['to'],
            pos     = $(scroll_labels[section]).offset().top;

        if (section > 0) pos -= 100
        else pos = 0;
        
        if (pos == 0) hidden_header.removeClass('show');

        $('html, body').animate({
            scrollTop: pos
        }, 800);
    });

    $('.menu__link, .hidden-menu__link').click((e)=>{
        e.preventDefault();
    });

    // Scroll settings
    var
        current_section = 0,
        positions       = []

    for (let i = 0; i < scroll_labels.length; i++) {
        positions[i] = $(scroll_labels[i]).offset().top - $('.section__title').innerHeight()-50;
    }

    $(window).scroll(()=> {
        for (let i = 0; i < positions.length; i++) {
            if ($(window).scrollTop() >= positions[i]) {
                current_section = i
            }
            else break;
        }
    });

});