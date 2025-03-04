import Portal from '@model/unit/portal/Portal';
import { Town1, Town2 } from '@store/maps';
export const PortalTown2Town1 = new Portal('타운1 포탈');
PortalTown2Town1.setLocation(Town2);
PortalTown2Town1.setPositionByField(-22, -1.5);
PortalTown2Town1.setForwardPositionByMap(Town2, 'right');
PortalTown2Town1.setForwardMap(Town1);
PortalTown2Town1.cropSizeX = 30;
PortalTown2Town1.cropSizeY = 33;
PortalTown2Town1.cropPadX = 32;
PortalTown2Town1.cropPadY = 33;
PortalTown2Town1.limitFrame = 3;
