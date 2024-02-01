document.addEventListener('DOMContentLoaded', async () => {
    const caseContainer = document.getElementById('case_container');

    async function getMovieData(title) {
        const apiUrl = `http://www.omdbapi.com/?apikey=c5ea3601&t=${title}&y=2024`;
        const response = await fetch(apiUrl);
        return response.json();
    }

    function addMovieToContainer(movieData, isShowMore = false) {
        const poster = document.createElement('div');
        poster.className = 'case';

        // Ajoutez une classe spécifique pour les éléments "Show more"
        if (isShowMore) {
            poster.classList.add('show-more');
        }

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

    const button = document.getElementById('show');
    const movieTitles_show_more = ['The Beekeeper', 'Badland Hunters', 'Kingdom of the Planet of the Apes', 'Horizon'];

    const showmore = async () => {
        if (button.innerHTML === 'Show more') {
            for (const titles of movieTitles_show_more) {
                const movieDatas = await getMovieData(titles);
                if (movieDatas) {
                    addMovieToContainer(movieDatas, true);
                }
            }
            button.innerHTML = 'Show less';
        } else if (button.innerHTML === 'Show less') {
            const showMoreElements = document.querySelectorAll('.show-more');
            showMoreElements.forEach(element => {
                element.remove();
            });

            button.innerHTML = 'Show more';
        }
    };

    button.addEventListener('click', showmore);
});
