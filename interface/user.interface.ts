export interface IUser {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    verificationCode?: string | number,
    passwordResetCode?: string,
    verified?: boolean
}