const KEY_FAVORITOS = "favoritos";
const KEY_HISTORIAL = "historial";

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