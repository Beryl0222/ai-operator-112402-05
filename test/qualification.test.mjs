import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

const qualification = JSON.parse(readFileSync(new URL('../inputs/qualification.json', import.meta.url), 'utf8'));

const { line } = await import('../inputs/qualification.mjs');
test('倾斜源片、同优先级覆盖以及独立两种显示网格均有足够输入', () => {
  const { scopes, profiles, priority } = qualification;
  assert.ok(profiles.g1.narrow[1] && profiles.g1.narrow[2]);
  assert.notDeepEqual(profiles.g1.narrow, profiles.g2.narrow);
  assert.equal(priority.narrow, priority.depth);
  assert.ok(priority.wide < priority.narrow);
  assert.equal(scopes.cover[0], scopes.preview[0]);
  assert.notEqual(scopes.cover[1], scopes.preview[1]);
  assert.equal(line(qualification, 'narrow', 210).length, 640 * 3);
  assert.notDeepEqual(line(qualification, 'narrow', 209), line(qualification, 'narrow', 210));
  assert.ok(line(qualification, 'wide', 0).byteLength * qualification.shapes.wide[0] > qualification.maxWorkBytes);
});
