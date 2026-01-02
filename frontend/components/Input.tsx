import { TextInput, View } from "react-native";
import { colors } from "../theme/colors";

export function Input(props: any) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.card,
        backgroundColor: colors.card,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
      }}
    >
      <TextInput
        placeholderTextColor={colors.muted}
        style={{ color: colors.text }}
        {...props}
      />
    </View>
  );
}
