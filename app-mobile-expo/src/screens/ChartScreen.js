import { Image, ScrollView, Text, View } from 'react-native';
import { TemperatureChart } from '../components/TemperatureChart';
import { colors } from '../theme/colors';
import { icons } from '../theme/icons';

export function ChartScreen({ readings }) {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <Image source={{ uri: icons.chart }} style={{ width: 24, height: 24, marginRight: 8 }} />
        <Text style={{ fontSize: 22, fontWeight: '700', color: colors.text }}>Gráfico de Temperatura</Text>
      </View>
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
