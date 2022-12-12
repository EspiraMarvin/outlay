import { createContext, useReducer } from "react"
import { EXPENSES } from "../../data/expenses"

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  updateExpense: (id, { description, amount, date }) => {},
  deleteExpense: (id) => {},
})

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state]
    case "SET":
      const inverted = action.payload.reverse()
      return inverted
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
  const [expensesState, dispatch] = useReducer(expensesReducer, [])

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData })
  }

  const setExpenses = (expenses) => {
    dispatch({ type: "SET", payload: expenses })
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
    setExpenses,
    updateExpense,
    deleteExpense,
  }

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  )
}

export default ExpenseContextProvider
