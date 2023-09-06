// function showCharacters() {
//         const apiUrl = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=8b952c8b38e25f1426591a1dbb023326&hash=72134039e0d32f9b5eb290473134bb6b';
//         const container = document.querySelector('.container');
//         let contentHTML = '';
//         const loadMoreBtn = document.getElementById('loadMore');

//         // Solicitud al API y construcción de las tarjetas en el HTML

//         fetch(apiUrl)
//             .then(res => res.json())
//             .then((json) => {
//                 for (const hero of json.data.results) {
//                     let urlWiki = hero.urls[0].url;
//                     contentHTML += `
//                     <div id="marvel-cards">
//                         <h2 class="heroName">${hero.name}</h2>
//                         <p class='cardInfo'>click en la imagen para ver <br> comics donde aparece el personaje</p>
//                         <a href="${urlWiki}" target="_blank">
//                             <img class="heroImg" src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}">
//                         </a>
//                     </div>`;
//                 }
//                 container.innerHTML = contentHTML;
//             })
//             .catch(error => console.error('Error:', error));
//     }
    
//     showCharacters();

let offset = 0; // Variable para realizar paginación

function showCharacters() {
    const apiKey = '8b952c8b38e25f1426591a1dbb023326';
    const container = document.querySelector('.container');
    const loadMoreBtn = document.getElementById('loadMore');

    // Función para hacer la solicitud al API y construir las tarjetas en el HTML
    function fetchCharacters() {
        const apiUrl = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${apiKey}&hash=72134039e0d32f9b5eb290473134bb6b&limit=10&offset=${offset}`;
        
        fetch(apiUrl)
            .then(res => res.json())
            .then((json) => {
                let contentHTML = '';
                for (const hero of json.data.results) {
                    let urlWiki = hero.urls[0].url;
                    contentHTML += `
                    <div id="marvel-cards">
                        <h2 class="heroName">${hero.name}</h2>
                        <p class='cardInfo'>Click en la imagen para ver <br> comics donde aparece el personaje</p>
                        <a href="${urlWiki}" target="_blank">
                            <img class="heroImg" src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}">
                        </a>
                    </div>`;
                }
                container.innerHTML += contentHTML;
                offset += 10; // Incrementar el offset para la próxima solicitud
            })
            .catch(error => console.error('Error:', error));
    }

    // Evento para cargar más contenido al hacer clic en el botón "Load More"
    loadMoreBtn.addEventListener('click', fetchCharacters);

    // Mostrar los primeros personajes al cargar la página
    fetchCharacters();
}

showCharacters();
