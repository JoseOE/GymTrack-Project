import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

import { registerPushToken, type Account } from './api';

// Dos capas de aviso, porque hacen falta las dos:
//
// 1. LOCALES (programadas en el teléfono): el recordatorio de "te quedan 5 días
//    para pagar". Funcionan en Expo Go, sin development build, porque la fecha
//    de corte ya la conoce la app.
// 2. REMOTAS (push desde el servidor): "te aceptaron en el gimnasio", que la app
//    no puede predecir. Desde el SDK 53 estas exigen un development build;
//    en Expo Go el registro falla en silencio y la app sigue funcionando igual.

const CANAL_ANDROID = 'gymtrack-avisos';
const ID_RECORDATORIO = 'recordatorio-pago';
const DIAS_DE_AVISO = 5;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function pedirPermiso(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CANAL_ANDROID, {
      name: 'Avisos de GymTrack',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const actual = await Notifications.getPermissionsAsync();
  if (actual.granted) return true;
  if (!actual.canAskAgain) return false;

  const pedido = await Notifications.requestPermissionsAsync({
    ios: { allowAlert: true, allowBadge: true, allowSound: true },
  });
  return pedido.granted;
}

// Registra el token de este teléfono en el servidor para los avisos remotos.
// En Expo Go o en simulador esto no puede funcionar: se ignora sin romper nada.
export async function registrarParaPushRemoto(userId: string): Promise<boolean> {
  if (!Device.isDevice) return false;
  try {
    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
    const token = await Notifications.getExpoPushTokenAsync(projectId ? { projectId } : undefined);
    await registerPushToken(userId, token.data);
    return true;
  } catch {
    // Falta el development build, o no hay projectId de EAS todavía.
    return false;
  }
}

// Reprograma el recordatorio local de pago a partir de la fecha de corte vigente.
// Se llama cada vez que cambia la cuenta, así que siempre refleja el último pago.
export async function reprogramarRecordatorioDePago(account: Account | null) {
  await Notifications.cancelScheduledNotificationAsync(ID_RECORDATORIO).catch(() => {});

  if (!account?.fechaProximoPago || account.membershipStatus !== 'active') return;

  // El aviso sale 5 días antes del corte, a las 10 de la mañana.
  const corte = new Date(account.fechaProximoPago + 'T10:00:00');
  const aviso = new Date(corte);
  aviso.setDate(aviso.getDate() - DIAS_DE_AVISO);
  if (aviso.getTime() <= Date.now()) return;

  const nombreGym = account.gym?.nombre ?? 'tu gimnasio';
  await Notifications.scheduleNotificationAsync({
    identifier: ID_RECORDATORIO,
    content: {
      title: 'Tienes 5 días para pagar',
      body: `Tu mensualidad en ${nombreGym} vence el ${formatearFecha(account.fechaProximoPago)}.`,
      data: { tipo: 'recordatorio_pago' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: aviso,
    },
  });
}

export async function cancelarRecordatorios() {
  await Notifications.cancelAllScheduledNotificationsAsync().catch(() => {});
}

function formatearFecha(iso: string): string {
  const [anio, mes, dia] = iso.split('-').map(Number);
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return `${dia} de ${meses[mes - 1]}`;
}
