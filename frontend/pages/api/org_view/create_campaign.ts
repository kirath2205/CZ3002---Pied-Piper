import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '@/utils/constants/config';
import axios from 'axios';
import { getLatestAccessToken } from '@/utils/cookieParser';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const access = await getLatestAccessToken(req, res);

        if (!access) {
            return res.status(400).json({ error: 'Something went wrong, refresh the page and try again.' });
        }
        // const { location, skills, date_time, end_time, description, volunteer_count, minimum_age } = req.body;

        try {
            const apiRes = await axios.post(
                `${API_URL}/org_view/create_campaign/`,
                { ...req.body },
                {
                    headers: {
                        Authorization: access,
                    },
                }
            );

            const data = await apiRes.data;

            if (apiRes.status === 200) {
                return res.status(200).json({
                    success: 'Campaign Created Successfully.',
                });
            } else {
                return res.status(apiRes.status).json({
                    error: data,
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: err,
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} now allowed` });
    }
};
