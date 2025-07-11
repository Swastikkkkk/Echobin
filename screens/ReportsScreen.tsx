// // ReportsScreen.tsx
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   Share,
//   Dimensions,
//   Modal,
// } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';

// const screenWidth = Dimensions.get('window').width;

// interface ReturnItem {
//   sku: string;
//   reason: string;
//   condition: string;
//   timestamp: string;
//   aiSuggestion?: string;
// }

// interface ReportsScreenProps {
//   data: ReturnItem[];
//   darkMode: boolean;
//   onBack: () => void;
// }

// const ReportsScreen: React.FC<ReportsScreenProps> = ({ data, darkMode, onBack }) => {
//   const [selectedDateRange, setSelectedDateRange] = useState<'today' | 'week' | 'month' | 'all'>('all');
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [customDate, setCustomDate] = useState(new Date());
//   const [showReportModal, setShowReportModal] = useState(false);

//   const themeStyles = darkMode ? stylesDark : stylesLight;

//   const getFilteredDataByRange = () => {
//     const now = new Date();
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
//     switch (selectedDateRange) {
//       case 'today':
//         return data.filter(item => {
//           if (!item.timestamp) return false;
//           const itemDate = new Date(item.timestamp);
//           return itemDate >= today;
//         });
//       case 'week':
//         const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
//         return data.filter(item => {
//           if (!item.timestamp) return false;
//           const itemDate = new Date(item.timestamp);
//           return itemDate >= weekAgo;
//         });
//       case 'month':
//         const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
//         return data.filter(item => {
//           if (!item.timestamp) return false;
//           const itemDate = new Date(item.timestamp);
//           return itemDate >= monthAgo;
//         });
//       default:
//         return data;
//     }
//   };

//   const filteredData = getFilteredDataByRange();

//   const generateReport = async (type: 'summary' | 'detailed' | 'analytics' | 'export') => {
//     const reportData = {
//       generated: new Date().toISOString(),
//       dateRange: selectedDateRange,
//       totalReturns: filteredData.length,
//       byReason: {
//         defective: filteredData.filter(i => i.reason === 'Defective').length,
//         wrongItem: filteredData.filter(i => i.reason === 'Wrong Item').length,
//         changedMind: filteredData.filter(i => i.reason === 'Changed Mind').length,
//         other: filteredData.filter(i => !['Defective', 'Wrong Item', 'Changed Mind'].includes(i.reason)).length,
//       },
//       byCondition: {
//         new: filteredData.filter(i => i.condition === 'New').length,
//         used: filteredData.filter(i => i.condition === 'Used').length,
//         damaged: filteredData.filter(i => i.condition === 'Damaged').length,
//       },
//       items: filteredData,
//     };

//     try {
//       if (type === 'summary') {
//         const report = `📊 ECHOBIN RETURNS SUMMARY REPORT
// ═══════════════════════════════════════

// Generated: ${new Date().toLocaleString()}
// Date Range: ${selectedDateRange.toUpperCase()}
// Total Returns: ${reportData.totalReturns}

// 📈 BREAKDOWN BY REASON:
// ├─ Defective: ${reportData.byReason.defective} (${reportData.totalReturns > 0 ? ((reportData.byReason.defective/reportData.totalReturns)*100).toFixed(1) : 0}%)
// ├─ Wrong Item: ${reportData.byReason.wrongItem} (${reportData.totalReturns > 0 ? ((reportData.byReason.wrongItem/reportData.totalReturns)*100).toFixed(1) : 0}%)
// ├─ Changed Mind: ${reportData.byReason.changedMind} (${reportData.totalReturns > 0 ? ((reportData.byReason.changedMind/reportData.totalReturns)*100).toFixed(1) : 0}%)
// └─ Other: ${reportData.byReason.other} (${reportData.totalReturns > 0 ? ((reportData.byReason.other/reportData.totalReturns)*100).toFixed(1) : 0}%)

// 📋 BREAKDOWN BY CONDITION:
// ├─ New: ${reportData.byCondition.new} (${reportData.totalReturns > 0 ? ((reportData.byCondition.new/reportData.totalReturns)*100).toFixed(1) : 0}%)
// ├─ Used: ${reportData.byCondition.used} (${reportData.totalReturns > 0 ? ((reportData.byCondition.used/reportData.totalReturns)*100).toFixed(1) : 0}%)
// └─ Damaged: ${reportData.byCondition.damaged} (${reportData.totalReturns > 0 ? ((reportData.byCondition.damaged/reportData.totalReturns)*100).toFixed(1) : 0}%)

// 🤖 AI INSIGHTS & RECOMMENDATIONS:
// ${reportData.totalReturns === 0 ? '📋 No returns data available for selected period' :
//   reportData.byReason.defective > reportData.totalReturns * 0.3 ? 
//     '⚠️ HIGH DEFECT RATE: Immediate supplier quality review needed' : 
//     '✅ Defect rate within acceptable range'}

// ${reportData.totalReturns > 0 && reportData.byReason.wrongItem > reportData.totalReturns * 0.2 ? 
//   '📦 FULFILLMENT ISSUES: Review picking/packing processes' : 
//   reportData.totalReturns > 0 ? '✅ Fulfillment accuracy is good' : ''}

// ${reportData.totalReturns > 0 && reportData.byCondition.new > reportData.totalReturns * 0.7 ? 
//   '💰 HIGH NEW ITEM RETURNS: Consider return policy adjustment' : 
//   reportData.totalReturns > 0 ? '✅ Return condition distribution is balanced' : ''}

// ═══════════════════════════════════════
// Generated by EchoBin Analytics System`;

//         await Share.share({ message: report });

//       } else if (type === 'detailed') {
//         let report = `📋 DETAILED ECHOBIN RETURNS REPORT\n\n`;
//         report += `Generated: ${new Date().toLocaleString()}\n`;
//         report += `Date Range: ${selectedDateRange.toUpperCase()}\n`;
//         report += `Total Items: ${filteredData.length}\n\n`;
//         report += `═══════════════════════════════════════\n\n`;
        
//         if (filteredData.length === 0) {
//           report += `No returns found for the selected date range.\n`;
//         } else {
//           filteredData.forEach((item, index) => {
//             report += `${index + 1}. SKU: ${item.sku}\n`;
//             report += `   ├─ Reason: ${item.reason}\n`;
//             report += `   ├─ Condition: ${item.condition}\n`;
//             report += `   ├─ Date: ${item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'N/A'}\n`;
//             report += `   └─ 🤖 AI Suggestion: ${item.aiSuggestion || 'No suggestion available'}\n\n`;
//           });
//         }
        
//         await Share.share({ message: report });

//       } else if (type === 'analytics') {
//         const analytics = `📊 ECHOBIN ANALYTICS REPORT
// ═══════════════════════════════════════

// Generated: ${new Date().toLocaleString()}
// Analysis Period: ${selectedDateRange.toUpperCase()}

// 📈 KEY METRICS:
// • Total Returns: ${reportData.totalReturns}
// • Return Rate Trend: ${reportData.totalReturns > 0 ? 'Data Available' : 'Insufficient Data'}
// • Most Common Issue: ${reportData.byReason.defective >= reportData.byReason.wrongItem && reportData.byReason.defective >= reportData.byReason.changedMind ? 'Defective Items' : 
//   reportData.byReason.wrongItem >= reportData.byReason.changedMind ? 'Wrong Items' : 'Changed Mind'}

// 🔍 DETAILED ANALYTICS:
// • Defect Rate: ${reportData.totalReturns > 0 ? ((reportData.byReason.defective/reportData.totalReturns)*100).toFixed(2) : 0}%
// • Fulfillment Accuracy: ${reportData.totalReturns > 0 ? (100 - (reportData.byReason.wrongItem/reportData.totalReturns)*100).toFixed(2) : 100}%
// • Customer Satisfaction: ${reportData.totalReturns > 0 ? (100 - (reportData.byReason.changedMind/reportData.totalReturns)*100).toFixed(2) : 100}%

// 💡 ACTIONABLE INSIGHTS:
// ${reportData.totalReturns === 0 ? '• No returns to analyze in this period' : ''}
// ${reportData.byReason.defective > 3 ? '• Consider quality control improvements' : ''}
// ${reportData.byReason.wrongItem > 2 ? '• Review warehouse picking processes' : ''}
// ${reportData.byCondition.damaged > reportData.totalReturns * 0.2 ? '• Investigate shipping/handling procedures' : ''}

// ═══════════════════════════════════════`;

//         await Share.share({ message: analytics });
//       }
      
//       setShowReportModal(false);
//       Alert.alert('✅ Report Generated', 'Report has been generated and is ready to share!');
//     } catch (error) {
//       Alert.alert('❌ Error', 'Failed to generate report. Please try again.');
//     }
//   };

//   const DateRangeButton = ({ title, range, isActive }: { title: string, range: typeof selectedDateRange, isActive: boolean }) => (
//     <TouchableOpacity 
//       style={[themeStyles.dateRangeButton, isActive && themeStyles.dateRangeButtonActive]} 
//       onPress={() => setSelectedDateRange(range)}
//     >
//       <Text style={[themeStyles.dateRangeText, isActive && themeStyles.dateRangeTextActive]}>
//         {title}
//       </Text>
//     </TouchableOpacity>
//   );

//   const ReportCard = ({ 
//     title, 
//     description, 
//     icon, 
//     onPress, 
//     color = '#3b82f6' 
//   }: { 
//     title: string, 
//     description: string, 
//     icon: string, 
//     onPress: () => void,
//     color?: string 
//   }) => (
//     <TouchableOpacity style={themeStyles.reportCard} onPress={onPress}>
//       <View style={themeStyles.reportCardHeader}>
//         <Text style={[themeStyles.reportCardIcon, { color }]}>{icon}</Text>
//         <Text style={themeStyles.reportCardTitle}>{title}</Text>
//       </View>
//       <Text style={themeStyles.reportCardDescription}>{description}</Text>
//       <View style={themeStyles.reportCardFooter}>
//         <Text style={themeStyles.reportCardData}>
//           {filteredData.length} items • {selectedDateRange}
//         </Text>
//         <Text style={[themeStyles.reportCardArrow, { color }]}>→</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={themeStyles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Header */}
//         <View style={themeStyles.section}>
//           <View style={themeStyles.headerRow}>
//             <TouchableOpacity onPress={onBack} style={themeStyles.backButton}>
//               <Text style={themeStyles.backButtonText}>← Back</Text>
//             </TouchableOpacity>
//             <Text style={themeStyles.sectionTitle}>📊 Reports</Text>
//           </View>
          
//           <Text style={themeStyles.subtitle}>
//             Generate comprehensive reports and analytics for your return data
//           </Text>
//         </View>

//         {/* Date Range Selector */}
//         <View style={themeStyles.section}>
//           <Text style={themeStyles.sectionLabel}>📅 Select Date Range</Text>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={themeStyles.dateRangeContainer}>
//             <DateRangeButton title="Today" range="today" isActive={selectedDateRange === 'today'} />
//             <DateRangeButton title="This Week" range="week" isActive={selectedDateRange === 'week'} />
//             <DateRangeButton title="This Month" range="month" isActive={selectedDateRange === 'month'} />
//             <DateRangeButton title="All Time" range="all" isActive={selectedDateRange === 'all'} />
//           </ScrollView>
//         </View>

//         {/* Data Overview */}
//         <View style={themeStyles.section}>
//           <Text style={themeStyles.sectionLabel}>📈 Data Overview</Text>
//           <View style={themeStyles.overviewGrid}>
//             <View style={themeStyles.overviewCard}>
//               <Text style={themeStyles.overviewNumber}>{filteredData.length}</Text>
//               <Text style={themeStyles.overviewLabel}>Total Returns</Text>
//             </View>
//             <View style={themeStyles.overviewCard}>
//               <Text style={themeStyles.overviewNumber}>
//                 {filteredData.filter(i => i.reason === 'Defective').length}
//               </Text>
//               <Text style={themeStyles.overviewLabel}>Defective</Text>
//             </View>
//             <View style={themeStyles.overviewCard}>
//               <Text style={themeStyles.overviewNumber}>
//                 {filteredData.filter(i => i.condition === 'New').length}
//               </Text>
//               <Text style={themeStyles.overviewLabel}>New Items</Text>
//             </View>
//           </View>
//         </View>

//         {/* Report Types */}
//         <View style={themeStyles.section}>
//           <Text style={themeStyles.sectionLabel}>📋 Available Reports</Text>
          
//           <ReportCard
//             title="Summary Report"
//             description="Quick overview with key metrics and percentages"
//             icon="📊"
//             color="#3b82f6"
//             onPress={() => generateReport('summary')}
//           />

//           <ReportCard
//             title="Detailed Report"
//             description="Complete item-by-item breakdown with AI suggestions"
//             icon="📋"
//             color="#059669"
//             onPress={() => generateReport('detailed')}
//           />

//           <ReportCard
//             title="Analytics Report"
//             description="In-depth analytics with actionable insights"
//             icon="📈"
//             color="#dc2626"
//             onPress={() => generateReport('analytics')}
//           />

//           <ReportCard
//             title="Export Data"
//             description="Raw data export for external analysis"
//             icon="💾"
//             color="#7c3aed"
//             onPress={() => generateReport('export')}
//           />
//         </View>

//         {/* Recent Activity */}
//         {filteredData.length > 0 && (
//           <View style={themeStyles.section}>
//             <Text style={themeStyles.sectionLabel}>🕒 Recent Activity</Text>
//             {filteredData.slice(0, 3).map((item, index) => (
//               <View key={index} style={themeStyles.activityCard}>
//                 <View style={themeStyles.activityHeader}>
//                   <Text style={themeStyles.activitySku}>{item.sku}</Text>
//                   <Text style={themeStyles.activityDate}>
//                     {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'N/A'}
//                   </Text>
//                 </View>
//                 <Text style={themeStyles.activityReason}>{item.reason} • {item.condition}</Text>
//               </View>
//             ))}
//           </View>
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// const stylesBase = {
//   container: {
//     flex: 1,
//     backgroundColor: '#f8fafc',
//   },
//   section: {
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//   },
//   headerRow: {
//     flexDirection: 'row' as const,
//     alignItems: 'center' as const,
//     marginBottom: 8,
//   },
//   backButton: {
//     marginRight: 12,
//     padding: 8,
//   },
//   backButtonText: {
//     fontSize: 16,
//     color: '#3b82f6',
//     fontWeight: '600' as const,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '700' as const,
//     color: '#1e3a8a',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#64748b',
//     marginTop: 4,
//   },
//   sectionLabel: {
//     fontSize: 18,
//     fontWeight: '600' as const,
//     color: '#1e3a8a',
//     marginBottom: 12,
//   },
//   dateRangeContainer: {
//     flexDirection: 'row' as const,
//   },
//   dateRangeButton: {
//     backgroundColor: '#e2e8f0',
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 20,
//     marginRight: 8,
//   },
//   dateRangeButtonActive: {
//     backgroundColor: '#3b82f6',
//   },
//   dateRangeText: {
//     color: '#475569',
//     fontSize: 14,
//     fontWeight: '600' as const,
//   },
//   dateRangeTextActive: {
//     color: '#ffffff',
//   },
//   overviewGrid: {
//     flexDirection: 'row' as const,
//     gap: 12,
//   },
//   overviewCard: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center' as const,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   overviewNumber: {
//     fontSize: 24,
//     fontWeight: 'bold' as const,
//     color: '#3b82f6',
//   },
//   overviewLabel: {
//     fontSize: 12,
//     color: '#64748b',
//     marginTop: 4,
//     fontWeight: '500' as const,
//   },
//   reportCard: {
//     backgroundColor: '#ffffff',
//     padding: 20,
//     borderRadius: 16,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   reportCardHeader: {
//     flexDirection: 'row' as const,
//     alignItems: 'center' as const,
//     marginBottom: 8,
//   },
//   reportCardIcon: {
//     fontSize: 24,
//     marginRight: 12,
//   },
//   reportCardTitle: {
//     fontSize: 18,
//     fontWeight: '700' as const,
//     color: '#1e3a8a',
//   },
//   reportCardDescription: {
//     fontSize: 14,
//     color: '#64748b',
//     marginBottom: 12,
//     lineHeight: 20,
//   },
//   reportCardFooter: {
//     flexDirection: 'row' as const,
//     justifyContent: 'space-between' as const,
//     alignItems: 'center' as const,
//   },
//   reportCardData: {
//     fontSize: 12,
//     color: '#94a3b8',
//     fontWeight: '500' as const,
//   },
//   reportCardArrow: {
//     fontSize: 18,
//     fontWeight: 'bold' as const,
//   },
//   activityCard: {
//     backgroundColor: '#ffffff',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   activityHeader: {
//     flexDirection: 'row' as const,
//     justifyContent: 'space-between' as const,
//     alignItems: 'center' as const,
//     marginBottom: 4,
//   },
//   activitySku: {
//     fontSize: 16,
//     fontWeight: '600' as const,
//     color: '#1e3a8a',
//   },
//   activityDate: {
//     fontSize: 12,
//     color: '#64748b',
//   },
//   activityReason: {
//     fontSize: 14,
//     color: '#475569',
//   },
// };

// const stylesLight = StyleSheet.create({
//   ...stylesBase,
// });

// const stylesDark = StyleSheet.create({
//   ...stylesBase,
//   container: { 
//     ...stylesBase.container, 
//     backgroundColor: '#0f172a' 
//   },
//   backButtonText: {
//     ...stylesBase.backButtonText,
//     color: '#60a5fa',
//   },
//   sectionTitle: { 
//     ...stylesBase.sectionTitle, 
//     color: '#f1f5f9' 
//   },
//   subtitle: {
//     ...stylesBase.subtitle,
//     color: '#94a3b8',
//   },
//   sectionLabel: { 
//     ...stylesBase.sectionLabel, 
//     color: '#f1f5f9' 
//   },
//   dateRangeButton: { 
//     ...stylesBase.dateRangeButton, 
//     backgroundColor: '#374151' 
//   },
//   dateRangeText: { 
//     ...stylesBase.dateRangeText, 
//     color: '#d1d5db' 
//   },
//   overviewCard: { 
//     ...stylesBase.overviewCard, 
//     backgroundColor: '#1e293b' 
//   },
//   overviewLabel: { 
//     ...stylesBase.overviewLabel, 
//     color: '#94a3b8' 
//   },
//   reportCard: { 
//     ...stylesBase.reportCard, 
//     backgroundColor: '#1e293b' 
//   },
//   reportCardTitle: { 
//     ...stylesBase.reportCardTitle, 
//     color: '#f1f5f9' 
//   },
//   reportCardDescription: { 
//     ...stylesBase.reportCardDescription, 
//     color: '#94a3b8' 
//   },
//   reportCardData: { 
//     ...stylesBase.reportCardData, 
//     color: '#64748b' 
//   },
//   activityCard: { 
//     ...stylesBase.activityCard, 
//     backgroundColor: '#1e293b' 
//   },
//   activitySku: { 
//     ...stylesBase.activitySku, 
//     color: '#60a5fa' 
//   },
//   activityDate: { 
//     ...stylesBase.activityDate, 
//     color: '#94a3b8' 
//   },
//   activityReason: { 
//     ...stylesBase.activityReason, 
//     color: '#d1d5db' 
//   },
// });

// export default ReportsScreen;
// Enhanced ReportsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
  TextInput,
  Dimensions,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

interface ReturnItem {
  sku: string;
  reason: string;
  condition: string;
  timestamp: string;
  aiSuggestion?: string;
}

interface ReportsScreenProps {
  data: ReturnItem[];
  darkMode: boolean;
  onBack: () => void;
}

const ReportsScreen: React.FC<ReportsScreenProps> = ({ data, darkMode, onBack }) => {
  const [search, setSearch] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const themeStyles = darkMode ? stylesDark : stylesLight;

  const handleStartDateConfirm = (date: Date) => {
    setStartDate(date);
    setShowStartPicker(false);
  };
  const handleEndDateConfirm = (date: Date) => {
    setEndDate(date);
    setShowEndPicker(false);
  };

  const filtered = data.filter(item => {
    const date = new Date(item.timestamp);
    const matchesSearch = item.sku.includes(search);
    const inRange = (!startDate || date >= startDate) && (!endDate || date <= endDate);
    return matchesSearch && inRange;
  });

  const generateCSV = async () => {
    const csv = [
      ['SKU', 'Reason', 'Condition', 'Timestamp', 'AI Suggestion'],
      ...filtered.map(i => [i.sku, i.reason, i.condition, i.timestamp, i.aiSuggestion || ''])
    ]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const uri = FileSystem.documentDirectory + 'echobin_report.csv';
    await FileSystem.writeAsStringAsync(uri, csv);
    Alert.alert('✅ CSV Exported', `Saved to: ${uri}`);
  };

  const chartData = {
    labels: ['New', 'Used', 'Damaged'],
    datasets: [
      {
        data: [
          filtered.filter(i => i.condition === 'New').length,
          filtered.filter(i => i.condition === 'Used').length,
          filtered.filter(i => i.condition === 'Damaged').length,
        ],
        color: () => '#3b82f6',
      },
    ],
  };

  return (
    <View style={themeStyles.container}>
      <ScrollView>
        <TouchableOpacity onPress={onBack} style={themeStyles.back}><Text style={themeStyles.backText}>← Back</Text></TouchableOpacity>
        <Text style={themeStyles.title}>📊 Reports</Text>

        <TextInput
          style={themeStyles.searchInput}
          placeholder="Search SKU..."
          placeholderTextColor={darkMode ? '#94a3b8' : '#64748b'}
          value={search}
          onChangeText={setSearch}
        />

        <View style={themeStyles.datePickRow}>
          <TouchableOpacity onPress={() => setShowStartPicker(true)} style={themeStyles.dateBtn}>
            <Text style={themeStyles.dateBtnText}>Start: {startDate ? startDate.toLocaleDateString() : 'Any'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowEndPicker(true)} style={themeStyles.dateBtn}>
            <Text style={themeStyles.dateBtnText}>End: {endDate ? endDate.toLocaleDateString() : 'Any'}</Text>
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={showStartPicker}
          mode="date"
          onConfirm={handleStartDateConfirm}
          onCancel={() => setShowStartPicker(false)}
        />
        <DateTimePickerModal
          isVisible={showEndPicker}
          mode="date"
          onConfirm={handleEndDateConfirm}
          onCancel={() => setShowEndPicker(false)}
        />

        <LineChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundGradientFrom: darkMode ? '#1e293b' : '#fff',
            backgroundGradientTo: darkMode ? '#1e293b' : '#fff',
            color: () => darkMode ? '#60a5fa' : '#3b82f6',
            labelColor: () => darkMode ? '#f1f5f9' : '#334155',
          }}
          style={{ marginVertical: 20, borderRadius: 16, alignSelf: 'center' }}
        />

        {filtered.map((item, i) => (
          <View key={i} style={themeStyles.card}>
            <Text style={themeStyles.sku}>SKU: {item.sku}</Text>
            <Text style={themeStyles.meta}>Reason: {item.reason} | Condition: {item.condition}</Text>
            <Text style={themeStyles.meta}>Date: {new Date(item.timestamp).toLocaleDateString()}</Text>
            <Text style={themeStyles.ai}>🤖 {item.aiSuggestion || 'No Suggestion'}</Text>
          </View>
        ))}

        <TouchableOpacity onPress={generateCSV} style={themeStyles.shareBtn}>
          <Text style={themeStyles.shareText}>💾 Export CSV</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const base = {
  container: { flex: 1, paddingTop: 40 },
  back: { paddingHorizontal: 20 },
  backText: { fontSize: 16, fontWeight: "600" },
  title: { fontSize: 24, fontWeight: "700", margin: 20 },
  searchInput: {
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  datePickRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  dateBtn: {
    backgroundColor: '#e5e7eb',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  dateBtnText: { fontWeight: "600" },
  card: {
    margin: 10,
    padding: 14,
    borderRadius: 10,
  },
  sku: { fontWeight: "700", fontSize: 16 },
  meta: { fontSize: 13, marginVertical: 2 },
  ai: { fontSize: 13, fontStyle: 'italic', color: '#10b981' },
  shareBtn: {
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  shareText: { color: '#fff', fontWeight: "600" },
};

const stylesLight = StyleSheet.create({
  ...base,
  container: { ...base.container, backgroundColor: '#f9fafb' },
  backText: { ...base.backText, color: '#3b82f6' },
  title: { ...base.title, color: '#1e3a8a' },
  searchInput: { ...base.searchInput, borderColor: '#cbd5e1', color: '#0f172a' },
  card: { ...base.card, backgroundColor: '#fff' },
  meta: { ...base.meta, color: '#475569' },
});

const stylesDark = StyleSheet.create({
  ...base,
  container: { ...base.container, backgroundColor: '#0f172a' },
  backText: { ...base.backText, color: '#60a5fa' },
  title: { ...base.title, color: '#f1f5f9' },
  searchInput: { ...base.searchInput, borderColor: '#334155', color: '#f1f5f9' },
  card: { ...base.card, backgroundColor: '#1e293b' },
  meta: { ...base.meta, color: '#94a3b8' },
});

export default ReportsScreen;