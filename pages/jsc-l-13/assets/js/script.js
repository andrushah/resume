let sel = selector => document.querySelector(selector);
let form = document.forms.contact;
let mailRegExp = false;
let passRegExp = false;
let nameRegExp = false;
let firstName = false;
let lastName = false;
let password = false;
/* Function valideta name/lastName fields */
form.firstName.oninput =  function(){
    let parrent = this.parentElement;
    firstName = /^[a-zA-Z]{3,20}$/.test(this.value);
    form.check.checked = false;
    form.signUp.disabled = true;
    if(firstName){
        parrent.classList.add('successField');
        parrent.classList.remove('error');
        
    }else{
        parrent.classList.remove('successField');
        parrent.classList.add('error');
    }
}
form.lastName.oninput = function(){
    let parrent = this.parentElement;
    form.check.checked = false;
    form.signUp.disabled = true;
    lastName = /^[a-zA-Z]{3,20}$/.test(this.value);
    if(lastName){
        parrent.classList.add('successField');
        parrent.classList.remove('error');
    }else{
        parrent.classList.remove('successField');
        parrent.classList.add('error');
    }
}
/* End function valideta name/lastName fields */

form.email.oninput = function(){
    let parrent = this.parentElement;
    form.check.checked = false;
    form.signUp.disabled = true;
    mailRegExp = /^[a-zA-Z0-9\.\-]+@[a-zA-Z]+\.[a-zA-Z\.]*\w+$/.test(this.value);
    if(mailRegExp){
        parrent.classList.add('successField');
        parrent.classList.remove('error');
    }else{
        parrent.classList.remove('successField');
        parrent.classList.add('error');
    }
}

form.password.oninput = function(){
    let parrent = this.parentElement;
    form.check.checked = false;
    form.signUp.disabled = true;
    passRegExp = /^[a-zA-Z0-9]{8,15}$/.test(this.value);
    if(passRegExp){
        parrent.classList.add('successField');
        parrent.classList.remove('error');
    }else{
        parrent.classList.remove('successField');
        parrent.classList.add('error');
    }
}
form.check.onclick = function(){
    if(firstName && lastName && mailRegExp && passRegExp && this.checked){
        form.signUp.disabled = false;
    }else{
        form.signUp.disabled = true;
    }
}
form.signUp.onclick = function(){
    event.preventDefault();
    document.querySelector('.success').classList.add('showSuccess');
    let parentList = document.getElementsByClassName('placeholder');
    for (const iterator of parentList) {
        iterator.classList.remove('successField')
    };
    form.reset();
}
document.querySelector('.closeSuccess').onclick = function(){
    document.querySelector('.success').classList.remove('showSuccess');
    form.signUp.disabled = true;
}
