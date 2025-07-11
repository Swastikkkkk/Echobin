// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// // // // // // type Props = {
// // // // // //   setRole: (role: 'admin' | 'worker') => void;
// // // // // // };

// // // // // // export default function LoginScreen({ setRole }: Props) {
// // // // // //   const [selectedRole, setSelectedRole] = useState<'admin' | 'worker' | null>(null);
// // // // // //   const [showSplash, setShowSplash] = useState(false);

// // // // // //   useEffect(() => {
// // // // // //     if (selectedRole) {
// // // // // //       setShowSplash(true);
// // // // // //       setTimeout(() => {
// // // // // //         setRole(selectedRole);
// // // // // //       }, 1500); // 1.5 second splash delay
// // // // // //     }
// // // // // //   }, [selectedRole]);

// // // // // //   const splashMessage =
// // // // // //     selectedRole === 'admin'
// // // // // //       ? '🛠️ Accessing Admin Dashboard…'
// // // // // //       : '📦 Setting up Tasks for You…';

// // // // // //   return (
// // // // // //     <View style={styles.container}>
// // // // // //       {showSplash ? (
// // // // // //         <Text style={styles.splashText}>{splashMessage}</Text>
// // // // // //       ) : (
// // // // // //         <>
// // // // // //           <Text style={styles.welcome}>👋 Welcome to EchoBin</Text>
// // // // // //           <Text style={styles.subtitle}>Your smart companion for returns</Text>
// // // // // //           <Text style={styles.title}>Login as:</Text>

// // // // // //           <TouchableOpacity
// // // // // //             style={[styles.button, selectedRole === 'admin' && styles.selected]}
// // // // // //             onPress={() => setSelectedRole('admin')}
// // // // // //           >
// // // // // //             <Text style={styles.buttonText}>Admin</Text>
// // // // // //           </TouchableOpacity>

// // // // // //           <TouchableOpacity
// // // // // //             style={[styles.button, selectedRole === 'worker' && styles.selected]}
// // // // // //             onPress={() => setSelectedRole('worker')}
// // // // // //           >
// // // // // //             <Text style={styles.buttonText}>Worker</Text>
// // // // // //           </TouchableOpacity>
// // // // // //         </>
// // // // // //       )}
// // // // // //     </View>
// // // // // //   );
// // // // // // }

// // // // // // const styles = StyleSheet.create({
// // // // // //   container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f1f5f9' },
// // // // // //   welcome: {
// // // // // //     fontSize: 22,
// // // // // //     fontWeight: 'bold',
// // // // // //     textAlign: 'center',
// // // // // //     color: '#1e40af',
// // // // // //     marginBottom: 4,
// // // // // //   },
// // // // // //   subtitle: {
// // // // // //     fontSize: 14,
// // // // // //     color: '#64748b',
// // // // // //     textAlign: 'center',
// // // // // //     marginBottom: 30,
// // // // // //   },
// // // // // //   title: {
// // // // // //     fontSize: 20,
// // // // // //     fontWeight: '600',
// // // // // //     marginBottom: 20,
// // // // // //     textAlign: 'center',
// // // // // //     color: '#0f172a',
// // // // // //   },
// // // // // //   button: {
// // // // // //     backgroundColor: '#60a5fa',
// // // // // //     padding: 15,
// // // // // //     marginVertical: 10,
// // // // // //     borderRadius: 10,
// // // // // //   },
// // // // // //   selected: {
// // // // // //     backgroundColor: '#2563eb',
// // // // // //   },
// // // // // //   buttonText: {
// // // // // //     color: '#fff',
// // // // // //     fontSize: 16,
// // // // // //     textAlign: 'center',
// // // // // //   },
// // // // // //   splashText: {
// // // // // //     fontSize: 20,
// // // // // //     fontWeight: '600',
// // // // // //     textAlign: 'center',
// // // // // //     color: '#1e40af',
// // // // // //   },
// // // // // // });
// // // // // "use client"

// // // // // import { useState, useEffect } from "react"
// // // // // import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from "react-native"

// // // // // type Props = {
// // // // //   setRole: (role: "admin" | "worker") => void
// // // // // }

// // // // // const { width, height } = Dimensions.get("window")

// // // // // export default function LoginScreen({ setRole }: Props) {
// // // // //   const [selectedRole, setSelectedRole] = useState<"admin" | "worker" | null>(null)
// // // // //   const [showSplash, setShowSplash] = useState(false)

// // // // //   // Animation values
// // // // //   const fadeAnim = new Animated.Value(0)
// // // // //   const slideAnim = new Animated.Value(50)
// // // // //   const scaleAnim = new Animated.Value(0.9)
// // // // //   const pulseAnim = new Animated.Value(1)

// // // // //   useEffect(() => {
// // // // //     // Initial entrance animation
// // // // //     Animated.parallel([
// // // // //       Animated.timing(fadeAnim, {
// // // // //         toValue: 1,
// // // // //         duration: 800,
// // // // //         useNativeDriver: true,
// // // // //       }),
// // // // //       Animated.timing(slideAnim, {
// // // // //         toValue: 0,
// // // // //         duration: 600,
// // // // //         useNativeDriver: true,
// // // // //       }),
// // // // //       Animated.spring(scaleAnim, {
// // // // //         toValue: 1,
// // // // //         tension: 50,
// // // // //         friction: 7,
// // // // //         useNativeDriver: true,
// // // // //       }),
// // // // //     ]).start()

// // // // //     // Continuous pulse animation for logo
// // // // //     const pulse = () => {
// // // // //       Animated.sequence([
// // // // //         Animated.timing(pulseAnim, {
// // // // //           toValue: 1.05,
// // // // //           duration: 1000,
// // // // //           useNativeDriver: true,
// // // // //         }),
// // // // //         Animated.timing(pulseAnim, {
// // // // //           toValue: 1,
// // // // //           duration: 1000,
// // // // //           useNativeDriver: true,
// // // // //         }),
// // // // //       ]).start(() => pulse())
// // // // //     }
// // // // //     pulse()
// // // // //   }, [])

// // // // //   useEffect(() => {
// // // // //     if (selectedRole) {
// // // // //       setShowSplash(true)
// // // // //       setTimeout(() => {
// // // // //         setRole(selectedRole)
// // // // //       }, 2000)
// // // // //     }
// // // // //   }, [selectedRole])

// // // // //   const splashMessage = selectedRole === "admin" ? "🛠️ Accessing Management Portal..." : "📦 Preparing Your Workspace..."

// // // // //   const splashSubtitle = selectedRole === "admin" ? "Loading administrative tools" : "Setting up your task dashboard"

// // // // //   if (showSplash) {
// // // // //     return (
// // // // //       <View style={styles.splashContainer}>
// // // // //         <View style={styles.splashContent}>
// // // // //           <Animated.View style={[styles.logoContainer, { transform: [{ scale: pulseAnim }] }]}>
// // // // //             <Text style={styles.splashLogo}>Walmart</Text>
// // // // //             <Text style={styles.splashSpark}>✨</Text>
// // // // //           </Animated.View>
// // // // //           <View style={styles.loadingContainer}>
// // // // //             <View style={styles.loadingBar}>
// // // // //               <Animated.View style={[styles.loadingProgress]} />
// // // // //             </View>
// // // // //             <Text style={styles.splashText}>{splashMessage}</Text>
// // // // //             <Text style={styles.splashSubtext}>{splashSubtitle}</Text>
// // // // //           </View>
// // // // //         </View>
// // // // //       </View>
// // // // //     )
// // // // //   }

// // // // //   return (
// // // // //     <View style={styles.container}>
// // // // //       {/* Background gradient effect */}
// // // // //       <View style={styles.backgroundGradient} />

// // // // //       <Animated.View
// // // // //         style={[
// // // // //           styles.content,
// // // // //           {
// // // // //             opacity: fadeAnim,
// // // // //             transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
// // // // //           },
// // // // //         ]}
// // // // //       >
// // // // //         {/* Header Section */}
// // // // //         <View style={styles.header}>
// // // // //           <Animated.View style={[styles.logoContainer, { transform: [{ scale: pulseAnim }] }]}>
// // // // //             <Text style={styles.logo}>Walmart</Text>
// // // // //             <Text style={styles.spark}>✨</Text>
// // // // //           </Animated.View>
// // // // //           <Text style={styles.welcome}>Welcome to EchoBin</Text>
// // // // //           <Text style={styles.subtitle}>Your intelligent returns management system</Text>
// // // // //         </View>

// // // // //         {/* Role Selection */}
// // // // //         <View style={styles.roleSection}>
// // // // //           <Text style={styles.title}>Choose Your Access Level</Text>

// // // // //           <TouchableOpacity
// // // // //             style={[styles.roleButton, styles.adminButton, selectedRole === "admin" && styles.selectedAdmin]}
// // // // //             onPress={() => setSelectedRole("admin")}
// // // // //             activeOpacity={0.8}
// // // // //           >
// // // // //             <View style={styles.buttonContent}>
// // // // //               <View style={styles.iconContainer}>
// // // // //                 <Text style={styles.adminIcon}>👨‍💼</Text>
// // // // //               </View>
// // // // //               <View style={styles.textContainer}>
// // // // //                 <Text style={styles.roleTitle}>Administrator</Text>
// // // // //                 <Text style={styles.roleDescription}>Full system access & management</Text>
// // // // //               </View>
// // // // //               <View style={styles.arrow}>
// // // // //                 <Text style={styles.arrowText}>→</Text>
// // // // //               </View>
// // // // //             </View>
// // // // //           </TouchableOpacity>

// // // // //           <TouchableOpacity
// // // // //             style={[styles.roleButton, styles.workerButton, selectedRole === "worker" && styles.selectedWorker]}
// // // // //             onPress={() => setSelectedRole("worker")}
// // // // //             activeOpacity={0.8}
// // // // //           >
// // // // //             <View style={styles.buttonContent}>
// // // // //               <View style={styles.iconContainer}>
// // // // //                 <Text style={styles.workerIcon}>👷‍♀️</Text>
// // // // //               </View>
// // // // //               <View style={styles.textContainer}>
// // // // //                 <Text style={styles.roleTitle}>Team Member</Text>
// // // // //                 <Text style={styles.roleDescription}>Task management & operations</Text>
// // // // //               </View>
// // // // //               <View style={styles.arrow}>
// // // // //                 <Text style={styles.arrowText}>→</Text>
// // // // //               </View>
// // // // //             </View>
// // // // //           </TouchableOpacity>
// // // // //         </View>

// // // // //         {/* Footer */}
// // // // //         <View style={styles.footer}>
// // // // //           <Text style={styles.footerText}>Powered by Walmart Technology</Text>
// // // // //           <View style={styles.securityBadge}>
// // // // //             <Text style={styles.securityText}>🔒 Secure Access</Text>
// // // // //           </View>
// // // // //         </View>
// // // // //       </Animated.View>
// // // // //     </View>
// // // // //   )
// // // // // }

// // // // // const styles = StyleSheet.create({
// // // // //   container: {
// // // // //     flex: 1,
// // // // //     backgroundColor: "#0071ce",
// // // // //   },
// // // // //   backgroundGradient: {
// // // // //     position: "absolute",
// // // // //     top: 0,
// // // // //     left: 0,
// // // // //     right: 0,
// // // // //     bottom: 0,
// // // // //     backgroundColor: "#0071ce",
// // // // //     opacity: 0.95,
// // // // //   },
// // // // //   content: {
// // // // //     flex: 1,
// // // // //     paddingHorizontal: 24,
// // // // //     paddingTop: 60,
// // // // //     paddingBottom: 40,
// // // // //   },
// // // // //   header: {
// // // // //     alignItems: "center",
// // // // //     marginBottom: 40,
// // // // //   },
// // // // //   logoContainer: {
// // // // //     flexDirection: "row",
// // // // //     alignItems: "center",
// // // // //     marginBottom: 16,
// // // // //   },
// // // // //   logo: {
// // // // //     fontSize: 36,
// // // // //     fontWeight: "800",
// // // // //     color: "#ffc220",
// // // // //     letterSpacing: -1,
// // // // //   },
// // // // //   spark: {
// // // // //     fontSize: 24,
// // // // //     marginLeft: 8,
// // // // //   },
// // // // //   welcome: {
// // // // //     fontSize: 28,
// // // // //     fontWeight: "700",
// // // // //     color: "#ffffff",
// // // // //     textAlign: "center",
// // // // //     marginBottom: 8,
// // // // //   },
// // // // //   subtitle: {
// // // // //     fontSize: 16,
// // // // //     color: "#e6f3ff",
// // // // //     textAlign: "center",
// // // // //     opacity: 0.9,
// // // // //   },
// // // // //   roleSection: {
// // // // //     flex: 1,
// // // // //     justifyContent: "center",
// // // // //   },
// // // // //   title: {
// // // // //     fontSize: 20,
// // // // //     fontWeight: "600",
// // // // //     color: "#ffffff",
// // // // //     textAlign: "center",
// // // // //     marginBottom: 32,
// // // // //   },
// // // // //   roleButton: {
// // // // //     backgroundColor: "#ffffff",
// // // // //     borderRadius: 16,
// // // // //     marginVertical: 12,
// // // // //     shadowColor: "#000",
// // // // //     shadowOffset: { width: 0, height: 4 },
// // // // //     shadowOpacity: 0.15,
// // // // //     shadowRadius: 12,
// // // // //     elevation: 8,
// // // // //   },
// // // // //   adminButton: {
// // // // //     borderLeftWidth: 4,
// // // // //     borderLeftColor: "#ff6b35",
// // // // //   },
// // // // //   workerButton: {
// // // // //     borderLeftWidth: 4,
// // // // //     borderLeftColor: "#00a651",
// // // // //   },
// // // // //   selectedAdmin: {
// // // // //     backgroundColor: "#fff5f2",
// // // // //     borderColor: "#ff6b35",
// // // // //     borderWidth: 2,
// // // // //     transform: [{ scale: 1.02 }],
// // // // //   },
// // // // //   selectedWorker: {
// // // // //     backgroundColor: "#f0fdf4",
// // // // //     borderColor: "#00a651",
// // // // //     borderWidth: 2,
// // // // //     transform: [{ scale: 1.02 }],
// // // // //   },
// // // // //   buttonContent: {
// // // // //     flexDirection: "row",
// // // // //     alignItems: "center",
// // // // //     padding: 20,
// // // // //   },
// // // // //   iconContainer: {
// // // // //     width: 60,
// // // // //     height: 60,
// // // // //     borderRadius: 30,
// // // // //     backgroundColor: "#f8fafc",
// // // // //     justifyContent: "center",
// // // // //     alignItems: "center",
// // // // //     marginRight: 16,
// // // // //   },
// // // // //   adminIcon: {
// // // // //     fontSize: 28,
// // // // //   },
// // // // //   workerIcon: {
// // // // //     fontSize: 28,
// // // // //   },
// // // // //   textContainer: {
// // // // //     flex: 1,
// // // // //   },
// // // // //   roleTitle: {
// // // // //     fontSize: 18,
// // // // //     fontWeight: "700",
// // // // //     color: "#1e293b",
// // // // //     marginBottom: 4,
// // // // //   },
// // // // //   roleDescription: {
// // // // //     fontSize: 14,
// // // // //     color: "#64748b",
// // // // //     lineHeight: 20,
// // // // //   },
// // // // //   arrow: {
// // // // //     width: 32,
// // // // //     height: 32,
// // // // //     borderRadius: 16,
// // // // //     backgroundColor: "#f1f5f9",
// // // // //     justifyContent: "center",
// // // // //     alignItems: "center",
// // // // //   },
// // // // //   arrowText: {
// // // // //     fontSize: 16,
// // // // //     color: "#475569",
// // // // //     fontWeight: "600",
// // // // //   },
// // // // //   footer: {
// // // // //     alignItems: "center",
// // // // //     marginTop: 20,
// // // // //   },
// // // // //   footerText: {
// // // // //     fontSize: 12,
// // // // //     color: "#e6f3ff",
// // // // //     opacity: 0.8,
// // // // //     marginBottom: 12,
// // // // //   },
// // // // //   securityBadge: {
// // // // //     backgroundColor: "rgba(255, 255, 255, 0.1)",
// // // // //     paddingHorizontal: 16,
// // // // //     paddingVertical: 8,
// // // // //     borderRadius: 20,
// // // // //     borderWidth: 1,
// // // // //     borderColor: "rgba(255, 255, 255, 0.2)",
// // // // //   },
// // // // //   securityText: {
// // // // //     fontSize: 12,
// // // // //     color: "#ffffff",
// // // // //     fontWeight: "500",
// // // // //   },
// // // // //   // Splash Screen Styles
// // // // //   splashContainer: {
// // // // //     flex: 1,
// // // // //     backgroundColor: "#0071ce",
// // // // //     justifyContent: "center",
// // // // //     alignItems: "center",
// // // // //   },
// // // // //   splashContent: {
// // // // //     alignItems: "center",
// // // // //   },
// // // // //   splashLogo: {
// // // // //     fontSize: 48,
// // // // //     fontWeight: "800",
// // // // //     color: "#ffc220",
// // // // //     letterSpacing: -2,
// // // // //   },
// // // // //   splashSpark: {
// // // // //     fontSize: 32,
// // // // //     marginLeft: 12,
// // // // //   },
// // // // //   loadingContainer: {
// // // // //     alignItems: "center",
// // // // //     marginTop: 40,
// // // // //   },
// // // // //   loadingBar: {
// // // // //     width: 200,
// // // // //     height: 4,
// // // // //     backgroundColor: "rgba(255, 255, 255, 0.3)",
// // // // //     borderRadius: 2,
// // // // //     marginBottom: 24,
// // // // //     overflow: "hidden",
// // // // //   },
// // // // //   loadingProgress: {
// // // // //     height: "100%",
// // // // //     backgroundColor: "#ffc220",
// // // // //     borderRadius: 2,
// // // // //     width: "70%",
// // // // //   },
// // // // //   splashText: {
// // // // //     fontSize: 20,
// // // // //     fontWeight: "600",
// // // // //     color: "#ffffff",
// // // // //     textAlign: "center",
// // // // //     marginBottom: 8,
// // // // //   },
// // // // //   splashSubtext: {
// // // // //     fontSize: 14,
// // // // //     color: "#e6f3ff",
// // // // //     textAlign: "center",
// // // // //     opacity: 0.9,
// // // // //   },
// // // // // })
// // // // "use client"

// // // // import { useState, useEffect } from "react"
// // // // import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from "react-native"

// // // // type Props = {
// // // //   setRole: (role: "admin" | "worker") => void
// // // // }

// // // // const { width, height } = Dimensions.get("window")

// // // // export default function LoginScreen({ setRole }: Props) {
// // // //   const [selectedRole, setSelectedRole] = useState<"admin" | "worker" | null>(null)
// // // //   const [showSplash, setShowSplash] = useState(false)

// // // //   const fadeAnim = new Animated.Value(0)

// // // //   useEffect(() => {
// // // //     Animated.timing(fadeAnim, {
// // // //       toValue: 1,
// // // //       duration: 500,
// // // //       useNativeDriver: true,
// // // //     }).start()
// // // //   }, [])

// // // //   useEffect(() => {
// // // //     if (selectedRole) {
// // // //       setShowSplash(true)
// // // //       setTimeout(() => setRole(selectedRole), 1500)
// // // //     }
// // // //   }, [selectedRole])

// // // //   if (showSplash) {
// // // //     return (
// // // //       <View style={styles.splashContainer}>
// // // //         <Text style={styles.logo}>Walmart</Text>
// // // //         <Text style={styles.splashText}>
// // // //           {selectedRole === "admin" ? "Accessing Management..." : "Setting Up Workspace..."}
// // // //         </Text>
// // // //       </View>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <View style={styles.container}>
// // // //       <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
// // // //         <Text style={styles.logo}>Walmart</Text>
// // // //         <Text style={styles.subtitle}>Welcome to EchoBin</Text>
// // // //         <Text style={styles.description}>Choose your role</Text>

// // // //         <TouchableOpacity
// // // //           style={[styles.button, selectedRole === "admin" && styles.selected]}
// // // //           onPress={() => setSelectedRole("admin")}
// // // //         >
// // // //           <Text style={styles.buttonText}>Admin</Text>
// // // //         </TouchableOpacity>

// // // //         <TouchableOpacity
// // // //           style={[styles.button, selectedRole === "worker" && styles.selected]}
// // // //           onPress={() => setSelectedRole("worker")}
// // // //         >
// // // //           <Text style={styles.buttonText}>Team Member</Text>
// // // //         </TouchableOpacity>
// // // //       </Animated.View>
// // // //     </View>
// // // //   )
// // // // }

// // // // const styles = StyleSheet.create({
// // // //   container: {
// // // //     flex: 1,
// // // //     backgroundColor: "#f8f9fa",
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //   },
// // // //   content: {
// // // //     alignItems: "center",
// // // //     width: "80%",
// // // //   },
// // // //   logo: {
// // // //     fontSize: 28,
// // // //     fontWeight: "700",
// // // //     color: "#0071ce",
// // // //     marginBottom: 8,
// // // //   },
// // // //   subtitle: {
// // // //     fontSize: 16,
// // // //     color: "#444",
// // // //     marginBottom: 4,
// // // //   },
// // // //   description: {
// // // //     fontSize: 14,
// // // //     color: "#777",
// // // //     marginBottom: 32,
// // // //   },
// // // //   button: {
// // // //     width: "100%",
// // // //     paddingVertical: 14,
// // // //     backgroundColor: "#ffffff",
// // // //     borderWidth: 1,
// // // //     borderColor: "#ccc",
// // // //     borderRadius: 8,
// // // //     marginVertical: 8,
// // // //     alignItems: "center",
// // // //   },
// // // //   selected: {
// // // //     borderColor: "#0071ce",
// // // //     backgroundColor: "#e6f0fa",
// // // //   },
// // // //   buttonText: {
// // // //     fontSize: 16,
// // // //     color: "#0071ce",
// // // //     fontWeight: "500",
// // // //   },
// // // //   splashContainer: {
// // // //     flex: 1,
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     backgroundColor: "#f8f9fa",
// // // //   },
// // // //   splashText: {
// // // //     fontSize: 16,
// // // //     color: "#444",
// // // //     marginTop: 16,
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
// // //   ActivityIndicator,
// // // } from "react-native"
// // // import {
// // //   auth,
// // //   database,
// // //   ref,
// // //   get,
// // //   signInWithEmailAndPassword,
// // // } from "@/hooks/firebaseConfig"

// // // type Props = {
// // //   setRole: (role: "admin" | "worker") => void
// // // }

// // // export default function LoginScreen({ setRole }: Props) {
// // //   const [email, setEmail] = useState("")
// // //   const [password, setPassword] = useState("")
// // //   const [loading, setLoading] = useState(false)

// // //   const handleLogin = async () => {
// // //     if (!email || !password) {
// // //       Alert.alert("Missing Fields", "Please enter both email and password.")
// // //       return
// // //     }

// // //     try {
// // //       setLoading(true)

// // //       const userCredential = await signInWithEmailAndPassword(auth, email, password)
// // //       const user = userCredential.user

// // //       // Fetch user role from DB
// // //       const userRef = ref(database, `users/${user.uid}`)
// // //       const snapshot = await get(userRef)

// // //       if (snapshot.exists()) {
// // //         const userData = snapshot.val()
// // //         const role = userData.role

// // //         if (role === "admin" || role === "worker") {
// // //           setRole(role)
// // //         } else {
// // //           Alert.alert("Unknown Role", "User has no valid role assigned.")
// // //         }
// // //       } else {
// // //         Alert.alert("User Data Not Found", "Could not find user details in the database.")
// // //       }
// // //     } catch (error: any) {
// // //       console.log("Login Error:", error)
// // //       Alert.alert("Login Failed", error.message)
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   return (
// // //     <KeyboardAvoidingView
// // //       behavior={Platform.OS === "ios" ? "padding" : "height"}
// // //       style={styles.container}
// // //     >
// // //       <View style={styles.inner}>
// // //         <Text style={styles.logo}>Walmart</Text>
// // //         <Text style={styles.subtitle}>Welcome to EchoBin</Text>
// // //         <Text style={styles.header}>Sign In</Text>

// // //         <TextInput
// // //           placeholder="Email"
// // //           value={email}
// // //           onChangeText={setEmail}
// // //           keyboardType="email-address"
// // //           autoCapitalize="none"
// // //           style={styles.input}
// // //         />
// // //         <TextInput
// // //           placeholder="Password"
// // //           value={password}
// // //           onChangeText={setPassword}
// // //           secureTextEntry
// // //           style={styles.input}
// // //         />

// // //         <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
// // //           {loading ? (
// // //             <ActivityIndicator color="#ffffff" />
// // //           ) : (
// // //             <Text style={styles.buttonText}>Login</Text>
// // //           )}
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
// // //     color: "#0071ce",
// // //     textAlign: "center",
// // //     marginBottom: 4,
// // //   },
// // //   subtitle: {
// // //     fontSize: 14,
// // //     color: "#6b7280",
// // //     textAlign: "center",
// // //     marginBottom: 16,
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
// // //   button: {
// // //     backgroundColor: "#0071ce",
// // //     paddingVertical: 14,
// // //     borderRadius: 12,
// // //     alignItems: "center",
// // //   },
// // //   buttonText: {
// // //     fontSize: 16,
// // //     fontWeight: "600",
// // //     color: "#ffffff",
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
// //   ActivityIndicator,
// // } from "react-native"
// // import {
// //   auth,
// //   database,
// //   ref,
// //   get,
// //   signInWithEmailAndPassword,
// // } from "@/hooks/firebaseConfig"

// // type Props = {
// //   setRole: (role: "admin" | "worker") => void
// // }

// // export default function LoginScreen({ setRole }: Props) {
// //   const [email, setEmail] = useState("")
// //   const [password, setPassword] = useState("")
// //   const [loading, setLoading] = useState(false)

// //   const handleLogin = async () => {
// //     if (!email || !password) {
// //       Alert.alert("Missing Fields", "Please enter both email and password.")
// //       return
// //     }

// //     try {
// //       setLoading(true)

// //       const userCredential = await signInWithEmailAndPassword(auth, email, password)
// //       const user = userCredential.user

// //       const userRef = ref(database, `users/${user.uid}`)
// //       const snapshot = await get(userRef)

// //       if (snapshot.exists()) {
// //         const userData = snapshot.val()
// //         const role = userData.role

// //         if (role === "admin" || role === "worker") {
// //           setRole(role)
// //         } else {
// //           Alert.alert("Unknown Role", "User has no valid role assigned.")
// //         }
// //       } else {
// //         Alert.alert("User Data Not Found", "Could not find user details in the database.")
// //       }
// //     } catch (error: any) {
// //       console.log("Login Error:", error)
// //       Alert.alert("Login Failed", error.message)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   return (
// //     <KeyboardAvoidingView
// //       behavior={Platform.OS === "ios" ? "padding" : "height"}
// //       style={styles.container}
// //     >
// //       <Text style={styles.logo}>EchoBin</Text>
// //       <Text style={styles.subtitle}>Welcome back  </Text>

// //       <View style={styles.card}>
// //         <Text style={styles.header}>Log in</Text>

// //         <TextInput
// //           placeholder="Email address"
// //           value={email}
// //           onChangeText={setEmail}
// //           keyboardType="email-address"
// //           autoCapitalize="none"
// //           style={styles.input}
// //           placeholderTextColor="#9ca3af"
// //         />
// //         <TextInput
// //           placeholder="Password"
// //           value={password}
// //           onChangeText={setPassword}
// //           secureTextEntry
// //           style={styles.input}
// //           placeholderTextColor="#9ca3af"
// //         />

// //         <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
// //           {loading ? (
// //             <ActivityIndicator color="#ffffff" />
// //           ) : (
// //             <Text style={styles.buttonText}>Sign In</Text>
// //           )}
// //         </TouchableOpacity>
// //       </View>
// //     </KeyboardAvoidingView>
// //   )
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#fdf6e3", // Classy warm beige
// //     justifyContent: "center",
// //     alignItems: "center",
// //     paddingHorizontal: 24,
// //   },
// //   logo: {
// //     fontSize: 34,
// //     fontWeight: "700",
// //     color: "#0071ce",
// //     marginBottom: 4,
// //   },
// //   subtitle: {
// //     fontSize: 15,
// //     color: "#4b5563",
// //     marginBottom: 28,
// //   },
// //   card: {
// //     width: "100%",
// //     backgroundColor: "#ffffff",
// //     borderRadius: 16,
// //     padding: 28,
// //     shadowColor: "#000",
// //     shadowOpacity: 0.05,
// //     shadowOffset: { width: 0, height: 6 },
// //     shadowRadius: 12,
// //     elevation: 5,
// //   },
// //   header: {
// //     fontSize: 22,
// //     fontWeight: "600",
// //     color: "#1f2937",
// //     marginBottom: 24,
// //     textAlign: "center",
// //   },
// //   input: {
// //     backgroundColor: "#f9fafb",
// //     borderRadius: 10,
// //     paddingVertical: 14,
// //     paddingHorizontal: 18,
// //     marginBottom: 16,
// //     fontSize: 16,
// //     borderWidth: 1,
// //     borderColor: "#e5e7eb",
// //   },
// //   button: {
// //     backgroundColor: "#0071ce",
// //     paddingVertical: 16,
// //     borderRadius: 10,
// //     alignItems: "center",
// //     marginTop: 8,
// //   },
// //   buttonText: {
// //     fontSize: 16,
// //     fontWeight: "600",
// //     color: "#ffffff",
// //   },
// // })
// "use client"

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
//   ActivityIndicator,
// } from "react-native"
// import {
//   auth,
//   database,
//   ref,
//   get,
//   signInWithEmailAndPassword,
// } from "@/hooks/firebaseConfig"

// type Props = {
//   setRole: (role: "admin" | "worker") => void
// }

// export default function LoginScreen({ setRole }: Props) {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [loading, setLoading] = useState(false)

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert("Missing Fields", "Please enter both email and password.")
//       return
//     }

//     try {
//       setLoading(true)

//       const userCredential = await signInWithEmailAndPassword(auth, email, password)
//       const user = userCredential.user

//       const userRef = ref(database, `users/${user.uid}`)
//       const snapshot = await get(userRef)

//       if (snapshot.exists()) {
//         const userData = snapshot.val()
//         const role = userData.role

//         if (role === "admin" || role === "worker") {
//           setRole(role)
//         } else {
//           Alert.alert("Unknown Role", "User has no valid role assigned.")
//         }
//       } else {
//         Alert.alert("User Data Not Found", "Could not find user details in the database.")
//       }
//     } catch (error: any) {
//       console.log("Login Error:", error)
//       Alert.alert("Login Failed", error.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <Text style={styles.logo}>EchoBin</Text>
//       <Text style={styles.subtitle}>Smart returns. Clean future.</Text>

//       <View style={styles.card}>
//         <Text style={styles.header}>Welcome back</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Email address"
//           placeholderTextColor="#9ca3af"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           placeholderTextColor="#9ca3af"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />

//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleLogin}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#ffffff" />
//           ) : (
//             <Text style={styles.buttonText}>Login</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff", // white base
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   logo: {
//     fontSize: 38,
//     fontWeight: "800",
//     color: "#0071ce", // primary blue
//     marginBottom: 6,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#9ca3af",
//     marginBottom: 30,
//     fontStyle: "italic",
//   },
//   card: {
//     width: "100%",
//     maxWidth: 380,
//     backgroundColor: "#f9fafb",
//     padding: 26,
//     borderRadius: 20,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 6 },
//     elevation: 5,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#111827", // deep gray
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   input: {
//     backgroundColor: "#f3f4f6",
//     borderRadius: 12,
//     paddingVertical: 14,
//     paddingHorizontal: 18,
//     fontSize: 16,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//   },
//   button: {
//     backgroundColor: "#0071ce", // strong blue
//     borderRadius: 12,
//     paddingVertical: 16,
//     alignItems: "center",
//     marginTop: 4,
//     shadowColor: "#0071ce",
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 6 },
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     letterSpacing: 0.3,
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
  ActivityIndicator,
  Animated,
} from "react-native"
import {
  auth,
  database,
  ref,
  get,
  signInWithEmailAndPassword,
} from "@/hooks/firebaseConfig"

type Props = {
  setRole: (role: "admin" | "worker") => void
}

export default function LoginScreen({ setRole }: Props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState<"email" | "password" | null>(null)

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password.")
      return
    }

    try {
      setLoading(true)

      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      const userRef = ref(database, `users/${user.uid}`)
      const snapshot = await get(userRef)

      if (snapshot.exists()) {
        const userData = snapshot.val()
        const role = userData.role

        if (role === "admin" || role === "worker") {
          setRole(role)
        } else {
          Alert.alert("Unknown Role", "User has no valid role assigned.")
        }
      } else {
        Alert.alert("User Data Not Found", "Could not find user details in the database.")
      }
    } catch (error: any) {
      console.log("Login Error:", error)
      Alert.alert("Login Failed", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.logo}>EchoBin</Text>
      <Text style={styles.subtitle}>Revolutionizing Returns</Text>

      <View style={styles.card}>
        <Text style={styles.header}>Log in</Text>

        <TextInput
          style={[
            styles.input,
            focused === "email" && styles.inputFocused,
          ]}
          placeholder="Email address"
          placeholderTextColor="#9ca3af"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
        />

        <TextInput
          style={[
            styles.input,
            focused === "password" && styles.inputFocused,
          ]}
          placeholder="Password"
          placeholderTextColor="#9ca3af"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          onFocus={() => setFocused("password")}
          onBlur={() => setFocused(null)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.helpIcon}
        onPress={() => Alert.alert("Need Help?", "Contact IT Support")}
      >
        <Text style={styles.helpText}>?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#0071ce",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 28,
    fontStyle: "italic",
  },
  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#f9fafb",
    padding: 28,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#facc15", // Yellow border
    shadowColor: "#facc15",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  inputFocused: {
    borderColor: "#facc15", // Yellow underline when focused
    backgroundColor: "#fefce8", // light yellow hint
  },
  button: {
    backgroundColor: "#0071ce",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#0071ce",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  helpIcon: {
    position: "absolute",
    bottom: 40,
    right: 30,
    backgroundColor: "#facc15",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#facc15",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  helpText: {
    color: "#1f2937",
    fontSize: 20,
    fontWeight: "700",
  },
})
