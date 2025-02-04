import { MapSprites3 } from "@/source/sprites";
import { ForwardPosition } from "@config/map/map.conf";
import AreaPortal from "@model/unit/portal/AreaPotal";
import { GMHouse, Taecho } from "@store/maps";

export const AreaPortalGMHouseToTaecho = new AreaPortal(Taecho.name);
AreaPortalGMHouseToTaecho.sprites = MapSprites3;
AreaPortalGMHouseToTaecho.setLocation(GMHouse);
AreaPortalGMHouseToTaecho.setPositionByField(0, 4);
AreaPortalGMHouseToTaecho.setForwardMap(
  Taecho,
  ForwardPosition["촌장의 집"]["태초마을"],
  "bottom"
);
