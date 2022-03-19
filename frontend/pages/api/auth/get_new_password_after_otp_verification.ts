import { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '@/utils/constants/config';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { password, email } = req.body;

        try {
            const apiRes = await axios.post(`${API_URL}/auth/get_new_password_after_otp_verification/`, {
                password,
                email,
            });

            const data = await apiRes.data;

            if (apiRes.status === 225) {
                return res.status(225).json({
                    success: 'Password Changed successfully.',
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
