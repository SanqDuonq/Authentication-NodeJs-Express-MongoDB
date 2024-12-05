import jwt from 'jsonwebtoken'
import config from 'config'


export function signJwt(object: Object,keyname: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey', options?: jwt.SignOptions | undefined){
    const signingKey = Buffer.from(config.get<string>(keyname),'base64').toString('ascii');
    return jwt.sign(object,signingKey,{
        ...(options && options),
        algorithm: 'RS256'
    })
}

export function verifyJwt(){

}