import textEffect from '@animation/effect/TextEffect';

export const textChangeFx = (name: string) => textEffect({ text: name, duration: 3 }).run();
