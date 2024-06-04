export const dividedInBoxxComputing = ({ divide, longBounds, latBounds }) => {
  const maxLong = longBounds[0];
  const minLong = longBounds[1];
  const maxLat = latBounds[0];
  const minLat = latBounds[1];

  const longStep = (maxLong - minLong) / divide;
  const latStep = (maxLat - minLat) / divide;

  const longIntervals = [];
  const latIntervals = [];

  for (var i = 0; i < divide; i++) {
    if (
      minLong + i * longStep > markerLocation[0] &&
      minLong + (i - 1) * longStep < markerLocation[0]
    ) {
      longIntervals.push(minLong + (i - 1) * longStep);
      longIntervals.push(minLong + i * longStep);
    }
    if (
      minLat + i * latStep > markerLocation[1] &&
      minLat + (i - 1) * latStep < markerLocation[1]
    ) {
      latIntervals.push(minLat + (i - 1) * latStep);
      latIntervals.push(minLat + i * latStep);
    }
  }
  return [longIntervals, latIntervals];
};
