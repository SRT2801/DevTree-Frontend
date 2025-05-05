export interface IUser{
    handle: string;
    name: string;
    email: string;
}


export interface RegisterForm  extends Pick<IUser, 'handle' | 'email' |'name'>  {
    password: string;
    password_confirmation: string;
}

export interface LoginForm extends Pick<IUser, 'email'> {
    password: string;
}