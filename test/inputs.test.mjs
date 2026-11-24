import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const d = JSON.parse(readFileSync(new URL('../inputs/session.json', import.meta.url), 'utf8'));

test("色块覆盖源像素", () => {
  assert.ok(d.tiles.every(t=>t.rgb.length===(t.bounds[2]-t.bounds[0])*(t.bounds[3]-t.bounds[1])));
});

test("屏幕接缝连续", () => {
  assert.ok(d.geometry.every(g=>g.regions[0].screen[2]===g.regions[1].screen[0]));
});

test("有效框和屏幕缝均有部分覆盖", () => {
  assert.ok(d.tiles[1].valid.some(x=>!Number.isInteger(x)) && d.geometry[1].regions[0].screen[2]%1!==0);
});
