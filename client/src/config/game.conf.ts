import { GameMode } from "@variable/constant";
import ITEM_CONF from "./item/item.conf";
import MAP_CONF from "./map/map.conf";
import QUEST_CONF from "./quest/quest.conf";
import MONSTER_CONF from "./unit/monster.conf";
import NPC_CONF from "./unit/npc.conf";
import UNIT_CONF from "./unit/unit.conf";
import WEAPON_CONF from "./weapon/weapon.conf";

// const params = new URLSearchParams(location.search);
// const customMode = params.get('mode') || '1';

export const WINDOW_X_SIZE = 900;
export const WINDOW_Y_SIZE = 800;

const GAME_CONF: {
  ITEM_CONF: typeof ITEM_CONF;
  UNIT_CONF: typeof UNIT_CONF;
  NPC_CONF: typeof NPC_CONF;
  MONSTER_CONF: typeof MONSTER_CONF;
  WEAPON_CONF: typeof WEAPON_CONF;
  MAP_CONF: typeof MAP_CONF;
  QUEST_CONF: typeof QUEST_CONF;
  SCALE: number;
  MODE: GameMode;
} = {
  ITEM_CONF,
  UNIT_CONF,
  NPC_CONF,
  MONSTER_CONF,
  WEAPON_CONF,
  MAP_CONF,
  QUEST_CONF,
  SCALE: 1,
  MODE: GameMode.Test,
} as const;

export default GAME_CONF;
