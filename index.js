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

    const movieTitles = ['Blade', 'Furiosa: A Mad Max Saga', 'Civil War', 'Godzilla x Kong', 'Alien Romulus'];

    for (const title of movieTitles) {
        const movieData = await getMovieData(title);
        if (movieData) {
            addMovieToContainer(movieData);
        }
    }


    const gameMenuContent = document.querySelector('.game-menu-content');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let scrollAmount = 0;
    const cardWidth = 1993;

    prevButton.addEventListener('click', () => {
        scrollAmount += cardWidth;
        gameMenuContent.style.transform = `translateX(${scrollAmount}px)`;
        updateButtonState();
    });

    nextButton.addEventListener('click', () => {
        scrollAmount -= cardWidth;
        gameMenuContent.style.transform = `translateX(${scrollAmount}px)`;
        updateButtonState();
    });

    function updateButtonState() {
        prevButton.disabled = scrollAmount >= 0;
        nextButton.disabled = scrollAmount <= -6000;
    }

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const scrollPosition = window.scrollY;

        if (scrollPosition > 5000) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    updateButtonState();

});