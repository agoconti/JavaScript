import { getProductos } from '../services/services.js';
import { toastify } from './toastify.js';

const $carrito = document.querySelector('#contador');
document.addEventListener('DOMContentLoaded', cargaInicial);

function cargaInicial() {

    obtenerCarritoDelLocalStorage();
    getProductos();
    renderizarCarrito();
}


let CARRITO = [];

const renderizarProductos = (PRODUCTOS) => {

    const $tarjetas = document.querySelector('.tarjetas');
    $tarjetas.innerHTML = '';

    PRODUCTOS.forEach(producto => {

        // Creacion de un div
        const $div = document.createElement('div');
        $div.classList.add('tarjeta');

        // Creacion de un h3
        const $h3 = document.createElement('h3');
        $h3.textContent = producto.nombre;

        // Creacion de un img
        const $img = document.createElement('img');
        $img.src = producto.imagen;

        // Creacion de un div
        const $div2 = document.createElement('div');
        $div2.classList.add('button-container');

        // Creacion de un p
        const $p = document.createElement('p');
        $p.textContent = "$" + producto.precio;

        // Creacion de un button
        const $button = document.createElement('button');
        $button.textContent = 'Añadir al carrito';

        // Agregar el h3 al div
        $div.appendChild($h3);

        // Agregar el img al div
        $div.appendChild($img);

        // Agregar el p al div2
        $div2.appendChild($p);

        // Agregar el button al div2
        $div2.appendChild($button);

        // Agregar el div2 al div
        $div.appendChild($div2);

        // Agregar el div al contenedor
        $tarjetas.appendChild($div);

        // Agregar un evento al button
        $button.addEventListener('click', () => {
            console.log('Añadir al carrito');
            agregarAlCarrito(producto);
        });
    });
}

//////////////////////////////////////////

const agregarAlCarrito = (producto) => {
    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = CARRITO.find(item => item.id === producto.id);

    if (productoEnCarrito) {
        // Si el producto ya está en el carrito, aumentamos la cantidad
        productoEnCarrito.cantidad++;
        
    } else {
        // Si el producto no está en el carrito, lo agregamos
        CARRITO.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });
    }

    // Calcular la cantidad total de productos en el carrito
    const totalCantidad = CARRITO.reduce((total, item) => total + item.cantidad, 0);
    $carrito.textContent = totalCantidad;

    toastify("Producto agregado al carrito", "success");

    // Renderizar el carrito
    renderizarCarrito();

    // Guardar el carrito en el local storage
    guardarCarritoEnLocalStorage();
}



//////////////////////////////////////////



// Creacion de la funcion que se encargue de renderizar el carrito
const renderizarCarrito = () => {
    // Seleccionar el contenedor del carrito
    const $contenedorCarrito = document.querySelector('.contenedor_compras');

    // Limpiar el html del contenedor
    $contenedorCarrito.innerHTML = '';

    // Recorrer el carrito
    CARRITO.forEach(producto => {
        // Creacion de un div con la clase tbody
        const $div = document.createElement('div');
        $div.classList.add('tbody');

        // Creacion de un div con la clase columna_1
        const $div2 = document.createElement('div');
        $div2.classList.add('columna_1');

        // Creacion de un img
        const $img = document.createElement('img');
        $img.classList.add('img_cart');
        $img.src = producto.imagen;

        // Agregar el img al div2
        $div2.appendChild($img);

        // Agregar el div2 al div
        $div.appendChild($div2);

        // Creacion de un div con la clase columna_2
        const $div3 = document.createElement('div');
        $div3.classList.add('columna_2');
        $div3.textContent = producto.nombre;

        // Agregar el div3 al div
        $div.appendChild($div3);

        // Creacion de un div con la clase columna_3
        const $div4 = document.createElement('div');
        $div4.classList.add('columna_3');

        // creacion de input numerico para la cantidad
        const $input = document.createElement('input');
        $input.type = 'number';
        $input.value = producto.cantidad;

        // Agregar el input al div4
        $div4.appendChild($input);

        // Agregar el div4 al div
        $div.appendChild($div4);

        // Creacion de un div con la clase columna_4
        const $div5 = document.createElement('div');
        $div5.classList.add('columna_4');
        $div5.textContent = `$ ${producto.precio * producto.cantidad}`;

        // Agregar el div5 al div
        $div.appendChild($div5);

        // Creacion de un div con la clase columna_5
        const $div6 = document.createElement('div');
        $div6.classList.add('columna_5');

        // Creacion de un button
        const $button = document.createElement('button');
        $button.textContent = 'X';

        // Agregar el button al div6
        $div6.appendChild($button);

        // Agregar el div6 al div
        $div.appendChild($div6);

        // Agregar el div al contenedor
        $contenedorCarrito.appendChild($div);

        // Agregar un evento al button
        $button.addEventListener('click', () => {
            eliminarProducto(producto.id);
            const totalCantidad = CARRITO.reduce((total, item) => total + item.cantidad, 0);
            $carrito.textContent = totalCantidad;

        });

        // Agregar un evento al input que agregue un producto al carrito
        $input.addEventListener('change', () => {
            console.log('Cambiar cantidad');
            cambiarCantidad(producto.id, +($input.value));
            totalIndividual(producto.id, producto.precio, +($input.value));
    
            // Calcular la cantidad total de productos en el carrito
            const totalCantidad = CARRITO.reduce((total, item) => total + item.cantidad, 0);
            $carrito.textContent = totalCantidad;
            toastify("Cantidad cambiada", "success");
            
        });
    });
}



const totalIndividual = (id, precio, cantidad) => {
    // Buscar el producto en el carrito
    const producto = CARRITO.find(producto => producto.id === id);

    // Verificar si la cantidad es mayor a 0
    if (cantidad > 0) {
        // Si la cantidad es mayor a 0, calcular el total
        producto.total = precio * cantidad;
    } else {
        // Si la cantidad es menor o igual a 0, eliminar el producto
        eliminarProducto(id);
    }

    // Renderizar el carrito
    renderizarCarrito();

    // Guardar el carrito en el local storage
    guardarCarritoEnLocalStorage();

}

const eliminarProducto = (id) => {
    // Filtrar el carrito para que no tenga el producto con el id que le pasamos
    CARRITO = CARRITO.filter(producto => producto.id !== id);

    toastify("Producto eliminado del carrito", "error")
    // Renderizar el carrito
    renderizarCarrito();
    // guardar el carrito en el local storage
    guardarCarritoEnLocalStorage();
    // Calcular la cantidad total de productos en el carrito
    const totalCantidad = CARRITO.reduce((total, item) => total + item.cantidad, 0);
    $carrito.textContent = totalCantidad;
}

// Creacion de la funcion que se encargue de eliminar un producto 
// del carrito pero de manera individual
const eliminarProductoIndividual = (id) => {
    // Buscar el producto en el carrito
    const producto = CARRITO.find(producto => producto.id === id);

    // Verificar si la cantidad es mayor a 1
    if (producto.cantidad > 1) {
        // Si la cantidad es mayor a 1, solo disminuimos la cantidad
        producto.cantidad--;
    } else {
        // Si la cantidad es igual a 1, eliminamos el producto
        eliminarProducto(id);
    }

    // Renderizar el carrito
    renderizarCarrito();
    // guardar el carrito en el local storage
    guardarCarritoEnLocalStorage();
}

const cambiarCantidad = (id, cantidad) => {
    // Buscar el producto en el carrito
    const producto = CARRITO.find(producto => producto.id === id);

    // Cambiar la cantidad del producto
    producto.cantidad = cantidad;

    // Renderizar el carrito
    renderizarCarrito();
    // guardar el carrito en el local storage
    guardarCarritoEnLocalStorage();
}

// Funcion para guardar el carrito en el local storage
const guardarCarritoEnLocalStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(CARRITO));
}

// Funcion para obtener el carrito del local storage
const obtenerCarritoDelLocalStorage = () => {
    // Verificar si existe el carrito en el local storage
    if (localStorage.getItem('carrito')) {
        // Si existe, lo obtenemos
        CARRITO = JSON.parse(localStorage.getItem('carrito'));
    }else {
        // Si no existe, inicializamos el carrito
        CARRITO = [];
    }
}



export { renderizarProductos };