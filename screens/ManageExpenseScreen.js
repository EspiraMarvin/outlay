import { useContext, useLayoutEffect } from "react"
import { View, StyleSheet, Text } from "react-native"
import ExpenseForm from "../components/manageExpense/ExpenseForm"
import Button from "../components/ui/Button"
import IconButton from "../components/ui/IconButton"
import { GlobalStyles } from "../constants/styles"

import { ExpenseContext } from "../store/context/expenses-context"

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

  const expense = expenses.find((expense) => expense.id === editedExpenseId)

  function deleteExpenseHandler() {
    deleteExpense(editedExpenseId)
    navigation.goBack()
  }

  function confirmHandler() {
    if (isEditting) {
      updateExpense(editedExpenseId, {
        description: "Test!!!",
        amount: 19.98,
        date: new Date("2022-12-09"),
      })
    } else {
      addExpense({
        description: "Test Added",
        amount: 19.98,
        date: new Date("2022-12-10"),
      })
    }
    navigation.goBack()
  }

  function cancelHandler() {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ExpenseForm />

      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditting ? "Update" : "Add"}
        </Button>
      </View>

      {isEditting && (
        <View style={styles.deleteContainer}>
          <Text style={expense.description}></Text>

          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
      {/* <Text style={styles.text}>{expense.description}</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  text: {
    color: "white",
  },
})
