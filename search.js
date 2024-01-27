document.addEventListener('DOMContentLoaded', function () {
    const swCharList = document.getElementById('liste_films');
    const nextPageButton = document.getElementById('next_page');
    const lastPageButton = document.getElementById('previous_page');
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    let currentPage = 1;

    function fetchData(page, search) {
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
        if (movies.Search) {
            movies.Search.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('sw_char');
                movieElement.innerHTML = `
                    <img src="${movie.Poster}" alt="Le Poster ne peux pas être charger">
                    <h3>${movie.Title}</h3>
                `;
                swCharList.appendChild(movieElement);
                nextPageButton.style.visibility = "visible";
                lastPageButton.style.visibility = "visible";
            })
        } else {
            swCharList.innerHTML = `
            <p>Aucun résultat</p>
            `;
            nextPageButton.style.visibility = "hidden";
            lastPageButton.style.visibility = "hidden";
        }
        document.getElementById('loader').style.display = "none";
    }

    function loadPreviousPage() {
        if (currentPage > 1) {
            currentPage--;
            fetchData(currentPage, searchInput.value)
                .then(displayMovies);
        }
    }

    function loadNextPage() {
        currentPage++;
        fetchData(currentPage, searchInput.value)
            .then(displayMovies);
    }

    function recupSearch() {
        currentPage = 1;
        fetchData(currentPage, searchInput.value)
            .then(displayMovies);
            
    }

    loadNextPage();

    lastPageButton.addEventListener('click', loadPreviousPage);
    nextPageButton.addEventListener('click', loadNextPage);
    searchButton.addEventListener('click', recupSearch);
});