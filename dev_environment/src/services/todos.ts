import { CoreStart } from "../../../../src/core/public";
import { TODO_PLUGIN_ROUTES } from "../common";
import { i18n } from "@osd/i18n";
import randomIntFromInterval from "./utils";

interface CustomPluginAppDeps {
  notifications: CoreStart["notifications"];
  http: CoreStart["http"];
}
export const TodoService = ({
  http,
  notifications,
}: CustomPluginAppDeps): {
  createTodo: (title: string) => any;
  getAll: () => any;
  getByName: () => any;
  deleteTodo: (id: string) => any;
  updateTodo: () => any;
} => {
  const createTodo = (title: string) => {
    const id = randomIntFromInterval(1, 9999).toString();
    const body = { id, title, completed: false };
    return http
      .post(TODO_PLUGIN_ROUTES.CREATE, { body: JSON.stringify(body) })
      .then((res) => {
        notifications.toasts.addSuccess(
          i18n.translate("customPlugin.dataCreated", {
            defaultMessage: "Todo created",
          })
        );
        return { res, todo: body };
      });
  };
  const getAll = () => {
    // get all items
    return http
      .get(TODO_PLUGIN_ROUTES.GET)
      .then(({ items }) => {
        console.log({ items });
        return items;
      })
      .catch((err) => console.log("getAll error", err));
  };

  const getByName = () => {
    // get by name
    const title = "python";
    return http
      .get(`${TODO_PLUGIN_ROUTES.GET}/${title}`)
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => console.log("getByName error", err));
  };

  const deleteTodo = (id: string) => {
    
    return http
      .delete(TODO_PLUGIN_ROUTES.DELETE, { body: JSON.stringify({id}) })
      .then((res) => {
        
        notifications.toasts.addSuccess(
          i18n.translate("customPlugin.dataRemove", {
            defaultMessage: "Todo deleted",
          })
        );

        return { res, todoId: id }
      })
      .catch((err) => console.log("deleteTodo error", err));
  };

  const updateTodo = () => {
    return notifications.toasts.addSuccess(
      i18n.translate("customPlugin.dataUpdated", {
        defaultMessage: "Todo updated",
      })
    );
  };

  return {
    createTodo,
    getAll,
    getByName,
    deleteTodo,
    updateTodo,
  };
};
