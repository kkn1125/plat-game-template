import { ForwardPosition } from '@config/map/map.conf';
import Portal from '@model/unit/portal/Portal';
import { Osolgil1, Taecho } from '@store/maps';

export const PortalTaechoToOsolgil1 = new Portal(Osolgil1.name);

PortalTaechoToOsolgil1.setLocation(Taecho);
PortalTaechoToOsolgil1.setPositionByField(-17, 1.5);
// PortalTaechoToOsolgil1.setForwardPositionByMap(Taecho, 'right');
PortalTaechoToOsolgil1.setForwardMap(Osolgil1, ForwardPosition['태초마을']['오솔길1'], 'left');
PortalTaechoToOsolgil1.cropSizeX = 30;
PortalTaechoToOsolgil1.cropSizeY = 33;
PortalTaechoToOsolgil1.cropPadX = 32;
PortalTaechoToOsolgil1.cropPadY = 33;
PortalTaechoToOsolgil1.limitFrame = 3;
