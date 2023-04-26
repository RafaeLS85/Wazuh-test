export async function search({ context, query, index, response }) {
  const find = await context.core.opensearch.client.asCurrentUser.search({
    index,
    body: query,
  });

  const { hits } = find.body;
  const { hits: items } = hits;

  return response.ok({
    body: {
      items,
    },
  });
}
