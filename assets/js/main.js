$(document).ready(()=>{
    // Default button settings
    var 
        default_btn         = $('.default-btn'),
        parts_count         = 24;

    // Insert part to button
    for (let i = 0; i < parts_count; i++)
        default_btn.append('<span></span>');

    // Setting sizes and positions
    setupButtons();

    function setupButtons() {
        for (let i = 0; i < default_btn.length; i++) {
            default_btn_parts = $(default_btn[i]).children('span:not(.btn__content)');
            default_btn_parts.width($(default_btn[i]).innerWidth()/parts_count +0.1)
            .height($(default_btn[i]).innerHeight());
    
            for (let j = 0; j < parts_count; j++) {
                $(default_btn_parts[j]).css({
                    'left': j * default_btn_parts.width(),
                    'transition-delay': (j*0.03)+'s',
                });
            }
        }
    }

    // Progress line settings
    var 
        progress_line = $('.line__progress');

    function setProgress(id, progress) {
        if (id < progress_line.length && progress <= 1.0) {
            $(progress_line[id]).css('transform', `scaleY(${progress})`);
        }
    }

    setProgress(0, 0.85);
    setProgress(1, 0.75);
    setProgress(2, 0.65);
    setProgress(3, 0.8);

    // Cube settings
    var
        cube        = $('.cube'),
        cube_descr  = $('.cube__descr');

    setCube()

    $(window).resize(()=> {
        setCube();
    });

    function setCube() {
        cube.css('transform-origin', '50% 50% ' + -cube.width()/2 + 'px');
        cube_descr.css('transform', `rotateY(90deg) translateX(50%) translateZ(${cube_descr.width()/2 + 20}px)`);
    }

    // Header settings
    var
        burger          = $('.burger'),
        hidden_menu     = $('.hidden'),
        hidden_header   = $('.header__hidden');

    burger.click(()=>{
        burger.toggleClass('active');
        hidden_menu.toggleClass('show');
        
        if ($(window).scrollTop() == 0) {
            if (hidden_header.hasClass('show')) {
                hidden_header.removeClass('show');
            }
            else {
                hidden_header.addClass('show');
            }
        }
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

        if (section > 0) pos -= $('.section__title').innerHeight()+1
        else pos = 0;
        
        if (pos == 0) hidden_header.removeClass('show');

        $('.menu__link').removeClass('current');
        $($('.menu__link')[section]).addClass('current');

        $('html, body').animate({
            scrollTop: pos
        }, 800);
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

        $('.menu__link').removeClass('current');
        $($('.menu__link')[current_section]).addClass('current');
    });

    // Language settings
    var 
        lang_btn        = $('.lang-btn');

    lang_btn.click(function() {
        let data = $(this).data('lang');

        lang_btn.removeClass('current');
        $(`[data-lang="${data}"]`).addClass('current');

        $.ajax('assets/php/lang.php', {
            type: 'POST',
            data: `lang=${$(this).data('lang')}`,
            success: (output)=>{
                let 
                    lang_content = JSON.parse(output),
                    sections = [];

                for (section in lang_content) {
                    let 
                        elems   = $(`[data-lang-section="${section}"]`),
                        content = lang_content[section];
                    
                    $(elems[0]).html(content[$(elems[0]).data('lang-content')]);

                    if (section == 'portfolio' || section == 'projects') {
                        let items = content['items'];
                        
                        for (let item_id in items) {
                            let elem = $(elems[parseInt(item_id)+1])

                            elem.html(items[item_id]);
                        }
                    }
                    else if (section == 'services') {
                        let 
                            items = $('.services__item'),
                            items_content = content['items'];

                        for (let i = 0; i < elems.length; i++) {
                            let elem = $(elems[i])
                            if (elem.data('lang-content').indexOf("items") == -1) 
                                elem.html(content[elem.data('lang-content')]);
                        }

                        for (let i in items_content) {
                            let 
                                item = $($(items[i])[0]).children(':not(.item__img)'),
                                item_content = items_content[i],
                                count = 0;

                            for (let data in item_content) {
                                $(item[count]).html(item_content[data]);
                                count++;
                            }
                        }

                    }
                    else if (section == 'contacts') {
                        for (let i = 0; i < elems.length; i++) {
                            let data = $(elems[i]).data('lang-content');

                            if (elems[i].tagName != 'INPUT' && elems[i].tagName != 'TEXTAREA') 
                                $(elems[i]).html(content[data]);
                            else $(elems[i]).attr('placeholder', content[data]);
                            // console.log(elems[i].tagName , elems[i].tagName != 'INPUT');
                        }
                    }
                    else if (section == 'header') {
                        let count = 0;

                        for (let elem in content) {
                            $(elems[elem]).html(content[elem]);
                        } 
                    }
                    else {
                        for (let i = 0; i < elems.length; i++) {
                            let elem = $(elems[i])
                            elem.html(content[elem.data('lang-content')])
                        }
                    }
                }

                setupButtons();
            }
        });
    });

    // Form settings
    $(".contacts__form").submit(function() {
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "assets/php/mail.php",
			data: th.serialize()
		}).done(function(e) {
			alert("Сообщение отправленно!", e);
			setTimeout(function() {
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});
});