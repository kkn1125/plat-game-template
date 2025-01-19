import * as maps from "@store/maps";

export declare global {
  type Id = string;
  type MakeId<Prefix = string> = `${Prefix}-${Id}`;
  type WorldAxis = {
    worldAxisX: number;
    worldAxisY: number;
  };
  type Maps = keyof typeof maps;
}
