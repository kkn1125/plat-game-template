import { ForwardPosition } from '@config/map/map.conf';
import House from '@model/unit/building/category/House';
import { GMHouse, Taecho } from '@store/maps';

export const BuildingGMHouse = new House(GMHouse.name);
BuildingGMHouse.setLocation(Taecho);
BuildingGMHouse.setPositionByField(-4.5, -2.0);
BuildingGMHouse.setForwardMap(GMHouse, ForwardPosition['태초마을']['촌장의 집'], 'top');
