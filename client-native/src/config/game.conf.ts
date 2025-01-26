import { GameMode } from '@variable/constant';
import ITEM_CONF from './item/item.conf';
import MAP_CONF from './map/map.conf';
import QUEST_CONF from './quest/quest.conf';
import MONSTER_CONF from './unit/monster.conf';
import NPC_CONF from './unit/npc.conf';
import UNIT_CONF from './unit/unit.conf';
import WEAPON_CONF from './weapon/weapon.conf';

const GAME_CONF = {
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
