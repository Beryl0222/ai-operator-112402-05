import {readFileSync} from 'node:fs';
import * as input from './inputs/atlas.mjs';

const source=JSON.parse(readFileSync(new URL('./inputs/atlas.json',import.meta.url),'utf8'));
console.log(JSON.stringify({名称:'分层空间网格和纹理视窗',首项:source['levelResolution'],字段:Object.keys(source),取数函数:Object.keys(input)},null,2));
