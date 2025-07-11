
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// export default function ProfileScreen() {
//   const [worker, setWorker] = useState({
//     name: 'Suryansh Pratap Singh',
//     id: 'W12345',
//     role: 'Return Handler',
//   });

//   const [imageUri, setImageUri] = useState<string | null>(null);

//   const pickImage = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission Denied', 'Camera roll permissions are required.');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled && result.assets?.length) {
//       setImageUri(result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <TouchableOpacity onPress={pickImage}>
//           <Image
//             source={{
//               uri: imageUri || 'https://img.icons8.com/fluency/96/worker-male.png',
//             }}
//             style={styles.avatar}
//           />
//           <Text style={styles.changeImageText}>📸 Tap to change photo</Text>
//         </TouchableOpacity>

//         <Text style={styles.title}>👤 Worker Profile</Text>

//         <View style={styles.detailRow}>
//           <Text style={styles.label}>Name:</Text>
//           <Text style={styles.value}>{worker.name}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.label}>Worker ID:</Text>
//           <Text style={styles.value}>{worker.id}</Text>
//         </View>
//         <View style={styles.detailRow}>
//           <Text style={styles.label}>Role:</Text>
//           <Text style={styles.value}>{worker.role}</Text>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9fafb',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   card: {
//     width: '100%',
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     padding: 24,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     alignItems: 'center',
//     borderLeftWidth: 6,
//     borderLeftColor: '#ffc220',
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     marginBottom: 10,
//     borderRadius: 50,
//     borderWidth: 2,
//     borderColor: '#0071ce',
//   },
//   changeImageText: {
//     fontSize: 13,
//     color: '#64748b',
//     marginBottom: 12,
//     textAlign: 'center',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#0071ce',
//     marginBottom: 20,
//   },
//   detailRow: {
//     width: '100%',
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   label: {
//     flex: 1,
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#0f172a',
//   },
//   value: {
//     flex: 2,
//     fontSize: 16,
//     color: '#475569',
//   },
// });
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, database, ref, get } from '@/hooks/firebaseConfig'; // ✅ your custom Firebase config path

export default function ProfileScreen() {
  const [worker, setWorker] = useState<{
    name: string;
    id: string;
    role: string;
  } | null>(null);

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert('User not logged in');
        return;
      }

      try {
        const snapshot = await get(ref(database, `users/${user.uid}`));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setWorker({
            name: data.name || 'Unknown',
            id: data.uid || 'N/A',
            role: data.role || 'N/A',
          });
        } else {
          Alert.alert('No user data found');
        }
      } catch (error) {
        Alert.alert('Failed to fetch user data', (error as any).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera roll permissions are required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length) {
      setImageUri(result.assets[0].uri);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0071ce" />
      </View>
    );
  }

  if (!worker) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#ef4444' }}>Unable to load profile data.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{
              uri: imageUri || 'https://img.icons8.com/fluency/96/worker-male.png',
            }}
            style={styles.avatar}
          />
          <Text style={styles.changeImageText}>📸 Tap to change photo</Text>
        </TouchableOpacity>

        <Text style={styles.title}>👤 Worker Profile</Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{worker.name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Worker ID:</Text>
          <Text style={styles.value}>{worker.id}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Role:</Text>
          <Text style={styles.value}>{worker.role}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    alignItems: 'center',
    borderLeftWidth: 6,
    borderLeftColor: '#ffc220',
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#0071ce',
  },
  changeImageText: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 12,
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0071ce',
    marginBottom: 20,
  },
  detailRow: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: '#475569',
  },
});
