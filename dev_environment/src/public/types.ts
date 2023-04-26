import { NavigationPublicPluginStart } from "../../../src/plugins/navigation/public";
import type { TODO_FILTERS } from "../common/index";

export interface CustomPluginPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomPluginPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export type TodoId = Pick<Todo, "id">;
export type TodoTitle = Pick<Todo, "title">;

export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];

export type TodoList = Todo[];
