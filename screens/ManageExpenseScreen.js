import { View, StyleSheet, Text } from "react-native"

export default function ManageExpenseScreen({ route }) {
  // console.log("route params", route.params.item)

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
