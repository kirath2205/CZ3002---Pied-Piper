import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '@/utils/constants/config';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const apiRes = await axios.post(`${API_URL}/auth/register`, req.body);

            const data = await apiRes.data;

            if (apiRes.status === 200) {
                return res.status(200).json({ success: data.success });
            } else {
                return res.status(apiRes.status).json({
                    error: data,
                });
            }
        } catch (err) {
            return res.status(500).json({
                error: 'Something went wrong when registering for an account',
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
};
