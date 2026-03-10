#include "temperature_sensor.h"

#include <DallasTemperature.h>
#include <OneWire.h>

namespace {
OneWire* g_oneWire = nullptr;
DallasTemperature* g_dallas = nullptr;
}

TemperatureSensor::TemperatureSensor(int oneWirePin) : pin_(oneWirePin) {}

void TemperatureSensor::begin() {
  // Inicializa barramento OneWire e o driver do DS18B20.
  g_oneWire = new OneWire(pin_);
  g_dallas = new DallasTemperature(g_oneWire);
  g_dallas->begin();
}

float TemperatureSensor::readCelsius() {
  if (g_dallas == nullptr) {
    return NAN;
  }

  // Solicita leitura do DS18B20 e retorna o valor em graus Celsius.
  g_dallas->requestTemperatures();
  float value = g_dallas->getTempCByIndex(0);
  return value;
}
