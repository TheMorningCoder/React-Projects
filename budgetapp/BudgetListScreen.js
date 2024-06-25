import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { loadItems } from "./budgetSlice";
import { Appbar, List } from "react-native-paper";

/**
 * dispatch fetch action and load items from async storage
 * @returns list of saved items
 */
const BudgetListScreen = () => {
  const items = useSelector((state) => state.budget.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadItems());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Budget Entry Listing" />
      </Appbar.Header>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={`Planned: ${item.planned}, Actual: ${item.actual}`}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BudgetListScreen;
