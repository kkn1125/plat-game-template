import * as maps from '@store/maps';

export declare global {
  type Id = string;
  type MakeId<Prefix = string> = `${Prefix}-${Id}`;
  type WorldAxis = {
    worldAxisX: number;
    worldAxisY: number;
  };
  type XY = {
    x: number;
    y: number;
  };
  type Maps = keyof typeof maps;
  type Gaze = 'top' | 'left' | 'right' | 'bottom';
  type HealthOption = {
    hp?: number;
    mp?: number;
  };
}
