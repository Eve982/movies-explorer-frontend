function calculateHours(minutes) {
  const HH = Math.floor(minutes / 60);
  const MM = minutes % 60;
  return `${HH !== 0 ? `${HH}ч` : ""} ${MM}м`;
}

export default calculateHours;
