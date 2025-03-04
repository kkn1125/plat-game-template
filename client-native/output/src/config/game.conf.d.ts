declare const GAME_CONF: {
    readonly UNIT_CONF: {
        readonly DEFAULT: {
            readonly DAMAGE: 10;
            readonly STR: 5;
            readonly DEX: 5;
            readonly INT: 5;
            readonly LUCK: 5;
            readonly HP: 100;
            readonly MP: 50;
            readonly SPEED: 2;
            readonly INCREASE_SPEED: 2;
            readonly DECREASE_SPEED: 1;
            readonly GAZE: "bottom";
            readonly SIZE: {
                readonly X: 40;
                readonly Y: 40;
            };
        };
        readonly INCREASE_DAMAGE_RATIO: 0.07;
    };
    readonly WEAPON_CONF: {};
    readonly MAP_CONF: {
        readonly DEFAULT: {
            readonly SIZE: {
                readonly X: 60;
                readonly Y: 60;
            };
        };
    };
    readonly QUEST_CONF: {};
    readonly SCALE: 1;
};
export default GAME_CONF;
