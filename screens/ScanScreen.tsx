

// // ✅ FULLY UPDATED ScanScreen.tsx
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   StyleSheet,
//   ScrollView,
//   Platform,  
//   KeyboardAvoidingView,
//   ActivityIndicator,
//   Modal,
// } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import { useRoute } from '@react-navigation/native';
// import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

// export default function ScanScreen() {
//   const route = useRoute<any>();
//   const [itemId, setItemId] = useState(route.params?.task?.id || '');
//   const [itemName, setItemName] = useState(route.params?.task?.name || '');
//   const [selectedReason, setSelectedReason] = useState('');
//   const [selectedCondition, setSelectedCondition] = useState('');
//   const [customReason, setCustomReason] = useState('');
//   const [customCondition, setCustomCondition] = useState('');
//   const [isWriting, setIsWriting] = useState(false);
//   const [nfcSupported, setNfcSupported] = useState(false);
//   const [nfcEnabled, setNfcEnabled] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [showDetailModal, setShowDetailModal] = useState(true);

//   const successAnimRef = useRef<any>(null);

//   const reasons = ['Defective', 'Wrong Item', 'Changed Mind', 'Other'];
//   const conditions = ['New', 'Used', 'Damaged', 'Other'];

//   useEffect(() => {
//     const initialize = async () => {
//       try {
//         await NfcManager.start();
//         const supported = await NfcManager.isSupported();
//         setNfcSupported(supported);
//         if (supported) {
//           const enabled = await NfcManager.isEnabled();
//           setNfcEnabled(enabled);
//           if (!enabled) Alert.alert('NFC Disabled', 'Please enable NFC in settings.');
//         } else {
//           Alert.alert('NFC Not Supported', 'Device does not support NFC.');
//         }
//       } catch {
//         setNfcSupported(true);
//         setNfcEnabled(true);
//       }
//     };

//     initialize();

//     return () => {
//       NfcManager.cancelTechnologyRequest().catch(() => {});
//     };
//   }, []);

//   const writeNfc = async () => {
//     if (!selectedReason || !selectedCondition) {
//       Alert.alert('Missing Input', 'Select return reason and condition.');
//       return;
//     }

//     const reason = selectedReason === 'Other' ? customReason.trim() : selectedReason;
//     const condition = selectedCondition === 'Other' ? customCondition.trim() : selectedCondition;

//     if ((selectedReason === 'Other' && !reason) || (selectedCondition === 'Other' && !condition)) {
//       Alert.alert('Missing Input', 'Fill in custom fields.');
//       return;
//     }

//     setIsWriting(true);

//     Alert.alert('📱 NFC Write Ready', 'Hold device near the NFC tag and tap "Start Writing".', [
//       { text: 'Cancel', style: 'cancel', onPress: () => setIsWriting(false) },
//       { text: 'Start Writing', onPress: () => performNfcWrite(reason, condition) },
//     ]);
//   };

//   const performNfcWrite = async (reason: string, condition: string) => {
//     try {
//       const message = `Reason:${reason};Condition:${condition}`;
//       const bytes = Ndef.encodeMessage([Ndef.textRecord(message)]);

//       await NfcManager.requestTechnology(NfcTech.Ndef, {
//         alertMessage: 'Ready to write!',
//       });

//       await NfcManager.ndefHandler.writeNdefMessage(bytes);

//       setShowSuccess(true);
//       successAnimRef.current?.fadeInDown(600);

//       // ✅ Call the onDone callback to mark this task as "Done"
//       if (route.params?.onDone) {
//         route.params.onDone(itemId);
//       }

//       setTimeout(() => setShowSuccess(false), 2500);

//       setSelectedReason('');
//       setSelectedCondition('');
//       setCustomReason('');
//       setCustomCondition('');
//     } catch (e: any) {
//       Alert.alert('Write Failed', e.message || 'Unknown error');
//     } finally {
//       setIsWriting(false);
//       NfcManager.cancelTechnologyRequest().catch(() => {});
//     }
//   };

//   const renderOptions = (
//     options: string[],
//     selected: string,
//     setSelected: React.Dispatch<React.SetStateAction<string>>,
//     label: string,
//     customValue: string,
//     setCustomValue: React.Dispatch<React.SetStateAction<string>>
//   ) => (
//     <View style={styles.optionContainer}>
//       <Text style={styles.label}>{label}</Text>
//       {options.map(option => (
//         <TouchableOpacity
//           key={option}
//           style={[styles.optionButton, selected === option && styles.optionSelected]}
//           onPress={() => setSelected(option)}
//           disabled={isWriting}
//         >
//           <Text style={[styles.optionText, selected === option && styles.optionTextSelected]}>
//             {option}
//           </Text>
//         </TouchableOpacity>
//       ))}
//       {selected === 'Other' && (
//         <TextInput
//           style={styles.input}
//           placeholder={`Enter custom ${label.toLowerCase()}`}
//           value={customValue}
//           onChangeText={setCustomValue}
//           editable={!isWriting}
//           maxLength={50}
//         />
//       )}
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scroll}>
//         <Text style={styles.title}>📦 EchoBin - Write to NFC</Text>

//         {renderOptions(reasons, selectedReason, setSelectedReason, 'Return Reason', customReason, setCustomReason)}
//         {renderOptions(conditions, selectedCondition, setSelectedCondition, 'Condition', customCondition, setCustomCondition)}

//         <TouchableOpacity
//           style={[styles.writeButton, (isWriting || !nfcSupported || !nfcEnabled) && styles.writeButtonDisabled]}
//           onPress={writeNfc}
//           disabled={isWriting || !nfcSupported || !nfcEnabled}
//         >
//           {isWriting ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.writeButtonText}>✍️ Write to NFC Tag</Text>
//           )}
//         </TouchableOpacity>

//         <Text style={styles.tip}>💡 Tip: Enable NFC in settings & hold tag close during writing.</Text>
//       </ScrollView>

//       {showSuccess && (
//         <Animatable.View ref={successAnimRef} style={styles.successPopup}>
//           <Text style={styles.successPopupText}>✅ Tag written successfully!</Text>
//         </Animatable.View>
//       )}

//       <Modal visible={showDetailModal} transparent animationType="slide">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>🔍 Task Info</Text>
//             <Text style={styles.modalItem}>Item: {itemName}</Text>
//             <Text style={styles.modalItem}>ID: {itemId}</Text>
//             <TouchableOpacity
//               style={styles.modalClose}
//               onPress={() => setShowDetailModal(false)}
//             >
//               <Text style={styles.modalCloseText}>Got it</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f1f5f9' },
//   scroll: { padding: 20, paddingBottom: 60 },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#1e40af',
//     textAlign: 'center',
//     marginBottom: 24,
//   },
//   optionContainer: { marginBottom: 16 },
//   label: { fontSize: 16, marginBottom: 8, color: '#0f172a', fontWeight: '600' },
//   optionButton: {
//     backgroundColor: '#dbeafe',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 8,
//     borderWidth: 2,
//     borderColor: 'transparent',
//   },
//   optionSelected: { backgroundColor: '#60a5fa', borderColor: '#2563eb' },
//   optionText: { fontSize: 15, color: '#1e3a8a', fontWeight: '500' },
//   optionTextSelected: { color: '#ffffff', fontWeight: '600' },
//   input: {
//     borderColor: '#cbd5e1',
//     borderWidth: 1,
//     padding: 12,
//     marginTop: 8,
//     borderRadius: 6,
//     backgroundColor: '#ffffff',
//     fontSize: 15,
//   },
//   writeButton: {
//     marginTop: 24,
//     backgroundColor: '#2563eb',
//     padding: 16,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   writeButtonDisabled: {
// //     backgroundColor: '#94a3b8',
// //   },
// //   writeButtonText: {
// //     color: 'white',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   tip: {
// //     marginTop: 20,
// //     fontSize: 13,
// //     color: '#64748b',
// //     lineHeight: 18,
// //     textAlign: 'left',
// //   },
// //   successPopup: {
// //     position: 'absolute',
// //     top: '40%',
// //     alignSelf: 'center',
// //     backgroundColor: '#22c55e',
// //     padding: 16,
// //     borderRadius: 12,
// //     shadowColor: '#000',
// //     shadowOpacity: 0.2,
// //     shadowRadius: 8,
// //     elevation: 10,
// //     zIndex: 999,
// //   },
// //   successPopupText: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     color: '#fff',
// //   },
// //   modalOverlay: {
// //     flex: 1,
// //     backgroundColor: 'rgba(0,0,0,0.4)',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   modalContent: {
// //     backgroundColor: '#fff',
// //     padding: 24,
// //     borderRadius: 12,
// //     width: '80%',
// //     alignItems: 'center',
// //   },
// //   modalTitle: {
// //     fontSize: 18,
// //     fontWeight: '700',
// //     marginBottom: 12,
// //     color: '#1e293b',
// //   },
// //   modalItem: {
// //     fontSize: 15,
// //     marginVertical: 4,
// //     color: '#475569',
// //   },
// //   modalClose: {
// //     marginTop: 16,
// //     backgroundColor: '#2563eb',
// //     paddingVertical: 10,
// //     paddingHorizontal: 20,
// //     borderRadius: 8,
// //   },
// //   modalCloseText: {
// //     color: '#fff',
// //     fontWeight: 'bold',
// //   },
// // });

// // ✨ ENHANCED ScanScreen.tsx - Modern UI with Poppins Font
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   StyleSheet,
//   ScrollView,
//   Platform,
//   KeyboardAvoidingView,
//   ActivityIndicator,
//   Modal,
//   Dimensions,
// } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import { useRoute } from '@react-navigation/native';
// import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

// const { width } = Dimensions.get('window');

// export default function ScanScreen() {
//   const route = useRoute<any>();
//   const [itemId, setItemId] = useState(route.params?.task?.id || '');
//   const [itemName, setItemName] = useState(route.params?.task?.name || '');
//   const [selectedReason, setSelectedReason] = useState('');
//   const [selectedCondition, setSelectedCondition] = useState('');
//   const [customReason, setCustomReason] = useState('');
//   const [customCondition, setCustomCondition] = useState('');
//   const [isWriting, setIsWriting] = useState(false);
//   const [nfcSupported, setNfcSupported] = useState(false);
//   const [nfcEnabled, setNfcEnabled] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [showDetailModal, setShowDetailModal] = useState(true);

//   const successAnimRef = useRef<any>(null);

//   const reasons = [
//     { id: 'defective', label: 'Defective', icon: '⚠️' },
//     { id: 'wrong', label: 'Wrong Item', icon: '🔄' },
//     { id: 'mind', label: 'Changed Mind', icon: '💭' },
//     { id: 'other', label: 'Other', icon: '📝' }
//   ];

//   const conditions = [
//     { id: 'new', label: 'New', icon: '✨' },
//     { id: 'used', label: 'Used', icon: '📦' },
//     { id: 'damaged', label: 'Damaged', icon: '💔' },
//     { id: 'other', label: 'Other', icon: '📝' }
//   ];

//   useEffect(() => {
//     const initialize = async () => {
//       try {
//         await NfcManager.start();
//         const supported = await NfcManager.isSupported();
//         setNfcSupported(supported);
//         if (supported) {
//           const enabled = await NfcManager.isEnabled();
//           setNfcEnabled(enabled);
//           if (!enabled) Alert.alert('NFC Disabled', 'Please enable NFC in settings.');
//         } else {
//           Alert.alert('NFC Not Supported', 'Device does not support NFC.');
//         }
//       } catch {
//         setNfcSupported(true);
//         setNfcEnabled(true);
//       }
//     };

//     initialize();

//     return () => {
//       NfcManager.cancelTechnologyRequest().catch(() => {});
//     };
//   }, []);

//   const writeNfc = async () => {
//     if (!selectedReason || !selectedCondition) {
//       Alert.alert('Missing Information', 'Please select both return reason and condition.');
//       return;
//     }

//     const reason = selectedReason === 'other' ? customReason.trim() : 
//       reasons.find(r => r.id === selectedReason)?.label || selectedReason;
//     const condition = selectedCondition === 'other' ? customCondition.trim() : 
//       conditions.find(c => c.id === selectedCondition)?.label || selectedCondition;

//     if ((selectedReason === 'other' && !reason) || (selectedCondition === 'other' && !condition)) {
//       Alert.alert('Missing Information', 'Please fill in the custom fields.');
//       return;
//     }

//     setIsWriting(true);

//     Alert.alert('📱 Ready to Write', 'Position your device near the NFC tag and tap "Start Writing" when ready.', [
//       { text: 'Cancel', style: 'cancel', onPress: () => setIsWriting(false) },
//       { text: 'Start Writing', onPress: () => performNfcWrite(reason, condition) },
//     ]);
//   };

//   const performNfcWrite = async (reason: string, condition: string) => {
//     try {
//       const message = `Reason:${reason};Condition:${condition}`;
//       const bytes = Ndef.encodeMessage([Ndef.textRecord(message)]);

//       await NfcManager.requestTechnology(NfcTech.Ndef, {
//         alertMessage: 'Ready to write! Hold steady...',
//       });

//       await NfcManager.ndefHandler.writeNdefMessage(bytes);

//       setShowSuccess(true);
//       successAnimRef.current?.bounceIn(800);

//       if (route.params?.onDone) {
//         route.params.onDone(itemId);
//       }

//       setTimeout(() => setShowSuccess(false), 3000);

//       setSelectedReason('');
//       setSelectedCondition('');
//       setCustomReason('');
//       setCustomCondition('');
//     } catch (e: any) {
//       Alert.alert('Write Failed', e.message || 'Please try again');
//     } finally {
//       setIsWriting(false);
//       NfcManager.cancelTechnologyRequest().catch(() => {});
//     }
//   };

//   const renderOptionGroup = (
//     title: string,
//     options: any[],
//     selected: string,
//     setSelected: React.Dispatch<React.SetStateAction<string>>,
//     customValue: string,
//     setCustomValue: React.Dispatch<React.SetStateAction<string>>
//   ) => (
//     <View style={styles.sectionContainer}>
//       <Text style={styles.sectionTitle}>{title}</Text>
//       <View style={styles.optionsGrid}>
//         {options.map(option => (
//           <TouchableOpacity
//             key={option.id}
//             style={[
//               styles.optionCard,
//               selected === option.id && styles.optionCardSelected
//             ]}
//             onPress={() => setSelected(option.id)}
//             disabled={isWriting}
//             activeOpacity={0.7}
//           >
//             <Text style={styles.optionIcon}>{option.icon}</Text>
//             <Text style={[
//               styles.optionLabel,
//               selected === option.id && styles.optionLabelSelected
//             ]}>
//               {option.label}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
      
//       {selected === 'other' && (
//         <Animatable.View animation="fadeInUp" duration={300} style={styles.customInputContainer}>
//           <TextInput
//             style={styles.customInput}
//             placeholder={`Enter custom ${title.toLowerCase()}`}
//             placeholderTextColor="#94A3B8"
//             value={customValue}
//             onChangeText={setCustomValue}
//             editable={!isWriting}
//             maxLength={50}
//           />
//         </Animatable.View>
//       )}
//     </View>
//   );

//   const canWrite = selectedReason && selectedCondition && nfcSupported && nfcEnabled;

//   return (
//     <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
//       <ScrollView 
//         contentContainerStyle={styles.scrollContainer}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>EchoBin</Text>
//           <Text style={styles.headerSubtitle}>NFC Return Processing</Text>
//         </View>

//         {/* Status Card */}
//         <View style={styles.statusCard}>
//           <View style={styles.statusRow}>
//             <Text style={styles.statusLabel}>NFC Status:</Text>
//             <View style={[styles.statusBadge, nfcEnabled ? styles.statusActive : styles.statusInactive]}>
//               <Text style={[styles.statusText, nfcEnabled ? styles.statusTextActive : styles.statusTextInactive]}>
//                 {nfcEnabled ? '🟢 Ready' : '🔴 Disabled'}
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* Return Reason Section */}
//         {renderOptionGroup('Return Reason', reasons, selectedReason, setSelectedReason, customReason, setCustomReason)}

//         {/* Condition Section */}
//         {renderOptionGroup('Item Condition', conditions, selectedCondition, setSelectedCondition, customCondition, setCustomCondition)}

//         {/* Write Button */}
//         <TouchableOpacity
//           style={[
//             styles.writeButton,
//             canWrite ? styles.writeButtonActive : styles.writeButtonDisabled
//           ]}
//           onPress={writeNfc}
//           disabled={!canWrite || isWriting}
//           activeOpacity={0.8}
//         >
//           {isWriting ? (
//             <View style={styles.loadingContainer}>
//               <ActivityIndicator color="#FFFFFF" size="small" />
//               <Text style={styles.writeButtonText}>Writing...</Text>
//             </View>
//           ) : (
//             <View style={styles.buttonContent}>
//               <Text style={styles.writeButtonIcon}>📡</Text>
//               <Text style={styles.writeButtonText}>Write to NFC Tag</Text>
//             </View>
//           )}
//         </TouchableOpacity>

//         {/* Help Text */}
//         <View style={styles.helpContainer}>
//           <Text style={styles.helpText}>
//             💡 Hold your device close to the NFC tag when writing. Make sure NFC is enabled in your device settings.
//           </Text>
//         </View>
//       </ScrollView>

//       {/* Success Animation */}
//       {showSuccess && (
//         <Animatable.View ref={successAnimRef} style={styles.successOverlay}>
//           <View style={styles.successCard}>
//             <Text style={styles.successIcon}>✅</Text>
//             <Text style={styles.successTitle}>Success!</Text>
//             <Text style={styles.successMessage}>NFC tag written successfully</Text>
//           </View>
//         </Animatable.View>
//       )}

//       {/* Task Info Modal */}
//       <Modal visible={showDetailModal} transparent animationType="fade">
//         <View style={styles.modalOverlay}>
//           <Animatable.View animation="zoomIn" duration={300} style={styles.modalCard}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalIcon}>📋</Text>
//               <Text style={styles.modalTitle}>Task Information</Text>
//             </View>
            
//             <View style={styles.modalBody}>
//               <View style={styles.infoRow}>
//                 <Text style={styles.infoLabel}>Item Name:</Text>
//                 <Text style={styles.infoValue}>{itemName}</Text>
//               </View>
//               <View style={styles.infoRow}>
//                 <Text style={styles.infoLabel}>Item ID:</Text>
//                 <Text style={styles.infoValue}>{itemId}</Text>
//               </View>
//             </View>
            
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={() => setShowDetailModal(false)}
//               activeOpacity={0.8}
//             >
//               <Text style={styles.modalButtonText}>Got it</Text>
//             </TouchableOpacity>
//           </Animatable.View>
//         </View>
//       </Modal>
//     </KeyboardAvoidingView>
//   );
// }
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  Modal,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useRoute } from '@react-navigation/native';
// NFC imports are commented out for safe build
// import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

const { width } = Dimensions.get('window');

export default function ScanScreen() {
  const route = useRoute<any>();
  const [itemId, setItemId] = useState(route.params?.task?.id || '');
  const [itemName, setItemName] = useState(route.params?.task?.name || '');
  const [selectedReason, setSelectedReason] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [customCondition, setCustomCondition] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const [nfcSupported, setNfcSupported] = useState(false);
  const [nfcEnabled, setNfcEnabled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(true);

  const successAnimRef = useRef<any>(null);

  const reasons = [
    { id: 'defective', label: 'Defective', icon: '⚠️' },
    { id: 'wrong', label: 'Wrong Item', icon: '🔄' },
    { id: 'mind', label: 'Changed Mind', icon: '💭' },
    { id: 'other', label: 'Other', icon: '📝' }
  ];

  const conditions = [
    { id: 'new', label: 'New', icon: '✨' },
    { id: 'used', label: 'Used', icon: '📦' },
    { id: 'damaged', label: 'Damaged', icon: '💔' },
    { id: 'other', label: 'Other', icon: '📝' }
  ];

  useEffect(() => {
    // Disable NFC logic for safe demo
    setNfcSupported(true);
    setNfcEnabled(true);
    return () => {};
  }, []);

  const writeNfc = async () => {
    if (!selectedReason || !selectedCondition) {
      Alert.alert('Missing Information', 'Please select both return reason and condition.');
      return;
    }

    const reason = selectedReason === 'other' ? customReason.trim() :
      reasons.find(r => r.id === selectedReason)?.label || selectedReason;
    const condition = selectedCondition === 'other' ? customCondition.trim() :
      conditions.find(c => c.id === selectedCondition)?.label || selectedCondition;

    if ((selectedReason === 'other' && !reason) || (selectedCondition === 'other' && !condition)) {
      Alert.alert('Missing Information', 'Please fill in the custom fields.');
      return;
    }

    setIsWriting(true);

    Alert.alert('📱 Ready to Write', 'This is a simulated NFC write. Tap "Start Writing" to proceed.', [
      { text: 'Cancel', style: 'cancel', onPress: () => setIsWriting(false) },
      { text: 'Start Writing', onPress: () => performNfcWrite(reason, condition) },
    ]);
  };

  const performNfcWrite = async (reason: string, condition: string) => {
    try {
      // Simulated delay instead of real NFC
      await new Promise(res => setTimeout(res, 2000));

      setShowSuccess(true);
      successAnimRef.current?.bounceIn(800);

      if (route.params?.onDone) {
        route.params.onDone(itemId);
      }

      setTimeout(() => setShowSuccess(false), 3000);

      setSelectedReason('');
      setSelectedCondition('');
      setCustomReason('');
      setCustomCondition('');
    } catch (e: any) {
      Alert.alert('Write Failed', 'Simulated error: ' + (e.message || 'Please try again'));
    } finally {
      setIsWriting(false);
    }
  };

  const renderOptionGroup = (
    title: string,
    options: any[],
    selected: string,
    setSelected: React.Dispatch<React.SetStateAction<string>>,
    customValue: string,
    setCustomValue: React.Dispatch<React.SetStateAction<string>>
  ) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.optionsGrid}>
        {options.map(option => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionCard,
              selected === option.id && styles.optionCardSelected
            ]}
            onPress={() => setSelected(option.id)}
            disabled={isWriting}
            activeOpacity={0.7}
          >
            <Text style={styles.optionIcon}>{option.icon}</Text>
            <Text style={[
              styles.optionLabel,
              selected === option.id && styles.optionLabelSelected
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {selected === 'other' && (
        <Animatable.View animation="fadeInUp" duration={300} style={styles.customInputContainer}>
          <TextInput
            style={styles.customInput}
            placeholder={`Enter custom ${title.toLowerCase()}`}
            placeholderTextColor="#94A3B8"
            value={customValue}
            onChangeText={setCustomValue}
            editable={!isWriting}
            maxLength={50}
          />
        </Animatable.View>
      )}
    </View>
  );

  const canWrite = selectedReason && selectedCondition && nfcSupported && nfcEnabled;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>EchoBin</Text>
          <Text style={styles.headerSubtitle}>NFC Return Processing</Text>
        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>NFC Status:</Text>
            <View style={[styles.statusBadge, nfcEnabled ? styles.statusActive : styles.statusInactive]}>
              <Text style={[styles.statusText, nfcEnabled ? styles.statusTextActive : styles.statusTextInactive]}>
                {nfcEnabled ? '🟢 Ready' : '🔴 Disabled'}
              </Text>
            </View>
          </View>
        </View>

        {/* Return Reason Section */}
        {renderOptionGroup('Return Reason', reasons, selectedReason, setSelectedReason, customReason, setCustomReason)}

        {/* Condition Section */}
        {renderOptionGroup('Item Condition', conditions, selectedCondition, setSelectedCondition, customCondition, setCustomCondition)}

        {/* Write Button */}
        <TouchableOpacity
          style={[
            styles.writeButton,
            canWrite ? styles.writeButtonActive : styles.writeButtonDisabled
          ]}
          onPress={writeNfc}
          disabled={!canWrite || isWriting}
          activeOpacity={0.8}
        >
          {isWriting ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#FFFFFF" size="small" />
              <Text style={styles.writeButtonText}>Writing...</Text>
            </View>
          ) : (
            <View style={styles.buttonContent}>
              <Text style={styles.writeButtonIcon}>📡</Text>
              <Text style={styles.writeButtonText}>Write to NFC Tag</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Help Text */}
        <View style={styles.helpContainer}>
          <Text style={styles.helpText}>
            💡 Hold your device close to the NFC tag when writing. Make sure NFC is enabled in your device settings.
          </Text>
        </View>
      </ScrollView>

      {/* Success Animation */}
      {showSuccess && (
        <Animatable.View ref={successAnimRef} style={styles.successOverlay}>
          <View style={styles.successCard}>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={styles.successTitle}>Success!</Text>
            <Text style={styles.successMessage}>NFC tag written successfully</Text>
          </View>
        </Animatable.View>
      )}

      {/* Task Info Modal */}
      <Modal visible={showDetailModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Animatable.View animation="zoomIn" duration={300} style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalIcon}>📋</Text>
              <Text style={styles.modalTitle}>Task Information</Text>
            </View>
            
            <View style={styles.modalBody}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Item Name:</Text>
                <Text style={styles.infoValue}>{itemName}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Item ID:</Text>
                <Text style={styles.infoValue}>{itemId}</Text>
              </View>
            </View>
            
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowDetailModal(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.modalButtonText}>Got it</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusLabel: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#475569',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusActive: {
    backgroundColor: '#DCFCE7',
  },
  statusInactive: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
  },
  statusTextActive: {
    color: '#166534',
  },
  statusTextInactive: {
    color: '#DC2626',
  },
  sectionContainer: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    margin: 6,
    width: (width - 64) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCardSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#2563EB',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  optionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#475569',
    textAlign: 'center',
  },
  optionLabelSelected: {
    color: '#FFFFFF',
  },
  customInputContainer: {
    marginTop: 16,
  },
  customInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  writeButton: {
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  writeButtonActive: {
    backgroundColor: '#3B82F6',
  },
  writeButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  writeButtonIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  writeButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  helpContainer: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  helpText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    lineHeight: 20,
    textAlign: 'center',
  },
  successOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  successCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  successIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 32,
    width: width - 64,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
  },
  modalBody: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#64748B',
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#1E293B',
    flex: 1,
    textAlign: 'right',
  },
  modalButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
});