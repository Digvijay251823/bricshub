import { useWeb3Modal } from "@web3modal/react-native";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";

const HEADER_HEIGHT = 250;

export default function ParallaxScrollView() {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const { isConnected, open } = useWeb3Modal();
  const router = useRouter();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });
  const { height } = useWindowDimensions();
  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: "rgb(219 234 254)" },
            { height: height + 70 },
            headerAnimatedStyle,
          ]}
        >
          <Image
            source={{
              uri: "https://i.pinimg.com/originals/b0/fc/5e/b0fc5e14d73963c2e21f4ad7443bc3fd.gif",
            }}
            style={{ height: "100%", objectFit: "contain" }}
          />
        </Animated.View>
      </Animated.ScrollView>
      <View
        style={{ position: "relative", width: "100%", alignItems: "center" }}
      >
        <TouchableOpacity
          onPress={() =>
            !isConnected ? router.push("connection") : router.push("(tabs)")
          }
          style={{
            position: "absolute",
            width: "80%",
            bottom: 30,
            marginHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 40,
            borderWidth: 2,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
});
