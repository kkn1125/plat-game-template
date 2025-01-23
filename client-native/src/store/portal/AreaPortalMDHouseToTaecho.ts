import { ForwardPosition } from '@config/map/map.conf';
import AreaPortal from '@model/unit/portal/AreaPotal';
import { MDHouse, Taecho } from '@store/maps';

export const AreaPortalMDHouseToTaecho = new AreaPortal(Taecho.name);

AreaPortalMDHouseToTaecho.setLocation(MDHouse);
AreaPortalMDHouseToTaecho.setPositionByField(0, 4);
AreaPortalMDHouseToTaecho.setForwardMap(Taecho, ForwardPosition['관리자의 집']['태초마을'], 'bottom');
