import datos from '../data/datos.js';

const $ = selector => document.querySelector(selector);

const sectorA = $('#sectorA');
const sectorB = $('#sectorB');
const sectorC = $('#sectorC');

const titulo = $('.main .titulo');

const formulario = $('#formulario-busqueda');
const busqueda = $('.input-text');

let sector = "A";

// Typed JS
const typed1 = new Typed('#typed1', {
  strings: ['Ingrese el N° de placa', 'Ingrese el DNI del conductor'],
  typeSpeed: 50,
  backSpeed: 0,
  attr: 'placeholder',
  bindInputFocusEvents: true,
  loop: true
});

sectorA.addEventListener('click', () => {
  titulo.textContent = "Sector A";
  sector = "A";
})
sectorB.addEventListener('click', () => {
  titulo.textContent = "Sector B";
  sector = "B";
})
sectorC.addEventListener('click', () => {
  titulo.textContent = "Sector C";
  sector = "C";
})

formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  const valor = busqueda.value;
  const mostrarResultado = $('.resultado');

  if(!valor){
    mostrarResultado.style.display = 'none';
    mostrarAlerta('No ingreso busqueda!', 'danger');
    return;
  }

  const resultado = datos.filter( e => e.dni === valor || e.Nplaca === valor);

  if(resultado.length === 0) {
    mostrarResultado.style.display = 'none';
    mostrarAlerta('No se encontro busqueda!', 'warning');
    return;
  }

  const result = resultado[0];

  // if(result.sector !== sector) {
  //   mostrarAlerta('La busqueda no pertenece al sector');
  //   return;
  // }

  Object.entries(result).forEach(([key, value]) => {
    if(value === '') {
      result[key] = 'No ha especificado';
    }
  });

  if(result) {

    mostrarAlerta('Ha encontrado resultados!', 'success');

    mostrarResultado.style.display = 'block';
    mostrarResultado.innerHTML = `
      <img src="../assets/${result.foto}" alt="Foto de ${result.propietario}" style="max-width: 300px; height: 300px; margin-bottom: 1rem;"/>
      <p>Empresa: <b>${result.empresa}</b></p>
      <p>Propietario: <b>${result.propietario}</b></p>
      <p>Dirección: <b>${result.direccion}</b></p>
      <p>N° Tarjeta de Propiedad: <b>${result.tarjetaPropiedad}</b></p>
      <p>DNI: <b>${result.dni}</b></p>
      <p>N° Placa: <b>${result.Nplaca}</b></p>
      <p>N° Padron: <b>${result.padron}</b></p>
      <p>N° Calcolmania y certificado: <b>${result.calcomaniaCertificado}</b></p>
      <p>Observaciones: <b>${result.observaciones}</b></p>
      <p>N° Expediente: <b>${result.nExpediente}</b></p>
      <p>N° Motor: <b>${result.nMotor}</b></p>
      <p>Marca/Modelo: <b>${result.marcaModelo}</b></p>
      <p>Color: <b>${result.color}</b></p>
      <p>Afocat: <b>${result.afocat}</b></p>
      <p>Otros conductores: <b>${result.otrosConductores}</b></p>
      <p>N° Licencia Conducir: <b>${result.licenciaConducir}</b></p>
      <p>Licencia Caduca: <b>${result.licenciaCaduca}</b></p>
    `;
  }
  else {
    mostrarResultado.style.display = 'none';
  }

})

function mostrarAlerta(mensaje, tipo) {
  const alerta = $('.main .alerta');
  // const divMensaje = document.createElement('div');
  // divMensaje.classList.add('mensaje');
  // divMensaje.textContent = mensaje;

  // if(alerta.textContent === "") {
  //   alerta.appendChild(divMensaje);
  // }

  if(tipo === 'danger') {
    alerta.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      ${mensaje}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `;
  }  

  if(tipo === 'warning') {
    alerta.innerHTML = `
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      ${mensaje}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `;
  }

  if(tipo === 'success') {
    alerta.innerHTML = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      ${mensaje}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `;
  }

  // setTimeout(() => {
  //   divMensaje.remove();
  // },3000);
}



