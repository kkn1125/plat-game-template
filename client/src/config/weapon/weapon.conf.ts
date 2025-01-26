const WEAPON_CONF = {} as const;
export type WEAPON_CONF = (typeof WEAPON_CONF)[keyof typeof WEAPON_CONF];
export default WEAPON_CONF;
