import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '@/utils/constants/config';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            const apiRes = await axios.post(`${API_URL}/auth/login/`, { email, password });

            const data = await apiRes.data;

            if (apiRes.status === 226) {
                res.setHeader('Set-Cookie', [
                    cookie.serialize('access', data.access_token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        maxAge: 60 * 5 - 10,
                        sameSite: 'strict',
                        path: '/',
                    }),
                    cookie.serialize('refresh', data.refresh_token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        maxAge: 60 * 60 * 24,
                        sameSite: 'strict',
                        path: '/',
                    }),
                ]);

                return res.status(226).json({
                    accountType: data.account_type,
                });
            } else {
                return res.status(apiRes.status).json({
                    error: data,
                });
            }
        } catch (err) {
            return res.status(500).json({
                error: err,
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} now allowed` });
    }
};
