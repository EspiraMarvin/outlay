import { View, Text, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import ExpensesList from "./ExpensesList"
import ExpensesSummary from "./ExpensesSummary"
import { GlobalStyles } from "../../constants/styles"

export default function ExpensesOutput({ expenses, expensesPeriod }) {
  const navigation = useNavigation()

  function goToSpecificExpense(item) {
    navigation.navigate("ManageExpense", { id: item.id, item: item })
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList expenses={expenses} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    backgroundColor: GlobalStyles.colors.primary800,
  },
})
