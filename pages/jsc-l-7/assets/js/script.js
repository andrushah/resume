//task1
function changeColor(){
    let itemBg = getComputedStyle(event.target).background,
    body = document.body;
    body.style.background= itemBg;
    body.style.backgroundSize = 'cover';
}
const sel = (selector) => document.querySelector(selector);

document.querySelector('.colors').addEventListener('click', function(){
    document.querySelector('.colorContainer').classList.remove('hide');
    document.querySelector('.imageContainer').classList.add('hide');
})
document.querySelector('.bgImage').addEventListener('click', function(){
    document.querySelector('.imageContainer').classList.remove('hide');
    document.querySelector('.colorContainer').classList.add('hide');
})
