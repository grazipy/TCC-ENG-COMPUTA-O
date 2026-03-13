import { Text, View } from 'react-native';
import { colors } from '../theme/colors';

const mapColor = {
  normal: colors.normal,
  atenção: colors.attention,
  crítico: colors.critical
};

export function StatusBadge({ status }) {
  const tone = mapColor[status] || colors.primary;
  return (
    <View style={{ backgroundColor: tone, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }}>
      <Text style={{ color: '#fff', fontWeight: '700' }}>{status || 'desconhecido'}</Text>
    </View>
  );
}
