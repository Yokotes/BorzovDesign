$(document).ready(()=> {

    // Scroll
    let
        hidden_header = $('.hidden-header');

    $(window).scroll(()=>{
        if ($(window).scrollTop() > 0)
            hidden_header.addClass('showed');
        else hidden_header.removeClass('showed');

    });

    // Navigation
    let
        nav_elems           = $('[data-to]'),
        hidden_menu         = $('.hidden-menu'),
        hidden_menu_item    = $('.hidden-menu a'),
        burger              = $('.burger');

    nav_elems.click(function() {
        let pos = $(`[data-name="${$(this).data('to')}"]`).offset().top - 200;

        $('html, body').animate({
            scrollTop: pos,
        }, 800);
    });

    hidden_menu_item.click(()=> {
        hidden_menu.removeClass('showed');
        burger.removeClass('active');

    });

    // Burger

    burger.click(()=> {
        burger.toggleClass('active');
        hidden_menu.toggleClass('showed');
    });
});