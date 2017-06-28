
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

