import { useState } from "react"
import { View, StyleSheet, Text } from "react-native"
import Input from "./Input"

export default function ExpenseForm() {
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: "",
  })

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((currInputValues) => {
      return {
        ...currInputValues,
        [inputIdentifier]: enteredValue,
      }
    })
  }
  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: () => inputChangedHandler("amount"),
            value: inputValues.amount,
          }}
          style={{ flex: 1 }}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYY-MM-DD",
            maxLength: 10,
            onChangeText: () => inputChangedHandler("date"),
            value: inputValues.date,
          }}
          style={{ flex: 1 }}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          onChangeText: () => inputChangedHandler("description"),
          multiline: true,
          autoCapitalize: "sentences",
          value: inputValues.description,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 30,
  },
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 24,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
})
