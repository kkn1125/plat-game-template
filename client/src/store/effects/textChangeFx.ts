import textEffect from '@animation/effect/textEffect';

export const textChangeFx = (name: string) => textEffect({ text: name, duration: 3 }).run();
