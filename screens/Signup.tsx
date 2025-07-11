// // // // "use client"

// // // // import React, { useState } from "react"
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   TextInput,
// // // //   TouchableOpacity,
// // // //   StyleSheet,
// // // //   Alert,
// // // //   KeyboardAvoidingView,
// // // //   Platform,
// // // // } from "react-native"
// // // // import {
// // // //   auth,
// // // //   database,
// // // //   ref,
// // // //   set,
// // // //   createUserWithEmailAndPassword,
// // // //   updateProfile,
// // // // } from "@/hooks/firebaseConfig"

// // // // export default function Signup({ navigation }: any) {
// // // //   const [name, setName] = useState("")
// // // //   const [phone, setPhone] = useState("")
// // // //   const [password, setPassword] = useState("")
// // // //   const [role, setRole] = useState<"admin" | "worker" | "">("")

// // // //   const handleSignup = async () => {
// // // //     if (!name || !phone || !password || !role) {
// // // //       Alert.alert("All fields are required including role.")
// // // //       return
// // // //     }

// // // //     const fakeEmail = `${phone}@echobin.com` // Phone-based login via email workaround

// // // //     try {
// // // //       const userCred = await createUserWithEmailAndPassword(auth, fakeEmail, password)
// // // //       const user = userCred.user

// // // //       // Save additional data to Realtime DB
// // // //       await set(ref(database, `users/${user.uid}`), {
// // // //         name,
// // // //         phone,
// // // //         role,
// // // //       })

// // // //       await updateProfile(user, { displayName: name })

// // // //       Alert.alert("Signup Successful", "You can now log in")
// // // //       navigation.navigate("Login") // or redirect as needed
// // // //     } catch (error: any) {
// // // //       Alert.alert("Signup Failed", error.message)
// // // //     }
// // // //   }

// // // //   return (
// // // //     <KeyboardAvoidingView
// // // //       behavior={Platform.OS === "ios" ? "padding" : "height"}
// // // //       style={styles.container}
// // // //     >
// // // //       <View style={styles.inner}>
// // // //         <Text style={styles.logo}>Walmart ✨</Text>
// // // //         <Text style={styles.header}>Create Your Account</Text>

// // // //         <TextInput
// // // //           placeholder="Full Name"
// // // //           value={name}
// // // //           onChangeText={setName}
// // // //           style={styles.input}
// // // //         />
// // // //         <TextInput
// // // //           placeholder="Phone Number"
// // // //           value={phone}
// // // //           onChangeText={setPhone}
// // // //           keyboardType="phone-pad"
// // // //           style={styles.input}
// // // //         />
// // // //         <TextInput
// // // //           placeholder="Password"
// // // //           value={password}
// // // //           onChangeText={setPassword}
// // // //           secureTextEntry
// // // //           style={styles.input}
// // // //         />

// // // //         <View style={styles.roleSelector}>
// // // //           <TouchableOpacity
// // // //             style={[styles.roleOption, role === "admin" && styles.selectedRole]}
// // // //             onPress={() => setRole("admin")}
// // // //           >
// // // //             <Text style={styles.roleText}>Admin</Text>
// // // //           </TouchableOpacity>
// // // //           <TouchableOpacity
// // // //             style={[styles.roleOption, role === "worker" && styles.selectedRole]}
// // // //             onPress={() => setRole("worker")}
// // // //           >
// // // //             <Text style={styles.roleText}>Worker</Text>
// // // //           </TouchableOpacity>
// // // //         </View>

// // // //         <TouchableOpacity style={styles.button} onPress={handleSignup}>
// // // //           <Text style={styles.buttonText}>Sign Up</Text>
// // // //         </TouchableOpacity>
// // // //       </View>
// // // //     </KeyboardAvoidingView>
// // // //   )
// // // // }

// // // // const styles = StyleSheet.create({
// // // //   container: {
// // // //     flex: 1,
// // // //     backgroundColor: "#0071ce",
// // // //     justifyContent: "center",
// // // //   },
// // // //   inner: {
// // // //     padding: 24,
// // // //   },
// // // //   logo: {
// // // //     fontSize: 32,
// // // //     fontWeight: "800",
// // // //     color: "#ffc220",
// // // //     textAlign: "center",
// // // //     marginBottom: 8,
// // // //   },
// // // //   header: {
// // // //     fontSize: 20,
// // // //     textAlign: "center",
// // // //     color: "#fff",
// // // //     marginBottom: 24,
// // // //   },
// // // //   input: {
// // // //     backgroundColor: "#fff",
// // // //     borderRadius: 8,
// // // //     paddingVertical: 12,
// // // //     paddingHorizontal: 16,
// // // //     marginBottom: 16,
// // // //     fontSize: 16,
// // // //   },
// // // //   roleSelector: {
// // // //     flexDirection: "row",
// // // //     justifyContent: "space-around",
// // // //     marginBottom: 24,
// // // //   },
// // // //   roleOption: {
// // // //     paddingVertical: 12,
// // // //     paddingHorizontal: 24,
// // // //     backgroundColor: "#e6f3ff",
// // // //     borderRadius: 20,
// // // //   },
// // // //   selectedRole: {
// // // //     backgroundColor: "#ffc220",
// // // //   },
// // // //   roleText: {
// // // //     fontSize: 16,
// // // //     fontWeight: "600",
// // // //     color: "#1e293b",
// // // //   },
// // // //   button: {
// // // //     backgroundColor: "#ffc220",
// // // //     paddingVertical: 14,
// // // //     borderRadius: 8,
// // // //     alignItems: "center",
// // // //     elevation: 2,
// // // //   },
// // // //   buttonText: {
// // // //     fontSize: 16,
// // // //     fontWeight: "600",
// // // //     color: "#1e293b",
// // // //   },
// // // // })
// // // "use client"

// // // import React, { useState } from "react"
// // // import {
// // //   View,
// // //   Text,
// // //   TextInput,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // //   Alert,
// // //   KeyboardAvoidingView,
// // //   Platform,
// // // } from "react-native"
// // // import {
// // //   auth,
// // //   database,
// // //   ref,
// // //   set,
// // //   createUserWithEmailAndPassword,
// // //   updateProfile,
// // // } from "@/hooks/firebaseConfig"

// // // export default function Signup({ navigation }: any) {
// // //   const [name, setName] = useState("")
// // //   const [email, setEmail] = useState("")
// // //   const [phone, setPhone] = useState("")
// // //   const [password, setPassword] = useState("")
// // //   const [role, setRole] = useState<"admin" | "worker" | "">("")

// // //   const handleSignup = async () => {
// // //     if (!name || !email || !phone || !password || !role) {
// // //       Alert.alert("All fields are required including role.")
// // //       return
// // //     }

// // //     try {
// // //       const userCred = await createUserWithEmailAndPassword(auth, email, password)
// // //       const user = userCred.user

// // //       // Save additional data to Realtime DB
// // //       await set(ref(database, `users/${user.uid}`), {
// // //         name,
// // //         phone,
// // //         email,
// // //         role,
// // //       })

// // //       await updateProfile(user, { displayName: name })

// // //       Alert.alert("Signup Successful", "You can now log in")
// // //       navigation.navigate("Login")
// // //     } catch (error: any) {
// // //       Alert.alert("Signup Failed", error.message)
// // //     }
// // //   }

// // //   return (
// // //     <KeyboardAvoidingView
// // //       behavior={Platform.OS === "ios" ? "padding" : "height"}
// // //       style={styles.container}
// // //     >
// // //       <View style={styles.inner}>
// // //         <Text style={styles.logo}>Walmart ✨</Text>
// // //         <Text style={styles.header}>Create Account</Text>

// // //         <TextInput
// // //           placeholder="Full Name"
// // //           value={name}
// // //           onChangeText={setName}
// // //           style={styles.input}
// // //         />
// // //         <TextInput
// // //           placeholder="Email"
// // //           value={email}
// // //           onChangeText={setEmail}
// // //           keyboardType="email-address"
// // //           style={styles.input}
// // //         />
// // //         <TextInput
// // //           placeholder="Phone Number"
// // //           value={phone}
// // //           onChangeText={setPhone}
// // //           keyboardType="phone-pad"
// // //           style={styles.input}
// // //         />
// // //         <TextInput
// // //           placeholder="Password"
// // //           value={password}
// // //           onChangeText={setPassword}
// // //           secureTextEntry
// // //           style={styles.input}
// // //         />

// // //         <Text style={styles.roleLabel}>Select Role</Text>
// // //         <View style={styles.roleContainer}>
// // //           <TouchableOpacity
// // //             style={[styles.radio, role === "admin" && styles.radioSelected]}
// // //             onPress={() => setRole("admin")}
// // //           >
// // //             <Text style={styles.radioText}>Admin</Text>
// // //           </TouchableOpacity>
// // //           <TouchableOpacity
// // //             style={[styles.radio, role === "worker" && styles.radioSelected]}
// // //             onPress={() => setRole("worker")}
// // //           >
// // //             <Text style={styles.radioText}>Worker</Text>
// // //           </TouchableOpacity>
// // //         </View>

// // //         <TouchableOpacity style={styles.button} onPress={handleSignup}>
// // //           <Text style={styles.buttonText}>Sign Up</Text>
// // //         </TouchableOpacity>
// // //       </View>
// // //     </KeyboardAvoidingView>
// // //   )
// // // }

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: "#f9fafb",
// // //     justifyContent: "center",
// // //   },
// // //   inner: {
// // //     padding: 24,
// // //   },
// // //   logo: {
// // //     fontSize: 32,
// // //     fontWeight: "800",
// // //     color: "#111827",
// // //     textAlign: "center",
// // //     marginBottom: 8,
// // //   },
// // //   header: {
// // //     fontSize: 20,
// // //     textAlign: "center",
// // //     color: "#374151",
// // //     marginBottom: 24,
// // //   },
// // //   input: {
// // //     backgroundColor: "#ffffff",
// // //     borderRadius: 12,
// // //     paddingVertical: 12,
// // //     paddingHorizontal: 16,
// // //     marginBottom: 16,
// // //     fontSize: 16,
// // //     borderColor: "#e5e7eb",
// // //     borderWidth: 1,
// // //   },
// // //   roleLabel: {
// // //     fontSize: 16,
// // //     fontWeight: "600",
// // //     marginBottom: 8,
// // //     color: "#374151",
// // //   },
// // //   roleContainer: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-around",
// // //     marginBottom: 24,
// // //   },
// // //   radio: {
// // //     paddingVertical: 10,
// // //     paddingHorizontal: 20,
// // //     backgroundColor: "#e5e7eb",
// // //     borderRadius: 20,
// // //   },
// // //   radioSelected: {
// // //     backgroundColor: "#facc15",
// // //   },
// // //   radioText: {
// // //     fontSize: 16,
// // //     fontWeight: "600",
// // //     color: "#111827",
// // //   },
// // //   button: {
// // //     backgroundColor: "#facc15",
// // //     paddingVertical: 14,
// // //     borderRadius: 12,
// // //     alignItems: "center",
// // //   },
// // //   buttonText: {
// // //     fontSize: 16,
// // //     fontWeight: "600",
// // //     color: "#1f2937",
// // //   },
// // // })
// // "use client"

// // import React, { useState } from "react"
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Alert,
// //   KeyboardAvoidingView,
// //   Platform,
// // } from "react-native"
// // import {
// //   auth,
// //   database,
// //   ref,
// //   set,
// //   createUserWithEmailAndPassword,
// //   updateProfile,
// // } from "@/hooks/firebaseConfig"

// // export default function Signup({ navigation }: any) {
// //   const [name, setName] = useState("")
// //   const [email, setEmail] = useState("")
// //   const [phone, setPhone] = useState("")
// //   const [password, setPassword] = useState("")
// //   const [role, setRole] = useState<"admin" | "worker" | "">("")

// //   const handleSignup = async () => {
// //     if (!name || !email || !phone || !password || !role) {
// //       Alert.alert("All fields are required including role.")
// //       return
// //     }

// //     try {
// //       const userCred = await createUserWithEmailAndPassword(auth, email, password)
// //       const user = userCred.user

// //       // Save additional data to Firebase Realtime DB by role
// //       const userData = {
// //         uid: user.uid,
// //         name,
// //         phone,
// //         email,
// //         role,
// //         createdAt: new Date().toISOString(),
// //       }

// //       await set(ref(database, `users/${user.uid}`), userData)

// //       // Optionally store under role-specific path too
// //       await set(ref(database, `${role}s/${user.uid}`), userData)

// //       await updateProfile(user, { displayName: name })

// //       Alert.alert("Signup Successful", "You can now log in")
// //       navigation.navigate("LoginScreen")
// //     } catch (error: any) {
// //       Alert.alert("Signup Failed", error.message)
// //     }
// //   }

// //   return (
// //     <KeyboardAvoidingView
// //       behavior={Platform.OS === "ios" ? "padding" : "height"}
// //       style={styles.container}
// //     >
// //       <View style={styles.inner}>
// //         <Text style={styles.logo}>Walmart</Text>
// //         <Text style={styles.subtitle}>Welcome to EchoBin — your eco-friendly app</Text>
// //         <Text style={styles.header}>Create Account</Text>

// //         <TextInput
// //           placeholder="Full Name"
// //           value={name}
// //           onChangeText={setName}
// //           style={styles.input}
// //         />
// //         <TextInput
// //           placeholder="Email"
// //           value={email}
// //           onChangeText={setEmail}
// //           keyboardType="email-address"
// //           style={styles.input}
// //         />
// //         <TextInput
// //           placeholder="Phone Number"
// //           value={phone}
// //           onChangeText={setPhone}
// //           keyboardType="phone-pad"
// //           style={styles.input}
// //         />
// //         <TextInput
// //           placeholder="Password"
// //           value={password}
// //           onChangeText={setPassword}
// //           secureTextEntry
// //           style={styles.input}
// //         />

// //         <Text style={styles.roleLabel}>Select Role</Text>
// //         <View style={styles.roleContainer}>
// //           <TouchableOpacity
// //             style={[styles.radio, role === "admin" && styles.radioSelected]}
// //             onPress={() => setRole("admin")}
// //           >
// //             <Text style={styles.radioText}>Admin</Text>
// //           </TouchableOpacity>
// //           <TouchableOpacity
// //             style={[styles.radio, role === "worker" && styles.radioSelected]}
// //             onPress={() => setRole("worker")}
// //           >
// //             <Text style={styles.radioText}>Worker</Text>
// //           </TouchableOpacity>
// //         </View>

// //         <TouchableOpacity style={styles.button} onPress={handleSignup}>
// //           <Text style={styles.buttonText}>Sign Up</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </KeyboardAvoidingView>
// //   )
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#f9fafb",
// //     justifyContent: "center",
// //   },
// //   inner: {
// //     padding: 24,
// //   },
// //   logo: {
// //     fontSize: 32,
// //     fontWeight: "800",
// //     color: "#111827",
// //     textAlign: "center",
// //     marginBottom: 4,
// //   },
// //   subtitle: {
// //     fontSize: 14,
// //     color: "#6b7280",
// //     textAlign: "center",
// //     marginBottom: 16,
// //   },
// //   header: {
// //     fontSize: 20,
// //     textAlign: "center",
// //     color: "#374151",
// //     marginBottom: 24,
// //   },
// //   input: {
// //     backgroundColor: "#ffffff",
// //     borderRadius: 12,
// //     paddingVertical: 12,
// //     paddingHorizontal: 16,
// //     marginBottom: 16,
// //     fontSize: 16,
// //     borderColor: "#e5e7eb",
// //     borderWidth: 1,
// //   },
// //   roleLabel: {
// //     fontSize: 16,
// //     fontWeight: "600",
// //     marginBottom: 8,
// //     color: "#374151",
// //   },
// //   roleContainer: {
// //     flexDirection: "row",
// //     justifyContent: "space-around",
// //     marginBottom: 24,
// //   },
// //   radio: {
// //     paddingVertical: 10,
// //     paddingHorizontal: 20,
// //     backgroundColor: "#e5e7eb",
// //     borderRadius: 20,
// //   },
// //   radioSelected: {
// //     backgroundColor: "#facc15",
// //   },
// //   radioText: {
// //     fontSize: 16,
// //     fontWeight: "600",
// //     color: "#111827",
// //   },
// //   button: {
// //     backgroundColor: "#facc15",
// //     paddingVertical: 14,
// //     borderRadius: 12,
// //     alignItems: "center",
// //   },
// //   buttonText: {
// //     fontSize: 16,
// //     fontWeight: "600",
// //     color: "#1f2937",
// //   },
// // })
//  "use client"

// import React, { useState } from "react"
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native"
// import {
//   auth,
//   database,
//   ref,
//   set,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from "@/hooks/firebaseConfig"

// type SignupProps = {
//   navigation: any
//   setAuthStage: (stage: "signup" | "login") => void
// }

// export default function Signup({ navigation, setAuthStage }: SignupProps) {
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [phone, setPhone] = useState("")
//   const [password, setPassword] = useState("")
//   const [role, setRole] = useState<"admin" | "worker" | "">("")

//   const handleSignup = async () => {
//     if (!name || !email || !phone || !password || !role) {
//       Alert.alert("All fields are required including role.")
//       return
//     }

//     try {
//       const userCred = await createUserWithEmailAndPassword(auth, email, password)
//       const user = userCred.user

//       const userData = {
//         uid: user.uid,
//         name,
//         phone,
//         email,
//         role,
//         createdAt: new Date().toISOString(),
//       }

//       await set(ref(database, `users/${user.uid}`), userData)
//       await set(ref(database, `${role}s/${user.uid}`), userData)

//       await updateProfile(user, { displayName: name })

//       Alert.alert("Signup Successful", "You can now log in")
//       setAuthStage("login") // ✅ properly switch stage
//     } catch (error: any) {
//       Alert.alert("Signup Failed", error.message)
//     }
//   }

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <View style={styles.inner}>
//         <Text style={styles.logo}>Walmart</Text>
//         <Text style={styles.subtitle}>Welcome to EchoBin — your eco-friendly app</Text>
//         <Text style={styles.header}>Create Account</Text>

//         <TextInput
//           placeholder="Full Name"
//           value={name}
//           onChangeText={setName}
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Phone Number"
//           value={phone}
//           onChangeText={setPhone}
//           keyboardType="phone-pad"
//           style={styles.input}
//         />
//         <TextInput
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           style={styles.input}
//         />

//         <Text style={styles.roleLabel}>Select Role</Text>
//         <View style={styles.roleContainer}>
//           <TouchableOpacity
//             style={[styles.radio, role === "admin" && styles.radioSelected]}
//             onPress={() => setRole("admin")}
//           >
//             <Text style={styles.radioText}>Admin</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.radio, role === "worker" && styles.radioSelected]}
//             onPress={() => setRole("worker")}
//           >
//             <Text style={styles.radioText}>Worker</Text>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={styles.button} onPress={handleSignup}>
//           <Text style={styles.buttonText}>Sign Up</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f9fafb",
//     justifyContent: "center",
//   },
//   inner: {
//     padding: 24,
//   },
//   logo: {
//     fontSize: 32,
//     fontWeight: "800",
//     color: "#111827",
//     textAlign: "center",
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#6b7280",
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   header: {
//     fontSize: 20,
//     textAlign: "center",
//     color: "#374151",
//     marginBottom: 24,
//   },
//   input: {
//     backgroundColor: "#ffffff",
//     borderRadius: 12,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     marginBottom: 16,
//     fontSize: 16,
//     borderColor: "#e5e7eb",
//     borderWidth: 1,
//   },
//   roleLabel: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 8,
//     color: "#374151",
//   },
//   roleContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 24,
//   },
//   radio: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: "#e5e7eb",
//     borderRadius: 20,
//   },
//   radioSelected: {
//     backgroundColor: "#facc15",
//   },
//   radioText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#111827",
//   },
//   button: {
//     backgroundColor: "#facc15",
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#1f2937",
//   },
// })
"use client"

import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import {
  auth,
  database,
  ref,
  set,
  createUserWithEmailAndPassword,
  updateProfile,
} from "@/hooks/firebaseConfig"

type SignupProps = {
  navigation: any
  setAuthStage: (stage: "signup" | "login") => void
}

export default function Signup({ navigation, setAuthStage }: SignupProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"admin" | "worker" | "">("")

  const handleSignup = async () => {
    if (!name || !email || !phone || !password || !role) {
      Alert.alert("All fields are required including role.")
      return
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCred.user

      const userData = {
        uid: user.uid,
        name,
        phone,
        email,
        role,
        createdAt: new Date().toISOString(),
      }

      await set(ref(database, `users/${user.uid}`), userData)
      await set(ref(database, `${role}s/${user.uid}`), userData)
      await updateProfile(user, { displayName: name })

      Alert.alert("Signup Successful", "You can now log in")
      setAuthStage("login")
    } catch (error: any) {
      Alert.alert("Signup Failed", error.message)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Text style={styles.logo}>Walmart</Text>
        <Text style={styles.subtitle}>Welcome to EchoBin — your eco-friendly app</Text>
        <Text style={styles.header}>Create Account</Text>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <Text style={styles.roleLabel}>Select Role</Text>
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[styles.radio, role === "admin" && styles.radioSelected]}
            onPress={() => setRole("admin")}
          >
            <Text style={styles.radioText}>Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radio, role === "worker" && styles.radioSelected]}
            onPress={() => setRole("worker")}
          >
            <Text style={styles.radioText}>Worker</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Already have an account */}
        <View style={styles.loginPromptContainer}>
          <Text style={styles.loginPromptText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => setAuthStage("login")}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
  },
  inner: {
    padding: 24,
  },
  logo: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 16,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    color: "#374151",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    borderColor: "#e5e7eb",
    borderWidth: 1,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#374151",
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  radio: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#e5e7eb",
    borderRadius: 20,
  },
  radioSelected: {
    backgroundColor: "#facc15",
  },
  radioText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  button: {
    backgroundColor: "#facc15",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  loginPromptContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginPromptText: {
    fontSize: 15,
    color: "#6b7280",
    marginRight: 6,
  },
  loginLink: {
    fontSize: 15,
    fontWeight: "600",
    color: "#3b82f6",
  },
})
