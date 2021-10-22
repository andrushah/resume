const scrollDown = document.getElementById('scrollDown');
const slideFromLeft = document.querySelector('.slideFromLeft');
const line = document.getElementById('line');
const image = document.querySelector('.image');
const scrollUp = document.getElementById('scrollUp');
const fontsize = parseInt(getComputedStyle(scrollDown).fontSize);
const fontsizeUp = parseInt(getComputedStyle(scrollUp).fontSize);

scrollDown.addEventListener('click',()=>{
    slideFromLeft.scrollIntoView({
        behavior: 'smooth'
    })
})
scrollUp.addEventListener('click',()=>{
    document.querySelector('header').scrollIntoView({
        behavior: 'smooth'
    })
})
window.addEventListener('scroll', () => {
    
    if(this.scrollY <=350){
        scrollDown.style.fontSize = fontsize+this.scrollY*0.09 +'px' ;
        console.log('asdjhfsdhg');
    }
    if(this.scrollY > 129){
        slideFromLeft.style.marginLeft = `${this.scrollY*0.3}px`;
        line.style.width = `${160+this.scrollY*0.4}px`;
    }
    if(this.scrollY > 363){
        image.style.paddingRight = `${this.scrollY*0.3}px`;
    }
    if(this.scrollY >470){
        scrollUp.style.fontSize = scrollUp.getBoundingClientRect().top*0.06 +'px' ;
    } 
})