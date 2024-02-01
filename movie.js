document.addEventListener('DOMContentLoaded', function () {
    const poster = document.getElementById('moviesContainer');
    const body = document.querySelector('body');
    const id = window.location.search.split('=')[1];

    function fetchData() {
        let apiUrl = `http://www.omdbapi.com/?i=${id}&y=2024&plot=full&apikey=c5ea3601`;
        return fetch(apiUrl)
            .then(response => response.json());
    }
    
    function renderData(data) {
        poster.innerHTML = `
        <div class="movie-img" style="background-image: url('${data.Poster}');"></div>
        <div class="movie-sub-image">
            <div class="info">
                <h1>${data.Title}</h1>
                <ul class="movie-info">
                    <li>Runtime : ${data.Runtime} <br> Genre : ${data.Genre}</li>
                </ul>
            </div>
            <div class="summary">
                <h5>SUMMARY :</h5>
                <p>${data.Plot}</p>    
            </div>
            <div class="actors">
                <h5>ACTORS :</h5>
                <p>${data.Actors}</p>
            </div>
        </div>
        `;  
        const body = document.body;
        const url = data.Poster;
        body.style.backgroundImage = `linear-gradient(rgba(30, 27, 38, 0.95), rgba(30, 27, 38, 1)),url(${url})`
    }

    fetchData().then(renderData);

});