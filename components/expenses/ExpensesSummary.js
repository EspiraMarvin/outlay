import React from "react"
import { Text, View, StyleSheet } from "react-native"
import { GlobalStyles } from "../../constants/styles"

export default function ExpensesSummary({ expenses, periodName }) {
  const expensesSum = expenses.reduce((acc, curr) => acc + curr.amount, 0)

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName} </Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    height: 50,
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
  },
  period: {
    fontSize: 14,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
})
