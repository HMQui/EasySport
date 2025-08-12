export interface refreshTokenInterface {
    message: string;
    access_token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
        avatar: string;
    };
}
