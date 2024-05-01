import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

export default function useUpdateQuery() {
  const route = useRoute();
  const router = useRouter();

  let updateQuery = function (newPage?: number, newId?: number | string) {
    let queries = JSON.parse(JSON.stringify(route.query));  ///// tricky, but it has to look like this
    newPage ? (queries.page = newPage) : null;
    newId ? (queries.id = newId) : delete queries["id"];
    router.replace({ query: queries });
  };

  return updateQuery;
}
