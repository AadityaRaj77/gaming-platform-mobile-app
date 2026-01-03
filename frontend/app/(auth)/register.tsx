import { View, Text } from "react-native";
import { useState } from "react";
import NeonButton from "../../components/NeonButton";
import { Input } from "../../components/Input";
import { colors } from "../../theme/colors";
import { api } from "../../lib/api";
import { useRouter } from "expo-router";
import { saveToken } from "../../lib/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = async () => {
    if (!email || !username || !password) {
      return;
    }

    const res = await api.post<{ token: string }>("/auth/register", {
      email,
      username,
      password,
    });

    await saveToken(res.data.token);

    router.replace("/(profile)/create");
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 24 }}>
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: "800" }}>
        CREATE GAMER ID
      </Text>

      <View style={{ marginTop: 32, gap: 14 }}>
        <Input placeholder="Email" onChangeText={setEmail} />
        <Input placeholder="Gamer Tag" onChangeText={setUsername} />
        <Input
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>

      <View style={{ marginTop: 32 }}>
        <NeonButton title="ENTER ARENA" onPress={submit} />
      </View>
    </View>
  );
}
