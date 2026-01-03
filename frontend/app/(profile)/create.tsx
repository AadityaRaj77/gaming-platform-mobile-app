import {
  useColorScheme,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Colors } from "@/constants/theme";
import { createProfile } from "@/lib/api";
import * as SecureStore from "expo-secure-store";

const GAME_TYPES = [
  "BGMI",
  "VALORANT",
  "CODM",
  "FREE_FIRE",
  "CLASH_ROYALE",
  "OTHER",
];

const GENRES = [
  "BATTLE_ROYALE",
  "CLASH_ROYALE",
  "FIGHTING",
  "RACING",
  "OPEN_WORLD",
  "PLATFORMER",
  "SHOOTER",
  "PUZZLE",
  "FUN",
  "OTHER",
];

export default function CreateProfile() {
  const scheme = useColorScheme() ?? "light";
  const colors = Colors[scheme];

  const [bio, setBio] = useState("");
  const [games, setGames] = useState<any[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleGame = (game: string) => {
    setGames((prev) =>
      prev.some((g) => g.game === game)
        ? prev.filter((g) => g.game !== game)
        : [...prev, { game, gamingId: "", gameName: null }]
    );
  };

  const submit = async () => {
    const token = await SecureStore.getItemAsync("token");
    if (!token) {
      alert("Not authenticated");
      return;
    }

    try {
      setLoading(true);
      await createProfile(token, {
        bio,
        games,
        genres,
        socials: [],
        achievements: [],
      });

      router.replace("/");
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 28,
          fontWeight: "600",
          marginBottom: 16,
        }}
      >
        Create Profile
      </Text>

      {/* BIO */}
      <Text style={{ color: colors.icon, marginBottom: 6 }}>Bio</Text>
      <TextInput
        value={bio}
        onChangeText={setBio}
        placeholder="Tell us about your gaming journey"
        placeholderTextColor={colors.icon}
        style={{
          borderWidth: 1,
          borderColor: colors.icon,
          color: colors.text,
          padding: 12,
          borderRadius: 8,
          marginBottom: 20,
        }}
      />

      {/* GAMES */}
      <Text style={{ color: colors.icon, marginBottom: 6 }}>Games</Text>
      {GAME_TYPES.map((g) => {
        const selected = games.some((x) => x.game === g);
        return (
          <Pressable
            key={g}
            onPress={() => toggleGame(g)}
            style={{
              padding: 12,
              borderRadius: 8,
              marginBottom: 8,
              backgroundColor: selected ? colors.tint : "transparent",
              borderWidth: 1,
              borderColor: colors.icon,
            }}
          >
            <Text style={{ color: selected ? "#000" : colors.text }}>{g}</Text>
          </Pressable>
        );
      })}

      {/* GAMING IDS */}
      {games.map((g, i) => (
        <TextInput
          key={i}
          placeholder={`${g.game} Gaming ID`}
          placeholderTextColor={colors.icon}
          style={{
            borderWidth: 1,
            borderColor: colors.icon,
            color: colors.text,
            padding: 12,
            borderRadius: 8,
            marginBottom: 12,
          }}
          onChangeText={(text) => {
            const copy = [...games];
            copy[i].gamingId = text;
            setGames(copy);
          }}
        />
      ))}

      {/* GENRES */}
      <Text style={{ color: colors.icon, marginVertical: 6 }}>Genres</Text>
      {GENRES.map((g) => {
        const selected = genres.includes(g);
        return (
          <Pressable
            key={g}
            onPress={() =>
              setGenres((prev) =>
                prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
              )
            }
            style={{
              padding: 12,
              borderRadius: 8,
              marginBottom: 8,
              backgroundColor: selected ? colors.tint : "transparent",
              borderWidth: 1,
              borderColor: colors.icon,
            }}
          >
            <Text style={{ color: selected ? "#000" : colors.text }}>{g}</Text>
          </Pressable>
        );
      })}

      {/* SUBMIT */}
      <Pressable
        onPress={submit}
        disabled={loading}
        style={{
          marginTop: 24,
          backgroundColor: colors.tint,
          padding: 14,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#000", fontWeight: "600", fontSize: 16 }}>
          {loading ? "Saving..." : "Save Profile"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}
