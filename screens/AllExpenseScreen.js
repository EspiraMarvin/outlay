import { StyleSheet } from "react-native"
import { useContext } from "react"
import { ExpenseContext } from "../store/context/expenses-context"

import ExpensesOutput from "../components/expenses/ExpensesOutput"

export default function AllExpenseScreen() {
  // const expensesCtx = useContext(ExpenseContext)
  const { expenses } = useContext(ExpenseContext)

  return (
    <ExpensesOutput
      expensesPeriod="A summary of all your expenses"
      expenses={expenses}
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
