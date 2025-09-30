let sensors = [];

export function addSensor(data) {
  if (!data || !data.name || !data.type) {
    console.log('Missing required sensor fields');
    throw new Error('Missing required sensor fields');
  }
  const sensor = {
    id: sensors.length + 1,
    name: data.name,
    type: data.type,
    createdAt: new Date().toISOString()
  };
  sensors.push(sensor);
  console.log('Sensor added:', sensor);
  return sensor;
}

export function resetSensors() {
  sensors = [];
}
