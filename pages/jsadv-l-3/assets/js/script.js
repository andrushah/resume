$(function(){
    // start discoBall functions
        let timer = 1000;
        function discoball(){
            let width = $('.discoBall').width();
            let height = $('.discoBall').height();
            let ballLeft = Math.round(Math.random()*window.innerWidth);
            let ballTop = Math.round(Math.random()*window.innerHeight);
            let r = Math.round(Math.random()*255);
            let g = Math.round(Math.random()*255);
            let b = Math.round(Math.random()*255);
            let ballColor = `rgb(${r}, ${g}, ${b})`;
            let ballBorder =  `rgb(${Math.round(Math.random()*255)}, ${Math.round(Math.random()*255)}, ${Math.round(Math.random()*255)})`;
            // console.log('discoBall',left,'top', top);
            (ballTop - height < 0) ? ballTop = top : ballTop -= height;
            (ballLeft - width < 0) ? ballLeft = ballLeft : ballLeft -= width;
            $('.discoBall').animate({
                top: ballTop,
                left: ballLeft,
                backgroundColor: ballColor,
                boxShadow: `10px 10px 48px 7px ${ballColor}`,
                borderColor: ballBorder
            },timer, 'linear')
        };
        discoball()
        setInterval(discoball,timer);
    
    })