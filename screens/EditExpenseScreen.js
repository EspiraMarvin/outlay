import { View, StyleSheet, Text } from "react-native"

export default function ManageExpenseScreen({ route, navigation }) {
  // console.log("route params", route.params.item)
  const item = route.params.item
  const itemId = route.params.id

  return (
    <View style={styles.container}>
      <Text style={styles.text}>EditExpenseScreen</Text>
      <Text style={styles.text}>{itemId}</Text>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text}>{item.price}</Text>
      <Text style={styles.text}>{item.date}</Text>
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
