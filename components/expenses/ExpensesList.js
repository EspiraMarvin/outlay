import { View, StyleSheet, FlatList } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import ExpenseItem from "./ExpenseItem"

export default function ExpensesList({ expenses }) {
  function renderExpenseItem(itemData) {
    return <ExpenseItem {...itemData.item} />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item, index) => item.id}
        renderItem={renderExpenseItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary800,
  },
})
