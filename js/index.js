// Ejecuta funciones al cargar la página
document.addEventListener ('DOMContentLoaded', ()=>{
    showCharacters();
});

const apiKey = '8b952c8b38e25f1426591a1dbb023326';
const container = document.querySelector('.container > .row');
const loadMoreBtn = document.getElementById('loadMore');
const searchInput = document.getElementById('searchInput')
let offset = 0; // Variable para realizar paginación

    // Función para hacer la solicitud al API y construir las tarjetas en el HTML
    function showCharacters() {
        const apiUrl = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${apiKey}&hash=72134039e0d32f9b5eb290473134bb6b&limit=12&offset=${offset}`;

        fetch(apiUrl)
            .then(res => res.json())
            .then((json) => {
                let contentHTML = '';
                for (const hero of json.data.results) {
                    let urlWiki = hero.urls[0].url;
                    contentHTML += `
                    <div class="col-12 col-md-4 col-lg-3 d-flex mt-5">
                        <div class="card text-center text-bg-dark mb-3 border-danger mb-3" id="marvel-cards">
                            <div class="card-header">
                                <h2 class="card-title">${hero.name}</h2>
                            </div>
                                <a href="${urlWiki}" target="_blank">
                                 <img class="card-img-top" src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}">
                                </a>
                            <div class="card-body">
                                <p class='card-text'> ${hero.description ? hero.description : 'No hay descripción disponible'}</p>
                            </div>
                            <div class="card-footer text-danger">
                                Click the image to see related comics
                            </div> 
                        </div>      
                    </div>`;
                }
  
                container.innerHTML += contentHTML; // Agrega el contenido al HTML
                offset += 12; // Incrementar el offset para la próxima solicitud
                allCharacters = allCharacters.concat(json.data.results);
            })
            .catch(error => console.error('Error:', error)) 
    } 
    
    // Evento para cargar más contenido al hacer clic en el botón "Load More"
    loadMoreBtn.addEventListener('click', showCharacters);