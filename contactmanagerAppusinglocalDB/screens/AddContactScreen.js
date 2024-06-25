// screens/AddContactScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function AddContactScreen({ navigation }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [landline, setLandline] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0]);
    }
  };

  const saveContact = async () => {
    const newContact = {
      key: Date.now().toString(),
      name,
      mobile,
      landline,
      photo,
      isFavorite,
    };
    const storedContacts = await AsyncStorage.getItem("contacts");
    const contacts = storedContacts ? JSON.parse(storedContacts) : [];
    contacts.push(newContact);
    await AsyncStorage.setItem("contacts", JSON.stringify(contacts));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Landline"
        value={landline}
        onChangeText={setLandline}
        keyboardType="phone-pad"
      />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {photo && (
        <Image
          source={{ uri: photo.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button title="Save Contact" onPress={saveContact} />
        <Button title="Favorite" onPress={() => setIsFavorite(!isFavorite)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  buttonContainer: {
    marginTop: 12,
  },
});
