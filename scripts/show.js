import { getShowById } from "./service.js";
import { obtenerFavoritos, guardarFavoritos } from "./persistence.js";

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return;

    const data = await getShowById(id);
    pintarDetalle(data);
});

function pintarDetalle(show) {
    const contenedor = document.getElementById("detalle");

    contenedor.innerHTML = `
        <img src="${show.image?.original || 'https://via.placeholder.com/500x700?text=Sin+imagen'}">
        <h2>${show.name}</h2>
        <p><strong>Resumen:</strong> ${limpiarHTML(show.summary) || "Sin resumen"}</p>
        <p><strong>Géneros:</strong> ${show.genres?.join(", ") || "Sin género"}</p>
        <p><strong>Rating:</strong> ⭐ ${show.rating?.average ?? "N/A"}</p>
        <p><strong>Idioma:</strong> ${show.language}</p>
        <p><strong>Estado:</strong> ${show.status}</p>
        <p><strong>Fecha de estreno:</strong> ${show.premiered || "N/A"}</p>
        <button class="btn-favorito" id="btnFav">❤️ Agregar a favoritos</button>
    `;

    document.getElementById("btnFav").addEventListener("click", () => {
        let favoritos = obtenerFavoritos();

        const yaExiste = favoritos.some(f => f.show.id == show.id);
        if (yaExiste) {
            alert("Ya está en favoritos");
            return;
        }

        favoritos.push({ show });
        guardarFavoritos(favoritos);
        alert("Agregado a favoritos ❤️");
    });
}

// Quitar etiquetas HTML del summary (porque viene con <p>, <b>, etc)
function limpiarHTML(texto) {
    if (!texto) return "";
    const temp = document.createElement("div");
    temp.innerHTML = texto;
    return temp.textContent || temp.innerText || "";
}