import { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '@/utils/constants/config';
import axios from 'axios';
import { getCookieValue, getLatestAccessToken } from '@/utils/cookieParser';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const access = await getLatestAccessToken(req, res);

        if (!access) {
            return res.status(217).json({ error: 'User forbidden from making request' });
        }

        const { name, address } = req.body;

        try {
            const apiRes = await axios.post(
                `${API_URL}/org_view/update_org_details/`,
                { name, address },
                {
                    headers: {
                        Authorization: access,
                    },
                }
            );

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
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} now allowed` });
    }
};
