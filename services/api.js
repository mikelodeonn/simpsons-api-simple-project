const BASE_URL = "https://thesimpsonsapi.com/api";

export const getCharacters = async () => {
    try {
        const response = await fetch(`${BASE_URL}/characters?limit=50`);
        const data = await response.json();

        const characters = data.results || data; // Si no existe "results", usa el array directo
        console.log(`✅ Personajes extraídos: ${characters.length}`);

        return characters;
    } catch (error) {
        console.error("Error fetching characters: ", error);
        return [];
    }

}

export const getCharacterById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/characters/${id}`);
        const data = await response.json();

        console.log(`✅ Personaje cargado: ${data.name || 'Sin nombre'}`);
        console.log("Datos completos:", data);

        return data;
    } catch (error) {
        console.error("Error fetching character:", error);
        return null;
    }
};