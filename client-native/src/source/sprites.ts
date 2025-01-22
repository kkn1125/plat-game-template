import { mode } from '@variable/globalControl';

function getImage(path: string) {
  const src = path;
  const image = new Image();
  image.src = src;
  return image;
}
const path = mode === 'development' ? '/' : '/plat-game-template/';
console.log(path);
export const CharacterSprites = getImage(`${path}sprites/character.png`);
export const PortalSprites = getImage(`${path}sprites/portal/basic.png`);

export const MapSprites = getImage(`${path}sprites/tileset.png`);
export const MapSprites2 = getImage(`${path}sprites/tileset2.png`);
export const ObjectSprites = getImage(`${path}sprites/object.png`);
