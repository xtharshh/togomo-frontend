import { Alert } from 'react-native';

export function showActionFeedback(title: string, message = 'Action received. This flow is ready for backend wiring.') {
  Alert.alert(title, message);
}