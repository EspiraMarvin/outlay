import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { GlobalStyles } from "../../constants/styles"
import { getFormattedDate } from "../../utils/date"

export default function ExpenseItem({ id, description, date, amount }) {
  const navigation = useNavigation()

  function goToSpecificExpense() {
    const item = {
      id,
      description,
      date,
      amount,
    }
    navigation.navigate("ManageExpense", { id: item.id, item: item })
  }

  return (
    <Pressable
      style={({ pressed }) => [pressed ? styles.pressed : null]}
      onPress={() => goToSpecificExpense()}
      //   android_ripple={{ color: "#ccc" }}
    >
      <View style={styles.expenseItem}>
        <View style={styles.leftItems}>
          <Text style={[styles.text, styles.description]}>{description}</Text>
          <Text style={styles.text}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.6,
  },
  expenseItem: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  leftItems: {
    justifyContent: "center",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
  text: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 15,
    marginBottom: 4,
    fontWeight: "bold",
  },
  button: { flex: 1 },
})
