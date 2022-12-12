import { useContext } from "react"

import { ExpenseContext } from "../store/context/expenses-context"

import ExpensesOutput from "../components/expenses/ExpensesOutput"
import { getDateMinusDays } from "../utils/date"

export default function RecentExpenseScreen() {
  const { expenses } = useContext(ExpenseContext)

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date()

    // get dates from today and the last 7 days
    const date7daysAgo = getDateMinusDays(today, 7)

    // return expense.date <= today
    return expense.date <= date7daysAgo || expense.date <= today
    // return expense.date >= date7daysAgo && expense.date <= today
    // return expense.date < date7daysAgo
  })

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={recentExpenses}
      fallbackText="No expenses registered for the last 7 days!"
    />
  )
}

