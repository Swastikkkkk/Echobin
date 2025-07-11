import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform,
  Linking,
  ScrollView,
  Modal,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const { width } = Dimensions.get('window');
const locations = ['Delhi', 'Gurgaon', 'Noida','Chennai', 'Mumbai', 'Hyderabad'];

export default function TaskListScreen() {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  const initialTasks = [
    { id: 'SKU007', name: 'Bluetooth Speaker', bin: 'EchoBin #A12' },
    { id: 'SKU008', name: 'Shirt - Large', bin: 'EchoBin #B01' },
    { id: 'SKU009', name: 'Power Bank', bin: 'EchoBin #C04' },
    { id: 'SKU010', name: 'Wireless Mouse', bin: 'EchoBin #D02' },
    { id: 'SKU011', name: 'Charger', bin: 'EchoBin #C04' },
    { id: 'SKU012', name: 'USB-C Cable', bin: 'EchoBin #D02' },
  ];

  const [pendingTasks, setPendingTasks] = useState<any[]>([]);
  const [doneTasks, setDoneTasks] = useState<any[]>([]);
  const [showPending, setShowPending] = useState(true);
  const [showDone, setShowDone] = useState(true);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showActionModal, setShowActionModal] = useState(false);

  useEffect(() => {
    const loadTaskStates = async () => {
      const doneIds = JSON.parse((await AsyncStorage.getItem('doneTasks')) || '[]');
      const done = initialTasks
        .filter((task) => doneIds.includes(task.id))
        .map((task) => ({ ...task, location: getRandomLocation() }));
      const pending = initialTasks
        .filter((task) => !doneIds.includes(task.id))
        .map((task) => ({ ...task, location: getRandomLocation() }));
      setDoneTasks(done);
      setPendingTasks(pending);
    };

    if (isFocused) loadTaskStates();
  }, [isFocused]);

  const getRandomLocation = () => {
    const i = Math.floor(Math.random() * locations.length);
    return locations[i];
  };

  const markTaskDone = async (taskId: string) => {
    const updatedDone = [...doneTasks.map((t) => t.id), taskId];
    await AsyncStorage.setItem('doneTasks', JSON.stringify(updatedDone));
  };

  const handleTaskPress = (task: any) => {
    setSelectedTask(task);
    setShowActionModal(true);
  };

  const handleScanTag = async () => {
    if (selectedTask) {
      await markTaskDone(selectedTask.id);
      LayoutAnimation.easeInEaseOut();
      setPendingTasks((prev) => prev.filter((t) => t.id !== selectedTask.id));
      setDoneTasks((prev) => [...prev, selectedTask]);
      setShowActionModal(false);
      navigation.navigate('Scan Tag', { task: selectedTask });
    }
  };

  const handleViewLocation = () => {
    if (selectedTask) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedTask.location)}`;
      Linking.openURL(url);
      setShowActionModal(false);
    }
  };

  const closeModal = () => {
    setShowActionModal(false);
    setSelectedTask(null);
  };

  const toggleSection = (section: 'pending' | 'done') => {
    LayoutAnimation.easeInEaseOut();
    if (section === 'pending') {
      setShowPending(!showPending);
    } else {
      setShowDone(!showDone);
    }
  };

  const getStatusColor = (isDone: boolean) => {
    return isDone ? '#10B981' : '#F59E0B';
  };

  const renderTaskCard = (item: any, isDone: boolean = false) => (
    <Animatable.View
      key={item.id}
      animation="fadeInUp"
      duration={600}
      delay={pendingTasks.indexOf(item) * 100}
    >
      <TouchableOpacity
        style={[styles.taskCard, isDone && styles.taskCardDone]}
        onPress={() => !isDone && handleTaskPress(item)}
        activeOpacity={isDone ? 1 : 0.7}
        disabled={isDone}
      >
        <View style={styles.taskHeader}>
          <View style={styles.taskTitleRow}>
            <Text style={styles.taskTitle}>{item.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(isDone) }]}>
              <Text style={styles.statusText}>
                {isDone ? '✓ Done' : '⏳ Pending'}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.taskDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>🏷️</Text>
            <Text style={styles.detailLabel}>Item ID:</Text>
            <Text style={styles.detailValue}>{item.id}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📦</Text>
            <Text style={styles.detailLabel}>Drop to:</Text>
            <Text style={styles.detailValue}>{item.bin}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📍</Text>
            <Text style={styles.detailLabel}>Pickup from:</Text>
            <Text style={styles.detailValue}>{item.location}</Text>
          </View>
        </View>
        
        {!isDone && (
          <View style={styles.actionHint}>
            <Text style={styles.actionHintText}>Tap to view actions</Text>
            <Text style={styles.actionHintIcon}>👆</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animatable.View>
  );

  const renderSectionHeader = (title: string, count: number, isExpanded: boolean, onToggle: () => void) => (
    <TouchableOpacity
      style={styles.sectionHeader}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      <View style={styles.sectionHeaderContent}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionMeta}>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{count}</Text>
          </View>
          <Text style={[styles.expandIcon, { transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }]}>
            ⌄
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.mainTitle}>EchoBin</Text>
          <Text style={styles.subtitle}>Assigned Returns</Text>
          <View style={styles.summaryCards}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryNumber}>{pendingTasks.length}</Text>
              <Text style={styles.summaryLabel}>Pending</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryNumber}>{doneTasks.length}</Text>
              <Text style={styles.summaryLabel}>Completed</Text>
            </View>
          </View>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Pending Tasks Section */}
          {renderSectionHeader('⏳ Pending Tasks', pendingTasks.length, showPending, () => toggleSection('pending'))}
          {showPending && (
            <View style={styles.tasksContainer}>
              {pendingTasks.length > 0 ? (
                pendingTasks.map((task) => renderTaskCard(task, false))
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyIcon}>🎉</Text>
                  <Text style={styles.emptyTitle}>All done!</Text>
                  <Text style={styles.emptyMessage}>No pending tasks at the moment</Text>
                </View>
              )}
            </View>
          )}

          {/* Completed Tasks Section */}
          {renderSectionHeader('✅ Completed Tasks', doneTasks.length, showDone, () => toggleSection('done'))}
          {showDone && (
            <View style={styles.tasksContainer}>
              {doneTasks.length > 0 ? (
                doneTasks.map((task) => renderTaskCard(task, true))
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyIcon}>📋</Text>
                  <Text style={styles.emptyTitle}>No completed tasks</Text>
                  <Text style={styles.emptyMessage}>Completed tasks will appear here</Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>

        {/* Custom Action Modal */}
        <Modal
          visible={showActionModal}
          transparent
          animationType="fade"
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <Animatable.View 
              animation="zoomIn" 
              duration={300}
              style={styles.actionModal}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedTask?.name}</Text>
                <Text style={styles.modalSubtitle}>Choose an action</Text>
              </View>

              <View style={styles.taskPreview}>
                <View style={styles.previewRow}>
                  <Text style={styles.previewLabel}>Item ID:</Text>
                  <Text style={styles.previewValue}>{selectedTask?.id}</Text>
                </View>
                <View style={styles.previewRow}>
                  <Text style={styles.previewLabel}>Location:</Text>
                  <Text style={styles.previewValue}>{selectedTask?.location}</Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.locationButton]}
                  onPress={handleViewLocation}
                  activeOpacity={0.8}
                >
                  <Text style={styles.actionButtonIcon}>📍</Text>
                  <Text style={styles.actionButtonText}>View Location</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.scanButton]}
                  onPress={handleScanTag}
                  activeOpacity={0.8}
                >
                  <Text style={styles.actionButtonIcon}>📱</Text>
                  <Text style={styles.actionButtonText}>Scan NFC Tag</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeModal}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
  },
  mainTitle: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 20,
  },
  summaryCards: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryCard: {
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    minWidth: 100,
  },
  summaryNumber: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#64748B',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
  },
  sectionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countBadge: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 12,
  },
  countText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  expandIcon: {
    fontSize: 16,
    color: '#64748B',
    fontFamily: 'Poppins-Medium',
  },
  tasksContainer: {
    marginBottom: 24,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  taskCardDone: {
    borderLeftColor: '#10B981',
    opacity: 0.8,
  },
  taskHeader: {
    marginBottom: 16,
  },
  taskTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  taskTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 11,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  taskDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 8,
    width: 20,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#64748B',
    width: 80,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#1E293B',
    flex: 1,
  },
  actionHint: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  actionHintText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#94A3B8',
    marginRight: 6,
  },
  actionHintIcon: {
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: 8,
  },
  emptyMessage: {
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
    padding: 20,
  },
  actionModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: width - 40,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
  },
  taskPreview: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  previewLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#64748B',
  },
  previewValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#1E293B',
  },
  actionButtons: {
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  locationButton: {
    backgroundColor: '#10B981',
  },
  scanButton: {
    backgroundColor: '#3B82F6',
  },
  actionButtonIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  cancelButton: {
    alignItems: 'center',
    padding: 16,
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#64748B',
  },
});