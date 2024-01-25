document.addEventListener('DOMContentLoaded', function () {
    const swCharList = document.getElementById('sw_char_list');
    const nextPageButton = document.getElementById('ex_03_next_page');
    const lastPageButton = document.getElementById('ex_03_last_page');
    let currentPage = 0;

    function fetchOmdbData(page) {
        document.getElementById('loader').style.display = "block";
        swCharList.innerHTML = '';
        return fetch(`http://www.omdbapi.com/?s=star wars&page=${page}&apikey=c5ea3601`)
            .then(response => response.json());
    }

    function displayMovies(movies) {
        swCharList.innerHTML = '';
        movies.Search.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('sw_char');
            
            movieElement.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
            `;
            
            swCharList.appendChild(movieElement);
        });
        document.getElementById('loader').style.display = "none";
    }

    function loadPreviousPage() {
        if (currentPage > 1) {
            currentPage--;
            fetchOmdbData(currentPage)
                .then(displayMovies);
        }
    }

    function loadNextPage() {
        currentPage++;
        fetchOmdbData(currentPage)
            .then(displayMovies);
    }

    loadNextPage();

    lastPageButton.addEventListener('click', loadPreviousPage);
    nextPageButton.addEventListener('click', loadNextPage);
});
