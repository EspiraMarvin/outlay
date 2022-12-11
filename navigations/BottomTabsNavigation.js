import { StyleSheet } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Ionicons } from "@expo/vector-icons"

import { GlobalStyles } from "../constants/styles"

import AllExpenseScreen from "../screens/AllExpenseScreen"
import RecentExpenseScreen from "../screens/RecentExpenseScreen"
import ManageExpenseScreen from "../screens/ManageExpenseScreen"
import IconButton from "../components/ui/IconButton"

const Stack = createNativeStackNavigator()
const BottomTab = createBottomTabNavigator()

function ExpensesOverview() {
  const goToManageExpenseScreen = () => {}

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarActiveTintColor: GlobalStyles.colors.primary500,
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          height: 58,
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarLabelPosition: "below-icon",
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarLabelStyle: [styles.tabBarLabel],
        headerRight: () => {
          return (
            <IconButton
              icon="add"
              onPress={goToManageExpenseScreen}
              color="white"
              size={24}
              style={{ paddingRight: 10 }}
            />
          )
        },
      }}
    >
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpenseScreen}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="hourglass"
              color={color}
              size={size}
              style={{ marginTop: -5 }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpenseScreen}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="calendar"
              color={color}
              size={size}
              style={{ marginTop: -5 }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}

export default function BottomTabsNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#3c0a6b" },
        headerTitleStyle: {
          color: "white",
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="ExpenseOverview"
        component={ExpensesOverview}
        options={{
          animation: "fade_from_bottom",
          title: "Track Your Expenses",
          headerTintColor: "white",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ManageExpense"
        component={ManageExpenseScreen}
        options={{
          title: "Manage Expense",
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBarLabel: {
    height: 20,
    marginTop: -8,
    marginBottom: 5,
    fontSize: 12,
  },
})
