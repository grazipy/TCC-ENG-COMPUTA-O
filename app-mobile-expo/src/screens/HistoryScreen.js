import { FlatList, Text, View } from 'react-native';
import { colors } from '../theme/colors';

function Row({ item }) {
  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        padding: 10,
        marginBottom: 8
      }}
    >
      <Text style={{ fontWeight: '700', color: colors.text }}>{new Date(item.created_at).toLocaleString()}</Text>
      <Text>T: {item.temperature.toFixed(1)}°C | U: {item.humidity.toFixed(1)}% | I: {item.current.toFixed(1)}A</Text>
    </View>
  );
}

export function HistoryScreen({ readings }) {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 12, color: colors.text }}>Histórico de Leituras</Text>
      <FlatList
        data={readings}
        keyExtractor={(item, idx) => `${item.created_at}-${idx}`}
        renderItem={({ item }) => <Row item={item} />}
        ListEmptyComponent={<Text>Nenhuma leitura disponível.</Text>}
      />
    </View>
  );
}
