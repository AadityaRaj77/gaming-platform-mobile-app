import { Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { colors } from "../theme/colors";

export default function NeonButton({ title, onPress }: any) {
  return (
    <Pressable onPress={onPress}>
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 400 }}
      >
        <LinearGradient
          colors={[colors.neon, "#3aff00"]}
          style={{
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#000", fontWeight: "700", fontSize: 16 }}>
            {title}
          </Text>
        </LinearGradient>
      </MotiView>
    </Pressable>
  );
}
