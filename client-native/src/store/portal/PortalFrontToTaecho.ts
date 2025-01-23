import { ForwardPosition } from '@config/map/map.conf';
import Portal from '@model/unit/portal/Portal';
import { Taecho, TaechoFront } from '@store/maps';

export const PortalFrontToTaecho = new Portal(Taecho.name);

PortalFrontToTaecho.setLocation(TaechoFront);
PortalFrontToTaecho.setPositionByField(-22, -1.5);
// PortalFrontToTaecho.setForwardPositionByMap(TaechoFront, 'right');
PortalFrontToTaecho.setForwardMap(Taecho, ForwardPosition['마을 앞']['태초마을'], 'left');
PortalFrontToTaecho.cropSizeX = 30;
PortalFrontToTaecho.cropSizeY = 33;
PortalFrontToTaecho.cropPadX = 32;
PortalFrontToTaecho.cropPadY = 33;
PortalFrontToTaecho.limitFrame = 3;
