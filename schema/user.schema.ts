import {object, string, z} from 'zod'

export const createUserSchema = object({
    body: object({
        firstName: string({
            required_error: 'First name is required'
        }),
        lastName: string({
            required_error: 'Last name is required'
        }),
        password: string({
            required_error: 'Password is required'
        })
        .min(8,{message: 'Password is too short - should be min 8 character(s)'}),
        confirmPassword: string({
            required_error: 'ConfirmPassword is required'
        }),
        email: string({
            required_error: 'Email is required'
        })
        .email({message: 'Email is not valid'})
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Password do not match',
        path: ['confirmPassword']
    })
})

export const verifyUserSchema = object({
    params: object({
        id: string(),
        verificationCode: string()
    })
})

export type CreateUserInput = z.infer<typeof createUserSchema>['body']

export type VerifyUserInput = z.infer<typeof verifyUserSchema>['params']