import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://ulxixoynkggbevzfoyhe.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVseGl4b3lua2dnYmV2emZveWhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI1NzQ1MzQsImV4cCI6MjAxODE1MDUzNH0.xxZc9Md10-bIql_kCOf8Ud0X8Lj9ibCUxAVHzH2uI6M";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
