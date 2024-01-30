document.addEventListener('DOMContentLoaded', function () {
    const poster = document.getElementById('moviesContainer');
    const id = window.location.search.split('=')[1];

    function fetchData() {
        let apiUrl = `http://www.omdbapi.com/?id=${id}&y=2024&plot=full&apikey=c5ea3601`;
        return fetch(apiUrl)
            .then(response => response.json());
    }
    
    function renderData(data) {
        poster.innerHTML = `
        <div class="movie">
            <img src="${data.Poster}" alt="${data.Title}">
            <h2>${data.Title}</h2>
            <p>${data.Plot}</p>
        </div>
        `;  
    }

    fetchData().then(renderData);

});