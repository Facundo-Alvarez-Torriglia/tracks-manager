let botonDeConsulta = document.getElementById('botonConsultar');
let infoContainer = document.getElementById('info');

botonDeConsulta.addEventListener('click', consultarTracks);

async function consultarTracks() {
  try {
    const response = await fetch('http://localhost:3000/canciones');
    if (!response.ok) {
      console.log('Fallo la respuesta');
    }

    const data = await response.json();
    console.log(data);

    data.forEach((track) => {
      const trackElement = document.createElement('p');
      trackElement.textContent = track.titulo + ' - ' + track.duracion + ' años';
      infoContainer.appendChild(trackElement);
    });
  } catch (error) {
    console.log('Error:', error);
  }
}


document
  .getElementById('cancion-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const duracion = document.getElementById('duracion').value;
    const interprete = document.getElementById('interprete').value;

    const nuevaCancion = {
      titulo: titulo,
      duracion: duracion,
      interprete: interprete,
    };

    // Enviar los datos al servidor para procesar y actualizar el archivo JSON
    // Puedes usar AJAX, Fetch API o librerías como Axios para esto
  });
