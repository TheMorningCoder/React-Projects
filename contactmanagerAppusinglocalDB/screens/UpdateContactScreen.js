// screens/UpdateContactScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function UpdateContactScreen({ route, navigation }) {
  const { contact } = route.params;
  const [name, setName] = useState(contact.name);
  const [mobile, setMobile] = useState(contact.mobile);
  const [landline, setLandline] = useState(contact.landline);
  const [photo, setPhoto] = useState(contact.photo);
  const [isFavorite, setIsFavorite] = useState(contact.isFavorite);

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

  const updateContact = async () => {
    const updatedContact = {
      ...contact,
      name,
      mobile,
      landline,
      photo,
      isFavorite,
    };
    const storedContacts = await AsyncStorage.getItem("contacts");
    const contacts = storedContacts ? JSON.parse(storedContacts) : [];
    const index = contacts.findIndex((c) => c.key === contact.key);
    contacts[index] = updatedContact;
    await AsyncStorage.setItem("contacts", JSON.stringify(contacts));
    navigation.goBack();
  };

  const deleteContact = async () => {
    const storedContacts = await AsyncStorage.getItem("contacts");
    const contacts = storedContacts ? JSON.parse(storedContacts) : [];
    const newContacts = contacts.filter((c) => c.key !== contact.key);
    await AsyncStorage.setItem("contacts", JSON.stringify(newContacts));
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
        <Button title="Update Contact" onPress={updateContact} />
        <Button
          title={isFavorite ? "Unfavorite" : "Favorite"}
          onPress={() => setIsFavorite(!isFavorite)}
        />
        <Button title="Delete Contact" onPress={deleteContact} color="red" />
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
