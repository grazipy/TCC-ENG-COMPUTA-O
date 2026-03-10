# Firmware ESP32 (Arduino)

Firmware para aquisição de dados com:
- DS18B20 (temperatura)
- DHT22 (temperatura e umidade)
- Corrente simulada (até integrar sensor físico)
- Envio HTTP POST em JSON a cada 10 segundos

## Estrutura

- `src/main.cpp`: ciclo principal de leitura e envio.
- `src/sensors/`: drivers simples para sensores.
- `src/network/http_sender.*`: conexão Wi-Fi e POST HTTP.
- `src/config/secrets.h`: credenciais e endpoint (editar antes de usar).
- `include/pins.h`: mapeamento de pinos.

## Como usar (PlatformIO)

1. Ajuste `src/config/secrets.h` com SSID, senha e URL da API.
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
