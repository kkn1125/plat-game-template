import { v4 } from "uuid";

export const makeId = <Prefix extends string>(prefix: Prefix): MakeId<Prefix> =>
  `${prefix}-${v4()}`;
