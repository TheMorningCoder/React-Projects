import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { addItem } from "./budgetSlice";
import { useNavigation } from "@react-navigation/native";
import { Appbar, TextInput as PaperInput } from "react-native-paper";

const BudgetEntryScreen = () => {
  const [name, setName] = useState("");
  const [planned, setPlanned] = useState("");
  const [actual, setActual] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  /**
   * function to dispatch action to update state and save new budget entry
   */
  const handleSave = () => {
    if (name && planned && actual) {
      dispatch(
        addItem({
          name,
          planned: parseFloat(planned),
          actual: parseFloat(actual),
        })
      );
      setName("");
      setPlanned("");
      setActual("");
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Budget Entry" />
      </Appbar.Header>
      <PaperInput
        label="Name of the item"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <PaperInput
        label="Planned amount"
        value={planned}
        onChangeText={setPlanned}
        keyboardType="numeric"
        style={styles.input}
      />
      <PaperInput
        label="Actual amount"
        value={actual}
        onChangeText={setActual}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Save" onPress={handleSave} />
      <Button
        title="Show Items"
        onPress={() => navigation.navigate("BudgetList")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
});

export default BudgetEntryScreen;
