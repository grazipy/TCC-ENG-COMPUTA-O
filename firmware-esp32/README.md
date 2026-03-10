# Firmware ESP32 (Arduino)

Firmware para aquisição de dados com:
- DS18B20 (temperatura)
- DHT22 (temperatura e umidade)
- Corrente simulada (até integrar sensor físico)
- Envio HTTP POST em JSON a cada 10 segundos

## Estrutura (base + evolução)

- `src/main.cpp`: ciclo principal de leitura e envio.
- `src/config/`:
  - `wifi_config.h`
  - `device_config.h`
  - `thresholds.h`
- `src/sensors/`: drivers atuais + subpastas de expansão por sensor.
- `src/processing/`: espaço para detecção de anomalia e classificador de status.
- `src/comm/`: espaço para módulos de Wi-Fi, HTTP, MQTT e payloads.
- `src/storage/`: espaço para preferences e buffer offline.

## Como usar (PlatformIO)

1. Ajuste `src/config/wifi_config.h` e `src/config/device_config.h`.
2. Conecte sensores nos pinos definidos em `include/pins.h`.
3. Compile e grave:

```bash
pio run
pio run -t upload
pio device monitor
```

## Exemplo de payload enviado

```json
{
  "deviceId": "esp32-lab-001",
  "uptimeMs": 10000,
  "temperatureDs18b20C": 31.25,
  "temperatureDht22C": 30.90,
  "humidityDht22Pct": 58.40,
  "currentSimulatedA": 41.70
}
```
