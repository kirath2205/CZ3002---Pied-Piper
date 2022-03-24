import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import axios from 'axios';
import { API_URL } from '@/utils/constants/config';

const getCookieValue = (req: NextApiRequest, name: string) => {
    const cookies = cookie.parse(req.headers.cookie ?? '');
    const value = cookies[name] ?? false;
    return value;
};

const getLatestAccessToken = async (req: NextApiRequest, res: NextApiResponse) => {
    const access = getCookieValue(req, 'access');
    const refresh = getCookieValue(req, 'refresh');

    if (!access) {
        try {
            const response = await axios.post(`${API_URL}/auth/refresh_jwt_token/`, null, {
                headers: {
                    Authorization: refresh,
                },
            });

            const data = await response.data;

            if (response.status === 200) {
                res.setHeader('Set-Cookie', [
                    cookie.serialize('access', data.access_token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        maxAge: 60 * 5 - 10,
                        sameSite: 'strict',
                        path: '/',
                    }),
                ]);
            }
            return data.access_token;
        } catch (err) {
            return null;
        }
    }
    return access;
};

export { getCookieValue, getLatestAccessToken };
