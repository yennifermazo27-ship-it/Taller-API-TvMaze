import { obtenerFavoritos, guardarFavoritos } from "./persistence.js";

document.addEventListener("DOMContentLoaded", () => {
    pintarFavoritos();
});

function pintarFavoritos() {
    const contenedor = document.getElementById("tarjetas");
    const favoritos = obtenerFavoritos();

    contenedor.innerHTML = "";

    if (!favoritos || favoritos.length === 0) {
        contenedor.innerHTML = "<p class='mensaje-vacio'>No tienes series favoritas aún </p>";
        return;
    }

    favoritos.forEach(item => {
        const show = item.show;
        const div = document.createElement("div");
        div.classList.add("tarjeta");

        div.innerHTML = `
            <img src="${show.image?.medium || 'https://via.placeholder.com/210x295?text=Sin+imagen'}" alt="${show.name}">
            <h3>${show.name}</h3>
            <p class="generos">${show.genres?.join(", ") || "Sin género"}</p>
            <p class="rating">⭐ ${show.rating?.average ?? "N/A"}</p>
            <div class="tarjeta-botones">
                <a href="show.html?id=${show.id}"><button class="btn-detalle">Ver detalles</button></a>
                <button class="btn-eliminar" data-id="${show.id}">🗑️ Eliminar</button>
            </div>
        `;

        contenedor.appendChild(div);
    });