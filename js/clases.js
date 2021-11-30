class Product {
  constructor(name, price, imagen, id) {
    this.name = name;
    this.price = price;
    this.imagen = imagen;
    this.id = id;
  }
}

class Carrito {
  products = new Map();
  amount = 0;

  addProduct(producto) {
    if (this.products.get(producto)) {
      this.products.set(producto, this.products.get(producto) + 1);
    } else this.products.set(producto, 1);

    this.amount += producto.price;
  }

  amountOf(producto) {
    return this.products.get(producto);
  }
  amountOfProducts() {
    let amountOfProducts = 0;
    for (let i of this.products.keys()) {
      amountOfProducts += this.products.get(i);
    }
    return amountOfProducts;
  }
  getProducts() {
    return Array.from(this.products.keys());
  }

  totalAmount() {
    return this.amount;
  }
  vaciarCarrito() {
    this.products.clear();
    products = new Map();
    this.amount = 0;
    this.guardarCarro();
  }
  guardarCarro() {
    let mapToStorage = Array.from(this.products);
    let carroAmount = this.totalAmount();

    localStorage.setItem("carroAmount", carroAmount);
    localStorage.setItem("carroStorage", JSON.stringify(mapToStorage));
  }
}
