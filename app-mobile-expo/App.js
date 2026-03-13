import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { AppContainer } from './src/AppContainer';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <AppContainer />
    </SafeAreaView>
  );
}
