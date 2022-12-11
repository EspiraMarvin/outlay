import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import BottomTabsNavigation from "./navigations/BottomTabsNavigation"

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor="black" />
      <NavigationContainer>
        <BottomTabsNavigation />
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
