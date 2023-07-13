import { renderizarProductos } from './app.js';

// Obtener el elemento del menú de categorías
const categoriasMenu = document.querySelector('li:nth-child(1)');
const submenu = document.querySelector('.submenu');

// usar toggle para mostrar y ocultar el submenu
categoriasMenu.addEventListener('click', () => {
    submenu.classList.toggle('hidden');
});

function filtrosCategorias(PRODUCTOS) {
    // Obtener el elemento reloj
    const reloj = document.querySelector('#reloj');
    // Agregar el evento de click al elemento reloj
    reloj.addEventListener('click', () => {
        // filtrar los productos por categoría reloj
        const relojes = PRODUCTOS.filter(producto => producto.categoria === 'Reloj');

        // renderizar los productos filtrados
        renderizarProductos(relojes);
    });

    // Obtener el elemento bicicletas
    const bicicletas = document.querySelector('#bicicleta');
    // Agregar el evento de click al elemento bicicletas
    bicicletas.addEventListener('click', () => {
        // filtrar los productos por categoría bicicletas
        const bicicletas = PRODUCTOS.filter(producto => producto.categoria === 'Bicicleta');

        // renderizar los productos filtrados
        renderizarProductos(bicicletas);
    });

    // Obtener el elemento auriculares
    const auriculares = document.querySelector('#auriculares');
    // Agregar el evento de click al elemento auriculares
    auriculares.addEventListener('click', () => {
        // filtrar los productos por categoría auriculares
        const auriculares = PRODUCTOS.filter(producto => producto.categoria === 'Auriculares');

        // renderizar los productos filtrados
        renderizarProductos(auriculares);
    });

}

export { filtrosCategorias };

