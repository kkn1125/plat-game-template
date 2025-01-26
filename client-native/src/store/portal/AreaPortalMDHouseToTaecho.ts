import { MapSprites3 } from '@/source/sprites';
import { ForwardPosition } from '@config/map/map.conf';
import AreaPortal from '@model/unit/portal/AreaPotal';
import { MDHouse, Taecho } from '@store/maps';

export const AreaPortalMDHouseToTaecho = new AreaPortal(Taecho.name);
AreaPortalMDHouseToTaecho.sprites = MapSprites3;
AreaPortalMDHouseToTaecho.setLocation(MDHouse);
AreaPortalMDHouseToTaecho.setPositionByField(0, 4);
AreaPortalMDHouseToTaecho.setForwardMap(Taecho, ForwardPosition['촌장의 집']['태초마을'], 'bottom');
