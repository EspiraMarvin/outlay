import { useContext, useLayoutEffect } from "react"
import { View, StyleSheet } from "react-native"
import ExpenseForm from "../components/manageExpense/ExpenseForm"
import IconButton from "../components/ui/IconButton"
import { GlobalStyles } from "../constants/styles"

import { ExpenseContext } from "../store/context/expenses-context"
import {
  storeExpense,
  updateExpenseFirebase,
  deleteExpenseFirebase,
} from "../store/context/http"

export default function ManageExpenseScreen({ route, navigation }) {
  const { expenses, addExpense, updateExpense, deleteExpense } =
    useContext(ExpenseContext)

  const editedExpenseId = route?.params?.expenseId
  const isEditting = !!editedExpenseId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditting ? "Edit Expense" : "Add Expense",
      animation: "fade_from_bottom",
    })
  }, [navigation, isEditting])

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  )

  async function deleteExpenseHandler() {
    deleteExpense(editedExpenseId)
    await deleteExpenseFirebase(editedExpenseId)
    navigation.goBack()
  }

  async function confirmHandler(expenseData) {
    if (isEditting) {
      updateExpense(editedExpenseId, expenseData)
      await updateExpenseFirebase(editedExpenseId, expenseData)
    } else {
      const id = await storeExpense(expenseData)
      addExpense({ ...expenseData, id })
    }
    navigation.goBack()
  }

  function cancelHandler() {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditting ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />

      {isEditting && (
        <View style={styles.deleteContainer}>
          {/* <Text style={expense.description}></Text> */}
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
})
