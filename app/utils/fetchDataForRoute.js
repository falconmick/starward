const defaultFetchData = () => Promise.resolve();

function fetchDataForRoute({ routes, params, location }, axiosInstance) { // if you have your own axius instance, pass it here
  const matchedRoute = routes[routes.length - 1];
  const routeName = matchedRoute.name;
  const fetchDataHandler = matchedRoute.fetchData || defaultFetchData;
  return fetchDataHandler(params, routeName, location, axiosInstance);
}

export default fetchDataForRoute;
