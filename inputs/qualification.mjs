export function line(input, camera, row) {
  const width = input.shapes[camera][1];
  return Float32Array.from({ length: width * 3 }, (_, i) => {
    const source = i + row * width + camera.charCodeAt(0) + input.seed;
    const grain = ((Math.imul(source, 49979687) >>> 17) % 39) / 64;
    return grain + ((row >> 2) % 3) / 32;
  });
}
