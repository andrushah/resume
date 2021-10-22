let form = document.forms.authorization;
let log = form.login.value;
let pass = form.password.value;
let mail = form.email.value;
let addBtn = form.addButton;
let usersInfo = document.querySelectorAll('.usersInfo>tbody>tr');
let indexTr = usersInfo.length;
let current = null;
let loginRegExp = /[a-zA-Z]{2,16}/.test(form.login.value);
let passwordRegExp = /[a-zA-z0-9\.\_\-]{4,16}/.test(form.password.value);
let emailRegExp = /[a-zA-Z0-9\.\_\-]*@[a-zA-z\.]+\.\w+$/.test(form.email.value);

function addEditUser() {
    // set regExp
    let loginRegExp = /[a-zA-Z]{2,16}/.test(form.login.value);
    let passwordRegExp = /[a-zA-z0-9\.\_\-]{4,16}/.test(form.password.value);
    let emailRegExp = /[a-zA-Z0-9\.\_\-]*@[a-zA-z\.]+\.\w+$/.test(form.email.value);
    let newArray = [];
    !loginRegExp ? form.login.classList.add('err') : form.login.classList.remove('err');
    !passwordRegExp ? form.password.classList.add('err') : form.password.classList.remove('err');
    !emailRegExp ? form.email.classList.add('err') : form.email.classList.remove('err');
    //get object from html form
    let user = {
        login: form.login.value,
        password: form.password.value,
        email: form.email.value,
        edit: '<button class="edit">Edit</button>',
        remove: '<button class="delete">Delete</button>'
    }
    // validete regExp

    if (loginRegExp && passwordRegExp && emailRegExp) {
        for (const key in user) {
            newArray.push(user[key]);
        }
        if (addBtn.value === "Add user") {
            render(newArray);
        } else if (addBtn.value === "Save") {
            editUser(newArray);
        }
    }
}

function render(arr) {
    indexTr++;
    let trStr = [];
    let users = document.querySelector('.tbody').children;
    for (const iterator of arr) {
        trStr += `<td>${iterator}</td>`;
    }
    document.querySelector('.tbody').innerHTML += `<tr><td>${indexTr}</td>${trStr}</tr>`;
    form.login.value = '';
    form.password.value = '';
    form.email.value = '';
}

function editUser(newArr) {
    let users = new Array(document.querySelectorAll('.tbody>tr'));
    let trStr = '';
    for (const iterator of newArr) {
        trStr += `<td>${iterator}</td>`;
    }
    document.querySelector('.tbody').children[current].innerHTML = `<td>${current+1}</td>${trStr}`;
    document.querySelector('.tbody').children[current].classList.remove('currentString');
    current = null;
    form.login.value = '';
    form.password.value = '';
    form.email.value = '';
    form.addButton.value = 'Add user';
    
}
document.querySelector('.tbody').addEventListener('click', function (e) {
    let users = this.children;
    let newArr = [];
    current = null;
    // delete processin
    if (e.target.className === 'delete') {
        for (let i = 0; i < users.length; i++) { //get current tr index
            if (e.target.parentElement.parentElement === users[i]) {
                current = i;
            }
        }
        for (const key of users) {
            newArr.push(key);
        }
        this.innerHTML = '';
        newArr.splice(current, 1);
        for (i = 0; i < newArr.length; i++) {
            newArr[i].children[0].innerHTML = i + 1;
            this.innerHTML += newArr[i].innerHTML;
        }
        indexTr = users.length;
    }
    // editing processin
    if (e.target.className === 'edit') {
        let editArr = [];
        for (let i = 0; i < users.length; i++) { //get current tr index
            if (e.target.parentElement.parentElement === users[i]) {
                current = i;
                editArr = users[i];
            }
        }
        form.login.value = editArr.children[1].textContent;
        form.password.value = editArr.children[2].textContent;
        form.email.value = editArr.children[3].textContent;
        addBtn.value = "Save";
        let editButtons = document.querySelectorAll('button');
        for (const iterator of editButtons) {
            if(e.target == iterator ){
                iterator.classList.add('currentString');
            }else if(e.target !== iterator){
                iterator.classList.remove('currentString');

            }
        }
    }
})
document.querySelectorAll('input')[0].addEventListener('input', function () {
        loginRegExp = /[a-zA-Z]{2,16}/.test(this.value);
        !loginRegExp ? this.classList.add('err') : this.classList.remove('err');
    }
)
document.querySelectorAll('input')[1].addEventListener('input', function () {
    passwordRegExp = /[a-zA-z0-9\.\_\-]{4,16}/.test(this.value);
    !passwordRegExp ? this.classList.add('err') : this.classList.remove('err');
}
)
document.querySelectorAll('input')[2].addEventListener('input', function () {
    emailRegExp = /[a-zA-Z0-9\.\_\-]*@[a-zA-z\.]+\.\w+$/.test(this.value);
    !emailRegExp ? this.classList.add('err') : this.classList.remove('err');
}
)