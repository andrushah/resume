$(function () {

    let timer = 2000;

    function discoball() {
        let ballShadow = 15;
        let ballWidth = $('.discoBall').width() + ballShadow;
        let ballHeight = $('.discoBall').height() + ballShadow;
        let discoHeight = $('.disco').height();
        let discoWidth = $('.disco').width();
        let ballLeft = Math.round(Math.random() * window.innerWidth);
        let ballTop = Math.round(Math.random() * window.innerHeight);
        let r = Math.round(Math.random() * 255);
        let g = Math.round(Math.random() * 255);
        let b = Math.round(Math.random() * 255);
        let ballColor = `rgb(${r}, ${g}, ${b})`;
        let ballBorder = `rgb(${Math.round(Math.random()*255)}, ${Math.round(Math.random()*255)}, ${Math.round(Math.random()*255)})`;

        ballTop > discoHeight - ballHeight ? ballTop = discoHeight - ballHeight : ballTop = ballTop;
        ballLeft > discoWidth - ballWidth ? ballLeft = discoWidth - ballWidth : ballWidth = ballWidth;
        $('.discoBall').animate({
            top: ballTop,
            left: ballLeft,
            backgroundColor: ballColor,
            boxShadow: `10px 10px 48px 7px ${ballColor}`,
            borderColor: ballBorder
        }, timer, 'linear')
    };
    discoball();
    setInterval(discoball, timer);

    /// gallery
    let currentTop, currentLeft;
    $('li').click(function(){
        $('.modal').css('opacity', 0)
        $(this).attr('data-current-item', 'true');
        currentTop = $(this).offset().top - $(window).scrollTop();
        currentLeft = $(this).offset().left;
        $('.modal').css({
            width: $(this).width(),
            height: $(this).height(),
            top: currentTop,
            left: currentLeft,
            background: $(this).css('background')
        });
        
        $('.modal-container').fadeIn(0, function(){
            $('.modal').css('opacity', 1)
            let newTop = (window.innerHeight-500)/2;
            let newLeft = (window.innerWidth-800)/2;
            $('.modal').animate({
                width: '800px',
                height: '500px',
                top: newTop,
                left: newLeft
            },500, 'linear')
        })
    });

    $('.modal').on('click', function(){
        let currentItem = $('li[data-current-item="true"]');
        let width = currentItem.width();
        let heigth = currentItem.height();
        $(this).animate({
            width: width,
            height: heigth,
            top: currentTop,
            left: currentLeft
        },500, 'linear',()=>{
            $('li[data-current-item="true"]').css('opacity','1');
            $('.modal-container').fadeOut(500);
            currentItem.removeAttr('data-current-item');
        })     
    })

})