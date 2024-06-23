import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { useWeb3Modal } from "@web3modal/react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Svg, Path, G } from "react-native-svg";
import { useThemeColor } from "@/hooks/useThemeColor";
import Header from "@/components/FrontPage/Header";
import { ethers } from "ethers";
import * as Clipboard from "expo-clipboard";

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

export default function HomeScreen() {
  const { isConnected, address, provider } = useWeb3Modal();
  const [client, setClient] = useState<any>({});
  const [isCopied, setIsCopied] = useState(false);
  const [currentBalance, setCurrentBalance] = useState("");
  useEffect(() => {
    if (isConnected && provider) {
      const _client = new ethers.providers.Web3Provider(provider);
      setClient(_client);
    }
  }, [isConnected, provider]);
  const router = useRouter();
  const [isRendered, setIsRendered] = useState(false);

  const copied = async (text: string) => {
    await Clipboard.setStringAsync(text);
    setIsCopied(true);
  };

  useEffect(() => {
    (async () => {
      if (Object.values(client).length !== 0) {
        const signer = await client.getSigner();
        const balance = await signer.getBalance();
        const converted = ethers.utils.formatEther(balance);
        setCurrentBalance(converted);
      }
    })();
  }, [isConnected]);
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
    { light: "rgb(228 228 231)", dark: "rgb(24 24 27)" },
    "background"
  );
  const ConnectWalletButton = useThemeColor(
    { dark: "black", light: "white" },
    "text"
  );
  const ConnectWalletBackground = useThemeColor(
    { dark: "white", light: "black" },
    "background"
  );
  return (
    <View>
      <Header />
      <View
        style={{
          marginHorizontal: 20,
          backgroundColor: BellIconBackground,
          position: "relative",
          borderRadius: 30,
          marginTop: 20,
        }}
      >
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View
              style={{
                backgroundColor: "black",
                paddingVertical: 10,
                paddingHorizontal: 8,
                borderRadius: 15,
                width: 50,
              }}
            >
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png",
                }}
                style={{
                  objectFit: "contain",
                  height: 30,
                }}
              />
            </View>
            <View style={{ width: "60%" }}>
              <ThemedText style={{ fontWeight: "bold" }}>
                Wallet Address
              </ThemedText>
              <ThemedText
                style={{ fontWeight: "bold", fontSize: 14, color: "gray" }}
              >
                {address}
              </ThemedText>
            </View>
            {!isCopied ? (
              <Pressable onPress={() => copied(address)}>
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
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </Svg>
              </Pressable>
            ) : (
              <Svg viewBox="0 0 24 24" fill={"green"} height={20} width={20}>
                <Path
                  fillRule="evenodd"
                  d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                  clipRule="evenodd"
                />
                <Path
                  fillRule="evenodd"
                  d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
                  clipRule="evenodd"
                />
              </Svg>
            )}
          </View>
        </View>
        <View style={{ opacity: 0.1, zIndex: -1, marginLeft: 180 }}>
          <Image
            source={{
              uri: "https://cdn.iconscout.com/icon/premium/png-256-thumb/bitcoin-key-3554858-2974673.png",
            }}
            style={{ height: 120, objectFit: "contain" }}
          />
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <View
          style={{
            backgroundColor: BellIconBackground,
            width: "90%",
            borderRadius: 30,
            paddingHorizontal: 20,
            height: 120,
            gap: 10,
            paddingVertical: 20,
            paddingBottom: 40,
          }}
        >
          <ThemedText style={{ fontWeight: "bold", textAlign: "center" }}>
            Current Balance
          </ThemedText>
          <ThemedText
            style={{ fontWeight: "bold", textAlign: "center", fontSize: 20 }}
          >
            {currentBalance}
          </ThemedText>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: ConnectWalletBackground,
            width: "70%",
            paddingVertical: 15,
            borderRadius: 13,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: ConnectWalletButton,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Disconnect Wallet
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center", marginTop: 20 }}>
        <View
          style={{
            backgroundColor: BellIconBackground,
            width: "90%",
            borderRadius: 30,
            flexDirection: "row",
            paddingHorizontal: 20,
            height: 230,
            gap: 10,
            paddingVertical: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "black",
              paddingVertical: 10,
              paddingHorizontal: 8,
              borderRadius: 15,
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AuditHistory color="gray" height={25} width={25} />
          </View>
          <View style={{ width: 250 }}>
            <ThemedText style={{ fontWeight: "bold" }}>
              Audit History
            </ThemedText>
            <ThemedText style={{ fontSize: 13, color: "gray" }}>
              See all previous transaction you have signed ina while ex.
              Signing, transaction ,Request Failure or Success and many more
            </ThemedText>
          </View>
        </View>
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

function AuditHistory({
  color,
  height,
  width,
}: {
  color: string;
  height: number;
  width: number;
}) {
  return (
    <Svg viewBox="0 0 24 24" fill={color} height={height} width={width}>
      <Path
        fillRule="evenodd"
        d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM9.75 17.25a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75Zm2.25-3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-5.25Z"
        clipRule="evenodd"
      />
      <Path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
    </Svg>
  );
}
