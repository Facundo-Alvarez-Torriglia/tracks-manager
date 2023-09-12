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

