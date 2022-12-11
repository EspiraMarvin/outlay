import { createContext, useState } from "react"
import { EXPENSES } from "../../data/expenses"

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: (expense) => {},
  updateExpense: (expense, id) => {},
  deleteExpense: (id) => {},
})

const ExpenseContextProvider = ({ children }) => {
  //   const [expenses, setExpenses] = useState([])
  const [expenses, setExpenses] = useState(EXPENSES)

  const addExpense = (expense) => {
    setExpenses((currExpenses) => [expense, ...currExpenses])
  }

  const updateExpense = (payload, id) => {
    setExpenses((currExpenses) =>
      currExpenses.map((expense) => {
        if (expense.id == id) {
          return (expense = payload)
        }
      })
    )
  }

  const deleteExpense = (id) => {
    // setExpenses((prevExp) => filter())
    // expenses.filter((expense) => expense.id !== id)
    setExpenses((currExpenses) => currExpenses.filter((exp) => exp.id !== id))
  }

  const value = {
    expenses: expenses,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  }

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  )
}

export default ExpenseContextProvider
