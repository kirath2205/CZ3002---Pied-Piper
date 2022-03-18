import { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '@/utils/constants/config';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { type, email } = req.body;

        try {
            const apiRes = await axios.post(`${API_URL}/auth/verify_email/`, { type, email });

            const data = await apiRes.data;

            if (apiRes.status === 200) {
                return res.status(224).json({
                    success: 'Verification email sent',
                });
            } else {
                return res.status(400).json({
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