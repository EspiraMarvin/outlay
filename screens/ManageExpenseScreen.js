import { useLayoutEffect } from "react"
import { View, StyleSheet, Text } from "react-native"

// import { useNavigation } from "@react-navigation/native"
import { EXPENSES } from "../data/expenses"

export default function ManageExpenseScreen({ route, navigation }) {
  console.log("navigation", navigation)

  const editedExpenseId = route?.params?.expenseId
  console.log("editedExpenseId", editedExpenseId)
  const isEditting = !!editedExpenseId
  console.log("isEditting", isEditting)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditting ? "Edit Expense" : "Add Expense",
    })
  }, [navigation, isEditting])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ManageExpenseScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
  },
})
