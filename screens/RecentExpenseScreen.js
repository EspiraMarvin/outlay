import { useContext, useEffect } from "react"

import { ExpenseContext } from "../store/context/expenses-context"

import ExpensesOutput from "../components/expenses/ExpensesOutput"
import { getDateMinusDays } from "../utils/date"
import { fetchExpenses } from "../store/context/http"

export default function RecentExpenseScreen() {
  const { expenses, setExpenses } = useContext(ExpenseContext)

  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses()
      setExpenses(expenses)
    }

    getExpenses()
  }, [])

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date()

    // get dates from today and the last 7 days
    const date7daysAgo = getDateMinusDays(today, 7)

    // return expense.date >= date7daysAgo
    return expense.date <= today && expense.date > date7daysAgo
    // return expense.date <= date7daysAgo && expense.date <= today
    // return expense.date >= date7daysAgo || expense.date <= today
  })

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={recentExpenses}
      fallbackText="No expenses registered for the last 7 days!"
    />
  )
}
