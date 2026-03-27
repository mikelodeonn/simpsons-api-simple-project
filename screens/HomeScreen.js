import { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, SafeAreaView, Text, StyleSheet } from "react-native";
import CharacterCard from "../components/CharacterCard";
import { getCharacters } from "../services/api";

export default function HomeScreen({ navigation }) {

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    const data = await getCharacters();
    setCharacters(data);
    setLoading(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Personajes de Los Simpsons</Text>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={() =>
              navigation.navigate("Detail", { characterId: item.id })
            }
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