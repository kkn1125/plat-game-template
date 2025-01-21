import textEffect from '@animation/effect/TextEffect';
export const textChangeFx = (name) => textEffect({ text: name, duration: 3 }).run();
