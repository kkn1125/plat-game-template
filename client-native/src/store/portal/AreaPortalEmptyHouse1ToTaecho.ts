import { ForwardPosition } from '@config/map/map.conf';
import AreaPortal from '@model/unit/portal/AreaPotal';
import { EmptyHouse1, Taecho } from '@store/maps';

export const AreaPortalEmptyHouse1ToTaecho = new AreaPortal(Taecho.name);

AreaPortalEmptyHouse1ToTaecho.setLocation(EmptyHouse1);
AreaPortalEmptyHouse1ToTaecho.setPositionByField(0, 2);
// AreaPortalEmptyHouse1ToTaecho.setForwardPositionByMap(EmptyHouse1, 'bottom');
AreaPortalEmptyHouse1ToTaecho.setForwardMap(Taecho, ForwardPosition['빈 집']['태초마을'], 'bottom');
