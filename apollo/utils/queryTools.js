
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