import axios from "axios"

import { APP_URL } from "@env"

export function storeExpense(expenseData) {
  axios.post(`${APP_URL}/expenses.json`, expenseData)
}
