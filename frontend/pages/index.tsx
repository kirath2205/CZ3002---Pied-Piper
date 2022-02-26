import Layout from '@/components/shared/Layout';
import Head from 'next/head';
import Home from '@/components/home/Home';

export default function HomePage() {
	return (
		<>
			<Head>
				<title>VolunteerGoWhere</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Layout>
				<Home />
			</Layout>
		</>
	);
}
