import { StatusBar } from "expo-status-bar"
import { StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import AppNavigation from "./navigations/AppNavigation"
import ExpenseContextProvider from "./store/context/expenses-context"

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor="black" />
      <ExpenseContextProvider>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </ExpenseContextProvider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
