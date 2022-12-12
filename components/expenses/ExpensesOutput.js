import { View, StyleSheet, Text } from "react-native"
import ExpensesList from "./ExpensesList"
import ExpensesSummary from "./ExpensesSummary"
import { GlobalStyles } from "../../constants/styles"

export default function ExpensesOutput({
  expenses,
  expensesPeriod,
  fallbackText,
}) {
  let expensesCount = expenses.length

  let noExpensesComponent = <Text style={styles.infoText}>{fallbackText}</Text>

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList expenses={expenses} />
      {expensesCount === 0 && noExpensesComponent}
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
  infoText: {
    color: "white",
    fontSize: 18,
    marginTop: 32,
    textAlign: "center",
  },
})
