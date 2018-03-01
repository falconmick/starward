export const loginUser = (req, res) => {
  const { username, password } = req.body;
  console.log('username: ', username);
  console.log('password: ', password);
};
