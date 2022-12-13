import { useContext, useLayoutEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import ExpenseForm from "../components/manageExpense/ExpenseForm"
import IconButton from "../components/ui/IconButton"
import LoadingOverlay from "../components/ui/LoadingOverlay"
import { GlobalStyles } from "../constants/styles"
import ErrorOverlay from "../components/ui/ErrorOverlay"

import { ExpenseContext } from "../store/context/expenses-context"
import {
  storeExpense,
  updateExpenseFirebase,
  deleteExpenseFirebase,
} from "../store/context/http"

export default function ManageExpenseScreen({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

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
    setIsSubmitting(true)
    try {
      deleteExpense(editedExpenseId)
      await deleteExpenseFirebase(editedExpenseId)
      navigation.goBack()
    } catch (error) {
      setError("Error. Could not delete expense - please try again later")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function confirmHandler(expenseData) {
    if (isEditting) {
      setIsSubmitting(true)
      try {
        updateExpense(editedExpenseId, expenseData)
        await updateExpenseFirebase(editedExpenseId, expenseData)
        navigation.goBack()
      } catch (error) {
        setError("Error. Could not edit the expense - please try again later")
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setIsSubmitting(true)
      try {
        const id = await storeExpense(expenseData)
        addExpense({ ...expenseData, id })
        navigation.goBack()
      } catch (error) {
        setError("Error. Could not save data - please try again later")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  function cancelHandler() {
    navigation.goBack()
  }

  function errorHandler() {
    setError(null)
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  if (isSubmitting) {
    return <LoadingOverlay />
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
