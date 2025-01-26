export const SOCKET_URL = process.env.SOCKET_URL as string;
export const mode = process.env.MODE || "production";
export const path = mode === "development" ? "/" : "/plat-game-template/";
