// Завдання 5 пошук неправильних слів
let wwTrext = document.getElementById('wwTrext') as HTMLInputElement; //Доступ до поля вводу нових слів
let wrongWords = document.querySelector('.wrong-words') as HTMLDivElement; // Достуд до елемента куди будуть записуватись нові слова
let textArea = document.querySelector('#textarea') as HTMLTextAreaElement;// Доступ до текстового поля що буде фільтруватися
let addBtn = document.querySelector('#addBtn') as HTMLButtonElement; // Доступ до кнопки добавити
let resetBtn = document.querySelector('#resetBtn') as HTMLButtonElement; // Кнопка RESET
let censorBtn = document.querySelector('#censoreBtn') as HTMLButtonElement; // Кнопка Censor
let ivanidField:boolean = false; // змінна для валідації 
let ivanidTextArea:boolean = false; // змінна для валідації 

// ф-ція отримання списку неправильних слів
function getWrongWords() {
    let str = wrongWords.textContent;
    let word: string = '';
    let wordsList: Array < string > = [];
    if (str.length) {
        for (let i = 0; i < str.length; i++) {
            // перевірка чи не кінеці слова
            if (str.charAt(i) != ',' && str.charAt(i + 1) != '&nbsp;') {
                word += str.charAt(i);
            } else {
                i++; // пропускаємо наступний пробіл
                if (wordsList.length) {
                    // первірка унікальності слова(чи не повторяється)
                    if (wordsList.includes(word)) word = '';
                }
                // якщо не повторяється записуємо в масив
                if (word != '') {
                    wordsList.push(word);
                    word = '';
                }
            }
            // запис останнього слова в масив
            if (i == str.length - 1) {
                if (!wordsList.includes(word)) wordsList.push(word);
            }
        }
        return wordsList; // повернення заповненого масиву
    } else {
        console.log('Wrong words list is empty');
        return wordsList; // повернення порожнього масиву
    }
}

// Скидання слів
function resetWrongWords() {
    wrongWords.innerHTML = '';
}
//додавання дових слів 
function addWrongWords(): void {
    if(wwTrext.value == ''){
        wwTrext.classList.add('invalide');
        ivanidField = true;
    }
    else if (!wrongWords.textContent.length && wwTrext.value != '') {
        wrongWords.innerHTML += wwTrext.value;
        wwTrext.classList.remove('invalide');
        wwTrext.value = '';
    } else {
        wrongWords.innerHTML += `, ${wwTrext.value}`;
        wwTrext.classList.remove('invalide');
        wwTrext.value = '';

    }
}

// перевірка на наявність неправильних слів у введеному полі текст(Censore)
function checkWords() {
    let arr= getWrongWords();
    let text = textArea.value;
    if (text.length && arr.length) {
            arr.forEach(element => {
                if (text.includes(element)) {
                    let mark = '*';
                    for(let i = 0; i < text.length; i++){
                        text = text.replace(element, mark.repeat(element.length));
                    }  
                }
            });
        textArea.value = text; // запис даних в HTML
        textArea.classList.add('success') //додавання класу після успішного виконання
    }else if(!textArea.value.length){
        textArea.classList.add('invalide'); //додавання класу після НЕ успішного виконання
        ivanidTextArea = true //запус процедури валідаціЇ на подію онінпут цього поля
    }
}
// валідація поля на подію ONINPUT
wwTrext.addEventListener('input', function(){
    if(ivanidField){
        this.value.length < 1 ?  this.classList.add('invalide'): this.classList.remove('invalide'); ivanidField= false;
    }
})
// валідація поля на подію ONINPUT
textArea.addEventListener('input', function(){
    if(ivanidTextArea){
        this.value.length < 1 ?  this.classList.add('invalide'): this.classList.remove('invalide'); ivanidTextArea= false;
    }
    this.classList.remove('success');
})
