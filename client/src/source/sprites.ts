import { path } from "@variable/variable";

function getImage(path: string) {
  const src = path;
  const image = new Image();
  image.src = src;
  return image;
}
// console.log(path);
export const CharacterSprites = getImage(`${path}sprites/character.png`);
export const PortalSprites = getImage(`${path}sprites/portal/basic.png`);

export const MapSprites = getImage(`${path}sprites/tileset.png`);
export const MapSprites2 = getImage(`${path}sprites/tileset2.png`);
export const MapSprites3 = getImage(`${path}sprites/tileset3.png`);
export const DecorateSprites = getImage(`${path}sprites/decorate.png`);
export const ObjectSprites = getImage(`${path}sprites/object.png`);
export const OpacityObjectSprites = getImage(
  `${path}sprites/object-opacity.png`
);

export const SlimeSprite = getImage(`${path}sprites/monster/slime-front.png`);
