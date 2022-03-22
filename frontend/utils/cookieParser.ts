import { NextApiRequest } from 'next';
import cookie from 'cookie';

const getCookieValue = (req: NextApiRequest, name: string) => {
    const cookies = cookie.parse(req.headers.cookie ?? '');
    const value = cookies[name] ?? false;
    return value;
};

export { getCookieValue };
