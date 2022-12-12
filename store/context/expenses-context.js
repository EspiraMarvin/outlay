import { createContext, useState, useReducer } from "react"
import { EXPENSES } from "../../data/expenses"

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  updateExpense: (id, { description, amount, date }) => {},
  deleteExpense: (id) => {},
})

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      console.log("expenses data to add", action.payload.expenseData)
      // return [action.payload.expenseData, ...expensesState]
      return [{ ...action.payload }, state]
    case "UPDATE":
      const updateExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      ) // find index to update
      const updatableExpense = state[updateExpenseIndex] // find item to update by index
      const updatedItem = { ...updatableExpense, ...action.payload.data } // create new updated item
      const updatedExpenses = [...state]
      updatableExpense[updateExpenseIndex] = updatedItem // update item
      // const updatedExpenses = [...state]
      return updatedExpenses
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload)
    default:
      return state
  }
}

const ExpenseContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, EXPENSES)

  const addExpense = (expenseData) => {
    const id = Math.floor(Math.random() * 100) // gen random id
    expenseData.id = id
    dispatch({ type: "ADD", payload: expenseData })
  }

  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } })
  }

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id })
  }

  const value = {
    expenses: expensesState,
    addExpense,
    updateExpense,
    deleteExpense,
  }

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  )
}

export default ExpenseContextProvider
