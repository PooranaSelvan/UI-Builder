export const SampleQuery = "";
export const loginUserQuery = "SELECT * FROM users where email = ?";
export const signUpUserQuery = "INSERT INTO users(name, email, password, userStatus) values(?, ?, ?, ?)";   
export const getUserPagesQuery = "SELECT * FROM pages JOIN projects ON pages.projectId = projects.projectId WHERE projects.userId = ?";
export const getUserComponentsQuery = "SELECT * FROM components WHERE userId = ?";