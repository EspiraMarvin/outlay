import { StyleSheet, Text, TextInput, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"
export default function Input({ label, invalid, style, textInputConfig }) {
  let inputStyles = [styles.input]

  // check if input has multiline configuration & add multiline style
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles = [inputStyles, styles.inputMultiline]
  }

  // if input invalid add invalid input styles
  if (invalid) {
    inputStyles = [inputStyles, styles.invalidInput]
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 14,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
})
