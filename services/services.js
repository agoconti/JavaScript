import { renderizarProductos } from '../js/app.js';
import { filtrosCategorias } from '../js/submenu.js';

const getProductos = async() => {
    try {
        const res = await fetch('../assets/ddbb.json');
        const data = await res.json();
        
        renderizarProductos(data);
        filtrosCategorias(data);
        
    } catch (error) {
        console.log(error);
    }
} 

// getProducts() pero con promesas
/* const getProductos = () => {
    fetch('../assets/ddbb.json')
    .then(res => res.json())
    .then(data => {
        renderizarProductos(data);
    })
    .catch(error => {
        console.log(error);
    });
} */

export { getProductos };