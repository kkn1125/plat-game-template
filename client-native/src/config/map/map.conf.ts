import Field from '@model/gamemap/Field';

export const MAP_CONF = {
  DEFAULT: { SIZE: { X: 100, Y: 100 } },
  FIELD_VALIDATE(field: Field) {
    const color = ((name: string) => {
      switch (name) {
        case '0':
          return 'black';
        case '1':
          return 'green';
        case '2':
          return 'wood';
        default:
          return 'black';
      }
    })(field.name);
    return { color };
  },
} as const;

export default MAP_CONF;
