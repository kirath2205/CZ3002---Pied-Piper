import { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '@/utils/constants/config';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { email } = req.body;

        try {
            const apiRes = await axios.post(`${API_URL}/auth/initiate_password_reset/`, { email });

            const data = await apiRes.data;

            if (apiRes.status === 220) {
                return res.status(220).json({
                    success: 'Sent OTP',
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
