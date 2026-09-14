import { StyleSheet, View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.membershipCard}>
        <Text style={styles.cardTitle}>Tu Membresía</Text>
        <Text style={styles.statusActive}>Vigente</Text>
        <Text style={styles.cardSubtitle}>Gimnasio: GymTrack Centro</Text>
      </View>
      
      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Entrenamiento de hoy</Text>
        <Text style={styles.cardSubtitle}>Pecho y Tríceps</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  membershipCard: { padding: 20, backgroundColor: '#f0fdf4', borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#bbf7d0' },
  infoCard: { padding: 20, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  cardSubtitle: { fontSize: 14, color: 'gray', marginTop: 5 },
  statusActive: { fontSize: 16, color: '#16a34a', fontWeight: 'bold', marginTop: 5 }
});
