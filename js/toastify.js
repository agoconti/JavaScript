function toastify(mensaje) {
    Toastify({
        text: mensaje,
        duration: 3000,
        newWindow: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            padding: '6px 20px',
            borderRadius: '30px',
            border: '1.5px solid transparent',
            background: '#111',
            color: '#fff',
            margin: '100px 16px ',
        },
        onClick: function () { } // Callback after click
    }).showToast();
}

export { toastify };