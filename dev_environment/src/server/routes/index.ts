import { IRouter } from "../../../../src/core/server";
import { schema } from "@osd/config-schema";
import { TODO_PLUGIN_ROUTES } from "../../common";
import { search } from "./search";

export function defineRoutes(router: IRouter) {
  const INDEX_PATTERN = "todo-index";
  const { CREATE, UPDATE, GET, DELETE } = TODO_PLUGIN_ROUTES;

  //create todo item:
  router.post(
    {
      path: CREATE,
      validate: {
        body: schema.object({
          id: schema.maybe(schema.string()),
          title: schema.maybe(schema.string()),
          completed: schema.maybe(schema.boolean()),
        }),
      },
    },
    async (context, request, response) => {
      // si no existe el indice lo crea:
      const existsIndex =
        await context.core.opensearch.client.asCurrentUser.indices.exists({
          index: INDEX_PATTERN,
        });

      if (!existsIndex.body) {
        const settings = {
          settings: {
            index: {
              number_of_shards: 4,
              number_of_replicas: 3,
            },
          },
        };

        const responseItems =
          await context.core.opensearch.client.asCurrentUser.indices.create({
            index: INDEX_PATTERN,
            body: settings,
          });

        return response.ok({
          body: {
            id: responseItems.body.id,
            title: responseItems.body.title,
            completed: responseItems.body.completed,
          },
        });
      }

      // Add a document to the index.
      const document = {
        id: request.body.id,
        title: request.body.title,
        completed: request.body.completed,
      };

      const createDocumentResponse =
        await context.core.opensearch.client.asCurrentUser.index({
          id: request.body.id,
          index: INDEX_PATTERN,
          body: document,
          refresh: true,
        });
      return response.ok({
        body: createDocumentResponse.body,
      });
    }
  );

  //get all items
  router.get(
    {
      path: GET,
      validate: false,
    },
    async (context, request, response) => {
      const query = {
        query: {
          match_all: {},
        },
      };

      return search({ context, query, index: INDEX_PATTERN, response });
    }
  );

  //search items
  router.get(
    {
      path: `${GET}/{title}`,
      validate: {
        params: schema.object({
          title: schema.string(),
        }),
      },
    },
    async (context, request, response) => {
      if (!request.params.title) {
        return response.notFound();
      }

      const query = {
        query: {
          match: {
            title: {
              query: request.params.title,
            },
          },
        },
      };

      return search({ context, query, index: INDEX_PATTERN, response });
    }
  );

  //-----------------------------------search a document
  // var query = {
  //   query: {
  //     match: {
  //       title: {
  //         query: "The Outsider",
  //       },
  //     },
  //   },
  // };

  // var response = await client.search({
  //   index: index_name,
  //   body: query,
  // });
  //-----------------------------------------------------

  //----------------------------------delete a document:
  // var response = await client.delete({
  //   index: index_name,
  //   id: id,
  // });
  //-----------------------------------------------------

  // router.post(
  //   {
  //     path: CREATE,
  //     validate: {
  //       body: schema.object({
  //         id: schema.maybe(schema.string()),
  //         title: schema.maybe(schema.string()),
  //         completed: schema.maybe(schema.boolean()),
  //       }),
  //     },
  //   },
  //   async (context, request, response) => {
  //     // si no existe el indice lo crea:

  //     console.log({context})
  //     console.log({request})
  //     console.log({response})
  //     const existsIndex =
  //       await context.core.opensearch.client.asCurrentUser.indices.exists({
  //         index: INDEX_PATTERN,
  //       });

  //     if (existsIndex.body) {
  //       console.log('The index already exist')
  //       return response.badRequest({
  //         body: `Message with id ${request.params.id} already exists`,
  //       });
  //     }

  //     console.log('no encuentra el indice...', {existsIndex})

  //     const responseItems =
  //       await context.core.opensearch.client.asCurrentUser.indices.create({
  //         index: INDEX_PATTERN,
  //         body: {
  //           id: request.params.id,
  //           title: request.params.title,
  //           completed: request.params.completed,
  //         },
  //       });
  //     return response.ok({
  //       body: {
  //         id: responseItems.body.id,
  //         title: responseItems.body.title,
  //         completed: responseItems.body.completed,
  //       },
  //     });
  //   }
  // );
}
