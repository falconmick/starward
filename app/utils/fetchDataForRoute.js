const defaultFetchData = () => Promise.resolve();

function fetchDataForRoute({ routes, params, location }, axiosInstance) { // if you have your own axius instance, pass it here
  const matchedRoute = routes[routes.length - 1];
  const routeName = matchedRoute.name;
  const { fetchData, ...otherRouteProps } = matchedRoute;
  const fetchDataHandler = fetchData || defaultFetchData;
  return fetchDataHandler(params, routeName, location, axiosInstance, otherRouteProps);
}

export default fetchDataForRoute;
