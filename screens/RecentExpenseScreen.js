import { useContext } from "react"
import { ExpenseContext } from "../store/context/expenses-context"

import ExpensesOutput from "../components/expenses/ExpensesOutput"
import { getDateMinusDays } from "../utils/date"

export default function RecentExpenseScreen() {
  const { expenses } = useContext(ExpenseContext)

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date()
    const date7daysAgo = getDateMinusDays(today, 7)

    // if expense date is greater than date7daysAgo, means the date is recent/between the last 7 days
    return expense.date > date7daysAgo
  })

  return (
    <ExpensesOutput expensesPeriod="Last 7 days" expenses={recentExpenses} />
  )
}
