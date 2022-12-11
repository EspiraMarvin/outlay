import { View, StyleSheet, Text } from "react-native"
import ExpensesOutput from "../components/expenses/ExpensesOutput"
import { EXPENSES } from "../data/expenses"

export default function RecentExpenseScreen() {
  return <ExpensesOutput expensesPeriod="Last 7 days" expenses={EXPENSES} />
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
})
