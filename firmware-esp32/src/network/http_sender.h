#ifndef HTTP_SENDER_H
#define HTTP_SENDER_H

#include <Arduino.h>

struct TelemetryPayload {
  String deviceId;
  float ds18b20TemperatureC;
  float dht22TemperatureC;
  float dht22HumidityPct;
  float simulatedCurrentA;
  unsigned long uptimeMs;
};

class HttpSender {
 public:
  HttpSender(const char* ssid, const char* password, const char* endpoint);

  void begin();
  bool postTelemetry(const TelemetryPayload& payload);

 private:
  const char* ssid_;
  const char* password_;
  const char* endpoint_;

  bool ensureWifiConnected();
  String buildJson(const TelemetryPayload& payload) const;
};

#endif
