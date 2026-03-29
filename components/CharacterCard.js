import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
// Importación de componentes básicos de la interfaz desde React Native

export default function CharacterCard({ character, onPress }) {
  // Componente funcional que recibe un objeto "character" y una función "onPress"

  const imageUrl = `https://cdn.thesimpsonsapi.com/500${character.portrait_path}`;
  // Construcción dinámica de la URL de la imagen del personaje usando la ruta proporcionada por la API

  console.log("IMAGE URL:", imageUrl);
  // Mensaje de depuración para verificar la URL generada de la imagen

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Contenedor táctil que permite seleccionar el personaje */}

      <Image source={{ uri: imageUrl }} style={styles.image} />
      {/* Muestra la imagen del personaje obtenida desde la API */}

      <Text style={styles.title} numberOfLines={2}>{character.name}</Text>
      {/* Muestra el nombre del personaje y limita el texto a dos líneas */}

      {character.occupation && (
        <Text style={styles.occupation}>{character.occupation}</Text>
      )}
      {/* Muestra la ocupación del personaje solo si existe */}

      {character.age && <Text style={styles.age}>Edad: {character.age}</Text>}
      {/* Muestra la edad del personaje únicamente si la información está disponible */}

    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#d3bce6",
    padding: 10,
    marginStart: 30,
    marginEnd: 30,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5,
    alignContent: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain"
  },
  title: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "600"
  },
  occupation: {
    fontSize: 13,
    color: "#555",
    marginTop: 4
  },
  age: {
    fontSize: 13,
    color: "#666",
    marginTop: 2
  }
});