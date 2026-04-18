const state = {
    artworks: [],
    page: 1,
    limit: 10,
    totalPages: 0,
    loading: false,
    error: null,
    query: ""
};

export function getState(key) {
    return state[key];
}

export function setState(key, newValue) {
    state[key] = newValue;
}

query: "batman"