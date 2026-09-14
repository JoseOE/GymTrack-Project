import { StyleSheet, View, Text, Button } from 'react-native';

export default function WorkoutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sesión Activa</Text>
      <Text style={styles.subtitle}>Ningún entrenamiento en curso</Text>
      
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>Ve a la pestaña de "Rutinas" para comenzar un entrenamiento.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: 'gray', marginTop: 5, marginBottom: 30 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: 'gray', textAlign: 'center', paddingHorizontal: 40 }
});
