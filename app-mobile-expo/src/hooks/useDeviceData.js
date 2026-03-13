import { useCallback, useEffect, useState } from 'react';
import { fetchDeviceReadings, fetchDeviceStatus } from '../services/api';

export function useDeviceData(deviceId) {
  const [status, setStatus] = useState(null);
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [statusData, readingsData] = await Promise.all([
        fetchDeviceStatus(deviceId),
        fetchDeviceReadings(deviceId)
      ]);
      setStatus(statusData);
      setReadings(readingsData.readings || []);
    } catch (err) {
      setError(err.message || 'Falha ao buscar dados da API.');
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { status, readings, loading, error, reload: loadData };
}
