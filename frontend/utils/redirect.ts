import { GetServerSidePropsContext } from 'next';

export const redirectToHome = (ctx: GetServerSidePropsContext) => {
    const cookies = ctx.req.cookies;
    const access = cookies['access'] ?? false;
    if (access) {
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
        };
    }
    return { props: {} };
};
