import { ActivityIndicator, View } from "react-native";
import { useGlobalContext } from "./GlobalState";
import { useEffect } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

export default function ToastNotification() {
  const { state, dispatch } = useGlobalContext();

  const backgroundColor = useThemeColor(
    { dark: "white", light: "rgb(63 63 70)" },
    "background"
  );
  const textColor = useThemeColor(
    { dark: "rgb(63 63 70)", light: "white" },
    "text"
  );
  return (
    <View style={{ position: "relative" }}>
      {state.toasts.isVisible && (
        <>
          {state.toasts.type === "ERROR" ? (
            <ThemedView
              style={{
                position: "absolute",
                backgroundColor: backgroundColor,
                bottom: 70,
                right: 0,
                left: 0,
                marginHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 14,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <View>
                <ActivityIndicator size={"large"} />
              </View>
              <ThemedText
                style={{
                  color: textColor,
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "80%",
                }}
              >
                {state.toasts.message}
              </ThemedText>
            </ThemedView>
          ) : state.toasts.type === "SUCCESS" ? (
            <ThemedView
              style={{
                position: "absolute",
                backgroundColor: backgroundColor,
                bottom: 70,
                right: 0,
                left: 0,
                marginHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 14,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <View>
                <ActivityIndicator size={"large"} />
              </View>
              <ThemedText
                style={{
                  color: textColor,
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "80%",
                }}
              >
                {state.toasts.message}
              </ThemedText>
            </ThemedView>
          ) : (
            <ThemedView
              style={{
                position: "absolute",
                backgroundColor: backgroundColor,
                bottom: 70,
                right: 0,
                left: 0,
                marginHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 14,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <View>
                <ActivityIndicator size={"large"} />
              </View>
              <ThemedText
                style={{
                  color: textColor,
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "80%",
                }}
              >
                {"Loading..."}
              </ThemedText>
            </ThemedView>
          )}
        </>
      )}
    </View>
  );
}
