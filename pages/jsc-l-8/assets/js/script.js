let form = document.forms.account;
let terms = form.terms;

form.terms.addEventListener('click', () => {
    form.send.disabled = terms.checked ?
        false : true;
})


function onSubmit() {
    event.preventDefault();
    let emptyField = 0;
    for (i=0; i<form.elements.length; i++){
        if(form[i].value ==''){
            emptyField += 1; 
            form[i].classList.add('error');
            form[i].focus();
        }
    }
    form.addEventListener('input',()=>{
        event.target.classList.remove('error');
    })
    let name = form.firstName.value;
    let secondName = form.secondName.value;
    let email = form.email.value;
    let male = form[3].checked;
    let position = form.position.value;
    if(emptyField < 1){ //провірка на порожні поля
        if (!form.send.disabled) {
            if (male) {
                document.getElementById('sex').src = './assets/img/male.png';
            } else {
                document.getElementById('sex').src = './assets/img/female.png';
            }
            document.querySelector('.success .user h1').innerHTML = name + ' ' + secondName;
            document.querySelector('.success .user p').innerHTML = email;
            document.querySelector('.success .user span').innerHTML = position;
            form.send.disabled = true;
    
        }
        form.reset();
        document.querySelector('.registration').style.display = 'none';
        document.querySelector('.success').style.display = 'block';
    } else{
        alert ('введено не коректрі дані');
    }
    
}
document.getElementById('signOut').addEventListener('click', function () {
    document.querySelector('.registration').style.display = 'block';
    document.querySelector('.success').style.display = 'none';
})
