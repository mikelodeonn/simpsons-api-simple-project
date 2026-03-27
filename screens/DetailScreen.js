import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { getCharacterById } from "../services/api";

export default function CharacterDetailScreen({ route }) {

  const { characterId } = route.params;

  const [character, setCharacter] = useState(null);

  useEffect(() => {
    loadCharacter();
  }, []);

  const loadCharacter = async () => {
    const data = await getCharacterById(characterId);
    setCharacter(data);
  };

  if (!character) {
    return <Text>Cargando...</Text>;
  }

  const imageUrl = `https://cdn.thesimpsonsapi.com/500${character.portrait_path}`;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: imageUrl }} style={styles.image} />

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{character.name}</Text>

          {character.age && <Text style={styles.info}>Edad: {character.age}</Text>}
          {character.birthdate && <Text style={styles.info}>Fecha de nacimiento: {character.birthdate}</Text>}
          {character.gender && <Text style={styles.info}>Género: {character.gender}</Text>}
          {character.occupation && <Text style={styles.info}>Ocupación: {character.occupation}</Text>}
          {character.status && <Text style={styles.info}>Estado: {character.status}</Text>}

          {character.phrases && character.phrases.length > 0 && (
            <>
              <Text style={styles.descriptionTitle}>Frases icónicas:</Text>
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