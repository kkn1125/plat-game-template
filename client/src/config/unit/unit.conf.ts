import { mode } from "@variable/variable";

const UNIT_CONF = {
  DEFAULT: {
    DAMAGE: mode === "development" ? 50 : 10,
    STR: 5,
    DEX: 5,
    INT: 5,
    LUCK: 5,
    HP: 100,
    MP: 50,
    SPEED: 2,
    ATTACK_SPEED: 0.2,
    INCREASE_SPEED: 2,
    DECREASE_SPEED: 1,
    GAZE: "bottom",
    SIZE: {
      X: 40,
      Y: 40,
    },
    INVENTORY: {
      X: 5,
      Y: 6,
    },
    DETECT_RANGE: 100,
    ATTACK_RANGE: 80,
    CONTROL_UNIT: {
      INCREASE_SPEED: mode === "development" ? 5 : 2,
    },
  },
  RESPAWN_TIME: 5,
  INCREASE_DAMAGE_RATIO: 0.07,
} as const;
export type UNIT_CONF = (typeof UNIT_CONF)[keyof typeof UNIT_CONF];
export default UNIT_CONF;
