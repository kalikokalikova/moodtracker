import jwt
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import bcrypt
from datetime import datetime, timedelta


class AuthHandler():
    security = HTTPBearer()
    secret = 'SECRET'

    def get_password_hash(self, password):
        password_bytes = password.encode("utf-8")
        hashed_password = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
        return hashed_password

    def verify_password(self, plain_password, hashed_password):
        password_bytes = plain_password.encode("utf-8")
        return bcrypt.checkpw(password_bytes, hashed_password.encode("utf-8"))

    def encode_token(self, user_id):
        payload = {
            'exp': datetime.utcnow() + timedelta(days=0, minutes=1),
            'iat': datetime.utcnow(),
            'sub': user_id,
        }
        return jwt.encode(
            payload,
            self.secret,
            algorithm='HS256',
        )

    def decode_token(self, token):
        try:
            payload = jwt.decode(token, self.secret, algorithms=['HS256'])
            return payload['sub']
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail='Signature has expired')
        except jwt.InvalidTokenError as e:
            raise HTTPException(status_code=401, detail='Invalid token')

    def auth_wrapper(self, auth: HTTPAuthorizationCredentials = Security(security)):
        return self.decode_token(auth.credentials)
