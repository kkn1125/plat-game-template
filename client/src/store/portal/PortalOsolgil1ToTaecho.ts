import Portal from '@model/unit/portal/Portal';
import { Taecho, Osolgil1 } from '@store/maps';
import { PortalTaechoToOsolgil1 } from './PortalTaechoToOsolgil1';
import { ForwardPosition } from '@config/map/map.conf';

export const PortalOsolgil1ToTaecho = new Portal(Taecho.name);

PortalOsolgil1ToTaecho.setLocation(Osolgil1);
PortalOsolgil1ToTaecho.setPositionByField(17, 1.5);
// PortalOsolgil1ToTaecho.setForwardPositionByMap(Osolgil1, 'left');
PortalOsolgil1ToTaecho.setForwardMap(Taecho, ForwardPosition['오솔길1']['태초마을'], 'right');
PortalOsolgil1ToTaecho.cropSizeX = 30;
PortalOsolgil1ToTaecho.cropSizeY = 33;
PortalOsolgil1ToTaecho.cropPadX = 32;
PortalOsolgil1ToTaecho.cropPadY = 33;
PortalOsolgil1ToTaecho.limitFrame = 3;
