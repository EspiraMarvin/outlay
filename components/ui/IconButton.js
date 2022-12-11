import { Pressable, StyleSheet, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function IconButton({ icon, color, size, onPress, style }) {
  return (
    <View style={[styles.buttonContainer, style]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <Ionicons name={icon} size={size} color={color} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.5,
  },
})
