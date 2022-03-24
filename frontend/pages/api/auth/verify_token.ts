import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '@/utils/constants/config';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const access_token = cookies.access ?? false;

        if (!access_token) {
            return res.status(217).json({
                error: 'User forbidden from making the request',
            });
        }

        try {
            const apiRes = await axios.post(`${API_URL}/auth/verify_jwt_token/`, {
                access_token,
            });

            const data = await apiRes.data;

            if (apiRes.status === 200) {
                return res.status(200).json({ accountType: data.account_type });
            } else {
                return res.status(apiRes.status).json({
                    error: data,
                });
            }
        } catch (err) {
            return res.status(500).json({
                error: 'Something went wrong when trying to authenticate',
            });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
};
