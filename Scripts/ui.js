import { state } from "./state.js";
import { searchShows, getShows } from "./service.js";
import { guardarFavoritos, obtenerFavoritos, agregarAlHistorial, obtenerHistorial, guardarPorPagina, obtenerPorPagina } from "./persistence.js";

export function initUI() {
    const form = document.getElementById("formPelis");
    const input = document.getElementById("pelicula");
    const contenedor = document.querySelector(".tarjetas");
    const btnFavoritos = document.getElementById("favoritos");
    const btnPrev = document.getElementById("btnPrev");
    const btnNext = document.getElementById("btnNext");

    state.favoritos = obtenerFavoritos();
    state.porPagina = obtenerPorPagina();

    const btnActivo = document.querySelector(`.btn-por-pagina[data-val='${state.porPagina}']`);
    if (btnActivo) btnActivo.classList.add("activo");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const query = input.value.trim();
        if (!query) return;
        agregarAlHistorial(query);
        const data = await searchShows(query);
        state.results = data;
        state.query = query;
        state.viendoFavoritos = false;
        state.filtroGenero = "Todos";
        state.paginaActual = 1;
        state.resultadosFiltrados = data;
        pintarHistorial(input, contenedor);
        pintarFiltros(contenedor);
        renderPagina(contenedor);
    });

    input.addEventListener("input", async () => {
        if (input.value.trim() === "") {
            const data = await getShows();
            state.results = data;
            state.resultadosFiltrados = data;
            state.viendoFavoritos = false;
            state.filtroGenero = "Todos";
            state.paginaActual = 1;
            pintarFiltros(contenedor);
            renderPagina(contenedor);
        }
    });

    contenedor.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-favorito")) {
            const id = e.target.dataset.id;
            const serie = state.resultadosFiltrados.find(s => s.show.id == id);
            if (!serie) return;
            const yaExiste = state.favoritos.some(f => f.show.id == id);
            if (yaExiste) { alert("Ya está en favoritos"); return; }
            state.favoritos.push(serie);
            guardarFavoritos(state.favoritos);
            alert("Agregado a favoritos ❤️");
        }
    });

    btnFavoritos.addEventListener("click", () => {
        window.location.href = "favorites.html";
    });

    btnPrev.addEventListener("click", () => {
        if (state.paginaActual > 1) {
            state.paginaActual--;
            renderPagina(contenedor);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });

    btnNext.addEventListener("click", () => {
        const totalPaginas = Math.ceil(state.resultadosFiltrados.length / state.porPagina);
        if (state.paginaActual < totalPaginas) {
            state.paginaActual++;
            renderPagina(contenedor);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });

    document.querySelectorAll(".btn-por-pagina").forEach(btn => {
        btn.addEventListener("click", () => {
            state.porPagina = parseInt(btn.dataset.val);
            guardarPorPagina(state.porPagina);
            state.paginaActual = 1;
            document.querySelectorAll(".btn-por-pagina").forEach(b => b.classList.remove("activo"));
            btn.classList.add("activo");
            renderPagina(contenedor);
        });
    });
}

export async function cargarInicio() {
    const contenedor = document.querySelector(".tarjetas");
    const input = document.getElementById("pelicula");
    contenedor.innerHTML = "<p style='color:#F0C040;text-align:center'>Cargando...</p>";
    const data = await getShows();
    state.results = data;
    state.resultadosFiltrados = data;
    state.viendoFavoritos = false;
    state.paginaActual = 1;
    pintarHistorial(input, contenedor);
    pintarFiltros(contenedor);
    renderPagina(contenedor);
}

function pintarHistorial(input, contenedor) {
    const historialDiv = document.getElementById("historial");
    const historial = obtenerHistorial();
    historialDiv.innerHTML = "";

    if (historial.length === 0) return;

    const titulo = document.createElement("p");
    titulo.textContent = "Búsquedas recientes:";
    titulo.classList.add("historial-titulo");
    historialDiv.appendChild(titulo);

    const lista = document.createElement("div");
    lista.classList.add("historial-lista");

    historial.forEach(q => {
        const btn = document.createElement("button");
        btn.textContent = q;
        btn.classList.add("btn-historial");
        btn.addEventListener("click", async () => {
            input.value = q;
            agregarAlHistorial(q);
            const data = await searchShows(q);
            state.results = data;
            state.resultadosFiltrados = data;
            state.query = q;
            state.filtroGenero = "Todos";
            state.paginaActual = 1;
            pintarHistorial(input, contenedor);
            pintarFiltros(contenedor);
            renderPagina(contenedor);
        });
        lista.appendChild(btn);
    });

    historialDiv.appendChild(lista);
}