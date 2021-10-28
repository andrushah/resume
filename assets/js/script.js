let message = document.querySelector(".message");
let close = document.getElementById("close-message");

close.addEventListener('click', ()=>{
    message.animate({
        height: '0px'
    },{ duration: 200, fill: 'forwards' }, ()=>{
        message.getElementsByClassName.disply="none";
    })
});
