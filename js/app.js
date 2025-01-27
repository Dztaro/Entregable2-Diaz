
const bebidas = [
    { id: 1, name: "Cerveza Lager", price: 3.5, category: "Cerveza", description: "Refrescante y suave.", image: "img/beer.jpg" },
    { id: 2, name: "Vino Tinto", price: 10, category: "Vino", description: "Cuerpo y aroma intenso.", image: "img/wine.jpg" },
    { id: 3, name: "Aperitivo Bitter", price: 7, category: "Aperitivo", description: "Sabor equilibrado.", image: "img/aperitif.jpg" },
    { id: 4, name: "Gaseosa Cola", price: 2, category: "Gaseosa", description: "Dulce y burbujeante.", image: "img/soda.jpg" },
    { id: 5, name: "Energizante X", price: 5, category: "Energizantes", description: "Te llena de energía.", image: "img/energy.jpg" },
];

const bebidasContainer = document.getElementById("beverages-container");

function mostrarBebidas(bebidasMenu) {
    bebidasContainer.innerHTML = "";
    bebidasMenu.forEach((bebida) => {
        const bebidaCarta = document.createElement("div");
        bebidaCarta.innerHTML = `
            <img src="${bebida.image}" alt="${bebida.name}" style="width: 100px; height: 100px;">
            <h3>${bebida.name}</h3>
            <p>${bebida.description}</p>
            <p>Precio: $${bebida.price}</p>
            <button class="add-to-cart" data-id="${bebida.id}">Agregar al carrito</button>
        `;
        bebidasContainer.appendChild(bebidaCarta);
    });
}

mostrarBebidas(bebidas);


const carritoItemsContainer = document.getElementById("cart-items");
const carritoTotalElement = document.getElementById("cart-total");

let carrito = [];


function updateCart() {
    carritoItemsContainer.innerHTML = "";
    let total = 0;

    carrito.forEach((item) => {
        const carritoItem = document.createElement("li");
        carritoItem.textContent = `${item.name} - $${item.price}`;
        carritoItemsContainer.appendChild(carritoItem);
        total += item.price;
    });

    carritoTotalElement.textContent = total.toFixed(2);
}


bebidasContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")) {
        const bebidaId = parseInt(event.target.dataset.id, 10);
        const seleccionarBebida = bebidas.find((b) => b.id === bebidaId);
        carrito.push(seleccionarBebida);
        updateCart();
    }
});



document.getElementById("filter-beer").addEventListener("click", () => {
    const filtered = bebidas.filter((b) => b.category === "Cerveza");
    mostrarBebidas(filtered);
});

document.getElementById("filter-wine").addEventListener("click", () => {
    const filtered = bebidas.filter((b) => b.category === "Vino");
    mostrarBebidas(filtered);
});

document.getElementById("filter-aperitif").addEventListener("click", () => {
    const filtered = bebidas.filter((b) => b.category === "Aperitivo");
    mostrarBebidas(filtered);
});

document.getElementById("filter-soda").addEventListener("click", () => {
    const filtered = bebidas.filter((b) => b.category === "Gaseosa");
    mostrarBebidas(filtered);
});

document.getElementById("filter-energy").addEventListener("click", () => {
    const filtered = bebidas.filter((b) => b.category === "Energizantes");
    mostrarBebidas(filtered);
});

document.getElementById("clear-filters").addEventListener("click", () => {
    mostrarBebidas(bebidas);
});

function guardarCarritoEnLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(carrito));
}


function loadCartFromLocalStorage() {
    const guardarCarrito = localStorage.getItem("cart");
    if (guardarCarrito) {
        carrito = JSON.parse(guardarCarrito);
        updateCart();
    }
}

function updateCart() {
    carritoItemsContainer.innerHTML = "";
    let total = 0;

    carrito.forEach((item) => {
        const carritoItem = document.createElement("li");
        carritoItem.textContent = `${item.name} - $${item.price}`;
        carritoItemsContainer.appendChild(carritoItem);
        total += item.price;
    });

    carritoTotalElement.textContent = total.toFixed(2);
    guardarCarritoEnLocalStorage();
}

loadCartFromLocalStorage();

function showSuccessMessage(message) {
    const successMessage = document.createElement("div");
    successMessage.textContent = message;
    successMessage.classList.add("success-message");
    document.body.appendChild(successMessage);

    setTimeout(() => {
        successMessage.remove();
    }, 2000);
}

document.getElementById("clear-cart").addEventListener("click", () => {
    carrito = [];
    updateCart();
    localStorage.removeItem("cart");
});



