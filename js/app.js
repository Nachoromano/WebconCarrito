//Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const ListaCursos = document.querySelector('#lista-cursos');
let ArticulosCarrito = [];

cargarEventos();
function cargarEventos () {
    //Cuando agregas un curso presionando "agregar carrito"
    ListaCursos.addEventListener('click', agregarCurso)
    
    //Elimina cursos del carrito
    carrito.addEventListener('click',eliminarCurso)

    //Vaciar el carrito
    vaciarCarrito.addEventListener('click', () => {
        console.log('vaciando carrito..');
        ArticulosCarrito = []; //reseteamos el arreglo
        
        limpiarHTML(); //eliminamos todo el html

    })
};

//funciones 
function agregarCurso (e){
    e.preventDefault(); // Sin esto cada vez que agregamos algo al carrito nos tira para arriba de la pag
    
    if (e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado =  e.target.parentElement.parentElement
        leeDatosCurso(cursoSeleccionado);
    }
}

//elimina un curso del carrito
function eliminarCurso (e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')

        //elimina del array de articulos carrito por el data-id
        ArticulosCarrito = ArticulosCarrito.filter(curso => curso.id !== cursoId);

        CarritoHTML(); //iterar sobre el carrito y mostrar su HTML
    }
}


//Lee el contenido del html al que le dimos click y extraes la informacion del curso 

function leeDatosCurso (curso) {

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    };

    //revisa si un elemento ya existe en el carrito
    const existe = ArticulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe){
        //actualizamos la cantidad
        const cursos = ArticulosCarrito.map(curso =>{
            if (curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            }else{
                return curso; //retorna los objetos que no son los duplicados
            }
        });
        ArticulosCarrito  = [...cursos];
    }else{
        //agregamos el curso al carrito
        ArticulosCarrito = [...ArticulosCarrito, infoCurso]
    }


    CarritoHTML();
}

//Muestra el carrito de compras en el HTMML 
function CarritoHTML () {
    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carito y genera el HTML
    
    ArticulosCarrito.forEach( curso =>{

        const row = document.createElement('tr')
        row.innerHTML =  `
        <td>
            <img src="${curso.imagen}" width="100">
        </td>

        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td> 
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
        `;
        //Agregando el html del carrito al tbody
        contenedorCarrito.appendChild(row)

    } )
}

//Elimina los curso de tbody
function limpiarHTML () {
    //Forma lenta
    //contenedorCarrito.innerHTML = ''

    while(contenedorCarrito.firstChild){ //aca dice q si contenedor carrito tiene al menos 1 elemento adentro el codigo se ejecuta
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

