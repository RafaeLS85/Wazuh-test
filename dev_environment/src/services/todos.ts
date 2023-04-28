import { CoreStart } from "../../../../src/core/public";
import { TODO_PLUGIN_ROUTES } from "../common";
import { i18n } from "@osd/i18n";

interface CustomPluginAppDeps {
  notifications: CoreStart["notifications"];
  http: CoreStart["http"];
}
export const TodoService = ({
  http,
  notifications,
}: CustomPluginAppDeps): {
  createTodo: any;
  getAll: any;
  getByName: any;
  deleteTodo: any;
  updateTodo: any;
} => {
  const createTodo = (title:string) => {
    // create item
    const body = { id: Math.random().toString()  , title, completed: false };
    return http
      .post(TODO_PLUGIN_ROUTES.CREATE, { body: JSON.stringify(body) })
      .then((res) => {
        console.log({ res });
        // Use the core notifications service to display a success message.
        notifications.toasts.addSuccess(
          i18n.translate("customPlugin.dataCreated", {
            defaultMessage: "Todo created",
          })
        );
        return res
      });
  };
  const getAll = () => {
    // get all items
    return http
      .get(TODO_PLUGIN_ROUTES.GET)
      .then(({ items }) => {
        console.log({ items });
        return items;
        // Use the core notifications service to display a success message.
      })
      .catch((err) => console.log("getAll error", err));
  };

  const getByName = () => {
    // get by name
    const title = "python";
    return http.get(`${TODO_PLUGIN_ROUTES.GET}/${title}`).then((res) => {
      console.log({ res });
    });
  };

  const deleteTodo = () => {
    return notifications.toasts.addSuccess(
      i18n.translate("customPlugin.dataRemove", {
        defaultMessage: "Todo deleted",
      })
    );
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
