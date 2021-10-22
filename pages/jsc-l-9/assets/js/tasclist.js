let cl = document.querySelector('.close');
let f1 = document.forms.f1;
let btn = f1.addLesson;
let text = f1.textField.value;
let err = document.querySelector('.error');
let err2 = document.querySelector('.error2');
let closeError = () => {
    err.style.display = 'none';
    err2.style.display = 'none';
}
document.querySelector('.leftSide').addEventListener('click', () => {
    let listLength = document.querySelector('.leftSide').children.length;
    if (event.target.tagName == "INPUT" && listLength > 2) {
        event.target.parentNode.remove();
    } else if(event.target.tagName == "INPUT"){
        err2.style.display = 'flex';
        event.target.checked = false;
    }
})

btn.addEventListener('click', () => {
    text = f1.textField.value;
    if (text !== '') {
        document.querySelector('.leftSide').innerHTML += `<label for="">
        <input type="checkbox" class="input">${text}
        </label>`;
        f1.textField.value = '';
    } else {
        err.style.display = 'flex';
    }
})
