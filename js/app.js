//event listeners.
document.addEventListener('DOMContentLoaded', () =>{
    ui.llenarOpciones(); //llenar el select con los años.
})  
//consturctores.
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;

}
//Realica una cotizacion con los datos.
Seguro.prototype.cotizarSeguro = function () {
    /*
    1=Americano 1.15
    2=asiatico 1.05
    3=Europeo 1.35
    */
   let cantidad;
   const base =2000;
   console.log(this.marca);
   switch (this.marca) {
    case '1':
        cantidad=base*1.15;
        break;
    case '2':
        cantidad=base*1.05;
    break;

    case'3':
        cantidad=base*1.35;
    default:
        break;
}
//leer el año
const diferencia = new Date().getFullYear()-this.year;
//cada año que la diferencia es mayor reducimos un %3 el costo.
    cantidad -= (( diferencia*3)*cantidad)/100;
     
   /*
   Si el seguro es basico se multiplica por un 30%
   Si el seguro es completo se multiplica por un 50%
   */
  if(this.tipo==='basico'){
    cantidad*=1.30;
  }else{
      cantidad*= 1.50;
  }
  console.log(cantidad);
  return cantidad;

}


function UI() {}
//llena las opciones de los años.
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
          min = max-20;
          const selectYear = document.querySelector('#year');
          for (let i = max; i > min; i--) {
              let option =document.createElement('option')
              option.value= i;
              option.textContent = i;
              selectYear.appendChild(option);
              
          }
}
//muestra alertas en pantalla.
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');
    if (tipo === 'error') {
        div.classList.add('error');
    }else{
        div.classList.add('correcto', 'mt-10')
    }
    div.classList.add('mensaje')
    div.textContent =mensaje;
    //insertar en el html.
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));
    setTimeout(() => {
        div.remove();
    }, 3000);
}

UI.prototype.mostrarResultado= (total,seguro) =>{
    const {marca, year, tipo}=seguro;
    let textomarca;
    switch (marca) {
        case '1':
            textomarca='Americano'
        break;
        case '2':
            textomarca='asiatico'
                break;
        case '3':
            textomarca='Europeo'
                    break;
        default:
            break;
    }
    //crear el resultado
    const div =document.createElement('div');
    div.classList.add('mt-18');
    div.innerHTML =`
    <p class="header">Tu Resumen</p>
    <p class="font-bold">marca: <span class="font-normal"> ${textomarca}</span></p>
    <p class="font-bold">año: <span class="font-normal"> ${year}</span></p>
    <p class="font-bold">tipo: <span class="font-normal capitalize"> ${tipo}</span></p>
    <p class="font-bold">total: <span class="font-normal"> $${total}</span></p>
    `; 
    
     const resultadoDiv =document.querySelector('#resultado');
     
    const spinner = document.querySelector('#cargando');
    spinner.style.display='block';
    setTimeout(() => {
        //se borra el spiner pero se muestra el resultado.
        spinner.style.display='none';
        resultadoDiv.appendChild(div);
    }, 3000);

}

//instanciar UI.
const ui = new UI();
console.log(ui);

eventListeners();
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}
function cotizarSeguro(e) {
    e.preventDefault();
    //leer la marca seleccionada.
    const marca = document.querySelector('#marca').value;
    
    //leer el año seleccionada.
    const year = document.querySelector('#year').value;
    //leer eñ tipo de covertura seleccionada.
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    if (marca ===''|| year==='' || tipo==='' ) {
        ui.mostrarMensaje('todos los campos son obligatorios.', 'error')
        return;
    }
      ui.mostrarMensaje('Cotizando....', 'exito');
      //ocultar las cotizaciones previas.
      const resultados= document.querySelector('#resultado div');
      if (resultados!=null) {
          resultados.remove();
          
      }
      //instanciar al seguro.
    const seguro= new Seguro (marca, year, tipo);
     const total= seguro.cotizarSeguro();
    

      //utilizar el prototipe que va a cotizar.
      ui.mostrarResultado(total, seguro);
}