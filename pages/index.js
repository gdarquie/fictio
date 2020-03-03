import Layout from '../components/Layout';
import Head from "next/head";
import Link from 'next/link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const Index = (props) => {
    const fictionUuid = '1b7df281-ae2a-40bf-ad6a-ac60409a9ce6';

    return (
        <div>
            <Head>
                <title>Ficti : create your fiction</title>
                <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
    
            <Layout>
                <Link href="/fictions/1b7df281-ae2a-40bf-ad6a-ac60409a9ce6">
                    <a>My Fiction</a>
                </Link>
                <Button variant="contained" color="primary">
                    Hello World
                </Button>
                <Card>
                    <CardContent>
                        hello
                    </CardContent>
                </Card>
            </Layout>
        </div>
    );
}

export default Index;
