export function moveUnit(unit: any, x: number, y: number): any {
  return { ...unit, position: { x, y } };
}

export function selectTarget(units: any[], x: number, y: number): any | null {
  return units.find(u => u.position.x === x && u.position.y === y) || null;
}
