import { ForwardPosition } from "@config/map/map.conf";
import Portal from "@model/unit/portal/Portal";
import { Taecho } from "@store/maps";

export const PortalToBlog = new Portal("???");

PortalToBlog.setLocation(Taecho);
PortalToBlog.setPositionByField(0, -11);
// PortalToBlog.setForwardPositionByMap(Taecho, 'right');
PortalToBlog.setForwardSite("https://kkn1125.github.io/");
PortalToBlog.cropSizeX = 30;
PortalToBlog.cropSizeY = 33;
PortalToBlog.cropPadX = 32;
PortalToBlog.cropPadY = 33;
PortalToBlog.limitFrame = 3;
