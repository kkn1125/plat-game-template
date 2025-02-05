export const ForwardPosition = {
  태초마을: {
    "마을 앞": { x: -22, y: -1.5 }, //
    "빈 집": { x: 0, y: 2 },
    오솔길1: { x: 17, y: 1.5 },
    "촌장의 집": { x: 0, y: 4 },
    '숲 길1': { x: 6, y: -9 },
  },
  "마을 앞": {
    태초마을: { x: 17, y: 1.5 }, //
  },
  "빈 집": {
    태초마을: { x: 4.5, y: -2 },
  },
  오솔길1: {
    태초마을: { x: -17, y: 1.5 },
  },
  "촌장의 집": {
    태초마을: { x: -4.5, y: -2 },
  },
  "숲 길1": {
    태초마을: { x: 9.5, y: 11 },
  },
} as { [k in Maps]: { [q in Exclude<Maps, k>]: XY } };

const MAP_CONF = {
  DEFAULT: { SIZE: { X: 60, Y: 60 }, MAP: "태초마을" as Maps },
  DISPLAY: {
    EXP: true,
    DETECT: {
      BUILDING: false,
      HOUSE: false,
      AREAPORTAL: false,
      PORTAL: false,
      UNIT: true,
      PLAYER: true,
      NPC: true,
      MARKETNPC: true,
      QUESTNPC: true,
      MONSTER: true,
    },
    HEALTH: {
      BUILDING: false,
      HOUSE: false,
      AREAPORTAL: false,
      PORTAL: false,
      UNIT: true,
      PLAYER: true,
      NPC: false,
      MARKETNPC: false,
      QUESTNPC: false,
      MONSTER: true,
    },
    NAME: {
      BUILDING: false,
      HOUSE: false,
      AREAPORTAL: false,
      PORTAL: true,
      UNIT: true,
      PLAYER: true,
      NPC: true,
      MARKETNPC: true,
      QUESTNPC: true,
      MONSTER: true,
    },
  },
  // _(name: string) {},
  // FIELD_VALIDATE(field: Field) {
  //   const color = ((name: string) => {
  //     switch (name) {
  //       case '0':
  //         return 'black';
  //       case '1':
  //         return 'green';
  //       case '2':
  //         return 'wood';
  //       default:
  //         return 'black';
  //     }
  //   })(field.name);
  //   return { color };
  // },
} as const;
export type MAP_CONF = (typeof MAP_CONF)[keyof typeof MAP_CONF];

export default MAP_CONF;
