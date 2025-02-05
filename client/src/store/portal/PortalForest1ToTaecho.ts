import { ForwardPosition } from "@config/map/map.conf";
import Portal from "@model/unit/portal/Portal";
import { ForestRoad1, Taecho, TaechoFront } from "@store/maps";

export const PortalForest1ToTaecho = new Portal(Taecho.name);

PortalForest1ToTaecho.setLocation(ForestRoad1);
PortalForest1ToTaecho.setPositionByField(6, -9);
// PortalForest1ToTaecho.setForwardPositionByMap(Taecho, 'left');
PortalForest1ToTaecho.setForwardMap(
  Taecho,
  ForwardPosition["숲 길1"]["태초마을"],
  "top"
);
PortalForest1ToTaecho.cropSizeX = 30;
PortalForest1ToTaecho.cropSizeY = 33;
PortalForest1ToTaecho.cropPadX = 32;
PortalForest1ToTaecho.cropPadY = 33;
PortalForest1ToTaecho.limitFrame = 3;
