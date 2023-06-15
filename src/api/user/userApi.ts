import axiosClient from '../clientApi';

interface LoginApiResponse {
    token: string;
}
interface UserDetailApiResponse {
    id: string;
    email: string;
    deposit: {
        amount: string;
    };
}

export const loginAPI = (email: string, password: string) => {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const response = await axiosClient.post<LoginApiResponse>('/auth/login', {
                email,
                password
            });
            resolve(response.data.token);
        } catch (error) {
            reject(error);
        }
    });
};

export const logoutAPI = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axiosClient.delete('/auth/logout');
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
};

export const registerAPI = (email: string, password: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            await axiosClient.post('/auth/register', {
                email,
                password
            });
            resolve('');
        } catch (error) {
            reject(error);
        }
    });
};

export const getUserDetailAPI = (token: string) => {
    return new Promise<User>(async (resolve, reject) => {
        try {
            const response = await axiosClient.get<UserDetailApiResponse>('/users/me', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            resolve({
                id: response.data.id,
                email: response.data.email,
                token: token
            });
        } catch (error) {
            reject(error);
        }
    });
};
