exports.CreateUsersDTO = {
  fullname: String,
  email: String,
  password: String,
};

exports.EditUsersDTO = {
  usersId: Number | null,
  fullname: String,
  email: String,
};

exports.UpdateStatusUsersDTO = {
  usersId: Number | null,
  status: "active" | "inactive",
};

exports.ByIdUsersDTO = {
  usersId: Number | String,
};

exports.DetailUsersDTO = {
  usersId: Number | String,
};
