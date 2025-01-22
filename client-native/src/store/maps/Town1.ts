import GameMap from '@model/gamemap/GameMap';
import { PortalTown2Town1 } from '@store/portal/Town2.Town1';

//prettier-ignore
export const Town1 = new GameMap('Town1', [
  ['g','g','g','g','g','g','g','g','g','g','g','g','g','g', 'r', 'r', 'g', 'g', 'g', 'g', 'r', 'r', 'g', 'g', 'g', 'g', 'r', 'r',  'g', 'g', 'g'],
  ['g','g','g','g','g','g','g','g','g','g','g','g','g','g', 'r', 'r', 'g', 'g', 'g', 'g', 'r', 'r', 'g', 'g', 'g', 'g', 'r', 'r',  'r', 'r', 'r'],
  ['g','g','g','g','g','g','g','g','g','g','g','g','g','g', 'r', 'r', 'g', 'g', 'g', 'g', 'r', 'r', 'g', 'g', 'g', 'g', 'r', 'r',  'r', 'r', 'r'],
  ['g','g','g','g','g','g','g','g','g','g','g','g','g','g', 'r', 'r', 'g', 'g', 'g', 'g', 'r', 'r', 'g', 'g', 'g', 'g', 'r', 'r',  'r', 'r', 'r'],
  ['g','g','g','g','g','g','g','g','g','g','g','g','g','g', 'r', 'r', 'g', 'g', 'g', 'g', 'r', 'r', 'g', 'g', 'g', 'g', 'r', 'r',  'g', 'g', 'g'],
  ['g','g','g','g','g','g','g','g','g','r','r','r','r','r', 'r', 'r', 'g', 'g', 'g', 'g', 'r', 'r', 'g', 'g', 'g', 'g', 'r', 'r',  'g', 'g', 'g'],
  ['g','g','g','g','g','g','g','g','r','r','r','r','r','r', 'r', 'r', 'r', 'g', 'g', 'g', 'r', 'r', 'g', 'g', 'g', 'g', 'r', 'r',  'g', 'g', 'g'],
  ['r','r','r','r','r','r','r','r','r','r','g','g','g','g', 'g', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r',  'r', 'r', 'r'],
  ['r','r','r','r','r','r','r','r','r','g','g','g','g','g', 'g', 'g', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r',  'r', 'r', 'r'],
  ['g','g','r','g','g','r','r','g','g','g','g','g','g','g', 'g', 'g', 'r', 'r', 'r', 'g', 'g', 'r', 'r', 'r', 'g', 'g', 'g', 'r',  'r', 'g', 'g'],
  ['g','g','r','g','g','r','r','g','g','g','g','w','w','w', 'g', 'g', 'r', 'r', 'r', 'g', 'g', 'r', 'r', 'r', 'g', 'g', 'g', 'r',  'r', 'g', 'g'],
  ['g','g','r','g','g','r','r','r','r','g','g','w','w','w', 'g', 'g', 'r', 'r', 'r', 'g', 'g', 'r', 'r', 'r', 'g', 'g', 'g', 'r',  'r', 'g', 'g'],
  ['g','g','r','g','g','r','r','r','r','g','g','w','w','w', 'g', 'g', 'r', 'r', 'r', 'g', 'g', 'r', 'r', 'r', 'g', 'g', 'g', 'r',  'r', 'g', 'g'],
  ['g','g','r','g','g','g','g','r','r','g','g','g','g','g', 'g', 'g', 'r', 'r', 'r', 'g', 'g', 'r', 'r', 'r', 'g', 'g', 'g', 'r',  'r', 'g', 'g'],
  ['g','g','r','g','g','g','g','r','r','g','g','g','g','g', 'g', 'g', 'r', 'r', 'r', 'g', 'g', 'r', 'r', 'r', 'g', 'g', 'g', 'r',  'r', 'g', 'g'],
  ['g','g','r','g','g','g','g','r','r','r','r','r','r','r', 'r', 'r', 'r', 'r', 'r', 'g', 'g', 'r', 'r', 'r', 'g', 'g', 'g', 'r',  'r', 'g', 'g'],
  ['g','g','r','g','g','g','g','r','r','r','r','r','r','r', 'r', 'r', 'r', 'r', 'r', 'g', 'g', 'r', 'r', 'r', 'g', 'g', 'g', 'r',  'r', 'g', 'g'],
]);

Town1.setDefaultSpawnPositionByField(0, -2);
// Town1.setForwardedPositionByField(-15, -0.5);
// Town1.setForwardedDirection('right');
