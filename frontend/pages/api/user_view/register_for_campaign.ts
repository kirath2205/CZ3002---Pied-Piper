import { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '@/utils/constants/config';
import axios from 'axios';
import { getCookieValue } from '@/utils/cookieParser';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const access = getCookieValue(req, 'access');

        if (!access) {
            return res.status(217).json({
                error: 'Something went wrong. Refresh the page and try again.',
            });
        }

        const { campaign_id } = req.body;

        try {
            const apiRes = await axios.post(
                `${API_URL}/user_view/register_for_campaign/`,
                { campaign_id },
                {
                    headers: {
                        Authorization: access,
                    },
                }
            );

            const data = await apiRes.data;

            if (apiRes.status === 229) {
                return res.status(229).json({ message: 'Registered for campaign succesfully' });
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
