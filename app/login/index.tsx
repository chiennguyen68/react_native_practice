import React, { useEffect, useState } from "react";
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
import Account from "../../components/auth/Account";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../supperbase/auth";

const Login = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  console.log("session", session);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitle: `${
            session && session.user ? "Update info" : "Login/Register"
          }`,
        }}
      />

      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </SafeAreaView>
  );
};

export default Login;
