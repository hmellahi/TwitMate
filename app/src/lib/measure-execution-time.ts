const getFormattedTime = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const milliseconds = timestamp % 1000;
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export async function measureExecutionTime(callback: Function) {
  const startTime = performance.now();
  console.log(`Before calling ${callback.name} at ${getFormattedTime(startTime)}`);
  const result = await callback();
  const endTime = performance.now();
  console.log(`After calling ${callback.name} at ${getFormattedTime(endTime)}`);
  console.log(`${callback.name} took ${endTime - startTime} milliseconds`);
  return result;
}
