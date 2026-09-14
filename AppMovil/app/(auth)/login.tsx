import { StyleSheet, View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GymTrack</Text>
      <Text style={styles.subtitle}>Inicia sesión para conectarte a tu gimnasio</Text>
      
      {/* Mock de formulario */}
      <View style={styles.formContainer}>
        <Text style={styles.mockInput}>Correo Electrónico</Text>
        <Text style={styles.mockInput}>Contraseña</Text>
      </View>

      <Button 
        title="Entrar (Simulación)" 
        onPress={() => router.replace('/(tabs)/')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: 'gray', marginBottom: 40, textAlign: 'center' },
  formContainer: { width: '100%', marginBottom: 30 },
  mockInput: { borderWidth: 1, borderColor: '#ccc', padding: 15, borderRadius: 8, marginBottom: 15, color: '#999' }
});
