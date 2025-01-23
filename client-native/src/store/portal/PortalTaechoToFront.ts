import { ForwardPosition } from '@config/map/map.conf';
import Portal from '@model/unit/portal/Portal';
import { Taecho, TaechoFront } from '@store/maps';

export const PortalTaechoToFront = new Portal(TaechoFront.name);

PortalTaechoToFront.setLocation(Taecho);
PortalTaechoToFront.setPositionByField(17, 1.5);
// PortalTaechoToFront.setForwardPositionByMap(Taecho, 'left');
PortalTaechoToFront.setForwardMap(TaechoFront, ForwardPosition['태초마을']['마을 앞'], 'right');
PortalTaechoToFront.cropSizeX = 30;
PortalTaechoToFront.cropSizeY = 33;
PortalTaechoToFront.cropPadX = 32;
PortalTaechoToFront.cropPadY = 33;
PortalTaechoToFront.limitFrame = 3;
