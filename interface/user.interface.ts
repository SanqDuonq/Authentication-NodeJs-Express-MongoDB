export interface IUser extends Document{
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    verificationCode?: string | number,
    passwordResetCode?: string | null
    verified?: boolean
}