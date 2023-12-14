import React, { useState } from 'react'
import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { supabase } from '../../supperbase/auth'
import { COLORS, SIZES, icons } from '../../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    console.log({ email, password })
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  
  const handleGoogleLogin = () => {
  
    console.log("Google login clicked");
  };

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
      </View>
      <View style={styles.googleContainer}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}
        >
          <Image source={icons.google} style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
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
})
