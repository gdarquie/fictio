import Layout from '../../components/Layout';
import NarrativeList from '../../components/NarrativeList';
import CharacterList from '../../components/CharacterList';
import FictionItem from '../../components/FictionItem';
import ActionMenu from '../../components/ActionMenu';
import Journal from '../../components/Journal';
import Head from "next/head";
import fetch from 'isomorphic-unfetch';

const Fiction = (props) => {
    const fictionUuid = props.payload.uuid;
    return (
        <div>
            <Head>
                <title>Ficti : create your fiction</title>
                <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
            </Head>
    
            <Layout>
                <div className="container">
                    <div className="main">
                        <NarrativeList title={'Last Texts'} data={props.payload.narratives} />
                        <NarrativeList title={'Origins Narratives'} data={props.payload.origins} />
                        <NarrativeList title={'Other Narratives'} data={props.payload.followings} />
                    </div>
    
                    <aside>
                        <FictionItem title={props.payload.title} content={props.payload.content} createdAt={props.payload.created_at} />
                        <ActionMenu/>
                        <Journal/>
                        <CharacterList title={'My fiction Characters'} data={props.payload.characters} />
                    </aside>
                    
                </div>
                <style jsx>{`
                    .container {
                        display:grid;
                        grid-template-columns: 7fr 5fr;
                        border-right: 1px solid grey;
                        border-bottom: 1px solid grey;
                    }
    
                    aside {
                        padding: 3px 12px;
                    }
                `}</style>
            </Layout>
        </div>
    );
}

Fiction.getInitialProps = async function(context) {
    const {id} = context.query;
    const res = await fetch(process.env.edoAPIUrl+'fictions/'+id+'.json');
    const payload = await res.json();
    return { payload };
};

export default Fiction;
