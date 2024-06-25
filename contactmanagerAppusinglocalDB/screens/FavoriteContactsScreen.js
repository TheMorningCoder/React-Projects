// screens/FavoriteContactsScreen.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
export default function FavoriteContactsScreen() {
  const [favoriteContacts, setFavoriteContacts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFavoriteContacts = async () => {
      const storedContacts = await AsyncStorage.getItem("contacts");
      if (storedContacts) {
        const contacts = JSON.parse(storedContacts);
        const favorites = contacts.filter((contact) => contact.isFavorite);
        setFavoriteContacts(favorites);
      }
    };
    fetchFavoriteContacts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchAndUpdateContacts = async () => {
        const storedContacts = await AsyncStorage.getItem("contacts");
        if (storedContacts) {
          const contacts = JSON.parse(storedContacts);
          const favorites = contacts.filter((contact) => contact.isFavorite);
          setFavoriteContacts(favorites);
        }
      };
      fetchAndUpdateContacts();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteContacts.sort((a, b) => a.name.localeCompare(b.name))}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UpdateContact", { contact: item })
            }
          >
            <View style={styles.contactItem}>
              <Text>{item.name}</Text>
              {item.photo && (
                <Image
                  source={{ uri: item.photo.uri }}
                  style={styles.contactPhoto}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contactItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
  },
  contactPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 12,
  },
});
