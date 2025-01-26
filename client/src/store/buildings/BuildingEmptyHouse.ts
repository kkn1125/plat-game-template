import { ForwardPosition } from '@config/map/map.conf';
import House from '@model/unit/building/category/House';
import { Taecho } from '@store/maps';
import { EmptyHouse1 } from '@store/maps/EmptyHouse1';

export const BuildingEmptyHouse = new House(EmptyHouse1.name);
// BuildingEmptyHouse.detectable = false;
BuildingEmptyHouse.setLocation(Taecho);
BuildingEmptyHouse.setPositionByField(4.5, -2.0);

// BuildingEmptyHouse.setForwardPositionByMap(Taecho, 'top');
BuildingEmptyHouse.setForwardMap(EmptyHouse1, ForwardPosition['태초마을']['빈 집'], 'top');
