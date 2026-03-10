import { ScrollView, Text, View } from 'react-native';
import { TemperatureChart } from '../components/TemperatureChart';
import { colors } from '../theme/colors';

export function ChartScreen({ readings }) {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 12, color: colors.text }}>Gráfico de Temperatura</Text>
      {readings.length ? (
        <TemperatureChart readings={readings} />
      ) : (
        <View style={{ backgroundColor: colors.card, borderRadius: 10, padding: 12 }}>
          <Text>Sem dados para exibir o gráfico.</Text>
        </View>
      )}
    </ScrollView>
  );
}
