const ITEM_CONF = {
  DEFAULT: {
    SIZE: {
      X: 30,
      Y: 30,
    },
    DAMAGE: 1,
  },
} as const;
export type ITEM_CONF = (typeof ITEM_CONF)[keyof typeof ITEM_CONF];

export default ITEM_CONF;
