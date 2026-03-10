import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { InfoCard } from '../components/InfoCard';
import { StatusBadge } from '../components/StatusBadge';
import { colors } from '../theme/colors';

export function DashboardScreen({ statusData, loading, onRefresh }) {
  const latest = statusData?.last_reading;

  return (
    <ScrollView
      contentContainerStyle={{ padding: 16 }}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
    >
      <View style={{ marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: colors.text }}>Dashboard</Text>
        <StatusBadge status={statusData?.status || 'normal'} />
      </View>

      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <View style={{ flex: 1, marginRight: 5 }}>
          <InfoCard label="Temperatura" value={latest ? `${latest.temperature.toFixed(1)} °C` : '--'} />
        </View>
        <View style={{ flex: 1, marginLeft: 5 }}>
          <InfoCard label="Umidade" value={latest ? `${latest.humidity.toFixed(1)} %` : '--'} />
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <View style={{ flex: 1, marginRight: 5 }}>
          <InfoCard label="Corrente" value={latest ? `${latest.current.toFixed(1)} A` : '--'} />
        </View>
        <View style={{ flex: 1, marginLeft: 5 }}>
          <InfoCard label="Última leitura" value={latest ? new Date(latest.created_at).toLocaleTimeString() : '--'} />
        </View>
      </View>

      <TouchableOpacity
        onPress={onRefresh}
        style={{ backgroundColor: colors.primary, padding: 12, borderRadius: 10, alignSelf: 'flex-start' }}
      >
        <Text style={{ color: '#fff', fontWeight: '600' }}>Atualizar dados</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
