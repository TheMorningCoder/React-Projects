// App.js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import ContactListScreen from "./screens/ContactListScreen";
import FavoriteContactsScreen from "./screens/FavoriteContactsScreen";
import AddContactScreen from "./screens/AddContactScreen";
import UpdateContactScreen from "./screens/UpdateContactScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function ContactStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactList"
        component={ContactListScreen}
        options={{ title: "Contact List" }}
      />
      <Stack.Screen
        name="AddContact"
        component={AddContactScreen}
        options={{ title: "Add New Contact" }}
      />
      <Stack.Screen
        name="UpdateContact"
        component={UpdateContactScreen}
        options={{ title: "Update Contact" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Contacts">
        <Drawer.Screen name="Contacts" component={ContactStack} />
        <Drawer.Screen
          name="Favorites"
          component={FavoriteContactsScreen}
          options={{ title: "Favorite Contacts" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
