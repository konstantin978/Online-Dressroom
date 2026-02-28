class UserService {
  login = (username, password) => {
    console.log(username, password);
    return { found: true, notMatch: false, role: "user" };
  };
}

module.exports = new UserService();
