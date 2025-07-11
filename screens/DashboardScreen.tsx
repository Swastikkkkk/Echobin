// // // // // // Main Dashboard Component with Navbar
// // // // // import React, { useEffect, useState } from 'react';
// // // // // import {
// // // // //   View,
// // // // //   Text,
// // // // //   StyleSheet,
// // // // //   Switch,
// // // // //   Dimensions,
// // // // //   TouchableOpacity,
// // // // //   ScrollView,
// // // // //   StatusBar,
// // // // // } from 'react-native';
// // // // // import { useColorScheme } from 'react-native';
// // // // // import { database, ref, onValue } from '../hooks/firebaseConfig';
// // // // // import { BarChart, LineChart } from 'react-native-chart-kit';
// // // // // // import ReportsScreen from './ReportsScreen'; // Import this after creating the file

// // // // // const screenWidth = Dimensions.get('window').width;

// // // // // // Define types for better type safety
// // // // // interface ReturnItem {
// // // // //   sku: string;
// // // // //   reason: string;
// // // // //   condition: string;
// // // // //   timestamp: string;
// // // // //   aiSuggestion?: string;
// // // // // }

// // // // // interface ChartData {
// // // // //   labels: string[];
// // // // //   datasets: {
// // // // //     data: number[];
// // // // //   }[];
// // // // // }

// // // // // // AI Suggestion Generator
// // // // // const generateAISuggestion = (item: ReturnItem): string => {
// // // // //   const { reason, condition, sku } = item;
  
// // // // //   if (reason === 'Defective') {
// // // // //     if (condition === 'New') {
// // // // //       return "🔍 Quality check needed - investigate supplier quality control. Consider batch testing.";
// // // // //     } else if (condition === 'Used') {
// // // // //       return "📋 Document usage patterns - may indicate design flaw or user education needed.";
// // // // //     } else {
// // // // //       return "⚠️ Immediate supplier review required - high defect rate in damaged condition.";
// // // // //     }
// // // // //   } else if (reason === 'Wrong Item') {
// // // // //     if (condition === 'New') {
// // // // //       return "📦 Review picking/packing process - implement double-check system for SKU " + sku.slice(-4);
// // // // //     } else {
// // // // //       return "🔄 Inventory management issue - verify product descriptions and images match actual items.";
// // // // //     }
// // // // //   } else if (reason === 'Changed Mind') {
// // // // //     if (condition === 'New') {
// // // // //       return "💡 Consider restocking immediately - high resale value. Review return policy impact.";
// // // // //     } else {
// // // // //       return "🏷️ Discount for quick sale recommended - or consider refurbishment program.";
// // // // //     }
// // // // //   } else {
// // // // //     return "📊 Analyze return pattern - create custom action plan based on frequency and impact.";
// // // // //   }
// // // // // };

// // // // // export default function MainDashboard() {
// // // // //   const systemTheme = useColorScheme();
// // // // //   const [darkMode, setDarkMode] = useState(systemTheme === 'dark');
// // // // //   const [data, setData] = useState<ReturnItem[]>([]);
// // // // //   const [filteredData, setFilteredData] = useState<ReturnItem[]>([]);
// // // // //   const [filterDate, setFilterDate] = useState<Date | null>(null);
// // // // //   const [reasonFilter, setReasonFilter] = useState('');
// // // // //   const [conditionFilter, setConditionFilter] = useState('');
// // // // //   const [selectedView, setSelectedView] = useState<'dashboard' | 'reports'>('dashboard');

// // // // //   const themeStyles = darkMode ? stylesDark : stylesLight;

// // // // //   useEffect(() => {
// // // // //     const dbRef = ref(database, 'returns');
// // // // //     const unsubscribe = onValue(dbRef, (snapshot) => {
// // // // //       const rawData = snapshot.val();
// // // // //       const parsed: ReturnItem[] = [];
// // // // //       if (rawData) {
// // // // //         Object.keys(rawData).forEach((key) => {
// // // // //           const item = rawData[key];
// // // // //           const returnItem: ReturnItem = {
// // // // //             sku: key,
// // // // //             reason: item.returnReason || 'N/A',
// // // // //             condition: item.condition || 'N/A',
// // // // //             timestamp: item.timestamp || '',
// // // // //           };
// // // // //           returnItem.aiSuggestion = generateAISuggestion(returnItem);
// // // // //           parsed.push(returnItem);
// // // // //         });
// // // // //       }
// // // // //       setData(parsed);
// // // // //       setFilteredData(parsed);
// // // // //     });
// // // // //     return () => unsubscribe();
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     let result = data;
// // // // //     if (filterDate) {
// // // // //       const day = filterDate.toISOString().split('T')[0];
// // // // //       result = result.filter((item) => item.timestamp?.startsWith(day));
// // // // //     }
// // // // //     if (reasonFilter) {
// // // // //       result = result.filter((item) => item.reason === reasonFilter);
// // // // //     }
// // // // //     if (conditionFilter) {
// // // // //       result = result.filter((item) => item.condition === conditionFilter);
// // // // //     }
// // // // //     setFilteredData(result);
// // // // //   }, [data, filterDate, reasonFilter, conditionFilter]);

// // // // //   const chartData: ChartData = {
// // // // //     labels: [...new Set(filteredData.map((i) => i.reason))],
// // // // //     datasets: [
// // // // //       {
// // // // //         data: [...new Set(filteredData.map((i) => i.reason))].map(
// // // // //           (r) => filteredData.filter((x) => x.reason === r).length
// // // // //         ),
// // // // //       },
// // // // //     ],
// // // // //   };

// // // // //   const trendData = {
// // // // //     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
// // // // //     datasets: [
// // // // //       {
// // // // //         data: [12, 8, 15, 6, 10, 4, 7],
// // // // //         color: (opacity = 1) => darkMode ? `rgba(96, 165, 250, ${opacity})` : `rgba(30, 58, 138, ${opacity})`,
// // // // //         strokeWidth: 3,
// // // // //       },
// // // // //     ],
// // // // //   };

// // // // //   const NavButton = ({ title, icon, isActive, onPress }: { title: string; icon: string; isActive: boolean; onPress: () => void }) => (
// // // // //     <TouchableOpacity 
// // // // //       style={[themeStyles.navButton, isActive && themeStyles.navButtonActive]} 
// // // // //       onPress={onPress}
// // // // //     >
// // // // //       <Text style={themeStyles.navIcon}>{icon}</Text>
// // // // //       <Text style={[themeStyles.navText, isActive && themeStyles.navTextActive]}>{title}</Text>
// // // // //     </TouchableOpacity>
// // // // //   );

// // // // //   const FilterChip = ({ title, onPress, isActive }: { title: string; onPress: () => void; isActive: boolean }) => (
// // // // //     <TouchableOpacity 
// // // // //       style={[themeStyles.filterChip, isActive && themeStyles.filterChipActive]} 
// // // // //       onPress={onPress}
// // // // //     >
// // // // //       <Text style={[themeStyles.filterChipText, isActive && themeStyles.filterChipTextActive]}>
// // // // //         {title}
// // // // //       </Text>
// // // // //     </TouchableOpacity>
// // // // //   );

// // // // //   const renderDashboard = () => (
// // // // //     <ScrollView showsVerticalScrollIndicator={false}>
// // // // //       {/* Quick Stats */}
// // // // //       <View style={themeStyles.statsGrid}>
// // // // //         <View style={themeStyles.statCard}>
// // // // //           <Text style={themeStyles.statNumber}>{filteredData.length}</Text>
// // // // //           <Text style={themeStyles.statLabel}>Total Returns</Text>
// // // // //         </View>
// // // // //         <View style={themeStyles.statCard}>
// // // // //           <Text style={themeStyles.statNumber}>{filteredData.filter(i => i.reason === 'Defective').length}</Text>
// // // // //           <Text style={themeStyles.statLabel}>Defective</Text>
// // // // //         </View>
// // // // //         <View style={themeStyles.statCard}>
// // // // //           <Text style={themeStyles.statNumber}>{filteredData.filter(i => i.condition === 'New').length}</Text>
// // // // //           <Text style={themeStyles.statLabel}>New Items</Text>
// // // // //         </View>
// // // // //       </View>

// // // // //       {/* Filters */}
// // // // //       <View style={themeStyles.section}>
// // // // //         <Text style={themeStyles.sectionTitle}>Quick Filters</Text>
// // // // //         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={themeStyles.filterContainer}>
// // // // //           <FilterChip title="All Reasons" onPress={() => setReasonFilter('')} isActive={!reasonFilter} />
// // // // //           <FilterChip title="Defective" onPress={() => setReasonFilter('Defective')} isActive={reasonFilter === 'Defective'} />
// // // // //           <FilterChip title="Wrong Item" onPress={() => setReasonFilter('Wrong Item')} isActive={reasonFilter === 'Wrong Item'} />
// // // // //           <FilterChip title="Changed Mind" onPress={() => setReasonFilter('Changed Mind')} isActive={reasonFilter === 'Changed Mind'} />
// // // // //         </ScrollView>
// // // // //       </View>

// // // // //       {/* Analytics Charts */}
// // // // //       <View style={themeStyles.section}>
// // // // //         <Text style={themeStyles.sectionTitle}>Returns Overview</Text>
// // // // //         {filteredData.length > 0 && (
// // // // //           <BarChart
// // // // //             data={chartData}
// // // // //             width={screenWidth - 40}
// // // // //             height={220}
// // // // //             yAxisLabel=""
// // // // //             yAxisSuffix=""
// // // // //             chartConfig={{
// // // // //               backgroundColor: darkMode ? '#1e293b' : '#ffffff',
// // // // //               backgroundGradientFrom: darkMode ? '#1e293b' : '#f8fafc',
// // // // //               backgroundGradientTo: darkMode ? '#334155' : '#e2e8f0',
// // // // //               decimalPlaces: 0,
// // // // //               color: (opacity = 1) => darkMode ? `rgba(96, 165, 250, ${opacity})` : `rgba(30, 58, 138, ${opacity})`,
// // // // //               labelColor: (opacity = 1) => darkMode ? `rgba(241, 245, 249, ${opacity})` : `rgba(30, 58, 138, ${opacity})`,
// // // // //             }}
// // // // //             style={themeStyles.chart}
// // // // //           />
// // // // //         )}
// // // // //       </View>

// // // // //       <View style={themeStyles.section}>
// // // // //         <Text style={themeStyles.sectionTitle}>Weekly Trend</Text>
// // // // //         <LineChart
// // // // //           data={trendData}
// // // // //           width={screenWidth - 40}
// // // // //           height={200}
// // // // //           chartConfig={{
// // // // //             backgroundColor: darkMode ? '#1e293b' : '#ffffff',
// // // // //             backgroundGradientFrom: darkMode ? '#1e293b' : '#f8fafc',
// // // // //             backgroundGradientTo: darkMode ? '#334155' : '#e2e8f0',
// // // // //             decimalPlaces: 0,
// // // // //             color: (opacity = 1) => darkMode ? `rgba(96, 165, 250, ${opacity})` : `rgba(30, 58, 138, ${opacity})`,
// // // // //             labelColor: (opacity = 1) => darkMode ? `rgba(241, 245, 249, ${opacity})` : `rgba(30, 58, 138, ${opacity})`,
// // // // //           }}
// // // // //           style={themeStyles.chart}
// // // // //         />
// // // // //       </View>

// // // // //       {/* Recent Returns with AI Suggestions */}
// // // // //       <View style={themeStyles.section}>
// // // // //         <Text style={themeStyles.sectionTitle}>Recent Returns & AI Insights</Text>
// // // // //         {filteredData.slice(0, 5).map((item, index) => (
// // // // //           <View key={index} style={themeStyles.returnCard}>
// // // // //             <View style={themeStyles.returnHeader}>
// // // // //               <Text style={themeStyles.returnSku}>{item.sku}</Text>
// // // // //               <View style={themeStyles.badges}>
// // // // //                 <Text style={themeStyles.reasonBadge}>{item.reason}</Text>
// // // // //                 <Text style={themeStyles.conditionBadge}>{item.condition}</Text>
// // // // //               </View>
// // // // //             </View>
// // // // //             <Text style={themeStyles.aiSuggestion}>🤖 {item.aiSuggestion}</Text>
// // // // //             {item.timestamp && (
// // // // //               <Text style={themeStyles.timestamp}>
// // // // //                 📅 {new Date(item.timestamp).toLocaleDateString()}
// // // // //               </Text>
// // // // //             )}
// // // // //           </View>
// // // // //         ))}
// // // // //       </View>

// // // // //       {/* Quick Actions */}
// // // // //       <View style={themeStyles.section}>
// // // // //         <Text style={themeStyles.sectionTitle}>Quick Actions</Text>
// // // // //         <View style={themeStyles.actionGrid}>
// // // // //           <TouchableOpacity 
// // // // //             style={themeStyles.actionButton}
// // // // //             onPress={() => setSelectedView('reports')}
// // // // //           >
// // // // //             <Text style={themeStyles.actionIcon}>📊</Text>
// // // // //             <Text style={themeStyles.actionText}>Generate Report</Text>
// // // // //           </TouchableOpacity>
// // // // //           <TouchableOpacity style={themeStyles.actionButton}>
// // // // //             <Text style={themeStyles.actionIcon}>📈</Text>
// // // // //             <Text style={themeStyles.actionText}>View Analytics</Text>
// // // // //           </TouchableOpacity>
// // // // //           <TouchableOpacity style={themeStyles.actionButton}>
// // // // //             <Text style={themeStyles.actionIcon}>🔍</Text>
// // // // //             <Text style={themeStyles.actionText}>Search Returns</Text>
// // // // //           </TouchableOpacity>
// // // // //           <TouchableOpacity style={themeStyles.actionButton}>
// // // // //             <Text style={themeStyles.actionIcon}>⚙️</Text>
// // // // //             <Text style={themeStyles.actionText}>Settings</Text>
// // // // //           </TouchableOpacity>
// // // // //         </View>
// // // // //       </View>
// // // // //     </ScrollView>
// // // // //   );

// // // // //   return (
// // // // //     <View style={themeStyles.container}>
// // // // //       <StatusBar 
// // // // //         barStyle={darkMode ? 'light-content' : 'dark-content'} 
// // // // //         backgroundColor={darkMode ? '#0f172a' : '#f8fafc'} 
// // // // //       />
      
// // // // //       {/* Header */}
// // // // //       <View style={themeStyles.header}>
// // // // //         <Text style={themeStyles.title}>EchoBin</Text>
// // // // //         <View style={themeStyles.headerActions}>
// // // // //           <Text style={themeStyles.themeLabel}>{darkMode ? '🌙' : '☀️'}</Text>
// // // // //           <Switch 
// // // // //             value={darkMode} 
// // // // //             onValueChange={setDarkMode}
// // // // //             trackColor={{ false: '#cbd5e1', true: '#3b82f6' }}
// // // // //             thumbColor={darkMode ? '#60a5fa' : '#e2e8f0'}
// // // // //           />
// // // // //         </View>
// // // // //       </View>

// // // // //       {/* Navigation Bar */}
// // // // //       <View style={themeStyles.navContainer}>
// // // // //         <NavButton 
// // // // //           title="Dashboard" 
// // // // //           icon="📊" 
// // // // //           isActive={selectedView === 'dashboard'} 
// // // // //           onPress={() => setSelectedView('dashboard')} 
// // // // //         />
// // // // //         <NavButton 
// // // // //           title="Reports" 
// // // // //           icon="📄" 
// // // // //           isActive={selectedView === 'reports'} 
// // // // //           onPress={() => setSelectedView('reports')} 
// // // // //         />
// // // // //       </View>

// // // // //       {/* Content */}
// // // // //       <View style={themeStyles.content}>
// // // // //         {selectedView === 'dashboard' && renderDashboard()}
// // // // //         {selectedView === 'reports' && (
// // // // //           <View style={themeStyles.content}>
// // // // //             <Text style={themeStyles.comingSoon}>📄 Reports Module Coming Soon!</Text>
// // // // //             <Text style={themeStyles.comingSoonDesc}>
// // // // //               Advanced reporting features will be available here
// // // // //             </Text>
// // // // //             <TouchableOpacity 
// // // // //               style={themeStyles.backToDashboard}
// // // // //               onPress={() => setSelectedView('dashboard')}
// // // // //             >
// // // // //               <Text style={themeStyles.backToDashboardText}>← Back to Dashboard</Text>
// // // // //             </TouchableOpacity>
// // // // //           </View>
// // // // //         )}
// // // // //       </View>
// // // // //     </View>
// // // // //   );
// // // // // }


// // // // // Main Dashboard Component with Navbar and Working Quick Actions + Back Button Fix

// // // import React, { useEffect, useState } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   StyleSheet,
// // //   Switch,
// // //   Dimensions,
// // //   TouchableOpacity,
// // //   ScrollView,
// // //   StatusBar,
// // //   BackHandler,
// // // } from 'react-native';
// // // import { useColorScheme } from 'react-native';
// // // import { database, ref, onValue } from '../hooks/firebaseConfig';
// // // import { BarChart, LineChart } from 'react-native-chart-kit';

// // // const screenWidth = Dimensions.get('window').width;

// // // // Types
// // // interface ReturnItem {
// // //   sku: string;
// // //   reason: string;
// // //   condition: string;
// // //   timestamp: string;
// // //   aiSuggestion?: string;
// // // }
// // // interface ChartData {
// // //   labels: string[];
// // //   datasets: {
// // //     data: number[];
// // //   }[];
// // // }

// // // // AI Suggestion Generator
// // // const generateAISuggestion = (item: ReturnItem): string => {
// // //   const { reason, condition, sku } = item;
// // //   if (reason === 'Defective') {
// // //     if (condition === 'New') {
// // //       return "🔍 Quality check needed - investigate supplier quality control. Consider batch testing.";
// // //     } else if (condition === 'Used') {
// // //       return "📋 Document usage patterns - may indicate design flaw or user education needed.";
// // //     } else {
// // //       return "⚠️ Immediate supplier review required - high defect rate in damaged condition.";
// // //     }
// // //   } else if (reason === 'Wrong Item') {
// // //     if (condition === 'New') {
// // //       return "📦 Review picking/packing process - implement double-check system for SKU " + sku.slice(-4);
// // //     } else {
// // //       return "🔄 Inventory management issue - verify product descriptions and images match actual items.";
// // //     }
// // //   } else if (reason === 'Changed Mind') {
// // //     if (condition === 'New') {
// // //       return "💡 Consider restocking immediately - high resale value. Review return policy impact.";
// // //     } else {
// // //       return "🏷️ Discount for quick sale recommended - or consider refurbishment program.";
// // //     }
// // //   } else {
// // //     return "📊 Analyze return pattern - create custom action plan based on frequency and impact.";
// // //   }
// // // };

// // // export default function MainDashboard() {
// // //   const systemTheme = useColorScheme();
// // //   const [darkMode, setDarkMode] = useState(systemTheme === 'dark');
// // //   const [data, setData] = useState<ReturnItem[]>([]);
// // //   const [filteredData, setFilteredData] = useState<ReturnItem[]>([]);
// // //   const [filterDate, setFilterDate] = useState<Date | null>(null);
// // //   const [reasonFilter, setReasonFilter] = useState('');
// // //   const [conditionFilter, setConditionFilter] = useState('');
// // //   const [selectedView, setSelectedView] = useState<'dashboard' | 'reports'>('dashboard');
// // //   const [activeAction, setActiveAction] = useState<null | 'report' | 'analytics' | 'search' | 'settings'>(null);

// // //   const themeStyles = darkMode ? stylesDark : stylesLight;

// // //   useEffect(() => {
// // //     const dbRef = ref(database, 'returns');
// // //     const unsubscribe = onValue(dbRef, (snapshot) => {
// // //       const rawData = snapshot.val();
// // //       const parsed: ReturnItem[] = [];
// // //       if (rawData) {
// // //         Object.keys(rawData).forEach((key) => {
// // //           const item = rawData[key];
// // //           const returnItem: ReturnItem = {
// // //             sku: key,
// // //             reason: item.returnReason || 'N/A',
// // //             condition: item.condition || 'N/A',
// // //             timestamp: item.timestamp || '',
// // //           };
// // //           returnItem.aiSuggestion = generateAISuggestion(returnItem);
// // //           parsed.push(returnItem);
// // //         });
// // //       }
// // //       setData(parsed);
// // //       setFilteredData(parsed);
// // //     });
// // //     return () => unsubscribe();
// // //   }, []);

// // //   useEffect(() => {
// // //     let result = data;
// // //     if (filterDate) {
// // //       const day = filterDate.toISOString().split('T')[0];
// // //       result = result.filter((item) => item.timestamp?.startsWith(day));
// // //     }
// // //     if (reasonFilter) {
// // //       result = result.filter((item) => item.reason === reasonFilter);
// // //     }
// // //     if (conditionFilter) {
// // //       result = result.filter((item) => item.condition === conditionFilter);
// // //     }
// // //     setFilteredData(result);
// // //   }, [data, filterDate, reasonFilter, conditionFilter]);

// // //   // BackHandler for Android hardware back button
// // //   useEffect(() => {
// // //     const onBackPress = () => {
// // //       if (activeAction) {
// // //         setActiveAction(null);
// // //         return true;
// // //       }
// // //       if (selectedView === 'reports') {
// // //         setSelectedView('dashboard');
// // //         return true;
// // //       }
// // //       return false; // allow app to close if at root
// // //     };
// // //     const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
// // // return () => subscription.remove();
// // //   }, [activeAction, selectedView]);

// // //   const chartData: ChartData = {
// // //     labels: [...new Set(filteredData.map((i) => i.reason))],
// // //     datasets: [
// // //       {
// // //         data: [...new Set(filteredData.map((i) => i.reason))].map(
// // //           (r) => filteredData.filter((x) => x.reason === r).length
// // //         ),
// // //       },
// // //     ],
// // //   };

// // //   const trendData = {
// // //     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
// // //     datasets: [
// // //       {
// // //         data: [12, 8, 15, 6, 10, 4, 7],
// // //         color: (opacity = 1) => darkMode ? `rgba(96, 165, 250, ${opacity})` : `rgba(30, 58, 138, ${opacity})`,
// // //         strokeWidth: 3,
// // //       },
// // //     ],
// // //   };

// // //   const NavButton = ({ title, icon, isActive, onPress }: { title: string; icon: string; isActive: boolean; onPress: () => void }) => (
// // //     <TouchableOpacity 
// // //       style={[themeStyles.navButton, isActive && themeStyles.navButtonActive]} 
// // //       onPress={onPress}
// // //     >
// // //       <Text style={themeStyles.navIcon}>{icon}</Text>
// // //       <Text style={[themeStyles.navText, isActive && themeStyles.navTextActive]}>{title}</Text>
// // //     </TouchableOpacity>
// // //   );

// // //   const FilterChip = ({ title, onPress, isActive }: { title: string; onPress: () => void; isActive: boolean }) => (
// // //     <TouchableOpacity 
// // //       style={[themeStyles.filterChip, isActive && themeStyles.filterChipActive]} 
// // //       onPress={onPress}
// // //     >
// // //       <Text style={[themeStyles.filterChipText, isActive && themeStyles.filterChipTextActive]}>
// // //         {title}
// // //       </Text>
// // //     </TouchableOpacity>
// // //   );

// // //   // Action content for modals/screens
// // //   const renderActionContent = () => {
// // //     if (activeAction === 'report') {
// // //       return (
// // //         <View style={themeStyles.content}>
// // //           <Text style={themeStyles.comingSoon}>📄 Report Generation Coming Soon!</Text>
// // //           <TouchableOpacity 
// // //             style={themeStyles.backToDashboard}
// // //             onPress={() => setActiveAction(null)}
// // //           >
// // //             <Text style={themeStyles.backToDashboardText}>← Back</Text>
// // //           </TouchableOpacity>
// // //         </View>
// // //       );
// // //     }
// // //     if (activeAction === 'analytics') {
// // //       return (
// // //         <View style={themeStyles.content}>
// // //           <Text style={themeStyles.comingSoon}>📈 Analytics Module Coming Soon!</Text>
// // //           <TouchableOpacity 
// // //             style={themeStyles.backToDashboard}
// // //             onPress={() => setActiveAction(null)}
// // //           >
// // //             <Text style={themeStyles.backToDashboardText}>← Back</Text>
// // //           </TouchableOpacity>
// // //         </View>
// // //       );
// // //     }
// // //     if (activeAction === 'search') {
// // //       return (
// // //         <View style={themeStyles.content}>
// // //           <Text style={themeStyles.comingSoon}>🔍 Search Returns Coming Soon!</Text>
// // //           <TouchableOpacity 
// // //             style={themeStyles.backToDashboard}
// // //             onPress={() => setActiveAction(null)}
// // //           >
// // //             <Text style={themeStyles.backToDashboardText}>← Back</Text>
// // //           </TouchableOpacity>
// // //         </View>
// // //       );
// // //     }
// // //     if (activeAction === 'settings') {
// // //       return (
// // //         <View style={themeStyles.content}>
// // //           <Text style={themeStyles.comingSoon}>⚙️ Settings Coming Soon!</Text>
// // //           <TouchableOpacity 
// // //             style={themeStyles.backToDashboard}
// // //             onPress={() => setActiveAction(null)}
// // //           >
// // //             <Text style={themeStyles.backToDashboardText}>← Back</Text>
// // //           </TouchableOpacity>
// // //         </View>
// // //       );
// // //     }
// // //     return null;
// // //   };

// // //   const renderDashboard = () => (
// // //     <ScrollView showsVerticalScrollIndicator={false}>
// // //       {/* Quick Stats */}
// // //       <View style={themeStyles.statsGrid}>
// // //         <View style={themeStyles.statCard}>
// // //           <Text style={themeStyles.statNumber}>{filteredData.length}</Text>
// // //           <Text style={themeStyles.statLabel}>Total Returns</Text>
// // //         </View>
// // //         <View style={themeStyles.statCard}>
// // //           <Text style={themeStyles.statNumber}>{filteredData.filter(i => i.reason === 'Defective').length}</Text>
// // //           <Text style={themeStyles.statLabel}>Defective</Text>
// // //         </View>
// // //         <View style={themeStyles.statCard}>
// // //           <Text style={themeStyles.statNumber}>{filteredData.filter(i => i.condition === 'New').length}</Text>
// // //           <Text style={themeStyles.statLabel}>New Items</Text>
// // //         </View>
// // //       </View>

// // //       {/* Filters */}
// // //       <View style={themeStyles.section}>
// // //         <Text style={themeStyles.sectionTitle}>Quick Filters</Text>
// // //         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={themeStyles.filterContainer}>
// // //           <FilterChip title="All Reasons" onPress={() => setReasonFilter('')} isActive={!reasonFilter} />
// // //           <FilterChip title="Defective" onPress={() => setReasonFilter('Defective')} isActive={reasonFilter === 'Defective'} />
// // //           <FilterChip title="Wrong Item" onPress={() => setReasonFilter('Wrong Item')} isActive={reasonFilter === 'Wrong Item'} />
// // //           <FilterChip title="Changed Mind" onPress={() => setReasonFilter('Changed Mind')} isActive={reasonFilter === 'Changed Mind'} />
// // //         </ScrollView>
// // //       </View>

// // //       {/* Analytics Charts */}
// // //       <View style={themeStyles.section}>
// // //         <Text style={themeStyles.sectionTitle}>Returns Overview</Text>
// // //         {filteredData.length > 0 && (
// // //           <BarChart
// // //             data={chartData}
// // //             width={screenWidth - 40}
// // //             height={220}
// // //             yAxisLabel=""
// // //             yAxisSuffix=""
// // //             chartConfig={{
// // //               backgroundColor: darkMode ? '#1e293b' : '#ffffff',
// // //               backgroundGradientFrom: darkMode ? '#1e293b' : '#f8fafc',
// // //               backgroundGradientTo: darkMode ? '#334155' : '#e2e8f0',
// // //               decimalPlaces: 0,
// // //               color: (opacity = 1) => darkMode ? `rgba(96, 165, 250, ${opacity})` : `rgba(30, 58, 138, ${opacity})`,
// // //               labelColor: (opacity = 1) => darkMode ? `rgba(241, 245, 249, ${opacity})` : `rgba(30, 58, 138, ${opacity})`,
// // //             }}
// // //             style={themeStyles.chart}
// // //           />
// // //         )}
// // //       </View>
// // //       <View style={themeStyles.section}>
// // //         <Text style={themeStyles.sectionTitle}>Weekly Trend</Text>
// // //         <LineChart
// // //           data={trendData}
// // //           width={screenWidth - 40}
// // //           height={200}
// // //           chartConfig={{
// // //             backgroundColor: darkMode ? '#1e293b' : '#ffffff',
// // //             backgroundGradientFrom: darkMode ? '#1e293b' : '#f8fafc',
// // //             backgroundGradientTo: darkMode ? '#334155' : '#e2e8f0',
// // //             decimalPlaces: 0,
// // //             color: (opacity = 1) => darkMode ? `rgba(96, 165, 250, ${opacity})` : `rgba(30, 58, 138, ${opacity})`,
// // //             labelColor: (opacity = 1) => darkMode ? `rgba(241, 245, 249, ${opacity})` : `rgba(30, 58, 138, ${opacity})`,
// // //           }}
// // //           style={themeStyles.chart}
// // //         />
// // //       </View>

// // //       {/* Recent Returns with AI Suggestions */}
// // //       <View style={themeStyles.section}>
// // //         <Text style={themeStyles.sectionTitle}>Recent Returns & AI Insights</Text>
// // //         {filteredData.slice(0, 5).map((item, index) => (
// // //           <View key={index} style={themeStyles.returnCard}>
// // //             <View style={themeStyles.returnHeader}>
// // //               <Text style={themeStyles.returnSku}>{item.sku}</Text>
// // //               <View style={themeStyles.badges}>
// // //                 <Text style={themeStyles.reasonBadge}>{item.reason}</Text>
// // //                 <Text style={themeStyles.conditionBadge}>{item.condition}</Text>
// // //               </View>
// // //             </View>
// // //             <Text style={themeStyles.aiSuggestion}>🤖 {item.aiSuggestion}</Text>
// // //             {item.timestamp && (
// // //               <Text style={themeStyles.timestamp}>
// // //                 📅 {new Date(item.timestamp).toLocaleDateString()}
// // //               </Text>
// // //             )}
// // //           </View>
// // //         ))}
// // //       </View>

// // //       {/* Quick Actions */}
// // //       <View style={themeStyles.section}>
// // //         <Text style={themeStyles.sectionTitle}>Quick Actions</Text>
// // //         <View style={themeStyles.actionGrid}>
// // //           <TouchableOpacity 
// // //             style={themeStyles.actionButton}
// // //             onPress={() => setActiveAction('report')}
// // //           >
// // //             <Text style={themeStyles.actionIcon}>📊</Text>
// // //             <Text style={themeStyles.actionText}>Generate Report</Text>
// // //           </TouchableOpacity>
// // //           <TouchableOpacity 
// // //             style={themeStyles.actionButton}
// // //             onPress={() => setActiveAction('analytics')}
// // //           >
// // //             <Text style={themeStyles.actionIcon}>📈</Text>
// // //             <Text style={themeStyles.actionText}>View Analytics</Text>
// // //           </TouchableOpacity>
// // //           <TouchableOpacity 
// // //             style={themeStyles.actionButton}
// // //             onPress={() => setActiveAction('search')}
// // //           >
// // //             <Text style={themeStyles.actionIcon}>🔍</Text>
// // //             <Text style={themeStyles.actionText}>Search Returns</Text>
// // //           </TouchableOpacity>
// // //           <TouchableOpacity 
// // //             style={themeStyles.actionButton}
// // //             onPress={() => setActiveAction('settings')}
// // //           >
// // //             <Text style={themeStyles.actionIcon}>⚙️</Text>
// // //             <Text style={themeStyles.actionText}>Settings</Text>
// // //           </TouchableOpacity>
// // //         </View>
// // //       </View>
// // //     </ScrollView>
// // //   );

// // //   return (
// // //     <View style={themeStyles.container}>
// // //       <StatusBar 
// // //         barStyle={darkMode ? 'light-content' : 'dark-content'} 
// // //         backgroundColor={darkMode ? '#0f172a' : '#f8fafc'} 
// // //       />
      
// // //       {/* Header */}
// // //       <View style={themeStyles.header}>
// // //         <Text style={themeStyles.title}>EchoBin</Text>
// // //         <View style={themeStyles.headerActions}>
// // //           <Text style={themeStyles.themeLabel}>{darkMode ? '🌙' : '☀️'}</Text>
// // //           <Switch 
// // //             value={darkMode} 
// // //             onValueChange={setDarkMode}
// // //             trackColor={{ false: '#cbd5e1', true: '#3b82f6' }}
// // //             thumbColor={darkMode ? '#60a5fa' : '#e2e8f0'}
// // //           />
// // //         </View>
// // //       </View>

// // //       {/* Navigation Bar */}
// // //       <View style={themeStyles.navContainer}>
// // //         <NavButton 
// // //           title="Dashboard" 
// // //           icon="📊" 
// // //           isActive={selectedView === 'dashboard'} 
// // //           onPress={() => setSelectedView('dashboard')} 
// // //         />
// // //         <NavButton 
// // //           title="Reports" 
// // //           icon="📄" 
// // //           isActive={selectedView === 'reports'} 
// // //           onPress={() => setSelectedView('reports')} 
// // //         />
// // //       </View>

// // //       {/* Content */}
// // //       <View style={themeStyles.content}>
// // //         {activeAction
// // //           ? renderActionContent()
// // //           : selectedView === 'dashboard'
// // //             ? renderDashboard()
// // //             : (
// // //               <View style={themeStyles.content}>
// // //                 <Text style={themeStyles.comingSoon}>📄 Reports Module Coming Soon!</Text>
// // //                 <Text style={themeStyles.comingSoonDesc}>
// // //                   Advanced reporting features will be available here
// // //                 </Text>
// // //                 <TouchableOpacity 
// // //                   style={themeStyles.backToDashboard}
// // //                   onPress={() => setSelectedView('dashboard')}
// // //                 >
// // //                   <Text style={themeStyles.backToDashboardText}>← Back to Dashboard</Text>
// // //                 </TouchableOpacity>
// // //               </View>
// // //             )
// // //         }
// // //       </View>
// // //     </View>
// // //   );
// // // }

// // // // ...stylesBase, stylesLight, stylesDark remain unchanged from your file

// // // const stylesBase = {
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: '#f8fafc',
// // //   },
// // //   header: {
// // //     flexDirection: 'row' as const,
// // //     justifyContent: 'space-between' as const,
// // //     alignItems: 'center' as const,
// // //     paddingHorizontal: 20,
// // //     paddingTop: 50,
// // //     paddingBottom: 20,
// // //     borderBottomWidth: 1,
// // //     borderBottomColor: '#e2e8f0',
// // //   },
// // //   title: {
// // //     fontSize: 28,
// // //     fontWeight: 'bold' as const,
// // //     color: '#1e3a8a',
// // //   },
// // //   headerActions: {
// // //     flexDirection: 'row' as const,
// // //     alignItems: 'center' as const,
// // //     gap: 8,
// // //   },
// // //   themeLabel: {
// // //     fontSize: 18,
// // //   },
// // //   navContainer: {
// // //     flexDirection: 'row' as const,
// // //     paddingHorizontal: 20,
// // //     paddingVertical: 15,
// // //     borderBottomWidth: 1,
// // //     borderBottomColor: '#e2e8f0',
// // //     backgroundColor: '#ffffff',
// // //   },
// // //   navButton: {
// // //     flex: 1,
// // //     alignItems: 'center' as const,
// // //     paddingVertical: 15,
// // //     marginHorizontal: 8,
// // //     borderRadius: 12,
// // //     backgroundColor: '#f1f5f9',
// // //   },
// // //   navButtonActive: {
// // //     backgroundColor: '#3b82f6',
// // //     shadowColor: '#3b82f6',
// // //     shadowOffset: { width: 0, height: 4 },
// // //     shadowOpacity: 0.3,
// // //     shadowRadius: 8,
// // //     elevation: 6,
// // //   },
// // //   navIcon: {
// // //     fontSize: 24,
// // //     marginBottom: 6,
// // //   },
// // //   navText: {
// // //     fontSize: 14,
// // //     color: '#64748b',
// // //     fontWeight: '600' as const,
// // //   },
// // //   navTextActive: {
// // //     color: '#ffffff',
// // //   },
// // //   content: {
// // //     flex: 1,
// // //   },
// // //   section: {
// // //     paddingHorizontal: 20,
// // //     paddingVertical: 15,
// // //   },
// // //   sectionTitle: {
// // //     fontSize: 20,
// // //     fontWeight: '700' as const,
// // //     color: '#1e3a8a',
// // //     marginBottom: 15,
// // //   },
// // //   statsGrid: {
// // //     flexDirection: 'row' as const,
// // //     paddingHorizontal: 20,
// // //     paddingVertical: 15,
// // //     gap: 12,
// // //   },
// // //   statCard: {
// // //     flex: 1,
// // //     backgroundColor: '#ffffff',
// // //     padding: 20,
// // //     borderRadius: 16,
// // //     alignItems: 'center' as const,
// // //     shadowColor: '#000',
// // //     shadowOffset: { width: 0, height: 4 },
// // //     shadowOpacity: 0.1,
// // //     shadowRadius: 8,
// // //     elevation: 4,
// // //   },
// // //   statNumber: {
// // //     fontSize: 32,
// // //     fontWeight: 'bold' as const,
// // //     color: '#3b82f6',
// // //   },
// // //   statLabel: {
// // //     fontSize: 14,
// // //     color: '#64748b',
// // //     marginTop: 4,
// // //     fontWeight: '500' as const,
// // //   },
// // //   filterContainer: {
// // //     flexDirection: 'row' as const,
// // //   },
// // //   filterChip: {
// // //     backgroundColor: '#e2e8f0',
// // //     paddingHorizontal: 16,
// // //     paddingVertical: 10,
// // //     borderRadius: 20,
// // //     marginRight: 8,
// // //   },
// // //   filterChipActive: {
// // //     backgroundColor: '#3b82f6',
// // //   },
// // //   filterChipText: {
// // //     color: '#475569',
// // //     fontSize: 14,
// // //     fontWeight: '600' as const,
// // //   },
// // //   filterChipTextActive: {
// // //     color: '#ffffff',
// // //   },
// // //   returnCard: {
// // //     backgroundColor: '#ffffff',
// // //     padding: 18,
// // //     borderRadius: 16,
// // //     marginBottom: 12,
// // //     shadowColor: '#000',
// // //     shadowOffset: { width: 0, height: 2 },
// // //     shadowOpacity: 0.1,
// // //     shadowRadius: 8,
// // //     elevation: 3,
// // //   },
// // //   returnHeader: {
// // //     flexDirection: 'row' as const,
// // //     justifyContent: 'space-between' as const,
// // //     alignItems: 'center' as const,
// // //     marginBottom: 12,
// // //   },
// // //   returnSku: {
// // //     fontSize: 18,
// // //     fontWeight: '700' as const,
// // //     color: '#1e3a8a',
// // //   },
// // //   badges: {
// // //     flexDirection: 'row' as const,
// // //     gap: 8,
// // //   },
// // //   reasonBadge: {
// // //     fontSize: 12,
// // //     color: '#dc2626',
// // //     backgroundColor: '#fee2e2',
// // //     paddingHorizontal: 10,
// // //     paddingVertical: 4,
// // //     borderRadius: 12,
// // //     fontWeight: '600' as const,
// // //   },
// // //   conditionBadge: {
// // //     fontSize: 12,
// // //     color: '#059669',
// // //     backgroundColor: '#d1fae5',
// // //     paddingHorizontal: 10,
// // //     paddingVertical: 4,
// // //     borderRadius: 12,
// // //     fontWeight: '600' as const,
// // //   },
// // //   aiSuggestion: {
// // //     fontSize: 14,
// // //     color: '#059669',
// // //     fontStyle: 'italic' as const,
// // //     lineHeight: 20,
// // //     marginBottom: 8,
// // //   },
// // //   timestamp: {
// // //     fontSize: 12,
// // //     color: '#64748b',
// // //     fontWeight: '500' as const,
// // //   },
// // //   chart: {
// // //     borderRadius: 16,
// // //     marginVertical: 8,
// // //   },
// // //   actionGrid: {
// // //     flexDirection: 'row' as const,
// // //     flexWrap: 'wrap' as const,
// // //     gap: 12,
// // //   },
// // //   actionButton: {
// // //     backgroundColor: '#ffffff',
// // //     padding: 16,
// // //     borderRadius: 16,
// // //     alignItems: 'center' as const,
// // //     width: (screenWidth - 60) / 2,
// // //     shadowColor: '#000',
// // //     shadowOffset: { width: 0, height: 2 },
// // //     shadowOpacity: 0.1,
// // //     shadowRadius: 8,
// // //     elevation: 3,
// // //   },
// // //   actionIcon: {
// // //     fontSize: 24,
// // //     marginBottom: 8,
// // //   },
// // //   actionText: {
// // //     fontSize: 14,
// // //     color: '#1e3a8a',
// // //     fontWeight: '600' as const,
// // //   },
// // //   comingSoon: {
// // //     fontSize: 24,
// // //     fontWeight: 'bold' as const,
// // //     color: '#3b82f6',
// // //     textAlign: 'center' as const,
// // //     marginTop: 100,
// // //   },
// // //   comingSoonDesc: {
// // //     fontSize: 16,
// // //     color: '#64748b',
// // //     textAlign: 'center' as const,
// // //     marginTop: 8,
// // //     paddingHorizontal: 40,
// // //   },
// // //   backToDashboard: {
// // //     backgroundColor: '#3b82f6',
// // //     paddingVertical: 12,
// // //     paddingHorizontal: 24,
// // //     borderRadius: 12,
// // //     alignSelf: 'center' as const,
// // //     marginTop: 30,
// // //   },
// // //   backToDashboardText: {
// // //     color: '#ffffff',
// // //     fontSize: 16,
// // //     fontWeight: '600' as const,
// // //   },
// // // };

// // // const stylesLight = StyleSheet.create({
// // //   ...stylesBase,
// // // });

// // // const stylesDark = StyleSheet.create({
// // //   ...stylesBase,
// // //   container: { 
// // //     ...stylesBase.container, 
// // //     backgroundColor: '#0f172a' 
// // //   },
// // //   header: {
// // //     ...stylesBase.header,
// // //     borderBottomColor: '#334155',
// // //   },
// // //   title: { 
// // //     ...stylesBase.title, 
// // //     color: '#f8fafc' 
// // //   },
// // //   navContainer: {
// // //     ...stylesBase.navContainer,
// // //     borderBottomColor: '#334155',
// // //     backgroundColor: '#1e293b',
// // //   },
// // //   navButton: {
// // //     ...stylesBase.navButton,
// // //     backgroundColor: '#374151',
// // //   },
// // //   navText: { 
// // //     ...stylesBase.navText, 
// // //     color: '#94a3b8' 
// // //   },
// // //   sectionTitle: { 
// // //     ...stylesBase.sectionTitle, 
// // //     color: '#f1f5f9' 
// // //   },
// // //   statCard: { 
// // //     ...stylesBase.statCard, 
// // //     backgroundColor: '#1e293b' 
// // //   },
// // //   statLabel: { 
// // //     ...stylesBase.statLabel, 
// // //     color: '#94a3b8' 
// // //   },
// // //   filterChip: { 
// // //     ...stylesBase.filterChip, 
// // //     backgroundColor: '#374151' 
// // //   },
// // //   filterChipText: { 
// // //     ...stylesBase.filterChipText, 
// // //     color: '#d1d5db' 
// // //   },
// // //   returnCard: { 
// // //     ...stylesBase.returnCard, 
// // //     backgroundColor: '#1e293b' 
// // //   },
// // //   returnSku: { 
// // //     ...stylesBase.returnSku, 
// // //     color: '#60a5fa' 
// // //   },
// // //   reasonBadge: {
// // //     ...stylesBase.reasonBadge,
// // //     color: '#f87171',
// // //     backgroundColor: '#3f1f1f',
// // //   },
// // //   conditionBadge: {
// // //     ...stylesBase.conditionBadge,
// // //     color: '#34d399',
// // //     backgroundColor: '#1f3f2f',
// // //   },
// // //   timestamp: {
// // //     ...stylesBase.timestamp,
// // //     color: '#94a3b8',
// // //   },
// // //   actionButton: { 
// // //     ...stylesBase.actionButton, 
// // //     backgroundColor: '#1e293b' 
// // //   },
// // //   actionText: { 
// // //     ...stylesBase.actionText, 
// // //     color: '#60a5fa' 
// // //   },
// // //   comingSoon: {
// // //     ...stylesBase.comingSoon,
// // //     color: '#60a5fa',
// // //   },
// // //   comingSoonDesc: {
// // //     ...stylesBase.comingSoonDesc,
// // //     color: '#94a3b8',
// // //   },
// // //   backToDashboard: {
// // //     ...stylesBase.backToDashboard,
// // //   },
// // //   backToDashboardText: {
// // //     ...stylesBase.backToDashboardText,
// // //   },
// // //  });
// // // Final Enhanced Dashboard with Dark/Light Mode, Functional Tabs, and Firebase Data
// // import React, { useEffect, useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   Switch,
// //   Dimensions,
// //   TouchableOpacity,
// //   ScrollView,
// //   StatusBar,
// //   BackHandler,
// // } from 'react-native';
// // import { useColorScheme } from 'react-native';
// // import { database, ref, onValue } from '../hooks/firebaseConfig';
// // import { BarChart } from 'react-native-chart-kit';

// // const screenWidth = Dimensions.get('window').width;

// // interface ReturnItem {
// //   sku: string;
// //   reason: string;
// //   condition: string;
// //   timestamp: string;
// //   aiSuggestion?: string;
// // }

// // const generateAISuggestion = (item: ReturnItem): string => {
// //   const { reason, condition, sku } = item;
// //   if (reason === 'Wrong Item' && condition === 'Damaged') {
// //     return "🚚 Smart Routing Needed - Check last-mile vendor and packaging protocols.";
// //   }
// //   if (reason === 'Defective') {
// //     return condition === 'New'
// //       ? "🔍 Investigate supplier quality for SKU " + sku.slice(-4)
// //       : "📋 Review product usage documentation.";
// //   }
// //   if (reason === 'Changed Mind') {
// //     return condition === 'New'
// //       ? "💡 Resell quickly or donate to reduce storage costs."
// //       : "🏷️ Tag for secondary sale with discount.";
// //   }
// //   return "📊 Analyze pattern for SKU: " + sku;
// // };

// // export default function DashboardScreen() {
// //   const systemTheme = useColorScheme();
// //   const [darkMode, setDarkMode] = useState(systemTheme === 'dark');
// //   const [returns, setReturns] = useState<ReturnItem[]>([]);
// //   const [selectedTab, setSelectedTab] = useState<'dashboard' | 'reports' | 'settings'>('dashboard');

// //   useEffect(() => {
// //     const dbRef = ref(database, 'returns');
// //     const unsubscribe = onValue(dbRef, (snapshot) => {
// //       const raw = snapshot.val();
// //       const parsed: ReturnItem[] = [];
// //       if (raw) {
// //         Object.keys(raw).forEach((key) => {
// //           const item = raw[key];
// //           const obj: ReturnItem = {
// //             sku: key,
// //             reason: item.returnReason || 'N/A',
// //             condition: item.condition || 'N/A',
// //             timestamp: item.timestamp || '',
// //           };
// //           obj.aiSuggestion = generateAISuggestion(obj);
// //           parsed.push(obj);
// //         });
// //       }
// //       setReturns(parsed);
// //     });
// //     return () => unsubscribe();
// //   }, []);

// //   const chartData = {
// //     labels: [...new Set(returns.map((i) => i.reason))],
// //     datasets: [
// //       {
// //         data: [...new Set(returns.map((i) => i.reason))].map(
// //           (r) => returns.filter((x) => x.reason === r).length
// //         ),
// //       },
// //     ],
// //   };

// //   const styles = getStyles(darkMode);

// //   return (
// //     <View style={styles.container}>
// //       <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />

// //       {/* Header */}
// //       <View style={styles.header}>
// //         <Text style={styles.title}>EchoBin</Text>
// //         <View style={styles.toggleContainer}>
// //           <Text style={styles.toggleLabel}>{darkMode ? '🌙' : '☀️'}</Text>
// //           <Switch
// //             value={darkMode}
// //             onValueChange={setDarkMode}
// //             trackColor={{ false: '#ccc', true: '#3b82f6' }}
// //             thumbColor={darkMode ? '#60a5fa' : '#fff'}
// //           />
// //         </View>
// //       </View>

// //       {/* Tabs */}
// //       <View style={styles.tabBar}>
// //         {['dashboard', 'reports', 'settings'].map((tab) => (
// //           <TouchableOpacity
// //             key={tab}
// //             style={[styles.tabItem, selectedTab === tab && styles.tabItemActive]}
// //             onPress={() => setSelectedTab(tab as any)}
// //           >
// //             <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
// //               {tab.charAt(0).toUpperCase() + tab.slice(1)}
// //             </Text>
// //           </TouchableOpacity>
// //         ))}
// //       </View>

// //       {/* Tab Content */}
// //       <ScrollView contentContainerStyle={styles.content}>
// //         {selectedTab === 'dashboard' && (
// //           <>
// //             <Text style={styles.sectionTitle}>Return Insights</Text>
// //             <BarChart
// //               data={chartData}
// //               width={screenWidth - 40}
// //               height={220}
// //               chartConfig={{
// //                 backgroundColor: darkMode ? '#1e293b' : '#f1f5f9',
// //                 backgroundGradientFrom: darkMode ? '#1e293b' : '#f8fafc',
// //                 backgroundGradientTo: darkMode ? '#1e293b' : '#e2e8f0',
// //                 color: (opacity = 1) => darkMode ? `rgba(96,165,250,${opacity})` : `rgba(30,58,138,${opacity})`,
// //                 labelColor: (opacity = 1) => darkMode ? '#f1f5f9' : '#1e3a8a',
// //                 decimalPlaces: 0,
// //               }}
// //               style={{ borderRadius: 16, marginVertical: 8 }}
// //             />

// //             <Text style={styles.sectionTitle}>Recent Returns</Text>
// //             {returns.slice(0, 5).map((item, idx) => (
// //               <View key={idx} style={styles.card}>
// //                 <Text style={styles.sku}>SKU: {item.sku}</Text>
// //                 <Text style={styles.meta}>Reason: {item.reason} | Condition: {item.condition}</Text>
// //                 <Text style={styles.suggestion}>🤖 {item.aiSuggestion}</Text>
// //                 <Text style={styles.meta}>📅 {new Date(item.timestamp).toLocaleDateString()}</Text>
// //               </View>
// //             ))}
// //           </>
// //         )}

// //         {selectedTab === 'reports' && (
// //           <Text style={styles.sectionTitle}>📄 Report Module Coming Soon</Text>
// //         )}

// //         {selectedTab === 'settings' && (
// //           <Text style={styles.sectionTitle}>⚙️ Settings Module Coming Soon</Text>
// //         )}
// //       </ScrollView>
// //     </View>
// //   );
// // }

// // const getStyles = (dark: boolean) =>
// //   StyleSheet.create({
// //     container: {
// //       flex: 1,
// //       backgroundColor: dark ? '#0f172a' : '#f8fafc',
// //       paddingTop: 40,
// //     },
// //     header: {
// //       flexDirection: 'row',
// //       justifyContent: 'space-between',
// //       paddingHorizontal: 20,
// //       alignItems: 'center',
// //       marginBottom: 10,
// //     },
// //     title: {
// //       fontSize: 26,
// //       fontWeight: 'bold',
// //       color: dark ? '#f8fafc' : '#1e3a8a',
// //     },
// //     toggleContainer: {
// //       flexDirection: 'row',
// //       alignItems: 'center',
// //     },
// //     toggleLabel: {
// //       fontSize: 18,
// //       marginRight: 8,
// //       color: dark ? '#cbd5e1' : '#475569',
// //     },
// //     tabBar: {
// //       flexDirection: 'row',
// //       marginHorizontal: 20,
// //       marginBottom: 10,
// //     },
// //     tabItem: {
// //       flex: 1,
// //       paddingVertical: 12,
// //       borderRadius: 10,
// //       backgroundColor: dark ? '#334155' : '#e2e8f0',
// //       marginHorizontal: 5,
// //       alignItems: 'center',
// //     },
// //     tabItemActive: {
// //       backgroundColor: '#3b82f6',
// //     },
// //     tabText: {
// //       fontSize: 14,
// //       fontWeight: '600',
// //       color: dark ? '#cbd5e1' : '#1e3a8a',
// //     },
// //     tabTextActive: {
// //       color: '#ffffff',
// //     },
// //     content: {
// //       paddingHorizontal: 20,
// //       paddingBottom: 40,
// //     },
// //     sectionTitle: {
// //       fontSize: 20,
// //       fontWeight: 'bold',
// //       marginVertical: 16,
// //       color: dark ? '#f8fafc' : '#1e3a8a',
// //     },
// //     card: {
// //       backgroundColor: dark ? '#1e293b' : '#ffffff',
// //       padding: 16,
// //       borderRadius: 12,
// //       marginBottom: 12,
// //       shadowColor: '#000',
// //       shadowOffset: { width: 0, height: 2 },
// //       shadowOpacity: 0.1,
// //       shadowRadius: 6,
// //       elevation: 3,
// //     },
// //     sku: {
// //       fontSize: 16,
// //       fontWeight: '700',
// //       color: dark ? '#60a5fa' : '#1e3a8a',
// //       marginBottom: 4,
// //     },
// //     meta: {
// //       fontSize: 13,
// //       color: dark ? '#cbd5e1' : '#475569',
// //       marginBottom: 4,
// //     },
// //     suggestion: {
// //       fontSize: 14,
// //       color: '#059669',
// //       fontStyle: 'italic',
// //       marginBottom: 4,
// //     },
// //   });
// // DashboardScreen.tsx (Updated)
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Switch,
//   Dimensions,
//   TouchableOpacity,
//   ScrollView,
//   StatusBar,
// } from 'react-native';
// import { useColorScheme } from 'react-native';
// import { database, ref, onValue } from '../hooks/firebaseConfig';
// import { BarChart } from 'react-native-chart-kit';

// const screenWidth = Dimensions.get('window').width;

// interface ReturnItem {
//   sku: string;
//   reason: string;
//   condition: string;
//   timestamp: string;
//   aiSuggestion?: string;
// }

// const generateAISuggestion = (item: ReturnItem): string => {
//   const { reason, condition, sku } = item;
//   if (reason === 'Wrong Item' && condition === 'Damaged') {
//     return "🚚 Smart Routing Needed - Check last-mile vendor and packaging protocols.";
//   }
//   if (reason === 'Defective') {
//     return condition === 'New'
//       ? "🔍 Investigate supplier quality for SKU " + sku.slice(-4)
//       : "📋 Review product usage documentation.";
//   }
//   if (reason === 'Changed Mind') {
//     return condition === 'New'
//       ? "💡 Resell quickly or donate to reduce storage costs."
//       : "🏷️ Tag for secondary sale with discount.";
//   }
//   return "📊 Analyze pattern for SKU: " + sku;
// };

// export default function DashboardScreen() {
//   const systemTheme = useColorScheme();
//   const [darkMode, setDarkMode] = useState(systemTheme === 'dark');
//   const [returns, setReturns] = useState<ReturnItem[]>([]);
//   const [selectedTab, setSelectedTab] = useState<'dashboard' | 'reports' | 'settings'>('dashboard');

//   useEffect(() => {
//     const dbRef = ref(database, 'returns');
//     const unsubscribe = onValue(dbRef, (snapshot) => {
//       const raw = snapshot.val();
//       const parsed: ReturnItem[] = [];
//       if (raw) {
//         Object.keys(raw).forEach((key) => {
//           const item = raw[key];
//           const obj: ReturnItem = {
//             sku: key,
//             reason: item.returnReason || 'N/A',
//             condition: item.condition || 'N/A',
//             timestamp: item.timestamp || '',
//           };
//           obj.aiSuggestion = generateAISuggestion(obj);
//           parsed.push(obj);
//         });
//       }
//       setReturns(parsed);
//     });
//     return () => unsubscribe();
//   }, []);

//   const chartData = {
//     labels: [...new Set(returns.map((i) => i.reason))],
//     datasets: [
//       {
//         data: [...new Set(returns.map((i) => i.reason))].map(
//           (r) => returns.filter((x) => x.reason === r).length
//         ),
//       },
//     ],
//   };

//   const styles = getStyles(darkMode);

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />

//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>EchoBin</Text>
//         <View style={styles.toggleContainer}>
//           <Text style={styles.toggleLabel}>{darkMode ? '🌙' : '☀️'}</Text>
//           <Switch
//             value={darkMode}
//             onValueChange={setDarkMode}
//             trackColor={{ false: '#ccc', true: '#3b82f6' }}
//             thumbColor={darkMode ? '#60a5fa' : '#fff'}
//           />
//         </View>
//       </View>

//       {/* Tabs */}
//       <View style={styles.tabBar}>
//         {['dashboard', 'reports', 'settings'].map((tab) => (
//           <TouchableOpacity
//             key={tab}
//             style={[styles.tabItem, selectedTab === tab && styles.tabItemActive]}
//             onPress={() => setSelectedTab(tab as any)}
//           >
//             <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Tab Content */}
//       <ScrollView contentContainerStyle={styles.content}>
//         {selectedTab === 'dashboard' && (
//           <>
//             <Text style={styles.sectionTitle}>Return Insights</Text>
//             <BarChart
//               data={chartData}
//               width={screenWidth - 40}
//               height={220}
//               chartConfig={{
//                 backgroundColor: darkMode ? '#1e293b' : '#f1f5f9',
//                 backgroundGradientFrom: darkMode ? '#1e293b' : '#f8fafc',
//                 backgroundGradientTo: darkMode ? '#1e293b' : '#e2e8f0',
//                 color: (opacity = 1) => darkMode ? `rgba(96,165,250,${opacity})` : `rgba(30,58,138,${opacity})`,
//                 labelColor: (opacity = 1) => darkMode ? '#f1f5f9' : '#1e3a8a',
//                 decimalPlaces: 0,
//               }}
//               style={{ borderRadius: 16, marginVertical: 8 }}
//             />

//             <Text style={styles.sectionTitle}>Recent Returns</Text>
//             {returns.slice(0, 5).map((item, idx) => (
//               <View key={idx} style={styles.card}>
//                 <Text style={styles.sku}>SKU: {item.sku}</Text>
//                 <Text style={styles.meta}>Reason: {item.reason} | Condition: {item.condition}</Text>
//                 <Text style={styles.suggestion}>🤖 {item.aiSuggestion}</Text>
//                 <Text style={styles.meta}>📅 {new Date(item.timestamp).toLocaleDateString()}</Text>
//               </View>
//             ))}
//           </>
//         )}

//         {selectedTab === 'reports' && (
//           <Text style={styles.sectionTitle}>📄 Report Module Coming Soon</Text>
//         )}

//         {selectedTab === 'settings' && (
//           <Text style={styles.sectionTitle}>⚙️ Settings Module Coming Soon</Text>
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// const getStyles = (dark: boolean) =>
//   StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: dark ? '#0f172a' : '#f8fafc',
//       paddingTop: 40,
//     },
//     header: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       paddingHorizontal: 20,
//       alignItems: 'center',
//       marginBottom: 10,
//     },
//     title: {
//       fontSize: 26,
//       fontWeight: 'bold',
//       color: dark ? '#f8fafc' : '#1e3a8a',
//     },
//     toggleContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
//     toggleLabel: {
//       fontSize: 18,
//       marginRight: 8,
//       color: dark ? '#cbd5e1' : '#475569',
//     },
//     tabBar: {
//       flexDirection: 'row',
//       marginHorizontal: 20,
//       marginBottom: 10,
//     },
//     tabItem: {
//       flex: 1,
//       paddingVertical: 12,
//       borderRadius: 10,
//       backgroundColor: dark ? '#334155' : '#e2e8f0',
//       marginHorizontal: 5,
//       alignItems: 'center',
//     },
//     tabItemActive: {
//       backgroundColor: '#3b82f6',
//     },
//     tabText: {
//       fontSize: 14,
//       fontWeight: '600',
//       color: dark ? '#cbd5e1' : '#1e3a8a',
//     },
//     tabTextActive: {
//       color: '#ffffff',
//     },
//     content: {
//       paddingHorizontal: 20,
//       paddingBottom: 40,
//     },
//     sectionTitle: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       marginVertical: 16,
//       color: dark ? '#f8fafc' : '#1e3a8a',
//     },
//     card: {
//       backgroundColor: dark ? '#1e293b' : '#ffffff',
//       padding: 16,
//       borderRadius: 12,
//       marginBottom: 12,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 6,
//       elevation: 3,
//     },
//     sku: {
//       fontSize: 16,
//       fontWeight: '700',
//       color: dark ? '#60a5fa' : '#1e3a8a',
//       marginBottom: 4,
//     },
//     meta: {
//       fontSize: 13,
//       color: dark ? '#cbd5e1' : '#475569',
//       marginBottom: 4,
//     },
//     suggestion: {
//       fontSize: 14,
//       color: '#059669',
//       fontStyle: 'italic',
//       marginBottom: 4,
//     },
//   });
// DashboardScreen.tsx (Updated with proper props passed)
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { database, ref, onValue } from '../hooks/firebaseConfig';
import { BarChart } from 'react-native-chart-kit';
import ReportsScreen from './ReportsScreen';
import SettingsScreen from './SettingsScreen';

const screenWidth = Dimensions.get('window').width;

interface ReturnItem {
  sku: string;
  reason: string;
  condition: string;
  timestamp: string;
  aiSuggestion?: string;
}

const generateAISuggestion = (item: ReturnItem): string => {
  const { reason, condition, sku } = item;
  if (reason === 'Wrong Item' && condition === 'Damaged') {
    return "🚚 Smart Routing Needed - Check last-mile vendor and packaging protocols.";
  }
  if (reason === 'Defective') {
    return condition === 'New'
      ? "🔍 Investigate supplier quality for SKU " + sku.slice(-4)
      : "📋 Review product usage documentation.";
  }
  if (reason === 'Changed Mind') {
    return condition === 'New'
      ? "💡 Resell quickly or donate to reduce storage costs."
      : "🏷️ Tag for secondary sale with discount.";
  }
  return "📊 Analyze pattern for SKU: " + sku;
};

export default function DashboardScreen() {
  const systemTheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(systemTheme === 'dark');
  const [returns, setReturns] = useState<ReturnItem[]>([]);
  const [selectedTab, setSelectedTab] = useState<'dashboard' | 'reports' | 'settings'>('dashboard');

  useEffect(() => {
    const dbRef = ref(database, 'returns');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const raw = snapshot.val();
      const parsed: ReturnItem[] = [];
      if (raw) {
        Object.keys(raw).forEach((key) => {
          const item = raw[key];
          const obj: ReturnItem = {
            sku: key,
            reason: item.returnReason || 'N/A',
            condition: item.condition || 'N/A',
            timestamp: item.timestamp || '',
          };
          obj.aiSuggestion = generateAISuggestion(obj);
          parsed.push(obj);
        });
      }
      setReturns(parsed);
    });
    return () => unsubscribe();
  }, []);

  const chartData = {
    labels: [...new Set(returns.map((i) => i.reason))],
    datasets: [
      {
        data: [...new Set(returns.map((i) => i.reason))].map(
          (r) => returns.filter((x) => x.reason === r).length
        ),
      },
    ],
  };

  const styles = getStyles(darkMode);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>EchoBin</Text>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>{darkMode ? '🌙' : '☀️'}</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#ccc', true: '#3b82f6' }}
            thumbColor={darkMode ? '#60a5fa' : '#fff'}
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {['dashboard', 'reports', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabItem, selectedTab === tab && styles.tabItemActive]}
            onPress={() => setSelectedTab(tab as any)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {selectedTab === 'dashboard' && (
          <>
            <Text style={styles.sectionTitle}>Return Insights</Text>
            <BarChart
              data={chartData}
              width={screenWidth - 40}
              height={220}
              yAxisLabel={''}
              yAxisSuffix={''}
              chartConfig={{
                backgroundColor: darkMode ? '#1e293b' : '#f1f5f9',
                backgroundGradientFrom: darkMode ? '#1e293b' : '#f8fafc',
                backgroundGradientTo: darkMode ? '#1e293b' : '#e2e8f0',
                color: (opacity = 1) => darkMode ? `rgba(96,165,250,${opacity})` : `rgba(30,58,138,${opacity})`,
                labelColor: (opacity = 1) => darkMode ? '#f1f5f9' : '#1e3a8a',
                decimalPlaces: 0,
              }}
              style={{ borderRadius: 16, marginVertical: 8 }}
            />

            <Text style={styles.sectionTitle}>Recent Returns</Text>
            {returns.slice(0, 5).map((item, idx) => (
              <View key={idx} style={styles.card}>
                <Text style={styles.sku}>SKU: {item.sku}</Text>
                <Text style={styles.meta}>Reason: {item.reason} | Condition: {item.condition}</Text>
                <Text style={styles.suggestion}>🤖 {item.aiSuggestion}</Text>
                <Text style={styles.meta}>📅 {new Date(item.timestamp).toLocaleDateString()}</Text>
              </View>
            ))}
          </>
        )}

        {selectedTab === 'reports' && (
          <ReportsScreen
            data={returns}
            darkMode={darkMode}
            onBack={() => setSelectedTab('dashboard')}
          />
        )}

        {selectedTab === 'settings' && (
          <SettingsScreen
            darkMode={darkMode}
            toggleDarkMode={() => setDarkMode((d) => !d)}
            onBack={() => setSelectedTab('dashboard')}
          />
        )}
      </ScrollView>
    </View>
  );
}

const getStyles = (dark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: dark ? '#0f172a' : '#f8fafc',
      paddingTop: 40,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      alignItems: 'center',
      marginBottom: 10,
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: dark ? '#f8fafc' : '#1e3a8a',
    },
    toggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    toggleLabel: {
      fontSize: 18,
      marginRight: 8,
      color: dark ? '#cbd5e1' : '#475569',
    },
    tabBar: {
      flexDirection: 'row',
      marginHorizontal: 20,
      marginBottom: 10,
    },
    tabItem: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 10,
      backgroundColor: dark ? '#334155' : '#e2e8f0',
      marginHorizontal: 5,
      alignItems: 'center',
    },
    tabItemActive: {
      backgroundColor: '#3b82f6',
    },
    tabText: {
      fontSize: 14,
      fontWeight: '600',
      color: dark ? '#cbd5e1' : '#1e3a8a',
    },
    tabTextActive: {
      color: '#ffffff',
    },
    content: {
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 16,
      color: dark ? '#f8fafc' : '#1e3a8a',
    },
    card: {
      backgroundColor: dark ? '#1e293b' : '#ffffff',
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    sku: {
      fontSize: 16,
      fontWeight: '700',
      color: dark ? '#60a5fa' : '#1e3a8a',
      marginBottom: 4,
    },
    meta: {
      fontSize: 13,
      color: dark ? '#cbd5e1' : '#475569',
      marginBottom: 4,
    },
    suggestion: {
      fontSize: 14,
      color: '#059669',
      fontStyle: 'italic',
      marginBottom: 4,
    },
  });
