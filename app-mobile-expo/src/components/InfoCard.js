import { Image, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export function InfoCard({ label, value, icon }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        padding: 12,
        minWidth: 140
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon ? <Image source={{ uri: icon }} style={{ width: 18, height: 18, marginRight: 6 }} /> : null}
        <Text style={{ color: '#6b7280', fontSize: 12 }}>{label}</Text>
      </View>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: '700', marginTop: 6 }}>{value}</Text>
    </View>
  );
}
