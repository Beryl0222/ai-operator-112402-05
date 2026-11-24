import {readFileSync} from 'node:fs';
const data = JSON.parse(readFileSync(new URL('./atlas.json', import.meta.url), 'utf8'));
export function atlasSlot(level, x, y, z) {
  const R = data.levelResolution[level];
  if ([x, y, z].some(v => !Number.isInteger(v) || v < 0 || v > R)) throw new RangeError('顶点越界');
  if (level === 0) return ((z * (R + 1) + y) * (R + 1)) + x;
  return ((Math.imul(x, 73856093) ^ Math.imul(y, 19349663) ^ Math.imul(z, 83492791)) >>> 0) % data.slots[level];
}
export function atlasView(view) {
  if (data.jointViews?.[view]) return Float64Array.from(data.jointViews[view]);
  return Float64Array.from({length: 12}, (_, i) => ((Math.imul(view*37+i+data.seed, 0x61c88647) >>> 25) + .25)/128);
}
export function atlasFeature(level, slot, revision = 1) {
  return Float64Array.from({length: data.dimension}, (_, i) => 0.125 * Math.sin(29 * level + slot + i * 2 + revision));
}
