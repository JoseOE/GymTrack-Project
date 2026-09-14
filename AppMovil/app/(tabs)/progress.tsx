import { StyleSheet, View, Text } from 'react-native';

export default function ProgressScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Historial de Entrenamiento</Text>
      
      <View style={styles.card}>
        <Text style={styles.dateText}>Ayer</Text>
        <Text style={styles.routineName}>Pecho y Tríceps</Text>
        <Text style={styles.statsText}>Duración: 55 min • 12,000 kg levantados</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.dateText}>Hace 3 días</Text>
        <Text style={styles.routineName}>Pierna</Text>
        <Text style={styles.statsText}>Duración: 60 min • 15,500 kg levantados</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerText: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { padding: 15, backgroundColor: '#fff', borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#e5e7eb' },
  dateText: { fontSize: 12, color: '#3b82f6', fontWeight: 'bold', marginBottom: 5 },
  routineName: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  statsText: { fontSize: 14, color: 'gray' }
});
