import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import { atlasSlot, atlasView, atlasFeature } from '../inputs/atlas.mjs';

const data=JSON.parse(readFileSync(new URL('../inputs/atlas.json',import.meta.url),'utf8'));
test('分层空间网格和纹理视窗的格式与关联', () => {
  const R=data.levelResolution[3], slots=data.slots[3], index=new Map();
  let hit=false;
  for(let x=0;x<=R;x++){
    for(let y=0;y<10;y++){
      const k=atlasSlot(3,x,y,0); assert.ok(k>=0&&k<slots);
      if(index.has(k)&&Math.abs(index.get(k)-x)>2) hit=true;
      index.set(k,x);
    }
  }
  assert.ok(hit);
  assert.equal(atlasView(6).length,12);
  assert.ok(data.updateFetchLimit<data.views);
  assert.ok(data.unpublished.every(([l,...xyz])=>xyz.every(k=>k<=data.levelResolution[l])));
  assert.deepEqual(Array.from(atlasView(7).slice(0,3)),Array.from(atlasView(88).slice(0,3)));
  assert.notDeepEqual(atlasFeature(3,atlasSlot(3,31,5,6),1),atlasFeature(3,atlasSlot(3,31,5,6),2));
  assert.equal(atlasSlot(3,31,5,6),atlasSlot(3,50,25,57));
  assert.notDeepEqual(atlasView(7).slice(0,3),atlasView(605).slice(0,3));
});
