document.addEventListener("DOMContentLoaded", function () {
  let page = 1;
  const cardsPerPage = 20;

  function obtenerDatosYGenerarTarjetas(page) {
    const apiUrl = `https://rickandmortyapi.com/api/character?page=${page}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        return response.json();
      })
      .then((data) => {
        const apiCards = document.getElementById('apiCards');
        
        data.results.forEach((character) => {
          const card = document.createElement('div');

          let statusCircleClass = '';

          switch (character.status) {
            case 'Alive':
              statusCircleClass = 'alive-circle';
              break;
            case 'Dead':
              statusCircleClass = 'dead-circle';
              break;
            case 'unknown':
              statusCircleClass = 'unknown-circle';
              break;
            default:
              statusCircleClass = 'unknown-circle';
          }

          card.innerHTML = `
            <div class="card">
              <img class="imgCard" src="${character.image}" alt="${character.name}">
              <div class="cardText">
                <h2 class="name">${character.name}</h2>
                <div class="cardDetail">
                  <div class="specieDetail"
                    <p class="status">
                      <span class="${statusCircleClass} status-circle"></span>
                      ${character.status}
                    </p>
                    <p class="space"> - </p>
                    <p class="specie">${character.species}</p>
                  </div>
                  <img class="imgPin" src="./assets/Pin.png" alt="Pin">
                    <p class="origin">${character.origin.name}</p>
                </div>
              </div>
            </div>
          `;
          apiCards.appendChild(card);
        });
      })
      .catch((error) => {
        console.error('Error al obtener datos de la API:', error);
      });
  }
  
  obtenerDatosYGenerarTarjetas(page);

  const loadMoreButton = document.getElementById('loadMore');
  loadMoreButton.addEventListener('click', () => {
    page++; 
    obtenerDatosYGenerarTarjetas(page);
  });
});