var productosMap = new Map();
var carrito = new Carrito();
var product;
$(document).ready(function () {
  // nav movile
  $(".sidenav").sidenav();
  // desplegable autocompletar
  $("input.autocomplete").autocomplete({
    data: {
      Maranta: null,
      Asplenium: null,
      Begonia: null,
      Aphelandra: null,
      Cala: null,
      Cordatum: null,
      Criptantus: null,
      Peperomia: null,
      Calathea: null,
      Sanseviera: null,
      Cactus: null,
      Chamaedorea: null,
      Fitonia: null,
      Gynura: null,
      Nidularium: null,
      Philodendron: null,
      Palmito: null,
      Sansevieria: null,
      Potus: null,
      Singonio: null,
      Tradescantia: null,
      Spathiphyllum: null,
      Monstera: null,
    },
  });
});

window.onload = () => {
  let objetFromJSON = JSON.parse(productosDb);
  products = objetFromJSON.map((object) => {
    return new Product(object.name, object.price, object.imagen, object.id);
  });

  /* CARGA STORAGE*/
  cargarCarro();

  const compraRealizada = document.querySelector("#efectuarCompra");
  const productsContainer = document.querySelector(".cartasProductos");
  const form = document.querySelector("#form");
  const formImput = document.querySelector("input");
  const carritoIcon = document.querySelector("#carrito");
  const vaciarCarrito = document.querySelector("#vaciarCarrito");
  const comprar = document.querySelector("#Comprar");
  const productosEnCarroMask = document.querySelector(".productosEnCarroMask");
  const totalPrice = document.querySelector("#totalPrice");
  const autoComplete = document.querySelector(".autocomplete-content");

  // mostrar carrito
  carritoIcon.addEventListener("click", () => {
    $("#productosEnCarro").toggle(200);
    $("#productosEnCarroMask").toggle();
  });
  productosEnCarroMask.addEventListener("click", () => {
    $("#productosEnCarro").toggle(200);
    $("#productosEnCarroMask").toggle();
  });
  vaciarCarrito.addEventListener("click", () => {
    contenedorProductosEnCarro.innerHTML = "";
    totalPrice.innerText = "Precio total: $0";
    carrito.vaciarCarrito();
    contador.innerText = "0";
  });
  // efectuar compra rute
  comprar.addEventListener("click", () => {
    (window.location.href = "cart.html"),
      carrito.getProducts().forEach((product) => {
        let productCard = document.createElement(`div`);
        productCard.innerHTML = `
      <div class="contenedorCardCarro">  
      <div class="amountOf">${carrito.amountOf(product)}</div>
      <img id="iconoP" class="responsive-img"src="${product.imagen}"></img>
      <p class="">${product.name}</p>
      <p class="center-align Price">$ ${product.price}</p>
      <p class="center-align TotalPorProducto">${
        carrito.amountOf(product) * product.price
      }</p>
      </div>`;
        contenedorProductosEnCarro.appendChild(productCard);
      });
  });

  var selects = document.querySelector("#select");
  var options = document.querySelector(".option");
  var instancias = M.FormSelect.init(selects, options);
  // submit por precio
  selects.addEventListener("change", (event) => {
    var valorBuscado;
    switch (event.target.value) {
      case "0":
        valorBuscado = 9999;
        break;
      case "1":
        valorBuscado = 700;
        break;
      case "2":
        valorBuscado = 1300;
        break;

      default:
        valorBuscado = 9999;
    }

    let productsToRender = products.filter((product) => {
      return product.price <= valorBuscado;
    });
    console.log(valorBuscado);
    formImput.value = "";
    productsContainer.innerHTML = "";
    productsToRender.forEach((product) => {
      productsContainer.appendChild(createProductCard(product));
    });
  });

  //  render inicial
  products.forEach((product) => {
    productsContainer.appendChild(createProductCard(product));
  });
  // render con el valor del desplegable
  autoComplete.addEventListener("click", (event) => {
    console.log("a");
    event.preventDefault();
    let valorBuscado = formImput.value;
    let productsToRender = products.filter((product) => {
      return product.name.toLowerCase().includes(valorBuscado.toLowerCase());
    });
    productsContainer.innerHTML = "";
    productsToRender.forEach((product) => {
      productsContainer.appendChild(createProductCard(product));
    });
  });
  // submit normal
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let valorBuscado = formImput.value;
    let productsToRender = products.filter((product) => {
      return product.name.toLowerCase().includes(valorBuscado.toLowerCase());
    });
    productsContainer.innerHTML = "";
    productsToRender.forEach((product) => {
      productsContainer.appendChild(createProductCard(product));
    });
    formImput.value = "";
  });
};

const contador = document.getElementById("contador");
const contenedorProductosEnCarro = document.querySelector(
  ".contenedorProductosEnCarro"
);

function agregarAlCarro(product) {
  carrito.addProduct(product);
  let amountOfProducts = carrito.amountOfProducts();
  contador.innerText = amountOfProducts;

  contenedorProductosEnCarro.innerHTML = "";

  carrito.getProducts().forEach((product) => {
    let productCard = document.createElement(`div`);
    productCard.innerHTML = `
      <div class="contenedorCardCarro">  
      <div class="amountOf">${carrito.amountOf(product)}</div>
      <img id="iconoP" class="responsive-img"src="${product.imagen}"></img>
      <p class="">${product.name}</p>
      <p class="Price">$ ${product.price}</p>
      <p class="TotalPorProducto">${
        carrito.amountOf(product) * product.price
      }</p>
      </div>`;

    contenedorProductosEnCarro.appendChild(productCard);
  });

  totalPrice.innerText = "Precio total: $ " + carrito.totalAmount();

  /* CARRITO TO STORAGE */
  carrito.guardarCarro();
}

function createProductCard(product) {
  let contenedor = document.createElement("div");

  contenedor.innerHTML = `
    <div class="col s12 m4">
    <div id="${product.id}" class="card">
    <div class="card-image">
    <img class="card-image responsive-img" src="${product.imagen}"></img>
    <a id="addButton" class="btn-floating halfway-fab waves-effect waves-light red lighten-2"><i class="material-icons">add</i></a>
    </div>
    <div class="card-content green accent-1">
    <p class="Name">${product.name}</p>
    <p class="Price">$ ${product.price}</p>
    </div>
    </div>
    </div>`;

  let button = contenedor.querySelector("#addButton");
  button.addEventListener("click", () => {
    agregarAlCarro(product);
  });

  return contenedor;
}

function cargarCarro() {
  amountFromStorage = localStorage.getItem("carroAmount");
  carrito.amount = Number(amountFromStorage);
  carrito.products = new Map(JSON.parse(localStorage.getItem("carroStorage")));

  let amountOfProducts = carrito.amountOfProducts();
  contador.innerText = amountOfProducts;

  carrito.getProducts().forEach((product) => {
    let productCard = document.createElement(`div`);
    productCard.innerHTML = `
    <div class="contenedorCardCarro">  
    <div class="amountOf">${carrito.amountOf(product)}</div>
    <img id="iconoP" class="responsive-img"src="${product.imagen}"></img>
    <p class="Name">${product.name}</p>
    <p class="Price">$ ${product.price}</p>
    <p class="TotalPorProducto">$   ${
      carrito.amountOf(product) * product.price
    }</p>
    </div>`;

    contenedorProductosEnCarro.appendChild(productCard);
  });

  totalPrice.innerText = "Precio Total: $ " + carrito.totalAmount();
}
