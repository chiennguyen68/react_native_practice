import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { COLORS, icons, images, SIZES } from "../constants";
import { Stack, useRouter } from "expo-router";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";

const { width } = Dimensions.get("window");

const Home = () => {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: sidebarVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [sidebarVisible, animatedValue]);

  const showSidebar = () => {
    setSidebarVisible(true);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [width, width * 0.5],
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: true,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.menu}
              dimension="60%"
              handlePress={showSidebar}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.profile}
              dimension="80%"
              handlePress={showSidebar}
            />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>

      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: translateX,
          width: width * 0.5,
          backgroundColor: COLORS.lightWhite,
          padding: SIZES.medium,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 4,
            },
            android: {
              elevation: 8,
            },
          }),
        }}
      >
        <View
          style={{
            position: "relative",
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 250,
              left: 0,
            }}
            onPress={closeSidebar}
          >
            <Image
              source={icons.chevronRight}
              resizeMode="contain"
              style={{ width: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push(`/login`);
            }}
          >
            <View
              style={{
                marginTop: 10,
                padding: 10,
                backgroundColor: COLORS.primary,
                borderRadius: 5,
                alignItems: "center",
              }}
            >
              <Text style={{color:'white'}}>Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Home;
