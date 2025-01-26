const NPC_CONF = {
  DEFAULT: {
    DAMAGE: 2,
    STR: 3,
    DEX: 3,
    INT: 3,
    LUCK: 3,
    HP: 100,
    MP: 0,
    SPEED: 1,
    ATTACK_SPEED: 2,
    INCREASE_SPEED: 1,
    DECREASE_SPEED: 0.5,
    GAZE: 'bottom',
    SIZE: {
      X: 40,
      Y: 40,
    },
    ATTACK_RANGE: 50,
  },
  INCREASE_DAMAGE_RATIO: 0.07,
} as const;
export type NPC_CONF = typeof NPC_CONF;
export default NPC_CONF;
