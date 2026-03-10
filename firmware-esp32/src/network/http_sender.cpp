#include "http_sender.h"

#include <HTTPClient.h>
#include <WiFi.h>

HttpSender::HttpSender(const char* ssid, const char* password, const char* endpoint)
    : ssid_(ssid), password_(password), endpoint_(endpoint) {}

void HttpSender::begin() {
  // Inicia conexão Wi-Fi no boot.
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid_, password_);
}

bool HttpSender::ensureWifiConnected() {
  if (WiFi.status() == WL_CONNECTED) {
    return true;
  }

  // Tenta reconectar em caso de queda de rede.
  WiFi.disconnect();
  WiFi.begin(ssid_, password_);

  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 10000) {
    delay(250);
  }

  return WiFi.status() == WL_CONNECTED;
}

bool HttpSender::postTelemetry(const TelemetryPayload& payload) {
  if (!ensureWifiConnected()) {
    Serial.println("[HTTP] Wi-Fi indisponível.");
    return false;
  }

  HTTPClient client;
  client.begin(endpoint_);
  client.addHeader("Content-Type", "application/json");

  String json = buildJson(payload);
  int code = client.POST(json);

  if (code > 0) {
    Serial.printf("[HTTP] POST enviado. Status: %d\n", code);
  } else {
    Serial.printf("[HTTP] Falha no POST. Erro: %s\n", client.errorToString(code).c_str());
  }

  client.end();
  return code > 0 && code < 300;
}

String HttpSender::buildJson(const TelemetryPayload& payload) const {
  // JSON montado manualmente para reduzir dependências no firmware.
  String json = "{";
  json += "\"deviceId\":\"" + payload.deviceId + "\",";
  json += "\"uptimeMs\":" + String(payload.uptimeMs) + ",";
  json += "\"temperatureDs18b20C\":" + String(payload.ds18b20TemperatureC, 2) + ",";
  json += "\"temperatureDht22C\":" + String(payload.dht22TemperatureC, 2) + ",";
  json += "\"humidityDht22Pct\":" + String(payload.dht22HumidityPct, 2) + ",";
  json += "\"currentSimulatedA\":" + String(payload.simulatedCurrentA, 2);
  json += "}";

  return json;
}
