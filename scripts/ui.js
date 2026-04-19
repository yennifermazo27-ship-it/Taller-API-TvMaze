import { getState, setState } from "./state.js";
import { loadSeries } from "./service.js";

export function addSearchEvent() {
    document.getElementById("search-btn").addEventListener("click", async () => {
        const value = document.getElementById("search").value;
        setState("query", value);
        setState("page", 1);

        await loadSeries();
        render();
    });
    document.getElementById("search").addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
        document.getElementById("search-btn").click();
    }
    });
}

export function addPrevPageBtnEvent(action) {
    document.getElementById("prev-btn").addEventListener("click", async () => {
        await action();
        render();
    });
}

export function addNextPageBtnEvent(action) {
    document.getElementById("next-btn").addEventListener("click", async () => {
        await action();
        render();
    });
}

// SELECT
export function addSelectEvent() {
    const select = document.getElementById("items-per-page");

    select.addEventListener("change", async (e) => {
        setState("limit", Number(e.target.value));
        setState("page", 1);
        await loadSeries();
        render();
    });
}

function getSerieCard(item) {
    const show = item.show;

    const image = show.image?.medium || "";
    const name = show.name;
    const genres = show.genres?.join(", ") || "N/A";
    const rating = show.rating?.average || "Sin rating";

    return `
    <div class="serie-card">
        <img class="obra" src="${image}" />
        <h2>${name}</h2>
        <div class="info">
            <p><strong>Género:</strong> ${genres}</p>
            <p><strong>Rating:</strong> ⭐ ${rating}</p>
        </div>
    </div>`;
}

export function render() {
    const container = document.getElementById("galeria");
    const loader = document.getElementById("loader");
    const errorDiv = document.getElementById("error");
    const pageInfo = document.getElementById("page-info");

    const series = getState("series");
    const loading = getState("loading");
    const error = getState("error");
    const page = getState("page");
    const totalPages = getState("totalPages");

    // Loader
    loader.style.display = loading ? "block" : "none";

    // Error
    if (error) {
    container.innerHTML = ""; // limpiar galería
    errorDiv.textContent = error;

    return;
    } else {
        errorDiv.textContent = "";
    }

    // Render
    container.innerHTML = "";
    series.forEach((s) => {
        container.innerHTML += getSerieCard(s);
    });

    // Info página
    pageInfo.textContent = `Página ${page} de ${totalPages}`;

    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const prev10Btn = document.getElementById("prev-10-btn");
    const next10Btn = document.getElementById("next-10-btn");

    prevBtn.disabled = page <= 1;
    prev10Btn.disabled = page <= 1;

    nextBtn.disabled = page >= totalPages;
    next10Btn.disabled = page >= totalPages;

    if (loading) {
    container.innerHTML = "";
    }
}

export function addNext10BtnEvent(action) {
    document.getElementById("next-10-btn").addEventListener("click", async () => {
        await action();
        render();
    });
}

export function addPrev10BtnEvent(action) {
    document.getElementById("prev-10-btn").addEventListener("click", async () => {
        await action();
        render();
    });
}

export function addGenreFilterEvent() {
    const select = document.getElementById("genre-filter");

    select.addEventListener("change", async (e) => {
        setState("genre", e.target.value);
        setState("page", 1);
        await loadSeries();
        render();
    });
}