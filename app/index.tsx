import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Echo Bin Walmart</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="Go to Dashboard" 
          onPress={() => router.push('/dashboard')} 
        />
        <Button 
          title="Login" 
          onPress={() => router.push('/login')} 
        />
        <Button 
          title="Profile" 
          onPress={() => router.push('/profile')} 
        />
        <Button 
          title="Reports" 
          onPress={() => router.push('/reports')} 
        />
        <Button 
          title="Scan" 
          onPress={() => router.push('/scan')} 
        />
        <Button 
          title="Tasks" 
          onPress={() => router.push('/tasks')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 10,
    width: '100%',
    maxWidth: 300,
  },
});
