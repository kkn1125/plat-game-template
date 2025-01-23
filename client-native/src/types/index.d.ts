import MAP_CONF from '@config/map/map.conf';
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
  type Maps = (typeof maps)[keyof typeof maps]['name'];
  type Gaze = 'top' | 'left' | 'right' | 'bottom';
  type HealthOption = {
    hp?: number;
    mp?: number;
  };
  type OptionName = keyof (typeof MAP_CONF)['DISPLAY'][keyof (typeof MAP_CONF)['DISPLAY']];
}
