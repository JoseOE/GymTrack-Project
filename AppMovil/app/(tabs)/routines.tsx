import { StyleSheet, View, Text } from 'react-native';

export default function RoutinesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Rutinas de tu Gimnasio</Text>
      <Text style={styles.subText}>Aquí aparecerán las rutinas creadas por tu entrenador en la plataforma web.</Text>
      
      <View style={styles.card}>
        <Text style={styles.routineName}>Rutina de Hipertrofia (Ejemplo)</Text>
        <Text style={styles.routineMeta}>6 ejercicios • 45 min</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.routineName}>Cardio Intensivo (Ejemplo)</Text>
        <Text style={styles.routineMeta}>3 ejercicios • 30 min</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerText: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subText: { fontSize: 14, color: 'gray', marginBottom: 20 },
  card: { padding: 20, backgroundColor: '#fff', borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#e5e7eb' },
  routineName: { fontSize: 16, fontWeight: 'bold' },
  routineMeta: { fontSize: 14, color: 'gray', marginTop: 5 }
});
