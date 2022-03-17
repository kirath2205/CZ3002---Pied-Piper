import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '@/utils/constants/config';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { location,skills,date,time,description,title,duration,volunteer_count,minimum_age} = req.body;
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const access = cookies.access ?? false;

        try {
            const apiRes = await axios.post(`${API_URL}/org_view/create_campaign/`, { location,skills,date,time,description,title,duration,volunteer_count,minimum_age }, {headers: {
                Authorization: access
            }});

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