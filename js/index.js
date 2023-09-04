const marvelHeros = {
    render: () => {
        const apiUrl = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=8b952c8b38e25f1426591a1dbb023326&hash=72134039e0d32f9b5eb290473134bb6b';
        const container = document.querySelector('.container');
        let contentHTML = '';

        // Solicitud al API y construcción de las tarjetas en el HTML

        fetch(apiUrl)
            .then(res => res.json())
            .then((json) => {
                for (const hero of json.data.results) {
                    let urlWiki = hero.urls[0].url;
                    contentHTML += `
                    <div id="marvel-cards">
                        <h2 class="heroName">${hero.name}</h2>
                        <a href="${urlWiki}" target="_blank">
                            <img class="heroImg" src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}">
                        </a>
                    </div>`;
                }
                container.innerHTML = contentHTML;
            })
            .catch(error => console.error('Error:', error));
    },
};
marvelHeros.render();

const loadMore = document.getElementById('loadBtn');

loadMore.addEventListener("click", ()=> {
    alert('Funcionalidad en desarrollo')
});