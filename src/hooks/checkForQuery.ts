//// composable for getting query parameters from route ////
import { useRoute } from "vue-router";
export default function useCheckForQuery() {
  const route = useRoute();

  // checkForQuery takes current route and extracts page and ID query params (if any are present)
  function checkForQuery() {
    const query = route.query;
    let queryKeys = Object.keys(query);
    let idQuery: string = "";
    let pageQuery: string = "";
    if (queryKeys.length !== 0) {
      if (queryKeys.includes("id") && typeof query.id === "string") {
        idQuery = query.id;
      }
      if (queryKeys.includes("page") && typeof query.page === "string") {
        pageQuery = query.page;
      }
    }
    return [pageQuery, idQuery];
  }
  return checkForQuery;
}
