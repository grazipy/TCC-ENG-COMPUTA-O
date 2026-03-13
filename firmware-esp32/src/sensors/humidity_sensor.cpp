#include "humidity_sensor.h"

#include <DHT.h>

namespace {
constexpr int DHT_TYPE = DHT22;
DHT* g_dht = nullptr;
}

HumiditySensor::HumiditySensor(int dhtPin) : pin_(dhtPin) {}

void HumiditySensor::begin() {
  // Inicializa o sensor DHT22 no pino configurado.
  g_dht = new DHT(pin_, DHT_TYPE);
  g_dht->begin();
}

float HumiditySensor::readHumidity() {
  if (g_dht == nullptr) {
    return NAN;
  }

  // Leitura de umidade relativa em porcentagem.
  return g_dht->readHumidity();
}

float HumiditySensor::readTemperatureCelsius() {
  if (g_dht == nullptr) {
    return NAN;
  }

  // Leitura de temperatura em graus Celsius.
  return g_dht->readTemperature();
}
