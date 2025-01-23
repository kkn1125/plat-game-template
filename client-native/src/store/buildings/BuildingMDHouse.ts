import { ForwardPosition } from '@config/map/map.conf';
import House from '@model/unit/building/category/House';
import { MDHouse, Taecho } from '@store/maps';

export const BuildingMDHouse = new House(MDHouse.name);
BuildingMDHouse.setLocation(Taecho);
BuildingMDHouse.setPositionByField(-4.5, -2.5);
BuildingMDHouse.setForwardMap(MDHouse, ForwardPosition['태초마을']['관리자의 집'], 'top');
