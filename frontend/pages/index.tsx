import Layout from '@/components/shared/Layout';
import Head from 'next/head';
import Home from '@/components/home/Home';

export default function HomePage() {
    return (
        <Layout>
            <Home />
        </Layout>
    );
}
