document.addEventListener("DOMContentLoaded", cargaInicial);

function cargaInicial() {
  cargarCarritoDeLocalStorage();
  cargarProductosJSON();
  mostrarCarrito();
}

const d = document;
let carrito = [];
let stockProductos = [];

function cargarProductosJSON() {
  fetch("productos.json")
    .then((response) => response.json())
    .then((data) => {
      stockProductos = data;
      mostrarProductos();
    })
    .catch((error) => {
      console.log("Error al cargar los productos:", error);
    });
}

function mostrarProductos() {
  const $tienda = d.getElementById("tienda");

  stockProductos.forEach((p) => {
    let producto = d.createElement("div");
    producto.classList.add("card");

    producto.innerHTML = `
      <img class="card" src="${p.img}" alt="">
      <h5>${p.nombre}</h5>
      <p>${p.descripcion}</p>
      <p>${p.precio}</p>
      <button id="${p.id}">Agregar al carrito</button>
    `;
    $tienda.appendChild(producto);

    producto.querySelector("button").addEventListener("click", () => {
      agregarAlCarrito(p.id);
    });
  });
}

mostrarProductos();

function agregarAlCarrito(id) {
  let producto = stockProductos.find((producto) => producto.id == id);

  let productoEnCarrito = carrito.find((producto) => producto.id == id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    producto.cantidad = 1;
    carrito.push(producto);
  }

  mostrarCarrito();
  guardarCarritoEnLocalStorage();
}

function mostrarCarrito() {
  const $carrito = d.getElementById("carrito");

  $carrito.innerHTML = "";

  carrito.forEach((p, index) => {
    let producto = d.createElement("div");
    producto.classList.add("card");

    producto.innerHTML = `
      <img class="card" src="${p.img}" alt="">
      <h5>${p.nombre}</h5>
      <p>${p.descripcion}</p>
      <p>${p.cantidad}</p>
      <p>${p.precio}</p>
      <button id="${p.id}">Eliminar del carrito</button>
    `;
    $carrito.appendChild(producto);

    producto.querySelector("button").addEventListener("click", () => {
      eliminarProductoDelCarrito(index);
    });
  });
}

function eliminarProductoDelCarrito(indice) {
  carrito[indice].cantidad--;

  if (carrito[indice].cantidad === 0) {
    carrito.splice(indice, 1);
  }
  mostrarCarrito();
  guardarCarritoEnLocalStorage();
}

function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage() {
  if (localStorage.getItem("carrito") !== null) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
  } else {
    carrito = [];
  }
}
