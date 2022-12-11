import { View, StyleSheet, Text } from "react-native"
import ExpensesOutput from "../components/expenses/ExpensesOutput"
import { EXPENSES } from "../data/expenses"

export default function AllExpenseScreen() {
  return (
    <ExpensesOutput
      expensesPeriod="A summary of all your expenses"
      expenses={EXPENSES}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
  },
})
