import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '@/utils/constants/config';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const refresh = cookies.refresh ?? false;
        const access = cookies.access ?? false;
        if (access) {
            return res.status(200).json({
                message: 'Still valid',
            });
        }

        if (!refresh) {
            return res.status(221).json({
                error: 'User unauthorized to make this request',
            });
        }

        try {
            const apiRes = await axios.post(`${API_URL}/auth/refresh_jwt_token/`, null, {
                headers: {
                    Authorization: refresh,
                },
            });

            const data = await apiRes.data;

            if (apiRes.status === 200) {
                res.setHeader('Set-Cookie', [
                    cookie.serialize('access', data.access_token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        maxAge: 60 * 5 - 10,
                        sameSite: 'strict',
                        path: '/',
                    }),
                    cookie.serialize('refresh', refresh, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        maxAge: 60 * 60 * 24 * 200,
                        sameSite: 'strict',
                        path: '/',
                    }),
                ]);
                return res.status(200).json({
                    success: 'Refresh request successful',
                });
            } else {
                return res.status(apiRes.status).json({
                    error: data,
                });
            }
        } catch (err) {
            return res.status(500).json({
                error: 'Something went wrong when trying to fulfill refresh request',
            });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
};
