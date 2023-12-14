import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, SIZES, icons } from "../../constants";
import Auth from "../../components/auth/Auth";

const Login = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: "Login/Register",
        }}
      />

      <Auth />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: SIZES.medium,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: SIZES.medium,
    paddingHorizontal: SIZES.small,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.medium,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  googleContainer: {
    marginTop: SIZES.medium,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: SIZES.small,
  },
  googleButtonText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Login;
