import { useContext, useEffect, useState } from "react"

import { ExpenseContext } from "../store/context/expenses-context"

import ExpensesOutput from "../components/expenses/ExpensesOutput"
import { getDateMinusDays } from "../utils/date"
import { fetchExpenses } from "../store/context/http"
import LoadingOverlay from "../components/ui/LoadingOverlay"
import ErrorOverlay from "../components/ui/ErrorOverlay"

export default function RecentExpenseScreen() {
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState(null)
  const { expenses, setExpenses } = useContext(ExpenseContext)

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true)
      try {
        const expenses = await fetchExpenses()
        setExpenses(expenses)
      } catch (err) {
        setError("Could not fetch expenses!")
      } finally {
        setIsFetching(false)
      }
    }

    getExpenses()
  }, [])

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date()
    // get dates from today and the last 7 days
    const date7daysAgo = getDateMinusDays(today, 7)

    return expense.date >= date7daysAgo && expense.date <= today
  })

  function errorHandler() {
    setError(null)
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={recentExpenses}
      fallbackText="No expenses registered for the last 7 days!"
    />
  )
}
