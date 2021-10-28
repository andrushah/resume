let nameRegExp = /[a-zа-я]{2,}/i; // шаблош полів імя прізвище
let passRegExp = /[\w\-\_]{6,12}/i; // шаблош поля пароль
let emailRegExp = /[a-z0-9]{2,}@[a-z]{2,}\.[a-z]{2,}/i; // шаблош поля email


let firstName = $('#name'); // доступ до dom елемента
let lastName = $('#last-name'); // доступ до dom елемента
let email = $('#user-email'); // доступ до dom елемента
let password = $('#password'); // доступ до dom елемента
let user = {};
let notValide = false; // для визначення валідації всіх полів форм
let canSend = false; // для перевірки перед створенням користувача

// перехід на форму входу
$('#sign-in').click(function (event) {
    event.preventDefault();
    clearFormFields(); // очистка полів форми
    remAdditionalClasses(); // видалення додаткових класів
    showSignIn(); // перхід на саму форму
});
// перехід на форму реєстрації нового корисувачи
$('#sign-up, #sign-up-profile-btn').click(function (event) {
    event.preventDefault();
    clearFormFields(); // очистка полів форми
    remAdditionalClasses(); // видалення додаткових класів
    showSignUp(); // перхід на саму форму
});

function clearFormFields() {
    $('form input').val(''); // очистка полів
}

function showSignUp() {
    $('.sign-up').show();
    $('.sign-in, .success').hide();
}

function showSignIn() {
    $('.sign-in').show();
    $('.sign-up, .success').hide();
}
// перхід в профайл
function showProfile() {
    $('.success').show();
    $('.sign-up, .sign-in').hide();
    clearFormFields();
}

function remAdditionalClasses() {
    $('.input-field').removeClass('valid');
    $('.input-field').removeClass('not-valid');
    $('.input-field').removeClass('incorrect');
    $('.empty').removeClass('empty')
}




$('#create-user').on('click', function () {

    if (nameRegExp.test(firstName.val()) && nameRegExp.test(lastName.val()) && emailRegExp.test(email.val()) && passRegExp.test(password.val())) {
        remAdditionalClasses();
        canSend = true; // створення користувача дозволено
    } else {
        notValide = true; // регулярні вирази не відповідають значенням
        $('.sign-up form input').trigger('input'); // ініціалізація подій oninput для валідації полів форм
        canSend = false; // заборона на створення користувачи
    };
    if (canSend) {
        if (createUser()) {
            clearFormFields();
        }
    }
})

// Функція валідації плів форми
function validate(regExp, target, str) {
    if (notValide) {
        if (regExp.test(str)) {
            target.parent().addClass('valid');
            target.parent().removeClass('not-valid');
            canSend = true;
        } else {
            target.parent().addClass('not-valid');
            target.parent().removeClass('valid');
            canSend = false;
        }
    }
}
// призначення валідачії для полів форма на подію oninput
firstName.on('input', function inp() {
    validate(nameRegExp, $(this), $(this).val());
});
lastName.on('input', function () {
    validate(nameRegExp, $(this), $(this).val());
});
password.on('input', function () {
    validate(passRegExp, $(this), $(this).val());
});
email.on('input', function () {
    validate(emailRegExp, $(this), $(this).val());
    $(this).parent().removeClass('error-instead-user');
});

// Функція створення користувача
function createUser() {
    let userArray = [];
    let userInstead = false;
    //зчитування даних форми в обєкт
    let user = {
        firstName: firstName.val(),
        lastName: lastName.val(),
        email: email.val(),
        password: password.val()
    }
    // перевірка на наявність запису в localStorage
    if (!localStorage.getItem('userArray')) {
        userArray.push(user);
        localStorage.setItem('userArray', JSON.stringify(userArray));
        return true;
    }
    //перевірка на відповідність запису до масива
    else if (Array.isArray(JSON.parse(localStorage.getItem('userArray')))) {
        let currentArray = JSON.parse(localStorage.getItem('userArray'));
        for (let i = 0; i < currentArray.length; i++) {
            // перевірка унікальності email
            if (currentArray[i].email == user.email) {
                userInstead = true; // наявність email в localStorage
                email.parent().addClass('error-instead-user'); // призначення класу помилки для поля
                break;
            }
        }
        // Якщо емеіл унікальний тоді додаємо користувача в поточний масив
        if (!userInstead) {
            currentArray.push(user);
            localStorage.setItem('userArray', JSON.stringify(currentArray));
            return true;
        }
        // Якщо запис в localstorage не відповідає масиву перезаписуємо запис в масив
    } else {
        userArray.push(user);
        localStorage.setItem('userArray', JSON.stringify(userArray));
        return true;
    }
}

// Вхід користувача в профайл
$('#sign-up-btn').on('click', function () {
    signIn();
});

function signIn() {
    // зчитування даних входу в обєкт
    let newUser = {
        email: $('#current-email').val(),
        password: $('#current-password').val()
    }
    let profileUserData = {}; // сховище для збереження даних які попадають в профайл
    // перевірка наявності даних в сховищі
    if (!localStorage.length && !localStorage.getItem('userArray')) {
        $('.sign-in .input-field').addClass('empty');
        return false;
    } else {
        let jsonArr = JSON.parse(localStorage.getItem('userArray'));
        let isUser = false; // для перевірки наявності користувачи в сховищі
        for (let i = 0; i < jsonArr.length; i++) {
            // перевірка введених даних для доступу в профайл
            if (jsonArr[i].email == newUser.email && jsonArr[i].password == newUser.password) {
                profileUserData = {
                    firstName: jsonArr[i].firstName,
                    lastName: jsonArr[i].lastName,
                    email: jsonArr[i].email
                }
                isUser = true; // користувач є доступ дозволено
                break
            }
        }
        if (isUser) {
            $('.sign-in .input-field').removeClass('incorrect');
            clearFormFields();
            showProfile();
            $('.profile-box h1').text(`${profileUserData.firstName} ${profileUserData.lastName}`); // передача даних в профайл
            $('.profile-box span').text(`${profileUserData.email}`); // передача даних в профайл
        } else {
            $('.sign-in .input-field').addClass('incorrect');
        }
    }
}
