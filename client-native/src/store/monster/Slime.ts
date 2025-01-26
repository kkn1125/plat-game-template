import { SlimeSprite } from '@/source/sprites';
import GAME_CONF from '@config/game.conf';
import GameMap from '@model/gamemap/GameMap';
import { Monster } from '@model/unit';

export function SlimeFactory(gameMap: GameMap<Maps>, position: XY) {
  const Slime = new Monster('슬라임', {
    hp: 100,
    mp: 0,
  });
  Slime.setSprites(SlimeSprite);
  Slime.cropSizeX = 32;
  Slime.cropSizeY = 32;
  Slime.cropPadX = 0;
  Slime.cropPadY = 0;
  Slime.limitFrame = 3;
  Slime.setLocation(gameMap);
  Slime.setPositionByField(position.x, position.y);
  // console.log('슬라임 생성:', position.x * GAME_CONF.MAP_CONF.DEFAULT.SIZE.X, position.y * GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y);
  Slime.reward.setExp(10);
  Slime.reward.setGold(10);
  // Slime.reward.setItem(Gun);
  return Slime;
}
