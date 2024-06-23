import { StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useWeb3Modal } from "@web3modal/react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Svg, Path, G } from "react-native-svg";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/ThemedView";

const now = new Date();

// Create an array of weekday names
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// Create an array of month names
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Get the day of the week
const weekday = weekdays[now.getDay()];
// Get the day of the month
const day = now.getDate();
// Get the month name
const month = months[now.getMonth()];

// Combine the parts into the desired format
const formattedDate = `${weekday} ${day} ${month}`;

export default function Header() {
  const { isConnected, address, provider } = useWeb3Modal();
  const router = useRouter();
  const [isRendered, setIsRendered] = useState(false);
  useEffect(() => {
    if (!isConnected) {
      if (!isRendered) {
        setIsRendered(true);
      } else {
        router.push("modal");
      }
    }
  }, [isRendered, isConnected]);
  const BellIcon = useThemeColor({ light: "black", dark: "white" }, "icon");
  const BellIconBackground = useThemeColor(
    { light: "rgb(228 228 231)", dark: "rgb(39 39 42)" },
    "background"
  );
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 50,
        }}
      >
        <View style={{ gap: 5 }}>
          <ThemedText style={{ fontWeight: "bold", fontSize: 15 }}>
            Today - <Text style={{ color: "green" }}>{formattedDate}</Text>
          </ThemedText>
          <ThemedText style={{ fontWeight: "bold", fontSize: 25 }}>
            Welcome!
          </ThemedText>
        </View>
        <ThemedView
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 15,
            borderRadius: 30,
            backgroundColor: BellIconBackground,
          }}
        >
          <Svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={BellIcon}
            height={20}
            width={20}
          >
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </Svg>
        </ThemedView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
