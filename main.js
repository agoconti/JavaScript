const ginMare = 13500;

const ginBotanist = 15000;

const gin50Pound = 14000;

const ginMonkey47 = 18000;

const vodkaGreyGoose = 22000;

const tequilaDonJulio = 16000;

const glenlivet12 = 34000;

const macallan25 = 45000;

let total = 0;

function mostrarProductos() {
  let productos =
    prompt(`Bienvenidx a GIN. Elegí tu producto ingresando el número que corresponda:
                          1 GIN MARE
                          2 GIN THE BOTANIST
                          3 50 POUND GIN
                          4 MONKEY 47
                          5 VODKA GREY GOOSE
                          6 TEQUILA DON JULIO
                          7 WHISKY GLENLIVET 12
                          8 THE MACALLAN 25`);
  return productos;
}

function validarProductos(producto) {
  if (producto === null) {
    return;
  }
  producto = Number(producto);

  while (isNaN(producto) || producto < 1 || producto > 8) {
    alert(`Por favor ingresá un número entre 1 y 8`);
    producto = mostrarProductos();
    if (producto === null) {
      return;
    }
  }
  mostrarCarrito(producto);
}

validarProductos(mostrarProductos());

function mostrarCarrito(producto) {
  switch (producto) {
    case 1:
      total += ginMare;
      break;
    case 2:
      total += ginBotanist;
      break;
    case 3:
      total += gin50Pound;
      break;
    case 4:
      total += ginMonkey47;
      break;
    case 5:
      total += vodkaGreyGoose;
      break;
    case 6:
      total += tequilaDonJulio;
      break;
    case 7:
      total += glenlivet12;
      break;
    case 8:
      total += macallan25;
      break;
  }
  alert(
    `Elegiste el producto número ${producto}. 
    El total hasta ahora es ${total} pesos`
  );

  let continuar = confirm(`Querés agregar algo más a tu compra?`);

  if (continuar) {
    validarProductos(mostrarProductos());
  } else {
    alert(
      `Elegiste el producto número ${producto}. El total hasta ahora es ${total} pesos`
    );
    let pago = confirm(`Querés realizar el pago en este momento?`);

    pagarCarrito(pago);
  }
}

function pagarCarrito(pago) {
  if (pago) {
    let formasDePago =
      prompt(`Elegí la forma de pago ingresando el número que corresponda
                                  1 DÉBITO
                                  2 CRÉDITO`);
    if (formasDePago == null) {
      return;
    }
    formasDePago = +formasDePago;

    while (isNaN(formasDePago) || formasDePago < 1 || formasDePago > 2) {
      alert(`Por favor elegí 1 o 2`);
      formasDePago =
        prompt(`Elegí la forma de pago ingresando el número que corresponda
                                1 DÉBITO
                                2 CRÉDITO`);
      if (formasDePago === null) {
        return;
      }
    }
  } else {
    alert(`Podés pagar en nuestro local cuando lo retires tu compra`);
  }
}
