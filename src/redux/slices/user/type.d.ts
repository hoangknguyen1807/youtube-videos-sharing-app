interface User {
    id: string;
    email: string;
    token?: string;
}

interface AuthForm {
    email: string;
    password: string;
}

type DepositError = {
    errors: {
        amount?: {
            messages: string[];
        };
    };
    message?: string;
};
