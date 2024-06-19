import axios from "axios";

const API_URL = "https://localhost:7049/api/account";

export interface CreateAccountCommand {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginCommand {
  email: string;
  password: string;
}

export interface LoginDto {
  token: string;
}

export interface AccountDto {
  balance: number;
  userId: number;
}

export const register = async (
  createAccount: CreateAccountCommand
): Promise<AccountDto> => {
  const response = await axios.post<AccountDto>(
    `${API_URL}/register`,
    createAccount
  );
  return response.data;
};

export const login = async (loginUser: LoginCommand): Promise<LoginDto> => {
  const response = await axios.post<LoginDto>(`${API_URL}/login`, loginUser);
  return response.data;
};
