#ifndef TEMPERATURE_SENSOR_H
#define TEMPERATURE_SENSOR_H

class TemperatureSensor {
 public:
  explicit TemperatureSensor(int oneWirePin);
  void begin();
  float readCelsius();

 private:
  int pin_;
};

#endif
