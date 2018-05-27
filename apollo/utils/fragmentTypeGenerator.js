const axios = require('axios');

export const fragmentTypeGenerator = async (graphqlEndpoint) => {
  // return axios({
  //   method: 'POST',
  //   url: graphqlEndpoint,
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     query: `
  //     {
  //       __schema {
  //         types {
  //           kind
  //           name
  //           possibleTypes {
  //             name
  //           }
  //         }
  //       }
  //     }
  //   `,
  //   }),
  // })
  const body = {
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  };
  return axios.post(graphqlEndpoint, body)
    .then(result => {
      const queryResult = result.data.data;
      // here we're filtering out any type information unrelated to unions or interfaces
      const filteredData = queryResult.__schema.types.filter(
        type => type.possibleTypes !== null,
      );
      const fragmentTypes = {
        ...queryResult,
        __schema: {
          ...queryResult.__schema,
          types: filteredData,
        }
      };

      return fragmentTypes;
    });
};
