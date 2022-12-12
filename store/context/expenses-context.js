import { createContext, useReducer } from "react"
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
      const id = Math.floor(Math.random() * 1000) // gen random id
      return [{ ...action.payload, id: id }, ...state]
    case "UPDATE":
      // find index to update
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      )
      const updatableExpense = state[updatableExpenseIndex] // find item to update by index
      const updatedItem = { ...updatableExpense, ...action.payload.data } // create new updated item
      const updatedExpenses = [...state]
      updatedExpenses[updatableExpenseIndex] = updatedItem // update item
      return updatedExpenses

    // same as above
    /* state.map((expense) => {
      if (expense.id === action.payload.id) {
        const updatedItem = { id: expense.id, ...action.payload.data }
        const updatedExpenses = [...state]
        updatedExpenses[updatableExpenseIndex] = updatedItem // update item
        state[updatableExpenseIndex] = updatedItem
        return state
      }
    })
    */

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload)
    default:
      return state
  }
}

const ExpenseContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, EXPENSES)

  const addExpense = (expenseData) => {
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
