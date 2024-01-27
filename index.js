document.addEventListener('DOMContentLoaded', async () => {
    const moviesContainer = document.getElementById('moviesContainer');

    async function getMovieData(title) {
        const apiUrl = `http://www.omdbapi.com/?apikey=c5ea3601&t=${title}&y=2024`;
        const response = await fetch(apiUrl);
        return response.json();
    }

    function addMovieToContainer(movieData) {
        const poster = document.createElement('div');
        poster.className = 'poster';
        poster.innerHTML = `
            <img src="${movieData.Poster}" alt="poster1">
            <div class="poster_description">
                <p>${movieData.Plot}</p>
                <div class="en_savoir_plus">
                <a href="#">En savoir plus</a>
                </div>
            </div>
            <p>${movieData.Title}</p>
        `;
        moviesContainer.appendChild(poster);
    }

    const movieTitles = ['Gladiator 2', 'Furiosa: A Mad Max Saga', 'Civil War', 'Godzilla x Kong', 'road house'];

    for (const title of movieTitles) {
        const movieData = await getMovieData(title);
        if (movieData) {
            addMovieToContainer(movieData);
        }
    }
});