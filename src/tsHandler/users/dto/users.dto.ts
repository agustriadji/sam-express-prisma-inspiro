export interface CreateUsersDTO {
  fullname: string;
  email: string;
  password: string;
}

export interface EditUsersDTO {
  userId: number | null;
  fullname: string;
  email: string;
}

export interface UpdateStatusUsersDTO {
  userId: number | null;
  status: "active" | "inactive";
}

export interface ByIdUsersDTO {
  userId: number | string;
}

export interface DetailUsersDTO {
  userId: number | string;
}
