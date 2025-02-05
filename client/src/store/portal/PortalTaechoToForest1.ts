import { ForwardPosition } from "@config/map/map.conf";
import Portal from "@model/unit/portal/Portal";
import { ForestRoad1, Taecho, TaechoFront } from "@store/maps";

export const PortalTaechoToForest1 = new Portal(ForestRoad1.name);

PortalTaechoToForest1.setLocation(Taecho);
PortalTaechoToForest1.setPositionByField(9.5, 11);
// PortalTaechoToForest1.setForwardPositionByMap(Taecho, 'left');
PortalTaechoToForest1.setForwardMap(
  ForestRoad1,
  ForwardPosition["태초마을"]["숲 길1"],
  "bottom"
);
PortalTaechoToForest1.cropSizeX = 30;
PortalTaechoToForest1.cropSizeY = 33;
PortalTaechoToForest1.cropPadX = 32;
PortalTaechoToForest1.cropPadY = 33;
PortalTaechoToForest1.limitFrame = 3;
