const KEY_FAVORITOS = "favoritos";
const KEY_HISTORIAL = "historial";
const KEY_POR_PAGINA = "porPagina";

export function guardarFavoritos(favoritos) {
    localStorage.setItem(KEY_FAVORITOS, JSON.stringify(favoritos));
}

export function obtenerFavoritos() {
    return JSON.parse(localStorage.getItem(KEY_FAVORITOS)) || [];
}

export function guardarHistorial(historial) {
    localStorage.setItem(KEY_HISTORIAL, JSON.stringify(historial));
}

export function obtenerHistorial() {
    return JSON.parse(localStorage.getItem(KEY_HISTORIAL)) || [];
}

export function agregarAlHistorial(query) {
    let historial = obtenerHistorial();
    historial = historial.filter(q => q !== query);
    historial.unshift(query);
    if (historial.length > 10) historial = historial.slice(0, 10);
    guardarHistorial(historial);
}

export function guardarPorPagina(valor) {
    localStorage.setItem(KEY_POR_PAGINA, valor);
}

export function obtenerPorPagina() {
    return parseInt(localStorage.getItem(KEY_POR_PAGINA)) || 10;
}