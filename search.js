document.addEventListener('DOMContentLoaded', function () {
    const swCharList = document.getElementById('sw_char_list');
    const nextPageButton = document.getElementById('ex_03_next_page');
    const lastPageButton = document.getElementById('ex_03_last_page');
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    let currentPage = 1;

    function fetchOmdbData(page, search) {
        document.getElementById('loader').style.display = "block";
        swCharList.innerHTML = '';

        let apiUrl = `http://www.omdbapi.com/?page=${page}&apikey=c5ea3601`;

        if (search) {
            apiUrl += `&s=${search}`;
        }

        return fetch(apiUrl)
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
            fetchOmdbData(currentPage, searchInput.value)
                .then(displayMovies);
        }
    }

    function loadNextPage() {
        currentPage++;
        fetchOmdbData(currentPage, searchInput.value)
            .then(displayMovies);
    }

    function recupSearch() {
        currentPage = 1;
        fetchOmdbData(currentPage, searchInput.value)
            .then(displayMovies);
    }

    loadNextPage();

    lastPageButton.addEventListener('click', loadPreviousPage);
    nextPageButton.addEventListener('click', loadNextPage);
    searchButton.addEventListener('click', recupSearch);
});
