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

async function startApp() {
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