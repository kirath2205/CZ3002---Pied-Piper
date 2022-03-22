import { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '@/utils/constants/config';
import axios from 'axios';
import { getCookieValue } from '@/utils/cookieParser';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const access = getCookieValue(req, 'access');

        if (!access) {
            return res.status(217).json({
                error: 'User forbidden from making the request',
            });
        }

        try {
            const apiRes = await axios.get(`${API_URL}/org_view/get_all_past_campaign_details_for_org/`, {
                headers: {
                    Authorization: access,
                },
            });

            const data = await apiRes.data;

            if (apiRes.status === 200) {
                return res.status(200).json(data);
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
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: `Method ${req.method} now allowed` });
    }
};
