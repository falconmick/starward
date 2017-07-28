import axios from 'axios';
import { WP_API } from '../../config/app';

// todo: write tests
export const dashCaseToCamelCase = (dashCase, startingIndex = 0) => {
  const dashIndex = dashCase.indexOf('-', startingIndex);
  if (dashIndex !== -1) {
    let characterAfterDash = '';
    if (dashIndex !== dashCase.length - 1) {
      characterAfterDash = dashCase[dashIndex + 1];
      if (dashIndex !== startingIndex + 1 && dashIndex !== 0) {
        characterAfterDash = characterAfterDash.toUpperCase();
      }
      if (dashIndex < dashCase.length - 1) {
        characterAfterDash += dashCase.slice(dashIndex + 2);
      }
    }
    const result = dashCase.slice(0, dashIndex) + characterAfterDash;
    return dashCaseToCamelCase(result, dashIndex);
  }
  return dashCase;
};

export const getSlug = (splat) => {
  const splitArray = splat === null ? [''] : splat.split('/');
  return splitArray[splitArray.length - 1];
};

// first we curry the splat url into our function so that the
// callback which is ran by the wp proxy can have access to
// this data outside of the context of our query
export const curryFindForSplat = (splatAsUrl) => {
  return (listOfMatchingPages) => {
    // find the page which has our exact url
    // and return the first result as there should
    // be 0-1 results returned from this, 0 meaning
    // the page doesn't exist and 1 meaning it was
    // found and matched
    return listOfMatchingPages.filter(slugPage => {
      const { link = '' } = slugPage;
      const linkWithoutTrailingSlash = link.replace(/\/$/, '');

      return linkWithoutTrailingSlash === splatAsUrl;
    })[0];
  };
};

export const resultArrayToSingle = (resultArray) => {
  return resultArray ? resultArray[0] : null;
};

export const createApiGraphqlProxy = (url) => {
  const __runQuery = (queryUrl, dataCallback) => {
    return new Promise((resolve, reject) => {
      return axios.get(queryUrl)
        .then(res => {
          const data = dataCallback ? dataCallback(res.data) : res.data;
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const select = (id, { dataCallback, idPrefix = ''} = {}) => {
    const getWithIdUrl = `${url}/${idPrefix + id}`;
    return __runQuery(getWithIdUrl, dataCallback);
  };

  const selectAll = ({ dataCallback } = {}) => {
    return __runQuery(url, dataCallback);
  };

  const selectWithIdList = (idList, { dataCallback } = {}) => {
    const getWithIdListUrl = idList && idList.length > 0 ? `${url}?include=${idList.join(',')}` : url;
    return __runQuery(getWithIdListUrl, dataCallback);
  }

  return {
    select,
    selectAll,
    selectWithIdList
  };
};

export const createWordpressGraphqlProxy = (resourceUrl) => {
  const url = `${WP_API}/${resourceUrl}`;
  return createApiGraphqlProxy(url);
};

// move to tests
/*

 const result1 = dashCaseToCamelCase('fantastic'); // expect 'fantastic'
 const result2 = dashCaseToCamelCase('fant-astic'); // expect 'fantAstic'
 const result3 = dashCaseToCamelCase('-fantastic'); // expect 'fantastic'
 const result4 = dashCaseToCamelCase('--fantastic'); // expect 'fantastic'
 const result5 = dashCaseToCamelCase('fantastic-'); // expect 'fantastic'
 const result6 = dashCaseToCamelCase('fantastic--'); // expect 'fantastic'
 const result7 = dashCaseToCamelCase('fant--astic'); // expect 'fantAstic'
 const result8 = dashCaseToCamelCase('fant-a-stic'); // expect 'fantAstic'
 const result9 = dashCaseToCamelCase(''); // expect ''
 const result10 = dashCaseToCamelCase('-a'); // expect 'a'
 const result11 = dashCaseToCamelCase('-'); // expect ''
 const result12 = dashCaseToCamelCase('--'); // expect ''

 console.log(result1);
 console.log(result2);
 console.log(result3);
 console.log(result4);
 console.log(result5);
 console.log(result6);
 console.log(result7);
 console.log(result8);
 console.log(result9);
 console.log(result10);
 console.log(result11);
 console.log(result12);
*/