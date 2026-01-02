import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import NeonButton from "../../components/NeonButton";
import { colors } from "../../theme/colors";

export default function AuthIndex() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#050508", "#0A0A0F"]}
      style={{ flex: 1, justifyContent: "center", padding: 24 }}
    >
      <MotiView
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 700 }}
      >
        <Text
          style={{
            color: colors.neon,
            fontSize: 14,
            letterSpacing: 2,
            marginBottom: 12,
          }}
        >
          WELCOME TO
        </Text>

        <Text
          style={{
            color: colors.text,
            fontSize: 42,
            fontWeight: "900",
            lineHeight: 46,
          }}
        >
          CLAN{"\n"}FORGE
        </Text>

        <Text
          style={{
            color: colors.muted,
            marginTop: 16,
            fontSize: 14,
          }}
        >
          Build your gamer identity. Compete. Dominate.
        </Text>

        <View style={{ marginTop: 48, gap: 16 }}>
          <NeonButton title="LOGIN" onPress={() => router.push("/login")} />
          <NeonButton
            title="REGISTER"
            onPress={() => router.push("/register")}
          />
        </View>
      </MotiView>
    </LinearGradient>
  );
}
