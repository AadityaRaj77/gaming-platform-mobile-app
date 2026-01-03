import { View, Text, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import NeonButton from "../../components/NeonButton";
import { Input } from "../../components/Input";
import { colors } from "../../theme/colors";
import { api } from "../../lib/api";
import { saveToken } from "../../lib/auth";
import { getMe } from "../../lib/api";

export default function Login() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!identifier || !password) {
      Alert.alert("Missing fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post<{ token: string }>("/auth/login", {
        identifier,
        password,
      });

      await saveToken(res.data.token);

      const me = await getMe();

      if (me.needsProfile) {
        router.replace("/(profile)/create");
      } else {
        router.replace("/");
      }
    } catch (err: any) {
      Alert.alert(
        "Login failed",
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 24 }}>
      <MotiView
        from={{ opacity: 0, translateX: -30 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 500 }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 32,
            fontWeight: "800",
          }}
        >
          LOGIN
        </Text>

        <Text
          style={{
            color: colors.muted,
            marginTop: 8,
            fontSize: 13,
          }}
        >
          Enter the arena
        </Text>

        <View style={{ marginTop: 36, gap: 14 }}>
          <Input
            placeholder="Email or Gamer Tag"
            onChangeText={setIdentifier}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>

        <View style={{ marginTop: 32 }}>
          <NeonButton
            title={loading ? "CONNECTING..." : "LOGIN"}
            onPress={submit}
          />
        </View>

        <Text
          onPress={() => router.replace("/register")}
          style={{
            color: colors.neon,
            textAlign: "center",
            marginTop: 24,
            fontSize: 13,
          }}
        >
          New here? Create Gamer ID
        </Text>
      </MotiView>
    </View>
  );
}
