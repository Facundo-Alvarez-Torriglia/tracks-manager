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
