import { useState } from "react"
import { View, StyleSheet, Text } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import { getFormattedDate } from "../../utils/date"

import Button from "../ui/Button"
import Input from "./Input"

export default function ExpenseForm({
  defaultValues,
  submitButtonLabel,
  onCancel,
  onSubmit,
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : "",
      isValid: true,
    },
  })

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currInputs) => {
      return {
        ...currInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      }
    })
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value, //+ converts string to a number
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== "Invalid Date"
    const descriptionIsValid = expenseData.description.trim().length > 0

    // validation
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currInputs) => {
        return {
          amount: { value: currInputs.amount.value, isValid: amountIsValid },
          date: { value: currInputs.date.value, isValid: dateIsValid },
          description: {
            value: currInputs.description.value,
            isValid: descriptionIsValid,
          },
        }
      })
      return
    }

    onSubmit(expenseData)
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            // onChangeText: inputChangedHandler.bind(this, "amount"),
            onChangeText: (enteredValue) =>
              inputChangedHandler("amount", enteredValue),
            value: inputs.amount.value,
          }}
          style={{ flex: 1 }}
        />

        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYY-MM-DD",
            maxLength: 10,
            onChangeText: (enteredValue) =>
              inputChangedHandler("date", enteredValue),
            value: inputs.date.value,
          }}
          style={{ flex: 1 }}
        />
      </View>

      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          onChangeText: (enteredValue) =>
            inputChangedHandler("description", enteredValue),
          multiline: true,
          autoCapitalize: "sentences",
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 24,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
})
