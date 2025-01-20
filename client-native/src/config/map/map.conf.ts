export const MAP_CONF = {
  DEFAULT: { SIZE: { X: 60, Y: 60 } },
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
