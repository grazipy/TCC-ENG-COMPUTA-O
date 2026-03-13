import { Image, Text, View } from 'react-native';
import { StatusBadge } from '../components/StatusBadge';
import { colors } from '../theme/colors';
import { icons } from '../theme/icons';

export function DeviceDetailsScreen({ deviceId, statusData, readingsCount }) {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <Image source={{ uri: icons.device }} style={{ width: 24, height: 24, marginRight: 8 }} />
        <Text style={{ fontSize: 22, fontWeight: '700', color: colors.text }}>Detalhes do Dispositivo</Text>
      </View>

      <View style={{ backgroundColor: colors.card, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 12 }}>
        <Text style={{ marginBottom: 8 }}>
          <Text style={{ fontWeight: '700' }}>Device ID:</Text> {deviceId}
        </Text>
        <Text style={{ marginBottom: 8 }}>
          <Text style={{ fontWeight: '700' }}>Leituras carregadas:</Text> {readingsCount}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontWeight: '700', marginRight: 8 }}>Status atual:</Text>
          <StatusBadge status={statusData?.status || 'normal'} />
        </View>
      </View>
    </View>
  );
}
