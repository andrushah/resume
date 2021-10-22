// function of short access to selectors
const getS = selector => document.querySelector(selector);

/* Start functions show add blok */
getS('.btnEdit').onclick = function () {
    getS('.editBlock').classList.add('show');
    getS('.styleBlock').classList.remove('show');
    getS('.editArea').value = getS('.topBlock').innerHTML;
}
/* End functions show/hide add blok */

/* Function save text from textarea */
getS('.btnSave').onclick = function () {
    getS('.editBlock').classList.remove('show');
    getS('.topBlock').innerHTML = getS('.editArea').value;
}
/* End function save text from textarea */

/* Start functions show style blok  */
getS('.btnStyle').onclick = function () {
    getS('.styleBlock').classList.add('show');
    getS('.editBlock').classList.remove('show');
}
/* End functions show/hide add blok */

/* Set font size*/
function fontSize() {
    getS('.topBlock').style.fontSize = event.target.value;
}
/* End set font size  */

/* Set font Family*/
let fF = document.getElementById('fontFamily'); // get fontFamyly form
fF.onchange = function () {
    getS('.topBlock').style.fontFamily = this.value;
}
/* End seting font Family*/

/* Programm creating bacground-color/font-color for blocks*/
let colors = ['red', 'green', 'blue', 'yellow', 'pink', 'gray', 'black', 'white', 'deeppink'];
for (let i = 0; i < getS('.colors').children.length; i++) {
    getS('.colors').children[i].style.backgroundColor = colors[i];
    getS('.colorsBg').children[i].style.backgroundColor = colors[i];

    getS('.colors').children[i].onclick = function () { // передача кольору для іншого елемента
        getS('.topBlock').style.color = this.style.backgroundColor;
        getS('.colors').classList.add('hide');
    }
    getS('.colorsBg').children[i].onclick = function () { // передача кольору для іншого елемента
        getS('.topBlock').style.backgroundColor = this.style.backgroundColor;
        getS('.colorsBg').classList.add('hide');
    }
}
/* End programm creating bacground color/ font color for blocks*/

/* Set color for text and background*/
getS('.btnTextColor').onclick = function () {
    getS('.colors').classList.remove('hide');
    getS('.colorsBg').classList.add('hide');
}
getS('.btnBgColor').onclick = function () {
    getS('.colorsBg').classList.remove('hide');
    getS('.colors').classList.add('hide');
}
/* End set color for text and background*/

/* start functions of text styling bold/cursive */
function fontWeight() {
    event.target.checked ? getS('.topBlock').classList.add('bold') : getS('.topBlock').classList.remove('bold');
}

function fontCursive() {
    event.target.checked ? getS('.topBlock').classList.add('cursive') : getS('.topBlock').classList.remove('cursive');
}
/* End functions for text styling bold/cursive */

/* Show Add blok and hide main block */
getS('.btnAdd').onclick = function () {
    getS('.first').classList.remove('show');
    getS('.second').classList.remove('hide');
}
/* End Showing Add blok and hide main block */

/* Start function creating list */
const list = document.forms.formList;
const selectForm = document.forms.select;

getS('.create').onclick = function () {
    const countLi = list.count.value;
    const typeLi = list.type.value;
    getS('.editArea').value += `<ul style = "list-style-tupe: ${typeLi};">`;
    for (let i = 0; i < countLi; i++) {
        getS('.editArea').value += `<li>Item ${i+1}</li>`;
    }
    getS('.editArea').value += '</ul>';
    getS('.second').classList.add('hide');
    getS('.first').classList.add('show');
    getS('.creteList').classList.add('hide');
    selectForm.shoose[1].checked = false;

}
/* end function creating list */

/* show hide table/list blocks */
function showList() {
    if (event.target.checked) {
        getS('.creteList').classList.remove('hide');
        getS('.tableForm').classList.add('hide');
    }
}

function showTable() {
    if (event.target.checked) {
        getS('.tableForm').classList.remove('hide');
        getS('.creteList').classList.add('hide');
    }
}
/* end show hide table/list blocks */

/* Addition table block to text area*/
const tableForm = document.forms.tableForm;
tableForm.createTable.onclick = function () {
    let trCount = tableForm.trCount.value;
    let tdCount = tableForm.tdCount.value;
    let tdWidth = tableForm.tdWidth.value;
    let tdHeight = tableForm.tdHeight.value;
    let bdrWidth = tableForm.bdrWidth.value;
    let bdrType = tableForm.bdrType.value;
    let bdrColor = tableForm.bdrColor.value;
    getS('.editArea').value += `<table class="tableForm">`;
    for (let i = 0; i < trCount; i++) {
        getS('.editArea').value += `<tr>`;
        for (j = 0; j < tdCount; j++) {
            getS('.editArea').value += `<td style="width:${tdWidth}px; height: ${tdHeight}px; border: ${bdrWidth}px ${bdrType} ${bdrColor}">TD</td>`
        }
        getS('.editArea').value += `</tr>`;
    }
    getS('.editArea').value += `</table>`;
    getS('.second').classList.add('hide');
    getS('.first').classList.add('show');
    getS('.tableForm').classList.add('hide');
    selectForm.shoose[0].checked = false;
}
/* End addition table to text area*/