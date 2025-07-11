// // // import React, { useState } from 'react';
// // // import { NavigationContainer } from '@react-navigation/native';
// // // import { createDrawerNavigator } from '@react-navigation/drawer';
// // // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // // import {
// // //   View,
// // //   ActivityIndicator,
// // //   Text,
// // //   StyleSheet,
// // //   TouchableOpacity,
// // // } from 'react-native';
// // // import {
// // //   DrawerContentScrollView,
// // //   DrawerItemList,
// // //   DrawerContentComponentProps,
// // // } from '@react-navigation/drawer';
// // // import {
// // //   useFonts,
// // //   Poppins_400Regular,
// // //   Poppins_500Medium,
// // //   Poppins_600SemiBold,
// // // } from '@expo-google-fonts/poppins';

// // // import LoginScreen from './screens/LoginScreen';
// // // import TaskListScreen from './screens/TaskListScreen';
// // // import ScanScreen from './screens/ScanScreen';
// // // import ProfileScreen from './screens/ProfileScreen';
// // // import DashboardScreen from './screens/DashboardScreen';

// // // export type Role = 'admin' | 'worker' | null;

// // // interface CustomDrawerContentProps extends DrawerContentComponentProps {
// // //   role: Role;
// // //   setRole: (role: Role) => void;
// // // }

// // // interface DrawerProps {
// // //   setRole: (role: Role) => void;
// // // }

// // // const Drawer = createDrawerNavigator();
// // // const Stack = createNativeStackNavigator();

// // // function CustomDrawerContent(props: CustomDrawerContentProps) {
// // //   const { role, setRole, ...drawerProps } = props;

// // //   const handleLogout = () => {
// // //     setRole(null);
// // //   };

// // //   return (
// // //     <View style={styles.drawerContainer}>
// // //       <DrawerContentScrollView
// // //         {...drawerProps}
// // //         contentContainerStyle={styles.drawerScrollView}
// // //         showsVerticalScrollIndicator={false}
// // //       >
// // //         <View style={styles.drawerHeader}>
// // //           <View style={styles.profileImageContainer}>
// // //             <View style={styles.profileImage}>
// // //               <Text style={styles.profileInitial}>
// // //                 {role === 'admin' ? 'A' : 'W'}
// // //               </Text>
// // //             </View>
// // //           </View>
// // //           <Text style={styles.welcomeText}>Welcome back</Text>
// // //           <Text style={styles.roleText}>
// // //             {role === 'admin' ? 'Administrator' : 'Worker'}
// // //           </Text>
// // //         </View>
// // //         <View style={styles.drawerItems}>
// // //           <DrawerItemList {...drawerProps} />
// // //         </View>
// // //       </DrawerContentScrollView>

// // //       <View style={styles.drawerFooter}>
// // //         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
// // //           <Text style={styles.logoutIcon}>⏻</Text>
// // //           <Text style={styles.logoutText}>Sign Out</Text>
// // //         </TouchableOpacity>
// // //         <Text style={styles.appVersion}>Version 1.0.0</Text>
// // //       </View>
// // //     </View>
// // //   );
// // // }

// // // function AdminDrawer({ setRole }: DrawerProps) {
// // //   return (
// // //     <Drawer.Navigator
// // //       initialRouteName="Dashboard"
// // //       drawerContent={(props) => (
// // //         <CustomDrawerContent {...props} role="admin" setRole={setRole} />
// // //       )}
// // //       screenOptions={{
// // //         drawerStyle: styles.drawer,
// // //         drawerActiveTintColor: '#6366f1',
// // //         drawerInactiveTintColor: '#6b7280',
// // //         drawerActiveBackgroundColor: '#f0f0ff',
// // //         drawerItemStyle: styles.drawerItem,
// // //         drawerLabelStyle: styles.drawerLabel,
// // //         headerStyle: styles.header,
// // //         headerTintColor: '#374151',
// // //         headerTitleStyle: styles.headerTitle,
// // //         headerShadowVisible: false,
// // //       }}
// // //     >
// // //       <Drawer.Screen
// // //         name="Dashboard"
// // //         component={DashboardScreen}
// // //         options={{
// // //           title: 'Dashboard',
// // //           drawerIcon: ({ color }) => (
// // //             <Text style={[styles.drawerIcon, { color }]}>📊</Text>
// // //           ),
// // //         }}
// // //       />
// // //     </Drawer.Navigator>
// // //   );
// // // }

// // // function WorkerDrawer({ setRole }: DrawerProps) {
// // //   return (
// // //     <Drawer.Navigator
// // //       initialRouteName="Tasks"
// // //       drawerContent={(props) => (
// // //         <CustomDrawerContent {...props} role="worker" setRole={setRole} />
// // //       )}
// // //       screenOptions={{
// // //         drawerStyle: styles.drawer,
// // //         drawerActiveTintColor: '#6366f1',
// // //         drawerInactiveTintColor: '#6b7280',
// // //         drawerActiveBackgroundColor: '#f0f0ff',
// // //         drawerItemStyle: styles.drawerItem,
// // //         drawerLabelStyle: styles.drawerLabel,
// // //         headerStyle: styles.header,
// // //         headerTintColor: '#374151',
// // //         headerTitleStyle: styles.headerTitle,
// // //         headerShadowVisible: false,
// // //       }}
// // //     >
// // //       <Drawer.Screen
// // //         name="Tasks"
// // //         component={TaskListScreen}
// // //         options={{
// // //           title: 'My Tasks',
// // //           drawerIcon: ({ color }) => (
// // //             <Text style={[styles.drawerIcon, { color }]}>✓</Text>
// // //           ),
// // //         }}
// // //       />
// // //       <Drawer.Screen
// // //         name="Scan Tag"
// // //         component={ScanScreen}
// // //         options={{
// // //           title: 'Scan Tag',
// // //           drawerIcon: ({ color }) => (
// // //             <Text style={[styles.drawerIcon, { color }]}>📱</Text>
// // //           ),
// // //         }}
// // //       />
// // //       <Drawer.Screen
// // //         name="Profile"
// // //         component={ProfileScreen}
// // //         options={{
// // //           title: 'Profile',
// // //           drawerIcon: ({ color }) => (
// // //             <Text style={[styles.drawerIcon, { color }]}>👤</Text>
// // //           ),
// // //         }}
// // //       />
// // //     </Drawer.Navigator>
// // //   );
// // // }

// // // export default function App() {
// // //   const [role, setRole] = useState<Role>(null);

// // //   const [fontsLoaded] = useFonts({
// // //     Poppins_400Regular,
// // //     Poppins_500Medium,
// // //     Poppins_600SemiBold,
// // //   });

// // //   if (!fontsLoaded) {
// // //     return (
// // //       <View style={styles.loadingContainer}>
// // //         <ActivityIndicator size="large" color="#6366f1" />
// // //       </View>
// // //     );
// // //   }

// // //   return (
// // //     <NavigationContainer>
// // //       {role === null ? (
// // //         <Stack.Navigator screenOptions={{ headerShown: false }}>
// // //           <Stack.Screen name="Login">
// // //             {(props) => <LoginScreen {...props} setRole={setRole} />}
// // //           </Stack.Screen>
// // //         </Stack.Navigator>
// // //       ) : role === 'admin' ? (
// // //         <AdminDrawer setRole={setRole} />
// // //       ) : (
// // //         <WorkerDrawer setRole={setRole} />
// // //       )}
// // //     </NavigationContainer>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   loadingContainer: {
// // //     flex: 1,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     backgroundColor: '#ffffff',
// // //   },
// // //   drawerContainer: {
// // //     flex: 1,
// // //     backgroundColor: '#ffffff',
// // //   },
// // //   drawerScrollView: {
// // //     flexGrow: 1,
// // //   },
// // //   drawerHeader: {
// // //     backgroundColor: '#f8fafc',
// // //     paddingVertical: 40,
// // //     paddingHorizontal: 24,
// // //     alignItems: 'center',
// // //     borderBottomWidth: 1,
// // //     borderBottomColor: '#f1f5f9',
// // //   },
// // //   profileImageContainer: {
// // //     marginBottom: 16,
// // //   },
// // //   profileImage: {
// // //     width: 64,
// // //     height: 64,
// // //     borderRadius: 32,
// // //     backgroundColor: '#6366f1',
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     shadowColor: '#6366f1',
// // //     shadowOffset: { width: 0, height: 4 },
// // //     shadowOpacity: 0.1,
// // //     shadowRadius: 8,
// // //     elevation: 4,
// // //   },
// // //   profileInitial: {
// // //     fontSize: 24,
// // //     fontFamily: 'Poppins_600SemiBold',
// // //     color: '#ffffff',
// // //   },
// // //   welcomeText: {
// // //     fontSize: 18,
// // //     fontFamily: 'Poppins_500Medium',
// // //     color: '#1f2937',
// // //     marginBottom: 4,
// // //   },
// // //   roleText: {
// // //     fontSize: 14,
// // //     fontFamily: 'Poppins_400Regular',
// // //     color: '#6b7280',
// // //   },
// // //   drawerItems: {
// // //     flex: 1,
// // //     paddingTop: 24,
// // //     paddingHorizontal: 8,
// // //   },
// // //   drawerFooter: {
// // //     borderTopWidth: 1,
// // //     borderTopColor: '#f1f5f9',
// // //     paddingVertical: 24,
// // //     paddingHorizontal: 20,
// // //     alignItems: 'center',
// // //   },
// // //   logoutButton: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //     paddingVertical: 12,
// // //     paddingHorizontal: 24,
// // //     backgroundColor: '#f8fafc',
// // //     borderRadius: 12,
// // //     marginBottom: 16,
// // //     borderWidth: 1,
// // //     borderColor: '#e2e8f0',
// // //     width: '100%',
// // //   },
// // //   logoutIcon: {
// // //     fontSize: 18,
// // //     marginRight: 8,
// // //   },
// // //   logoutText: {
// // //     fontSize: 15,
// // //     fontFamily: 'Poppins_500Medium',
// // //     color: '#374151',
// // //   },
// // //   appVersion: {
// // //     fontSize: 12,
// // //     fontFamily: 'Poppins_400Regular',
// // //     color: '#9ca3af',
// // //   },
// // //   drawer: {
// // //     backgroundColor: '#ffffff',
// // //     width: 300,
// // //   },
// // //   drawerItem: {
// // //     marginHorizontal: 8,
// // //     marginVertical: 2,
// // //     borderRadius: 12,
// // //     paddingVertical: 4,
// // //   },
// // //   drawerLabel: {
// // //     fontSize: 15,
// // //     fontFamily: 'Poppins_500Medium',
// // //     marginLeft: -8,
// // //   },
// // //   drawerIcon: {
// // //     fontSize: 20,
// // //     width: 28,
// // //     textAlign: 'center',
// // //   },
// // //   header: {
// // //     backgroundColor: '#ffffff',
// // //     borderBottomWidth: 1,
// // //     borderBottomColor: '#f1f5f9',
// // //   },
// // //   headerTitle: {
// // //     fontSize: 17,
// // //     fontFamily: 'Poppins_600SemiBold',
// // //     color: '#1f2937',
// // //   },
// // // });
// // import React, { useState } from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createDrawerNavigator } from '@react-navigation/drawer';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // import {
// //   View,
// //   ActivityIndicator,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// // } from 'react-native';
// // import {
// //   DrawerContentScrollView,
// //   DrawerItemList,
// //   DrawerContentComponentProps,
// // } from '@react-navigation/drawer';
// // import {
// //   useFonts,
// //   Poppins_400Regular,
// //   Poppins_500Medium,
// //   Poppins_600SemiBold,
// // } from '@expo-google-fonts/poppins';

// // import LoginScreen from './screens/LoginScreen';
// // import SignupScreen from './screens/Signup';
// // import TaskListScreen from './screens/TaskListScreen';
// // import ScanScreen from './screens/ScanScreen';
// // import ProfileScreen from './screens/ProfileScreen';
// // import DashboardScreen from './screens/DashboardScreen';

// // export type Role = 'admin' | 'worker' | null;

// // interface CustomDrawerContentProps extends DrawerContentComponentProps {
// //   role: Role;
// //   setRole: (role: Role) => void;
// // }

// // interface DrawerProps {
// //   setRole: (role: Role) => void;
// // }

// // const Drawer = createDrawerNavigator();
// // const Stack = createNativeStackNavigator();

// // function CustomDrawerContent(props: CustomDrawerContentProps) {
// //   const { role, setRole, ...drawerProps } = props;

// //   const handleLogout = () => {
// //     setRole(null);
// //   };

// //   return (
// //     <View style={styles.drawerContainer}>
// //       <DrawerContentScrollView
// //         {...drawerProps}
// //         contentContainerStyle={styles.drawerScrollView}
// //         showsVerticalScrollIndicator={false}
// //       >
// //         <View style={styles.drawerHeader}>
// //           <View style={styles.profileImageContainer}>
// //             <View style={styles.profileImage}>
// //               <Text style={styles.profileInitial}>
// //                 {role === 'admin' ? 'A' : 'W'}
// //               </Text>
// //             </View>
// //           </View>
// //           <Text style={styles.welcomeText}>Welcome back</Text>
// //           <Text style={styles.roleText}>
// //             {role === 'admin' ? 'Administrator' : 'Worker'}
// //           </Text>
// //         </View>
// //         <View style={styles.drawerItems}>
// //           <DrawerItemList {...drawerProps} />
// //         </View>
// //       </DrawerContentScrollView>

// //       <View style={styles.drawerFooter}>
// //         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
// //           <Text style={styles.logoutIcon}>\u23FB</Text>
// //           <Text style={styles.logoutText}>Sign Out</Text>
// //         </TouchableOpacity>
// //         <Text style={styles.appVersion}>Version 1.0.0</Text>
// //       </View>
// //     </View>
// //   );
// // }

// // function AdminDrawer({ setRole }: DrawerProps) {
// //   return (
// //     <Drawer.Navigator
// //       initialRouteName="Dashboard"
// //       drawerContent={(props) => (
// //         <CustomDrawerContent {...props} role="admin" setRole={setRole} />
// //       )}
// //       screenOptions={drawerOptions}
// //     >
// //       <Drawer.Screen
// //         name="Dashboard"
// //         component={DashboardScreen}
// //         options={{
// //           title: 'Dashboard',
// //           drawerIcon: ({ color }) => (
// //             <Text style={[styles.drawerIcon, { color }]}>\ud83d\udcca</Text>
// //           ),
// //         }}
// //       />
// //     </Drawer.Navigator>
// //   );
// // }

// // function WorkerDrawer({ setRole }: DrawerProps) {
// //   return (
// //     <Drawer.Navigator
// //       initialRouteName="Tasks"
// //       drawerContent={(props) => (
// //         <CustomDrawerContent {...props} role="worker" setRole={setRole} />
// //       )}
// //       screenOptions={drawerOptions}
// //     >
// //       <Drawer.Screen
// //         name="Tasks"
// //         component={TaskListScreen}
// //         options={{
// //           title: 'My Tasks',
// //           drawerIcon: ({ color }) => (
// //             <Text style={[styles.drawerIcon, { color }]}>\u2713</Text>
// //           ),
// //         }}
// //       />
// //       <Drawer.Screen
// //         name="Scan Tag"
// //         component={ScanScreen}
// //         options={{
// //           title: 'Scan Tag',
// //           drawerIcon: ({ color }) => (
// //             <Text style={[styles.drawerIcon, { color }]}>\ud83d\udcf1</Text>
// //           ),
// //         }}
// //       />
// //       <Drawer.Screen
// //         name="Profile"
// //         component={ProfileScreen}
// //         options={{
// //           title: 'Profile',
// //           drawerIcon: ({ color }) => (
// //             <Text style={[styles.drawerIcon, { color }]}>\ud83d\udc64</Text>
// //           ),
// //         }}
// //       />
// //     </Drawer.Navigator>
// //   );
// // }

// // export default function App() {
// //   const [role, setRole] = useState<Role>(null);
// //   const [isSignedUp, setIsSignedUp] = useState<boolean>(false);

// //   const [fontsLoaded] = useFonts({
// //     Poppins_400Regular,
// //     Poppins_500Medium,
// //     Poppins_600SemiBold,
// //   });

// //   if (!fontsLoaded) {
// //     return (
// //       <View style={styles.loadingContainer}>
// //         <ActivityIndicator size="large" color="#6366f1" />
// //       </View>
// //     );
// //   }

// //   return (
// //     <NavigationContainer>
// //       {role === null ? (
// //         <Stack.Navigator screenOptions={{ headerShown: false }}>
// //           {!isSignedUp ? (
// //             <Stack.Screen name="Signup">
// //               {(props) => <SignupScreen {...props} setIsSignedUp={setIsSignedUp} />}
// //             </Stack.Screen>
// //           ) : (
// //             <Stack.Screen name="Login">
// //               {(props) => <LoginScreen {...props} setRole={setRole} />}
// //             </Stack.Screen>
// //           )}
// //         </Stack.Navigator>
// //       ) : role === 'admin' ? (
// //         <AdminDrawer setRole={setRole} />
// //       ) : (
// //         <WorkerDrawer setRole={setRole} />
// //       )}
// //     </NavigationContainer>
// //   );
// // }

// // const drawerOptions = {
// //   drawerStyle: { backgroundColor: '#ffffff', width: 300 },
// //   drawerActiveTintColor: '#6366f1',
// //   drawerInactiveTintColor: '#6b7280',
// //   drawerActiveBackgroundColor: '#f0f0ff',
// //   drawerItemStyle: { marginHorizontal: 8, marginVertical: 2, borderRadius: 12, paddingVertical: 4 },
// //   drawerLabelStyle: { fontSize: 15, fontFamily: 'Poppins_500Medium', marginLeft: -8 },
// //   headerStyle: { backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
// //   headerTintColor: '#374151',
// //   headerTitleStyle: { fontSize: 17, fontFamily: 'Poppins_600SemiBold', color: '#1f2937' },
// //   headerShadowVisible: false,
// // };

// // const styles = StyleSheet.create({
// //   loadingContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#ffffff',
// //   },
// //   drawerContainer: {
// //     flex: 1,
// //     backgroundColor: '#ffffff',
// //   },
// //   drawerScrollView: {
// //     flexGrow: 1,
// //   },
// //   drawerHeader: {
// //     backgroundColor: '#f8fafc',
// //     paddingVertical: 40,
// //     paddingHorizontal: 24,
// //     alignItems: 'center',
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#f1f5f9',
// //   },
// //   profileImageContainer: {
// //     marginBottom: 16,
// //   },
// //   profileImage: {
// //     width: 64,
// //     height: 64,
// //     borderRadius: 32,
// //     backgroundColor: '#6366f1',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     shadowColor: '#6366f1',
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 8,
// //     elevation: 4,
// //   },
// //   profileInitial: {
// //     fontSize: 24,
// //     fontFamily: 'Poppins_600SemiBold',
// //     color: '#ffffff',
// //   },
// //   welcomeText: {
// //     fontSize: 18,
// //     fontFamily: 'Poppins_500Medium',
// //     color: '#1f2937',
// //     marginBottom: 4,
// //   },
// //   roleText: {
// //     fontSize: 14,
// //     fontFamily: 'Poppins_400Regular',
// //     color: '#6b7280',
// //   },
// //   drawerItems: {
// //     flex: 1,
// //     paddingTop: 24,
// //     paddingHorizontal: 8,
// //   },
// //   drawerFooter: {
// //     borderTopWidth: 1,
// //     borderTopColor: '#f1f5f9',
// //     paddingVertical: 24,
// //     paddingHorizontal: 20,
// //     alignItems: 'center',
// //   },
// //   logoutButton: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     paddingVertical: 12,
// //     paddingHorizontal: 24,
// //     backgroundColor: '#f8fafc',
// //     borderRadius: 12,
// //     marginBottom: 16,
// //     borderWidth: 1,
// //     borderColor: '#e2e8f0',
// //     width: '100%',
// //   },
// //   logoutIcon: {
// //     fontSize: 18,
// //     marginRight: 8,
// //   },
// //   logoutText: {
// //     fontSize: 15,
// //     fontFamily: 'Poppins_500Medium',
// //     color: '#374151',
// //   },
// //   appVersion: {
// //     fontSize: 12,
// //     fontFamily: 'Poppins_400Regular',
// //     color: '#9ca3af',
// //   },
// //   drawerIcon: {
// //     fontSize: 20,
// //     width: 28,
// //     textAlign: 'center',
// //   },
// // });
// import React, { useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import {
//   View,
//   ActivityIndicator,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import {
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerContentComponentProps,
// } from '@react-navigation/drawer';
// import {
//   useFonts,
//   Poppins_400Regular,
//   Poppins_500Medium,
//   Poppins_600SemiBold,
// } from '@expo-google-fonts/poppins';

// import LoginScreen from './screens/LoginScreen';
// import SignupScreen from './screens/Signup';
// import TaskListScreen from './screens/TaskListScreen';
// import ScanScreen from './screens/ScanScreen';
// import ProfileScreen from './screens/ProfileScreen';
// import DashboardScreen from './screens/DashboardScreen';

// export type Role = 'admin' | 'worker' | null;

// interface CustomDrawerContentProps extends DrawerContentComponentProps {
//   role: Role;
//   setRole: (role: Role) => void;
// }

// interface DrawerProps {
//   setRole: (role: Role) => void;
// }

// const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();

// function CustomDrawerContent(props: CustomDrawerContentProps) {
//   const { role, setRole, ...drawerProps } = props;

//   const handleLogout = () => {
//     setRole(null);
//   };

//   return (
//     <View style={styles.drawerContainer}>
//       <DrawerContentScrollView
//         {...drawerProps}
//         contentContainerStyle={styles.drawerScrollView}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.drawerHeader}>
//           <View style={styles.profileImageContainer}>
//             <View style={styles.profileImage}>
//               <Text style={styles.profileInitial}>
//                 {role === 'admin' ? 'A' : 'W'}
//               </Text>
//             </View>
//           </View>
//           <Text style={styles.welcomeText}>Welcome back</Text>
//           <Text style={styles.roleText}>
//             {role === 'admin' ? 'Administrator' : 'Worker'}
//           </Text>
//         </View>
//         <View style={styles.drawerItems}>
//           <DrawerItemList {...drawerProps} />
//         </View>
//       </DrawerContentScrollView>

//       <View style={styles.drawerFooter}>
//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <Text style={styles.logoutIcon}>⏻</Text>
//           <Text style={styles.logoutText}>Sign Out</Text>
//         </TouchableOpacity>
//         <Text style={styles.appVersion}>Version 9.11.0</Text>
//       </View>
//     </View>
//   );
// }

// function AdminDrawer({ setRole }: DrawerProps) {
//   return (
//     <Drawer.Navigator
//       initialRouteName="Dashboard"
//       drawerContent={(props) => (
//         <CustomDrawerContent {...props} role="admin" setRole={setRole} />
//       )}
//       screenOptions={drawerOptions}
//     >
//       <Drawer.Screen
//         name="Dashboard"
//         component={DashboardScreen}
//         options={{
//           title: 'Dashboard',
//           drawerIcon: ({ color }) => (
//             <Text style={[styles.drawerIcon, { color }]}>📊</Text>
//           ),
//         }}
//       />
//     </Drawer.Navigator>
//   );
// }

// function WorkerDrawer({ setRole }: DrawerProps) {
//   return (
//     <Drawer.Navigator
//       initialRouteName="Tasks"
//       drawerContent={(props) => (
//         <CustomDrawerContent {...props} role="worker" setRole={setRole} />
//       )}
//       screenOptions={drawerOptions}
//     >
//       <Drawer.Screen
//         name="Tasks"
//         component={TaskListScreen}
//         options={{
//           title: 'My Tasks',
//           drawerIcon: ({ color }) => (
//             <Text style={[styles.drawerIcon, { color }]}>✓</Text>
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Scan Tag"
//         component={ScanScreen}
//         options={{
//           title: 'Scan Tag',
//           drawerIcon: ({ color }) => (
//             <Text style={[styles.drawerIcon, { color }]}>📱</Text>
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           title: 'Profile',
//           drawerIcon: ({ color }) => (
//             <Text style={[styles.drawerIcon, { color }]}>👤</Text>
//           ),
//         }}
//       />
//     </Drawer.Navigator>
//   );
// }

// export default function App() {
//   const [role, setRole] = useState<Role>(null);
//   const [authStage, setAuthStage] = useState<'signup' | 'login'>('signup');

//   const [fontsLoaded] = useFonts({
//     Poppins_400Regular,
//     Poppins_500Medium,
//     Poppins_600SemiBold,
//   });

//   if (!fontsLoaded) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#6366f1" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       {role === null ? (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           {authStage === 'signup' ? (
//             <Stack.Screen name="Signup">
//               {(props) => (
//                 <SignupScreen {...props} setAuthStage={() => setAuthStage('login')} />
//               )}
//             </Stack.Screen>
//           ) : (
//             <Stack.Screen name="LoginScreen">
//               {(props) => <LoginScreen {...props} setRole={setRole} />}
//             </Stack.Screen>
//           )}
//         </Stack.Navigator>
//       ) : role === 'admin' ? (
//         <AdminDrawer setRole={setRole} />
//       ) : (
//         <WorkerDrawer setRole={setRole} />
//       )}
//     </NavigationContainer>
//   );
// }

// const drawerOptions = {
//   drawerStyle: { backgroundColor: '#ffffff', width: 300 },
//   drawerActiveTintColor: '#6366f1',
//   drawerInactiveTintColor: '#6b7280',
//   drawerActiveBackgroundColor: '#f0f0ff',
//   drawerItemStyle: { marginHorizontal: 8, marginVertical: 2, borderRadius: 12, paddingVertical: 4 },
//   drawerLabelStyle: { fontSize: 15, fontFamily: 'Poppins_500Medium', marginLeft: -8 },
//   headerStyle: { backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
//   headerTintColor: '#374151',
//   headerTitleStyle: { fontSize: 17, fontFamily: 'Poppins_600SemiBold', color: '#1f2937' },
//   headerShadowVisible: false,
// };

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//   },
//   drawerContainer: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   drawerScrollView: {
//     flexGrow: 1,
//   },
//   drawerHeader: {
//     backgroundColor: '#f8fafc',
//     paddingVertical: 40,
//     paddingHorizontal: 24,
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f1f5f9',
//   },
//   profileImageContainer: {
//     marginBottom: 16,
//   },
//   profileImage: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     backgroundColor: '#6366f1',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#6366f1',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   profileInitial: {
//     fontSize: 24,
//     fontFamily: 'Poppins_600SemiBold',
//     color: '#ffffff',
//   },
//   welcomeText: {
//     fontSize: 18,
//     fontFamily: 'Poppins_500Medium',
//     color: '#1f2937',
//     marginBottom: 4,
//   },
//   roleText: {
//     fontSize: 14,
//     fontFamily: 'Poppins_400Regular',
//     color: '#6b7280',
//   },
//   drawerItems: {
//     flex: 1,
//     paddingTop: 24,
//     paddingHorizontal: 8,
//   },
//   drawerFooter: {
//     borderTopWidth: 1,
//     borderTopColor: '#f1f5f9',
//     paddingVertical: 24,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//   },
//   logoutButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     backgroundColor: '#f8fafc',
//     borderRadius: 12,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#e2e8f0',
//     width: '100%',
//   },
//   logoutIcon: {
//     fontSize: 18,
//     marginRight: 8,
//   },
//   logoutText: {
//     fontSize: 15,
//     fontFamily: 'Poppins_500Medium',
//     color: '#374151',
//   },
//   appVersion: {
//     fontSize: 12,
//     fontFamily: 'Poppins_400Regular',
//     color: '#9ca3af',
//   },
//   drawerIcon: {
//     fontSize: 20,
//     width: 28,
//     textAlign: 'center',
//   },
// });
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/Signup';
import TaskListScreen from './screens/TaskListScreen';
import ScanScreen from './screens/ScanScreen';
import ProfileScreen from './screens/ProfileScreen';
import DashboardScreen from './screens/DashboardScreen';

import {
  auth,
  database,
  ref,
  get,
  onAuthStateChanged,
  signOut,
} from './hooks/firebaseConfig';

export type Role = 'admin' | 'worker' | null;

interface CustomDrawerContentProps extends DrawerContentComponentProps {
  role: Role;
  setRole: (role: Role) => void;
}

interface DrawerProps {
  setRole: (role: Role) => void;
}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function CustomDrawerContent(props: CustomDrawerContentProps) {
  const { role, setRole, ...drawerProps } = props;

  const handleLogout = async () => {
    await signOut(auth);
    setRole(null);
  };

  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView
        {...drawerProps}
        contentContainerStyle={styles.drawerScrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.drawerHeader}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Text style={styles.profileInitial}>
                {role === 'admin' ? 'A' : 'W'}
              </Text>
            </View>
          </View>
          <Text style={styles.welcomeText}>Welcome back</Text>
          <Text style={styles.roleText}>
            {role === 'admin' ? 'Administrator' : 'Worker'}
          </Text>
        </View>
        <View style={styles.drawerItems}>
          <DrawerItemList {...drawerProps} />
        </View>
      </DrawerContentScrollView>

      <View style={styles.drawerFooter}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutIcon}>⏻</Text>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
        <Text style={styles.appVersion}>Version 9.11.0</Text>
      </View>
    </View>
  );
}

function AdminDrawer({ setRole }: DrawerProps) {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => (
        <CustomDrawerContent {...props} role="admin" setRole={setRole} />
      )}
      screenOptions={drawerOptions}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          drawerIcon: ({ color }) => (
            <Text style={[styles.drawerIcon, { color }]}>📊</Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function WorkerDrawer({ setRole }: DrawerProps) {
  return (
    <Drawer.Navigator
      initialRouteName="Tasks"
      drawerContent={(props) => (
        <CustomDrawerContent {...props} role="worker" setRole={setRole} />
      )}
      screenOptions={drawerOptions}
    >
      <Drawer.Screen
        name="Tasks"
        component={TaskListScreen}
        options={{
          title: 'My Tasks',
          drawerIcon: ({ color }) => (
            <Text style={[styles.drawerIcon, { color }]}>✓</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Scan Tag"
        component={ScanScreen}
        options={{
          title: 'Scan Tag',
          drawerIcon: ({ color }) => (
            <Text style={[styles.drawerIcon, { color }]}>📱</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          drawerIcon: ({ color }) => (
            <Text style={[styles.drawerIcon, { color }]}>👤</Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [role, setRole] = useState<Role>(null);
  const [authStage, setAuthStage] = useState<'signup' | 'login'>('signup');
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          if (userData.role === 'admin' || userData.role === 'worker') {
            setRole(userData.role);
          }
        }
      }
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  if (!fontsLoaded || checkingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {role === null ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {authStage === 'signup' ? (
            <Stack.Screen name="Signup">
              {(props) => (
                <SignupScreen {...props} setAuthStage={() => setAuthStage('login')} />
              )}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="LoginScreen">
              {(props) => <LoginScreen {...props} setRole={setRole} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      ) : role === 'admin' ? (
        <AdminDrawer setRole={setRole} />
      ) : (
        <WorkerDrawer setRole={setRole} />
      )}
    </NavigationContainer>
  );
}

const drawerOptions = {
  drawerStyle: { backgroundColor: '#ffffff', width: 300 },
  drawerActiveTintColor: '#6366f1',
  drawerInactiveTintColor: '#6b7280',
  drawerActiveBackgroundColor: '#f0f0ff',
  drawerItemStyle: {
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 12,
    paddingVertical: 4,
  },
  drawerLabelStyle: {
    fontSize: 15,
    fontFamily: 'Poppins_500Medium',
    marginLeft: -8,
  },
  headerStyle: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerTintColor: '#374151',
  headerTitleStyle: {
    fontSize: 17,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1f2937',
  },
  headerShadowVisible: false,
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  drawerScrollView: {
    flexGrow: 1,
  },
  drawerHeader: {
    backgroundColor: '#f8fafc',
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileInitial: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: '#ffffff',
  },
  welcomeText: {
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    color: '#1f2937',
    marginBottom: 4,
  },
  roleText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#6b7280',
  },
  drawerItems: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 8,
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    width: '100%',
  },
  logoutIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  logoutText: {
    fontSize: 15,
    fontFamily: 'Poppins_500Medium',
    color: '#374151',
  },
  appVersion: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#9ca3af',
  },
  drawerIcon: {
    fontSize: 20,
    width: 28,
    textAlign: 'center',
  },
});
