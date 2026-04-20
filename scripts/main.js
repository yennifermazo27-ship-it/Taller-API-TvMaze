import {
    loadSeries,
    goPrevPage,
    goNextPage,
    goNext10Pages,
    goPrev10Pages
} from "./service.js";

import {
    render,
    addNextPageBtnEvent,
    addPrevPageBtnEvent,
    addNext10BtnEvent,
    addPrev10BtnEvent,
    addSelectEvent,
    addSearchEvent,
    addGenreFilterEvent
} from "./ui.js";

import { setState } from "./state.js";

async function startApp() {
    // 🔥 Recuperar limit guardado
    const savedLimit = localStorage.getItem("limit"); 
    if (savedLimit) { 
        setState("limit", Number(savedLimit)); 
    // actualizar el select visualmente 
        document.getElementById("items-per-page").value = savedLimit; 
    }
    addPrevPageBtnEvent(goPrevPage);
    addNextPageBtnEvent(goNextPage);

    addPrev10BtnEvent(goPrev10Pages);
    addNext10BtnEvent(goNext10Pages);

    addSelectEvent();
    addSearchEvent();
    addGenreFilterEvent();

    await loadSeries();
    render();
}

startApp();