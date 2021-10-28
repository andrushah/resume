let searchField = document.querySelector('#searchField'); // доступ до даних пошукового запиту
let clearField = document.querySelector('.clear-search-field'); // доступ до кнопки очистки поля пошуку
let postsArea = document.querySelector('.posts'); // доступ до зони розміщення постів
let detailsPostArea = document.querySelector('.description-wrapper');

clearField.addEventListener('click', function () {
    searchField.value = ''; // очистка поля пошуку
})
// скидання стилів і приховування віна детальніше
document.querySelector('.details-post-bottom').addEventListener('click', function () {
    document.querySelector('.post-details').animate({opacity: 0},{fill: 'forwards'});
    document.querySelector('.post-details').style.display = 'none';
})
// пошук при натисканні клавіші ентер
searchField.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        getPosters()
    }
})

// ф-ція отримання всіх постів
async function getPosters() {
    let search = '';
    let posts = [];
    if (searchField.value !== '') {
        search = searchField.value;
        let url = `http://www.omdbapi.com/?s=${search}&apikey=d971db86`;
        const response = await fetch(url);
        const data = await response.json();
        // перевірка наявності постів на сервері
        if (data.Response === "True") {
            posts = data.Search;
            postsArea.innerHTML = ''; // очистка блоки для постів
            createPosts(posts); // створення постів
            showPosts(); // стилізація для постів
        } else {
            // якщо пукового запиту немає тоді
            postsArea.style.opacity = 1;
            postsArea.innerHTML = `<h3>По запиту "${search}": Нічого не знайдено...</h3>`;
        }
    } else {
        event.preventDefault();
    }
}

//ф-ція створення постів
function createPosts(posts) {

    if (posts.length) {
        for (let i = 0; i < posts.length; i++) {
            for (const key in posts[i]) {
                //перевірка наявності постера і даних в пості
                if (posts[i].Poster == 'N/A') {
                    posts[i].Poster = './assets/img/404.jpg'
                }
                if (posts[i][key] == 'N/A') {
                    posts[i][key] = 'Не вказано';
                }
            }
            // запис поста  в HTML
            postsArea.innerHTML += `
            <div class="post-box">
                <img src="${posts[i].Poster}" alt="movie">
                <h1>${posts[i].Title}</h1>
                <p>${posts[i].Type}</p>
                <p>${posts[i].Year}</p>
                <button class="btn btn-success" data-post-id="${posts[i].imdbID}" onclick="showDetails(event)">More details</button>
            </div>`;
        }
    } else {
        postsArea.innerHTML = '<h3>Нічого не знайдено</h3>'
    }
}
// ф-ція стилізованого показу постів
function showPosts(){
    if( postsArea.style.display =='flex'){
        postsArea.animate({
            opacity: 0
        },{fill: 'forwards', duration: 0})
    }
    postsArea.style.display ='flex';
    postsArea.animate({
        opacity: 1
    },{fill: 'forwards', duration: 1000})
}

// ф-ція показу блоку детальніше для поста
async function showDetails(event) {
    detailsPostArea.innerHTML = ''; // очистка даних длока детальніше
    let post;
    let postID = event.target.getAttribute('data-post-id');
    let url = `http://www.omdbapi.com/?i=${postID}&apikey=d971db86`;
    let response = await fetch(url);
    let data = await response.json();
    post = data;
    createDetails(post); 
    //стильзація показу поста
    let det = document.querySelector('.post-details');
    det.style.display = 'flex';
    det.animate({
        opacity: 1
    },{
        fill : 'forwards',
        duration: 300 
    })
}

// створення поста
function createDetails(post) {
    let rating = '';
    if (post) {
        // перевірка наявності рейтингу в пості
        if (post.Ratings.length) {
            for (let i = 0; i < post.Ratings.length; i++) {
                rating += `${post.Ratings[i].Source} - ${post.Ratings[i].Value}, `;
            }
        }else{
            rating = 'Не вказано';
        }
        // перевірка коректності даних з сервера 
        for (const key in post) {
            if (post.Poster == 'N/A') {
                post.Poster = './assets/img/404.jpg'
            }
            if (post[key] == 'N/A') {
                post[key] = 'Не вказано';
            }
        }
        // запист поста в html
        detailsPostArea.innerHTML = `
                <img src="${post.Poster}"
                    alt=" movie">
                <div class="description">
                    <h1>${post.Title}</h1>
                    <span class="post-info">${post.Genre} </span>
                    <p class="post-text">
                    ${post.Plot}
                    </p>
                    <div class="authors"><strong>Written by: </strong> ${post.Writer}</div>
                    <div class="directed"><strong>Directed by: </strong>${post.Director}</div>
                    <div class="starring"><strong>Starring: </strong>${post.Actors}</div>
                    <div class="box-office"><strong>BoxOffice: </strong>${post.BoxOffice}</div>
                    <div class="awards"><strong>Awards: </strong>${post.Awards}</div>
                    <div class="ratings"><strong>Ratings: </strong>${rating}</div>
    `;
    }
    else{
        alert ('Sorry something wrong! Your query is not funded');
    }
}

