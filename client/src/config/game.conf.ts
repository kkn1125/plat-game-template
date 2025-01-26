import { GameMode } from '@variable/constant';
import ITEM_CONF from './item/item.conf';
import MAP_CONF from './map/map.conf';
import QUEST_CONF from './quest/quest.conf';
import MONSTER_CONF from './unit/monster.conf';
import NPC_CONF from './unit/npc.conf';
import UNIT_CONF from './unit/unit.conf';
import WEAPON_CONF from './weapon/weapon.conf';

const params = new URLSearchParams(location.search);
const customMode = params.get('mode') || '1';

const GAME_CONF = {
  ITEM_CONF,
  UNIT_CONF,
  NPC_CONF,
  MONSTER_CONF,
  WEAPON_CONF,
  MAP_CONF,
  QUEST_CONF,
  SCALE: 1,
  MODE: ((mode: string) => {
    switch (mode) {
      case '0':
        return GameMode.Test;
      case '2':
        return GameMode.Multiple;
      case '1':
      default:
        return GameMode.Single;
    }
  })(customMode),
} as const;

export default GAME_CONF;
