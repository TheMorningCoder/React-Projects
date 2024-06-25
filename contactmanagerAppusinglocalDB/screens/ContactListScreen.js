// screens/ContactListScreen.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useFocusEffect } from "@react-navigation/native";
export default function ContactListScreen() {
  const [contacts, setContacts] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchContacts = async () => {
      const storedContacts = await AsyncStorage.getItem("contacts");
      if (storedContacts) setContacts(JSON.parse(storedContacts));
    };
    if (isFocused) {
      fetchContacts();
    }
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      const fetchAndUpdateContacts = async () => {
        const storedContacts = await AsyncStorage.getItem("contacts");
        if (storedContacts) setContacts(JSON.parse(storedContacts));
      };
      fetchAndUpdateContacts();
    }, [])
  );
  const handleDelete = async (key) => {
    const newContacts = contacts.filter((contact) => contact.key !== key);
    setContacts(newContacts);
    await AsyncStorage.setItem("contacts", JSON.stringify(newContacts));
  };

  return (
    <View style={styles.container}>
      <SwipeListView
        data={contacts.sort((a, b) => a.name.localeCompare(b.name))}
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
        renderHiddenItem={({ item }) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnLeft]}
              onPress={() =>
                navigation.navigate("UpdateContact", { contact: item })
              }
            >
              <Text style={styles.backTextWhite}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={() => handleDelete(item.key)}
            >
              <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-150}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddContact")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
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
    backgroundColor: "#fff",
  },
  contactPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 12,
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#007bff",
    borderRadius: 50,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
  backTextWhite: {
    color: "#FFF",
  },
});
