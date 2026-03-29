// Importación de hooks de React para manejar estado y ciclo de vida del componente
import { useEffect, useState } from "react";

// Importación de componentes de interfaz desde React Native
import { View, FlatList, ActivityIndicator, SafeAreaView, Text, StyleSheet } from "react-native";

// Importación del componente que muestra cada personaje en forma de tarjeta
import CharacterCard from "../components/CharacterCard";

// Importación de la función que obtiene los personajes desde la API
import { getCharacters } from "../services/api";

export default function HomeScreen({ navigation }) {

  // Estado que almacena la lista de personajes obtenidos de la API
  const [characters, setCharacters] = useState([]);

  // Estado que controla si la aplicación sigue cargando datos
  const [loading, setLoading] = useState(true);

  // Hook que se ejecuta cuando el componente se monta por primera vez
  useEffect(() => {
    loadCharacters();
  }, []);

  // Función que solicita los personajes a la API
  const loadCharacters = async () => {
    const data = await getCharacters(); // Llamada al servicio que consulta la API
    setCharacters(data); // Guarda los personajes en el estado
    setLoading(false); // Indica que la carga ha finalizado
  };

  // Mientras los datos se están cargando se muestra un indicador de progreso
  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Título de la pantalla */}
      <Text style={styles.header}>Personajes de Los Simpsons</Text>

      {/* Lista que renderiza los personajes obtenidos */}
      <FlatList
        data={characters} // Datos que se mostrarán en la lista
        keyExtractor={(item) => item.id?.toString()} // Identificador único para cada elemento

        renderItem={({ item }) => (
          <CharacterCard
            character={item} // Información del personaje que se mostrará en la tarjeta
            onPress={() =>
              navigation.navigate("Detail", { characterId: item.id })
            }
            // Navegación hacia la pantalla de detalle enviando el id del personaje
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#462c4a",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    padding: 20,
    color: '#eeff07',
    textAlign: 'center',
  }
});