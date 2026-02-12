export const SampleQuery = "";
export const loginUserQuery = "SELECT * FROM users where email = ?";
export const signUpUserQuery = "INSERT INTO users(name, email, password, userStatus) values(?, ?, ?, ?)";   