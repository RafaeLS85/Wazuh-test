export const PLUGIN_ID = "customPlugin";
export const PLUGIN_NAME = "TO-DO plugin";
export const TODO_FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
} as const;

export const KEY_CODES = {
  ENTER: 13,
  ESCAPE: 27,
} as const;

export const TODO_PLUGIN_ROUTES = {
  CREATE_INDEX: "/api/plugin/todo",
  CREATE: "/api/plugin/todo",
  UPDATE: "/api/plugin/todo",
  GET: "/api/plugin/todo",
  DELETE: "/api/plugin/todo",
};
