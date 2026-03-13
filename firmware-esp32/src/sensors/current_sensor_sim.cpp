#include "current_sensor_sim.h"

#include <Arduino.h>
#include <esp_system.h>

void CurrentSensorSim::begin() {
  // Inicialização simples do gerador de valores pseudoaleatórios.
  randomSeed(esp_random());
}

float CurrentSensorSim::readAmperes() {
  // Simula variação de corrente em torno de uma base,
  // útil enquanto o sensor físico ainda não está conectado.
  float noise = static_cast<float>(random(-30, 31)) / 10.0F;  // -3.0 a +3.0A
  return baseCurrentA_ + noise;
}
