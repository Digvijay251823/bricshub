import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useWeb3Modal } from "@web3modal/react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Svg, Path, G } from "react-native-svg";

export default function ConnectionComp() {
  const { isConnected, open } = useWeb3Modal();

  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push("(tabs)");
    }
  }, [isConnected]);

  const backgroundColor = useThemeColor(
    { light: "rgb(228 228 231)", dark: "rgb(24 24 27)" },
    "background"
  );
  const Checkbackground = useThemeColor(
    { dark: "rgb(30 58 138)", light: "rgb(191 219 254)" },
    "icon"
  );
  const CrossIconBackground = useThemeColor(
    { dark: "rgb(127 29 29)", light: "rgb(254 202 202)" },
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
    <View
      style={{ justifyContent: "center", alignItems: "center", height: "100%" }}
    >
      <ThemedView
        style={{
          width: "90%",
          backgroundColor: backgroundColor,
          padding: 20,
          borderRadius: 40,
          gap: 10,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View
            style={{
              backgroundColor: "black",
              paddingVertical: 10,
              paddingHorizontal: 8,
              borderRadius: 15,
              width: 55,
              alignItems: "center",
            }}
          >
            <HomeIcon height={20} width={60} fill="gray" />
          </View>
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 8,
              borderRadius: 15,
              width: 60,
            }}
          >
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Breezeicons-actions-22-media-playlist-shuffle.svg/1200px-Breezeicons-actions-22-media-playlist-shuffle.svg.png",
              }}
              style={{
                objectFit: "contain",
                height: 35,
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "black",
              paddingVertical: 10,
              paddingHorizontal: 8,
              borderRadius: 15,
              width: 55,
            }}
          >
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png",
              }}
              style={{
                objectFit: "contain",
                height: 35,
              }}
            />
          </View>
        </View>
        <ThemedText style={{ fontWeight: "bold", textAlign: "center" }}>
          Connect To Blockchain
        </ThemedText>
        <ThemedText
          style={{ fontWeight: "bold", textAlign: "center", color: "gray" }}
        >
          bricshub.com
        </ThemedText>
        <View style={{ alignItems: "center", gap: 10 }}>
          <View style={{ flexDirection: "row", gap: 10, width: "95%" }}>
            <View
              style={{
                backgroundColor: Checkbackground,
                paddingHorizontal: 11,
                alignItems: "flex-start",
                justifyContent: "center",
                height: 53,
                borderRadius: 40,
              }}
            >
              <CheckIconSecure />
            </View>
            <ThemedText
              style={{
                fontWeight: "bold",
                width: 240,
                borderBottomWidth: 1,
                borderStyle: "dashed",
                borderColor: "rgb(161 161 170)",
                paddingBottom: 15,
              }}
            >
              Let this app see your wallet balance and activity
            </ThemedText>
          </View>

          <View style={{ flexDirection: "row", gap: 10, width: "95%" }}>
            <View
              style={{
                backgroundColor: Checkbackground,
                paddingHorizontal: 11,
                alignItems: "flex-start",
                justifyContent: "center",
                borderRadius: 40,
                height: 53,
              }}
            >
              <CheckIcon />
            </View>
            <ThemedText
              style={{
                fontWeight: "bold",
                width: 240,
                borderBottomWidth: 1,
                borderStyle: "dashed",
                borderColor: "rgb(161 161 170)",
                paddingBottom: 15,
              }}
            >
              Let this app request you to sign transactions
            </ThemedText>
          </View>

          <View style={{ flexDirection: "row", gap: 10, width: "95%" }}>
            <View
              style={{
                backgroundColor: CrossIconBackground,
                paddingHorizontal: 11,
                alignItems: "flex-start",
                height: 53,
                justifyContent: "center",
                borderRadius: 40,
              }}
            >
              <CrossIcon />
            </View>
            <ThemedText style={{ fontWeight: "bold", width: 240 }}>
              Funds will not leave your wallet untill you sign transactions
            </ThemedText>
          </View>
        </View>
      </ThemedView>
      <TouchableOpacity
        onPress={open}
        style={{
          marginTop: 10,
          backgroundColor: ConnectWalletBackground,
          width: "75%",
          paddingVertical: 14,
          borderRadius: 15,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: ConnectWalletButton,
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Connect Wallet
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
          width: "60%",
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            borderColor: "gray",
            borderStyle: "dashed",
            borderWidth: 1,
            width: "40%",
            height: 1,
          }}
        ></View>
        <Text>OR</Text>
        <View
          style={{
            borderColor: "gray",
            borderStyle: "dashed",
            borderWidth: 1,
            width: "40%",
            height: 1,
          }}
        ></View>
      </View>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          borderColor: ConnectWalletBackground,
          borderWidth: 1,
          width: "75%",
          paddingVertical: 14,
          borderRadius: 15,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: ConnectWalletBackground,
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Deny
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function HomeIcon({
  height,
  width,
  fill,
}: {
  height: number;
  width: number;
  fill: string;
}) {
  return (
    <Svg
      fill={fill}
      id="Capa_1"
      width={35}
      height={35}
      viewBox="0 0 345.804 345.804"
    >
      <G>
        <Path d="M343.288,159.838L181.905,27.941c-5.242-4.283-12.77-4.283-18.009,0l-41.336,33.79V44.193c0-3.788-3.066-6.848-6.854-6.848   H75.928c-3.788,0-6.854,3.063-6.854,6.848v61.251L2.516,159.838c-2.933,2.391-3.36,6.711-0.97,9.641   c1.357,1.654,3.33,2.523,5.32,2.523c1.524,0,3.053-0.511,4.328-1.545l34.55-28.245v172.011c0,3.785,3.066,6.852,6.846,6.852   h240.626c3.781,0,6.854-3.066,6.854-6.852V142.216l34.55,28.245c1.273,1.037,2.807,1.545,4.326,1.545   c1.984,0,3.956-0.87,5.314-2.524C346.648,166.549,346.221,162.235,343.288,159.838z M82.779,51.041h26.071v21.888l-26.071,21.31   V51.041z M286.367,307.369H59.44V131.015l107.596-87.939c3.414-2.791,8.316-2.791,11.731,0l107.6,87.939V307.369z" />
      </G>
    </Svg>
  );
}

function CheckIconSecure() {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={"rgb(96 165 250)"}
      height={30}
      width={30}
    >
      <Path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    </Svg>
  );
}

function CheckIcon() {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={"rgb(96 165 250)"}
      height={30}
      width={30}
    >
      <Path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </Svg>
  );
}
function CrossIcon() {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={"rgb(248 113 113)"}
      height={30}
      width={30}
    >
      <Path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </Svg>
  );
}
