import { IRouter } from "../../../../src/core/server";
import { schema } from "@osd/config-schema";
import { INDEX_PATTERN, TODO_PLUGIN_ROUTES } from "../../common";
import { search } from "./search";

export function defineRoutes(router: IRouter) {
  
  const { CREATE, UPDATE, GET, DELETE } = TODO_PLUGIN_ROUTES;

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

  //update document
  router.post(
    {
      path: `${UPDATE}/{id}`,
      validate: {
        params: schema.object({
          id: schema.string(),
        }),
      },
    },
    async (context, request, response) => {
        return response.ok()
    }
  )

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

  router.delete(
    {
      path: DELETE,
      validate: {
        body: schema.object({
          id: schema.maybe(schema.string()),
        }),
      }
    },
    async (context, request, response) => {
      const deleteDocumentResponse =
        await context.core.opensearch.client.asCurrentUser.delete({
          index: INDEX_PATTERN,
          id: request.body.id,
        });
      return response.ok({
        body: deleteDocumentResponse.body,
      });
    }
  )
}
