import { v4 } from "uuid";
export const makeId = (prefix) => `${prefix}-${v4()}`;
