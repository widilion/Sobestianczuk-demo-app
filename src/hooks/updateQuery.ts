//// composable for updating query params in route from inside the component ////
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

export default function useUpdateQuery() {
  const route = useRoute();
  const router = useRouter();

  // takes page number and/or searched ID and puts them in the route query params
  let updateQuery = function (newPage?: number, newId?: number | string) {
    let queries = JSON.parse(JSON.stringify(route.query)); ///// tricky, but it has to look like this because otherwise route.query is not mutable
    newPage ? (queries.page = newPage) : null;
    newId ? (queries.id = newId) : delete queries["id"];
    router.replace({ query: queries });
  };

  return updateQuery;
}
