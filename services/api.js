// URL base de la API de personajes de The Simpsons
const BASE_URL = "https://thesimpsonsapi.com/api";

// Función para obtener una lista de personajes
export const getCharacters = async () => {
    try {
        // Solicitud HTTP para obtener hasta 50 personajes
        const response = await fetch(`${BASE_URL}/characters?limit=50`);
        
        // Conversión de la respuesta a formato JSON
        const data = await response.json();

        // Algunas APIs devuelven los datos dentro de "results", esta línea asegura compatibilidad
        const characters = data.results || data;

        // Mensaje de verificación en consola
        console.log(`✅ Personajes extraídos: ${characters.length}`);
        
        // Se retorna el arreglo de personajes
        return characters;

    } catch (error) {
        // Manejo de errores en caso de fallo en la petición
        console.error("Error fetching characters: ", error);
        return [];
    }
}

// Función para obtener la información de un personaje específico mediante su ID
export const getCharacterById = async (id) => {
    try {
        // Solicitud HTTP al endpoint del personaje seleccionado
        const response = await fetch(`${BASE_URL}/characters/${id}`);
        
        // Conversión de la respuesta a JSON
        const data = await response.json();

        // Mensajes de depuración para verificar la información recibida
        console.log(`✅ Personaje cargado: ${data.name || 'Sin nombre'}`);
        console.log("Datos completos:", data);

        // Retorna el objeto con la información del personaje
        return data;

    } catch (error) {
        // Manejo de errores si la petición falla
        console.error("Error fetching character:", error);
        return null;
    }
};