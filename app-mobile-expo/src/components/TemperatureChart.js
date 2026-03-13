import { Text, View } from 'react-native';
import { colors } from '../theme/colors';

export function TemperatureChart({ readings }) {
  const ordered = [...readings].reverse().slice(-10);
  const max = Math.max(...ordered.map((r) => r.temperature), 1);

  return (
    <View style={{ backgroundColor: colors.card, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: colors.border }}>
      <Text style={{ fontWeight: '700', marginBottom: 8, color: colors.text }}>Gráfico de Temperatura (10 amostras)</Text>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 140 }}>
        {ordered.map((item, idx) => {
          const height = Math.max((item.temperature / max) * 110, 4);
          return (
            <View
              key={`${item.created_at}-${idx}`}
              style={{ alignItems: 'center', flex: 1, marginRight: idx === ordered.length - 1 ? 0 : 6 }}
            >
              <View style={{ width: 16, height, backgroundColor: colors.primary, borderRadius: 4 }} />
              <Text style={{ fontSize: 10, marginTop: 4 }}>{item.temperature.toFixed(0)}°</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
