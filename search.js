document.addEventListener('DOMContentLoaded', function () {
    const swCharList = document.getElementById('sw_char_list');
    const nextPageButton = document.getElementById('ex_03_next_page');
    const lastPageButton = document.getElementById('ex_03_last_page');
    let currentPage = 1;

    function fetchSwapiData(page) {
        document.getElementById('loader').style.display = "block";
        swCharList.innerHTML = '';
        return fetch(`https://swapi.dev/api/people/?page=${page}`)
            .then(response => response.json());
    }

    function displayCharacters(characters) {
        swCharList.innerHTML = '';
        characters.results.forEach(character => {
            const charElement = document.createElement('div');
            charElement.classList.add('sw_char');
            
            charElement.innerHTML = `
                <h3>${character.name}</h3>
                <p>Height: ${character.height} cm</p>
                <p>Mass: ${character.mass} kg</p>
            `;
            
            swCharList.appendChild(charElement);
        });
        document.getElementById('loader').style.display = "none";
    }

    function loadNextPage() {
        fetchSwapiData(currentPage + 1)
            .then(response => {
                if (response.next !== null) {
                    currentPage++;
                    displayCharacters(response);
                } else {
                    nextPageButton.style.backgroundColor = "red";
                }
            });
    }

    function firstPage() {
        currentPage = 1;
        fetchSwapiData(currentPage)
            .then(displayCharacters);
    }
    firstPage();

    function loadPreviousPage() {
        if (currentPage > 1) {
            fetchSwapiData(currentPage - 1)
                .then(response => {
                    currentPage--;
                    displayCharacters(response);
                });
        } else {
            lastPageButton.style.backgroundColor = "red";
        }
    }

    lastPageButton.addEventListener('click', loadPreviousPage);
    nextPageButton.addEventListener('click', loadNextPage);
});
