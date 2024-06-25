import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BudgetEntryScreen from "./BudgetEntryScreen";
import BudgetListScreen from "./BudgetListScreen";

const Stack = createStackNavigator();
// registering navigation for entry and list components of budget screens
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BudgetEntry">
        <Stack.Screen name="BudgetEntry" component={BudgetEntryScreen} />
        <Stack.Screen name="BudgetList" component={BudgetListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
