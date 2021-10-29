window.addEventListener('keydown', function (event) {
    let keyboard = document.querySelectorAll('.row>li');
    let key = event.key;
    let screen = document.querySelector('.screen');
    let unsupportKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"]; //set of unsupported keys
    for (i = 0; i < unsupportKeys.length; i++) {
        if (event.key == unsupportKeys[i]) {
            return;
        }
    }

    if (event.key == "Tab") {
        event.preventDefault();
        screen.innerHTML += '&emsp;'; // 4 spaces
    } else if (key == ' ') {
        event.preventDefault();
        screen.innerHTML += key;
    } else if (event.key == 'Backspace') {
        screen.innerHTML = screen.innerHTML.substring(0, screen.innerHTML.length - 1);
    } else if (event.key == 'Enter') {
        screen.innerHTML += '<br>'
    } else if (event.key == 'Shift' || event.key == 'MetaShift' || event.key == 'AltShift' || event.key == 'Alt' || event.key == 'Control' || event.key == 'Meta' || event.key == 'CapsLock') {

    } else {
        screen.innerHTML += event.key;
    }
    for (let i = 0; i < keyboard.length; i++) {
        if (keyboard[i].textContent == key || keyboard[i].textContent == key.toLowerCase()) {
            keyboard[i].classList.add('activeKey');
        }
    }
})
window.addEventListener('keyup', function () {
    let keyboard = document.querySelectorAll('.row li');
    let key = event.key;
    for (let i = 0; i < keyboard.length; i++) {
        if (keyboard[i].textContent == key || keyboard[i].textContent == key.toLowerCase()) {
            keyboard[i].classList.remove('activeKey');
        }
    }
})
