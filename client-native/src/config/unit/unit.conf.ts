export const UNIT_CONF = {
  DEFAULT: {
    DAMAGE: 10,
    STR: 5,
    DEX: 5,
    INT: 5,
    LUCK: 5,
    HP: 100,
    MP: 50,
    SPEED: 2,
    INCREASE_SPEED: 2,
    DECREASE_SPEED: 1,
    GAZE: 'bottom',
    SIZE: {
      X: 40,
      Y: 40,
    },
  },
  INCREASE_DAMAGE_RATIO: 0.07,
} as const;

export default UNIT_CONF;
