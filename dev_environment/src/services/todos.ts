import { CoreStart } from "../../../../src/core/public";
import { TODO_PLUGIN_ROUTES } from "../common";
import { i18n } from "@osd/i18n";
import randomIntFromInterval from "./utils";
import {
  CreateTodoResponse,
  DeleteTodoResponse,
  Todo,
  TodoItem,
} from "../public/types";

interface CustomPluginAppDeps {
  notifications: CoreStart["notifications"];
  http: CoreStart["http"];
}
export const TodoService = ({
  http,
  notifications,
}: CustomPluginAppDeps): {
  createTodo: (title: string) => Promise<CreateTodoResponse>;
  getAll: () => Promise<TodoItem[]>;
  // getByName: () => any;
  deleteTodo: (id: string) => Promise<DeleteTodoResponse>;
  updateTodo: (todo) => Promise<CreateTodoResponse>;
} => {
  const createTodo = (title: string) => {
    const id = randomIntFromInterval(1, 99999).toString();
    const body: Todo = { id, title, completed: false };
    return http
      .post(TODO_PLUGIN_ROUTES.CREATE, { body: JSON.stringify(body) })
      .then((res: Response) => {
        console.log(res);
        notifications.toasts.addSuccess(
          i18n.translate("customPlugin.dataCreated", {
            defaultMessage: "Todo created",
          })
        );
        return { res, todo: body };
      });
  };
  const getAll = () => {
    return http
      .get(TODO_PLUGIN_ROUTES.GET)
      .then(({ items }) => {
        return items;
      })
      .catch((err) => console.log("getAll error", err));
  };

  // const getByName = () => {
  //   // get by name
  //   const title = "python";
  //   return http
  //     .get(`${TODO_PLUGIN_ROUTES.GET}/${title}`)
  //     .then((res) => {
  //       console.log({ res });
  //     })
  //     .catch((err) => console.log("getByName error", err));
  // };

  const deleteTodo = (id: string): Promise<DeleteTodoResponse> => {
    return http
      .delete(TODO_PLUGIN_ROUTES.DELETE, { body: JSON.stringify({ id }) })
      .then((res: Response) => {
        notifications.toasts.addSuccess(
          i18n.translate("customPlugin.dataRemove", {
            defaultMessage: "Todo deleted",
          })
        );
        return { res, todoId: id };
      })
      .catch((err) => console.log("deleteTodo error", err));
  };

  const updateTodo = (todo: Todo): Promise<CreateTodoResponse> => {
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };

    return http
      .post(TODO_PLUGIN_ROUTES.UPDATE, { body: JSON.stringify(updatedTodo) })
      .then((res) => {
        notifications.toasts.addSuccess(
          i18n.translate("customPlugin.dataCreated", {
            defaultMessage: "Todo updated",
          })
        );
        return { res, todo: updatedTodo };
      });
  };

  return {
    createTodo,
    getAll,
    deleteTodo,
    updateTodo,
  };
};
