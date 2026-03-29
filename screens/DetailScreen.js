// Importación de hooks de React para manejar estado y ciclo de vida
import { useEffect, useState } from "react";

// Importación de componentes de interfaz desde React Native
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from "react-native";

// Importación de la función que obtiene los datos de un personaje específico desde la API
import { getCharacterById } from "../services/api";

export default function CharacterDetailScreen({ route }) {

  // Obtiene el ID del personaje enviado desde la pantalla anterior
  const { characterId } = route.params;

  // Estado que almacenará la información del personaje
  const [character, setCharacter] = useState(null);

  // Hook que se ejecuta cuando el componente se monta
  useEffect(() => {
    loadCharacter();
  }, []);

  // Función que consulta los datos del personaje en la API
  const loadCharacter = async () => {
    const data = await getCharacterById(characterId);
    setCharacter(data); // Guarda la información recibida en el estado
  };

  // Mientras los datos no estén disponibles se muestra un mensaje de carga
  if (!character) {
    return <Text>Cargando...</Text>;
  }

  // Construcción de la URL de la imagen del personaje
  const imageUrl = `https://cdn.thesimpsonsapi.com/500${character.portrait_path}`;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Imagen principal del personaje */}
        <Image source={{ uri: imageUrl }} style={styles.image} />

        <View style={styles.infoContainer}>
          {/* Nombre del personaje */}
          <Text style={styles.title}>{character.name}</Text>

          {/* Información mostrada solo si existe en los datos */}
          {character.age && <Text style={styles.info}>Edad: {character.age}</Text>}
          {character.birthdate && <Text style={styles.info}>Fecha de nacimiento: {character.birthdate}</Text>}
          {character.gender && <Text style={styles.info}>Género: {character.gender}</Text>}
          {character.occupation && <Text style={styles.info}>Ocupación: {character.occupation}</Text>}
          {character.status && <Text style={styles.info}>Estado: {character.status}</Text>}

          {/* Lista de frases icónicas del personaje */}
          {character.phrases && character.phrases.length > 0 && (
            <>
              <Text style={styles.descriptionTitle}>Frases icónicas:</Text>

              {/* Recorre el arreglo de frases y muestra cada una */}
              {character.phrases.map((phrase, index) => (
                <Text key={index} style={styles.phrase}>• {phrase}</Text>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#462c4a",
  },
  image: {
    height: 250,
    resizeMode: "contain",
    marginBottom: 15
  },
  infoContainer: {
    marginTop: 10,
    backgroundColor: "#d3bce6",
    borderRadius: 12,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: '#eeff07',
  },
  info: {
    fontSize: 16,
    marginTop: 8,
    color: "#393939"
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 10,
    color: '#eeff07',
  },
  phrase: {
    fontSize: 15,
    lineHeight: 22,
    marginVertical: 4,
    color: "#323232",
    fontStyle: "italic"
  }
});