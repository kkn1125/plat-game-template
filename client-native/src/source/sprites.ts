function getImage(path: string) {
  const src = path;
  const image = new Image();
  image.src = src;
  return image;
}

export const CharacterSprites = getImage('/sprites/character.png');
export const PortalSprites = getImage('/sprites/portal/basic.png');

export const MapSprites = getImage('/sprites/tileset.png');
export const MapSprites2 = getImage('/sprites/tileset2.png');