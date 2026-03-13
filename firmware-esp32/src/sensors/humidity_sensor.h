#ifndef HUMIDITY_SENSOR_H
#define HUMIDITY_SENSOR_H

class HumiditySensor {
 public:
  explicit HumiditySensor(int dhtPin);
  void begin();
  float readHumidity();
  float readTemperatureCelsius();

 private:
  int pin_;
};

#endif
