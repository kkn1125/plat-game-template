function getImage(path: string) {
  const src = import.meta.resolve(path);
  const image = new Image();
  image.src = src;
  return image;
}

export const CharacterSprites = getImage('/sprites/character.png');

export const MapSprites = getImage('/sprites/tileset.png');
export const MapSprites2 = getImage('/sprites/tileset2.png');