import { useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import { DashboardScreen } from './screens/DashboardScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { ChartScreen } from './screens/ChartScreen';
import { DeviceDetailsScreen } from './screens/DeviceDetailsScreen';
import { useDeviceData } from './hooks/useDeviceData';
import { colors } from './theme/colors';
import { icons } from './theme/icons';

const DEVICE_ID = 'esp32-lab-001';

const tabs = [
  { key: 'dashboard', label: 'Dashboard', icon: icons.dashboard },
  { key: 'history', label: 'Histórico', icon: icons.history },
  { key: 'chart', label: 'Gráfico', icon: icons.chart },
  { key: 'details', label: 'Detalhes', icon: icons.details }
];

function TabButton({ active, label, icon, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        backgroundColor: active ? colors.primary : '#e5e7eb'
      }}
    >
      <Image source={{ uri: icon }} style={{ width: 18, height: 18, marginBottom: 4, opacity: active ? 1 : 0.85 }} />
      <Text style={{ color: active ? '#fff' : '#111827', fontWeight: '700', fontSize: 12 }}>{label}</Text>
    </TouchableOpacity>
  );
}

export function AppContainer() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { status, readings, loading, error, reload } = useDeviceData(DEVICE_ID);

  let content = null;

  if (loading && !readings.length) {
    content = (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 10 }}>Carregando dados...</Text>
      </View>
    );
  } else if (error) {
    content = (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Text style={{ color: colors.critical, marginBottom: 10 }}>{error}</Text>
        <TouchableOpacity onPress={reload} style={{ backgroundColor: colors.primary, padding: 10, borderRadius: 8 }}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (activeTab === 'dashboard') {
    content = <DashboardScreen statusData={status} loading={loading} onRefresh={reload} />;
  } else if (activeTab === 'history') {
    content = <HistoryScreen readings={readings} />;
  } else if (activeTab === 'chart') {
    content = <ChartScreen readings={readings} />;
  } else {
    content = <DeviceDetailsScreen deviceId={DEVICE_ID} statusData={status} readingsCount={readings.length} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1 }}>{content}</View>

      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border }}>
        {tabs.map((tab) => (
          <TabButton
            key={tab.key}
            label={tab.label}
            icon={tab.icon}
            active={activeTab === tab.key}
            onPress={() => setActiveTab(tab.key)}
          />
        ))}
      </View>
    </View>
  );
}
