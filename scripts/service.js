import { setState, getState } from "./state.js";
import { render } from "./ui.js";

const URL = "https://api.tvmaze.com/search/shows?q=";

const termino = getState("query");

export async function loadArtworks() {
    try {
        setState("loading", true);
        setState("error", null);
        render();

        const page = getState("page");
        const limit = getState("limit");

        // Puedes cambiar el término de búsqueda aquí
        const termino = "batman";

        const res = await fetch(`${URL}${termino}`);

        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
        }

        const data = await res.json();

        // 🔥 IMPORTANTE: TVMaze no tiene paginación, así que simulamos
        const start = (page - 1) * limit;
        const end = start + limit;

        const paginated = data.slice(start, end);

        setState("artworks", paginated);
        setState("totalPages", Math.ceil(data.length / limit));

    } catch (error) {
        setState("error", "❌ Error al cargar datos de TVMaze");
    } finally {
        setState("loading", false);
        render();
    }
}

export async function goNextPage() {
    const currentPage = getState("page");
    const totalPages = getState("totalPages");

    if (currentPage < totalPages) {
        setState("page", currentPage + 1);
        await loadArtworks();
    }
}

export async function goPrevPage() {
    const currentPage = getState("page");

    if (currentPage > 1) {
        setState("page", currentPage - 1);
        await loadArtworks();
    }
}

export async function goNext10Pages() {
    const currentPage = getState("page");
    const totalPages = getState("totalPages");

    let newPage = currentPage + 10;

    if (newPage > totalPages) {
        newPage = totalPages;
    }

    setState("page", newPage);
    await loadArtworks();
}

export async function goPrev10Pages() {
    const currentPage = getState("page");

    let newPage = currentPage - 10;

    if (newPage < 1) {
        newPage = 1;
    }

    setState("page", newPage);
    await loadArtworks();
}