const QUEST_CONF = {} as const;
export type QUEST_CONF = (typeof QUEST_CONF)[keyof typeof QUEST_CONF];
export default QUEST_CONF;
