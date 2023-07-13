// Obtener elementos del DOM
const cartIcon = document.getElementById("cart-icon");
const modal = document.getElementById("cart-modal");
const closeButton = document.getElementsByClassName("close")[0];

// Abrir el modal cuando se hace clic en el icono del carrito
cartIcon.addEventListener("click", function() {
  modal.style.display = "block";
});

// Cerrar el modal cuando se hace clic en el botón de cerrar
closeButton.addEventListener("click", function() {
  modal.style.display = "none";
});

// Cerrar el modal cuando se hace clic fuera del contenido del modal
window.addEventListener("click", function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});