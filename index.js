document.addEventListener('DOMContentLoaded', async () => {
    const caseContainer = document.getElementById('case_container');

    async function getMovieData(title) {
        const apiUrl = `http://www.omdbapi.com/?apikey=c5ea3601&t=${title}&y=2024`;
        const response = await fetch(apiUrl);
        return response.json();
    }

    function addMovieToContainer(movieData) {
        const poster = document.createElement('div');
        poster.className = 'case';
        poster.innerHTML = `
            <img src="${movieData.Poster}" alt="poster" class="movie-poster">
            <div class="poster-description">
                <p>${movieData.Plot}</p>
                <div class="en-savoir-plus">
                <a href="movie.html?id=${movieData.imdbID}">En savoir plus</a>
                </div>
            </div>
            <p class='movie-title'>${movieData.Title}</p>
        `;
        caseContainer.appendChild(poster);
    }

    const movieTitles = ['Blade', 'Furiosa: A Mad Max Saga', 'Civil War', 'Godzilla x Kong'];

    for (const title of movieTitles) {
        const movieData = await getMovieData(title);
        if (movieData) {
            addMovieToContainer(movieData);
        }
    }

    

});