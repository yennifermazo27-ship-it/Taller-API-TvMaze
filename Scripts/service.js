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