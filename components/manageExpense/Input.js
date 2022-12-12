import { StyleSheet, Text, TextInput, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"
export default function Input({ label, style, textInputConfig }) {
  let inputStyles = [styles.input]

  // check if input has multiline configuration & add multiline style
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles = [inputStyles, styles.inputMultiline]
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
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
})
