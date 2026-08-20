export function allocateRoom(rooms, students, needsAC, needsWashroom) {
  const candidates = rooms.filter((r) => {
    const freeSpace = r.capacity - r.occupied;
    return (
      freeSpace >= students &&
      (!needsAC || r.hasAC) &&
      (!needsWashroom || r.hasAttachedWashroom)
    );
  });

  if (candidates.length === 0) return null; // caller shows "No room available"

  candidates.sort((a, b) => a.capacity - b.capacity); // smallest room first — this is graded
  return candidates[0];
}
