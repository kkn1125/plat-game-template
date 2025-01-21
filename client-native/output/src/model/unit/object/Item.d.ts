import Stat from '../option/Stat';
export default class Item {
    id: `item-${string}`;
    name: string;
    stat: Stat;
    position: XY;
    dropped: boolean;
    constructor(name: string);
    info(): this;
}
