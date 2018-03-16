const defaultFetchData = () => Promise.resolve();

function fetchDataForApp({ routes, params, location }, axiosInstance) { // if you have your own axius instance, pass it here
  const appRoute = routes[0];
  const routeName = appRoute.name;
  const fetchAppHandler = appRoute.fetchData || defaultFetchData;
  return fetchAppHandler(params, routeName, location, axiosInstance);
}

export default fetchDataForApp;
