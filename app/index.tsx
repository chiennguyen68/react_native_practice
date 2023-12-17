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
  Alert,
} from "react-native";
import { COLORS, icons, images, SIZES } from "../constants";
import { Stack, useRouter } from "expo-router";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import { supabase } from "../supperbase/auth";
import { Session } from "@supabase/supabase-js";

const { width } = Dimensions.get("window");

const Home = () => {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

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

  const clearSession = async () => {
    const { error } = await supabase.auth.signOut();
  };

  const handleLogout = () => {
    Alert.alert("Logout", "You want to Logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => clearSession() },
    ]);
  };

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
          {session && session.user ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  router.push(`/login`);
                }}
              >
                <View
                  style={{
                    marginTop: 10,
                    padding: 10,
                    backgroundColor: COLORS.tertiary,
                    borderRadius: 5,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white" }}>Update info</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleLogout();
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
                  <Text style={{ color: "white" }}>Logout</Text>
                </View>
              </TouchableOpacity>
            </>
          ) : (
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
                <Text style={{ color: "white" }}>Login</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Home;
