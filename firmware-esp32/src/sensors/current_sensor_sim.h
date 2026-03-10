#ifndef CURRENT_SENSOR_SIM_H
#define CURRENT_SENSOR_SIM_H

class CurrentSensorSim {
 public:
  void begin();
  float readAmperes();

 private:
  float baseCurrentA_ = 42.0F;
};

#endif
