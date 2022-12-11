import { StatusBar } from "expo-status-bar"
import { StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import AppNavigation from "./navigations/AppNavigation"

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor="black" />
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
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
