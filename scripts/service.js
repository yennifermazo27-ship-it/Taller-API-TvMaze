const BASE = "https://api.tvmaze.com";

export async function searchShows(query) {
    try {
        const res = await fetch(`${BASE}/search/shows?q=${query}`);
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getShows() {
    try {
        const res = await fetch(`${BASE}/shows?page=0`);
        const data = await res.json();
        return data.map(show => ({ show }));
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getShowById(id) {
    try {
        const res = await fetch(`${BASE}/shows/${id}`);
        return await res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}