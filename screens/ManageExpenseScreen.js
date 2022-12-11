import { useLayoutEffect } from "react"
import { View, StyleSheet, Text } from "react-native"
import Button from "../components/ui/Button"
import IconButton from "../components/ui/IconButton"
import { GlobalStyles } from "../constants/styles"

import { EXPENSES } from "../data/expenses"

export default function ManageExpenseScreen({ route, navigation }) {
  // console.log("navigation", navigation)

  const editedExpenseId = route?.params?.expenseId
  // console.log("editedExpenseId", editedExpenseId)
  const isEditting = !!editedExpenseId
  // console.log("isEditting", isEditting)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditting ? "Edit Expense" : "Add Expense",
      animation: "fade_from_bottom",
    })
  }, [navigation, isEditting])

  const expense = EXPENSES.find((expense) => expense.id === editedExpenseId)

  function deleteExpenseHandler() {
    console.log("hha")
  }

  function cancelHandler() {
    navigation.goBack()
  }

  function AddHandler() {}

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={AddHandler}>
          {isEditting ? "Update" : "Add"}
        </Button>
      </View>

      {isEditting && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onpress={deleteExpenseHandler}
          />
        </View>
      )}
      <Text style={styles.text}></Text>
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
})
