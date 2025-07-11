// SettingsScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native';

interface SettingsScreenProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onBack: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({
  darkMode,
  toggleDarkMode,
  onBack,
}) => {
  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <TouchableOpacity onPress={onBack} style={styles.back}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={[styles.title, darkMode && styles.titleDark]}>Settings</Text>

      <View style={styles.itemRow}>
        <Text style={[styles.label, darkMode && styles.labelDark]}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: '#cbd5e1', true: '#3b82f6' }}
        />
      </View>

      <View style={styles.itemRow}>
        <Text style={[styles.label, darkMode && styles.labelDark]}>Version</Text>
        <Text style={[styles.value, darkMode && styles.labelDark]}>1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    paddingTop: 40,
  },
  containerDark: {
    backgroundColor: '#0f172a',
  },
  back: {
    paddingHorizontal: 20,
  },
  backText: {
    fontSize: 16,
    color: '#3b82f6',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    margin: 20,
    color: '#1e3a8a',
  },
  titleDark: {
    color: '#f8fafc',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomColor: '#cbd5e1',
    borderBottomWidth: 0.5,
  },
  label: {
    fontSize: 16,
    color: '#334155',
  },
  labelDark: {
    color: '#f1f5f9',
  },
  value: {
    fontSize: 16,
    color: '#64748b',
  },
});

export default SettingsScreen;
