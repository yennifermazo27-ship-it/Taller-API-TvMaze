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

function pintarFiltros(contenedor) {
    const filtrosDiv = document.getElementById("filtros");
    filtrosDiv.innerHTML = "";

    const generos = ["Todos", ...new Set(state.results.flatMap(item => item.show.genres || []))];

    const titulo = document.createElement("p");
    titulo.textContent = "Filtrar por género:";
    titulo.classList.add("filtros-titulo");
    filtrosDiv.appendChild(titulo);

    const lista = document.createElement("div");
    lista.classList.add("filtros-lista");

    generos.forEach(genero => {
        const btn = document.createElement("button");
        btn.textContent = genero;
        btn.classList.add("btn-filtro");
        if (genero === state.filtroGenero) btn.classList.add("activo");

        btn.addEventListener("click", () => {
            state.filtroGenero = genero;
            state.paginaActual = 1;

            if (genero === "Todos") {
                state.resultadosFiltrados = state.results;
            } else {
                state.resultadosFiltrados = state.results.filter(item =>
                    item.show.genres?.includes(genero)
                );
            }

            document.querySelectorAll(".btn-filtro").forEach(b => b.classList.remove("activo"));
            btn.classList.add("activo");
            renderPagina(contenedor);
        });

        lista.appendChild(btn);
    });

    filtrosDiv.appendChild(lista);
}

function renderPagina(contenedor) {
    const fuente = state.resultadosFiltrados;
    const totalPaginas = Math.ceil(fuente.length / state.porPagina);
    const inicio = (state.paginaActual - 1) * state.porPagina;
    const fin = inicio + state.porPagina;
    const paginadas = fuente.slice(inicio, fin);

    pintarSeries(paginadas, contenedor);
    actualizarControles(totalPaginas);
    pintarNumeroPaginas(totalPaginas);
}

function actualizarControles(totalPaginas) {
    document.getElementById("btnPrev").disabled = state.paginaActual === 1;
    document.getElementById("btnNext").disabled = state.paginaActual === totalPaginas || totalPaginas === 0;
    document.getElementById("indicadorPagina").textContent =
        totalPaginas > 0 ? `Página ${state.paginaActual} de ${totalPaginas}` : "";
}

function pintarNumeroPaginas(totalPaginas) {
    const paginacion = document.getElementById("paginacion");
    paginacion.innerHTML = "";

    const rango = 2;
    const inicio = Math.max(1, state.paginaActual - rango);
    const fin = Math.min(totalPaginas, state.paginaActual + rango);

    if (inicio > 1) {
        agregarBtnPagina(paginacion, 1);
        if (inicio > 2) agregarPuntos(paginacion);
    }

    for (let i = inicio; i <= fin; i++) {
        agregarBtnPagina(paginacion, i);
    }

    if (fin < totalPaginas) {
        if (fin < totalPaginas - 1) agregarPuntos(paginacion);
        agregarBtnPagina(paginacion, totalPaginas);
    }
}

function agregarBtnPagina(contenedor, i) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === state.paginaActual) btn.classList.add("pagina-activa");
    btn.addEventListener("click", () => {
        state.paginaActual = i;
        renderPagina(document.querySelector(".tarjetas"));
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    contenedor.appendChild(btn);
}

function agregarPuntos(contenedor) {
    const pts = document.createElement("span");
    pts.textContent = "...";
    pts.style.color = "#F0C040";
    pts.style.padding = "0 5px";
    pts.style.alignSelf = "center";
    contenedor.appendChild(pts);
}

function pintarSeries(series, contenedor) {
    contenedor.innerHTML = "";
    if (!series || series.length === 0) {
        contenedor.innerHTML = "<p style='color:#F0C040;text-align:center'>No hay resultados</p>";
        return;
    }
    series.forEach(item => {
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
                <button class="btn-favorito" data-id="${show.id}">❤️ Favorito</button>
            </div>
        `;
        contenedor.appendChild(div);
    });
}