'use strict'
let folderTree = document.querySelector('.main_tree'); // основне дерево каталогів елемент HTML
let folderTreeArray = document.querySelector('.main_tree').children; // основне дерево каталогів елемент HTML
let arrowUp = 38; // код клавіші
let arrowDown = 40; // код клавіші
let enter = 13; // код клавіші
let index = 0; // індекс елемента масива
let array = folderTreeArray; // масив HTML елементів
let newArr = undefined; // проміжний масив
let prevIndex = 0; // попередній індекс
let prevArr = []; // попередній масив
let endOfTree = false; // кінець дерева каталогів
let popup = document.querySelector('.popup');
//масив обєктів

let folderArray = [{
        name: "Google",
        url: 'http://google.com.ua'
    },
    [{
            name: "Bootstrap",
            url: 'https://getbootstrap.com/'
        },
        [{
                name: "Youtube",
                url: 'https://www.youtube.com/'
            },
            {
                name: "Font Awesome!",
                url: 'https://fontawesome.com/?from=io'
            },
            {
                name: "Flaticon",
                url: 'https://www.flaticon.com/'
            },
            [{
                    name: "Iconscout",
                    url: 'https://iconscout.com/unicons#start'
                },
                {
                    name: "flexboxfroggy",
                    url: 'https://flexboxfroggy.com/#uk'
                },
                {
                    name: "GitHub",
                    url: 'https://github.com/'
                },
            ]
        ]
    ],
    {
        name: "wordpress",
        url: 'https://uk.wordpress.org/'
    },
    {
        name: "npmjs",
        url: 'https://www.npmjs.com/'
    },
    [{
            name: "GULP",
            url: 'https://www.npmjs.com/package/gulp'
        },
        {
            name: "Node",
            url: 'https://www.npmjs.com/package/node'
        },
        {
            name: "Pug",
            url: 'https://www.npmjs.com/package/pug'
        },

        [{
                name: "linker",
                url: 'https://www.npmjs.com/package/linker'
            },
            {
                name: "pug-parser",
                url: 'https://www.npmjs.com/package/pug-parser'
            },
            {
                name: "pug-error",
                url: 'https://www.npmjs.com/package/pug-error'
            },
        ]
    ],
    {
        name: "Gmail",
        url: 'http://gmail.com.ua'
    }
]
// кінець масива з обєктів

//рекурсивна функція наповнення DOM
function createTree(folderArray) {
    let arr = folderArray;
    let item = ''; //змінна для запису обєетів в HTML
    for (let i = 0; i < arr.length; i++) {
        // Якщо елемент не масив тоді передаємо його значення в змінну
        if (!Array.isArray(arr[i])) {
            item += `<li tabindex="0"><span></span> <a href="${arr[i].url}">${arr[i].name}</a></li> `;
            //якщо ні запускаєм рекурсію 
        } else {
            item += `<li tabindex="0" class="plus"><span></span> <a href="#">Folders Group</a><ul>${createTree(arr[i])}</ul></li>`;
        }
    }
    return item; // повернення готової HTML стрічки
}

folderTree.innerHTML = createTree(folderArray); // ініціалізація функції і заповнення дерева
// document.querySelector("h1").focus();

/** закриваєм попап якщо відкритий */
 function closePopup(){
    if(document.querySelector('.popup')){
        popup.style.display = 'none';
    }
 }
 // Функція задання фокуса елементу
 function setFocus(element) {
    element.focus();
    return;
}
setFocus(folderTree.children[0]); // задаємо фокус по замовчуванню для першого елемента групи

/** стилізація дерева, відкривання та закривання вкладенох списків з допомогою мишки */
folderTree.addEventListener('click', function (event) {
    /** закриваєм попап якщо відкритий */
        closePopup();
    if (event.target.parentElement.className === 'plus' && !event.target.parentElement.getAttribute('data-open')) {
        event.target.parentElement.classList.add('minus');
        event.target.parentElement.setAttribute('data-open', '1')
        array = event.target.parentElement.lastChild.children;
        index = 0;
        setFocus(array[index]);
    } else {
        event.target.parentElement.classList.remove('minus');
        event.target.parentElement.removeAttribute('data-open')
        array = event.target.parentElement.parentElement.children;
        for (let i = 0; i < array.length; i++) {
            if (event.target.parentElement === array[i]) {
                index = i;
                break
            }
        }
        setFocus(array[index]);
    }
})


function showHintMouseUver(){
    if(array[index].className == 'plus' && !array[index].getAttribute('data-opne')){
        let message ='';
        let elemArr = array[index].lastChild.children;
        let top = (array[index].offsetTop-40)+'px';
        let left = (array[index].offsetLeft+100)+'px';
        for(let i=0; i < elemArr.length; i++){
            message+=elemArr[i].innerText + '...';
            break
        }
        popup.innerHTML= `<p>${message}</p>`;
        popup.style.display = 'block';
        popup.style.top = top;
        popup.style.left = left;
    }else{
        closePopup();
    }
}

/* Задає підказки при подіях з клавіатури */
function showHint(){
    if(array[index].className == 'plus' && !array[index].getAttribute('data-opne')){
        let message ='';
        let elemArr = array[index].lastChild.children;
        let top = (array[index].offsetTop-40)+'px';
        let left = (array[index].offsetLeft+100)+'px';
        for(let i=0; i < elemArr.length; i++){
                message+=elemArr[i].innerText + '...';
             break
        }
        popup.innerHTML= `<p>${message}</p>`;
        popup.style.display = 'block';
        popup.style.top = top;
        popup.style.left = left;
    }else{
        if(document.querySelector('.popup')){
            popup.style.display = 'none';
        }
    }
}
/** Показуємо вкладений список елементів іпереходимо до першого його елемента */
function showNext() {
    if (array[index].className === '') {
        let url = array[index].children[1].getAttribute('href');
        window.location.href = url;
    }
    if (array[index].className === 'plus' && !array[index].getAttribute('data-open')) {
        array[index].classList.add('minus');
        array[index].setAttribute('data-open', '1');
        array = array[index].lastChild.children;
        index = 0;
        setFocus(array[index]);
    } else if (array[index].getAttribute('data-open')) {
        array[index].classList.remove('minus');
        array[index].removeAttribute('data-open');
    }
}
/** Кінець показу вкладеного списку елементів */

/** Повернення, передача фокуса на рівені вверх */
function returnPrevBranch() {
    let parentUl = array[index].parentElement.parentElement.parentElement;
    if (parentUl.tagName !== 'UL') return;
    if (endOfTree === true) {return} else {searchParentNext();}
    function searchParentNext() {
        let newArr = [];
        let newIndex = 0;
        if (parentUl.tagName === 'UL') {
            for (let i = 0; i < parentUl.children.length; i++) {
                if (parentUl.children[i].contains(array[index])) {
                    newIndex = i + 1;
                    newArr = parentUl.children;
                    break
                }
            }
            if (newArr[newIndex] !== undefined) {
                index = newIndex
                array = parentUl.children;
                setFocus(array[index])
            } else {
                for (let i = 0; i < 5; i++) {
                    if (folderTree.children[i].contains(array[index])) {
                        if (folderTree.children[i + 1] === undefined) {
                            endOfTree = true;
                            return
                        } else {
                            index = i + 1;
                            array = folderTree.children;
                            setFocus(array[index])
                        }
                        break
                    }
                }
            }
        } else return
    }
}
/** Кінеці повернення, передача фокуса на рівені вверх */
/** Повернення на рівень у верх по масиву елементів */
function showPevious() {
    let parentList = array[index].parentElement.parentElement.parentElement;
    // якщо ще не корінь дерева дізнаємось індекс батьківського елемента
    if (parentList !== undefined && parentList.tagName === 'UL') {
        for (let i = 0; i < parentList.children.length; i++) {
            if (parentList.children[i].contains(array[index])) {
                index = i;
                break;
            }
        }
        array = parentList.children;
        setFocus(array[index]);
        return
    } else {
        return
    };
}
/** Кінець повернення на рівень у верх по масиву елементів */

/** Зміна фокусу в середині масива елементів */
function changeFocus(event) {
    //рух у верх
    if (event.keyCode == arrowUp) {
        if (index === -1) {
            index = prevIndex;
            array = prevArr;
        }
        if (index <= 0) {
            showPevious();
            return
        } else {
            index--;
            array[index].focus();
        }
    }
    // рух у низ
    if (event.keyCode == arrowDown) {
        if (array[index] !== undefined) {
            if (array[index].hasAttribute('data-open')) {
                prevIndex = index;
                prevArr = array;
                array = array[index].lastChild.children;
                index = 0;
                setFocus(array[index]);
                return;
            }
        }
        index++;
        if (index >= array.length) {
            index = array.length - 1;
            returnPrevBranch();
            return
        }
        if (index < array.length) {
            setFocus(array[index])
        }
    }
}

folderTree.addEventListener('keydown', function (event) {
    endOfTree = false;
    /** закриваєм попап якщо відкритий */
    closePopup();
    if (event.keyCode === arrowUp || event.keyCode === arrowDown) {
        changeFocus(event) // навігація по дереву
        showHint();
    }
    if (event.keyCode === enter) {
        showNext(); // розгортання та згортання вкладених папок
    }
})
folderTree.addEventListener('mouseover', function (event) {
    if(event.target.parentElement.className =='plus'){
        let message = '';
        let top = (event.target.parentElement.offsetTop-40)+'px';
        let left = (event.target.parentElement.offsetLeft+100)+'px';
        let arr = event.target.parentElement.lastChild.children;
        for(let i=0; i < arr.length; i++){
            message+=arr[i].innerText + '...';
            break
        }
        popup.innerHTML= `<p>${message}</p>`;
        popup.style.display = 'block';
        popup.style.top = top;
        popup.style.left = left;
    }
})
folderTree.addEventListener('mouseout', function (event) {
    if(event.target.parentElement.className =='plus'){
        closePopup();
    }
})

let foldersGroupA = document.querySelectorAll("a[href='#']"); //отримуємо доступ до всіх сформованих групових папок
foldersGroupA.forEach(element => {
    element.addEventListener('click', function (e) { 
        e.preventDefault(); //
     }); 
});

document.addEventListener('keydown', function(e){
    if(e.keyCode === 40 || e.keyCode === 38){
        e.preventDefault(); // забираємо скролл
    }
})