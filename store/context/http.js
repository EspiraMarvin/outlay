import axios from "axios"

import { APP_URL } from "@env"

export async function storeExpense(expenseData) {
  const response = await axios.post(`${APP_URL}/expenses.json`, expenseData)
  const id = response.data.name
  return id
}

export async function fetchExpenses() {
  const response = await axios.get(`${APP_URL}/expenses.json`)

  //   console.log("response data", response.data)

  const expenses = []

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    }
    expenses.push(expenseObj)
  }
  console.log("expenses data", expenses)

  return expenses
}

export function updateExpense(id, expenseData) {
  return axios.put(`${APP_URL}/expenses/${id}.json`, expenseData)
}

export function deleteExpense(id) {
  return axios.delete(`${APP_URL}/expenses/${id}.json`)
}

