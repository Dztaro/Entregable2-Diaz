let bebidas = [];
const bebidasContainer = document.getElementById("beverages-container");
const carritoItemsContainer = document.getElementById("cart-items");
const carritoTotalElement = document.getElementById("cart-total");
let carrito = [];

async function cargarBebidas() {
    try {
        const response = await fetch("data.json");
        bebidas = await response.json();
        mostrarBebidas(bebidas);
        agregarEventListeners();
    } catch (error) {
        console.error("Error al cargar el JSON:", error);
    }
}

function mostrarBebidas(bebidasMenu) {
    bebidasContainer.innerHTML = "";
    bebidasMenu.forEach((bebida) => {
        const bebidaCarta = document.createElement("div");
        bebidaCarta.innerHTML = `
            <img src="${bebida.image}" alt="${bebida.name}" style="width: 100px; height: 100px;">
            <h3>${bebida.name}</h3>
            <p>${bebida.description}</p>
            <p>Precio: $${bebida.price}</p>
            <button class="add-to-cart" data-id="${bebida.id}">Agregar al carrito</button>`;
        bebidasContainer.appendChild(bebidaCarta);
    });
}

function agregarEventListeners() {
    document.getElementById("filter-beer").addEventListener("click", () => {
        mostrarBebidas(bebidas.filter((b) => b.category === "Cerveza"));
    });

    document.getElementById("filter-wine").addEventListener("click", () => {
        mostrarBebidas(bebidas.filter((b) => b.category === "Vino"));
    });

    document.getElementById("filter-aperitif").addEventListener("click", () => {
        mostrarBebidas(bebidas.filter((b) => b.category === "Aperitivo"));
    });

    document.getElementById("filter-soda").addEventListener("click", () => {
        mostrarBebidas(bebidas.filter((b) => b.category === "Gaseosa"));
    });

    document.getElementById("filter-energy").addEventListener("click", () => {
        mostrarBebidas(bebidas.filter((b) => b.category === "Energizantes"));
    });

    document.getElementById("clear-filters").addEventListener("click", () => {
        mostrarBebidas(bebidas);
    });

    bebidasContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-to-cart")) {
            const bebidaId = parseInt(event.target.dataset.id, 10);
            const seleccionarBebida = bebidas.find((b) => b.id === bebidaId);
            carrito.push(seleccionarBebida);
            updateCart();
            showSuccessMessage(`${seleccionarBebida.name} añadido al carrito!`);
        }
    });

    document.getElementById("clear-cart").addEventListener("click", () => {
        carrito = [];
        updateCart();
        localStorage.removeItem("cart");
    });
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
    localStorage.setItem("cart", JSON.stringify(carrito));
}

function showSuccessMessage(message) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "green",
        stopOnFocus: true,
    }).showToast();
}


function loadCartFromLocalStorage() {
    const guardarCarrito = localStorage.getItem("cart");
    if (guardarCarrito) {
        carrito = JSON.parse(guardarCarrito);
        updateCart();
    }
}

cargarBebidas();
loadCartFromLocalStorage();




