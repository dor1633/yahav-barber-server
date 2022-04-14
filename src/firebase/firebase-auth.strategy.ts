import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import * as firebaseConfig from './firebase.config.json';
import * as firebase from 'firebase-admin';
import { FirebaseUserType } from '../common/firebaseUser.decorator';
import { UsersValidator } from 'src/users/users.validator';

const firebase_params = {
    type: firebaseConfig.type,
    projectId: firebaseConfig.project_id,
    privateKeyId: firebaseConfig.private_key_id,
    privateKey: firebaseConfig.private_key,
    clientEmail: firebaseConfig.client_email,
    clientId: firebaseConfig.client_id,
    authUri: firebaseConfig.auth_uri,
    tokenUri: firebaseConfig.token_uri,
    authProviderX509CertUrl: firebaseConfig.auth_provider_x509_cert_url,
    clientC509CertUrl: firebaseConfig.client_x509_cert_url,
};

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
    Strategy,
    'firebase-auth',
) {
    private defaultApp: firebase.app.App;;
    constructor(private usersValidator: UsersValidator) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
        this.defaultApp = firebase.initializeApp({
            credential: firebase.credential.cert(firebase_params),
        });
    }
    async validate(token: string) {
        const firebaseUser: FirebaseUserType = await this.defaultApp
            .auth()
            .verifyIdToken(token, true)
            .catch((err) => {
                console.log(err);
                throw new UnauthorizedException(err.message);
            });

        if (!firebaseUser) {
            throw new UnauthorizedException();
        }

        const user = await this.usersValidator.getOrThrowIfPhoneNumberDoesNotExist(firebaseUser.phone_number);
        firebaseUser.userId = user._id.toString();

        return firebaseUser;
    }
}