export const ForwardPosition = {
  태초마을: {
    '마을 앞': { x: -22, y: -1.5 }, //
    '빈 집': { x: 0, y: 2 },
    오솔길1: { x: 17, y: 1.5 },
    '관리자의 집': { x: 0, y: 4 },
  },
  '마을 앞': {
    태초마을: { x: 17, y: 1.5 }, //
  },
  '빈 집': {
    태초마을: { x: 4.5, y: -2 },
  },
  오솔길1: {
    태초마을: { x: -17, y: 1.5 },
  },
  '관리자의 집':{
    태초마을: { x: -4.5, y: -2 },
  }
} as { [k in Maps]: { [q in Exclude<Maps, k>]: XY } };

export const MAP_CONF = {
  DEFAULT: { SIZE: { X: 60, Y: 60 } },
  DISPLAY: {
    DETECT: {
      BUILDING: false,
      HOUSE: false,
      AREAPORTAL: false,
      PORTAL: false,
      UNIT: true,
      NPC: true,
      MONSTER: true,
    },
    NAME: {
      BUILDING: false,
      HOUSE: false,
      AREAPORTAL: false,
      PORTAL: true,
      UNIT: true,
      NPC: true,
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

export default MAP_CONF;
