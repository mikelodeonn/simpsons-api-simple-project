import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function CharacterCard({ character, onPress }) {
  const imageUrl = `https://thesimpsonsapi.com${character.portrait_path}`;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>{character.name}</Text>
      {character.occupation && (
        <Text style={styles.occupation}>{character.occupation}</Text>
      )}
      {character.age && <Text style={styles.age}>Edad: {character.age}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    elevation: 3
  },
  image: {
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