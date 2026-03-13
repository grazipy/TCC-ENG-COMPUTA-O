const API_BASE_URL = 'http://localhost:3000';

async function request(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }
  return response.json();
}

export async function fetchDeviceStatus(deviceId) {
  return request(`/devices/${deviceId}/status`);
}

export async function fetchDeviceReadings(deviceId, limit = 30) {
  return request(`/devices/${deviceId}/readings?limit=${limit}`);
}
