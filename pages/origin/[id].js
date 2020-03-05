import fetch from 'isomorphic-unfetch';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Layout from '../../components/Layout';

const Origin = (props) => {
    const originUuid = props.payload.uuid;
    return (
        <Layout>
            <h1>Origin {props.payload[0].content} </h1>

            {props.payload.map(narrative => (
                <div>
                    <Card className='card'>
                        <CardContent>
                            <div>{narrative.uuid}</div>
                            {/* <div>{narrative.created_at}</div> */}
                            <div>{narrative.updated_at}</div>
                            <div>{narrative.content}</div>
                        </CardContent>
                    </Card>
                </div>
            ))};
                {/* {props.payload.slice(0,3).map(narrative => (
                    <Narrative key = {narrative.uuid} item = {narrative} />
                ))} */}
            <style jsx>{`
                .card {
                    margin-bottom: 10px;
                }
            `}</style>
        </Layout>
    );
}

Origin.getInitialProps = async function(context) {
    const {id} = context.query;
    const res = await fetch(process.env.edoAPIUrl+'origins/'+id+'.json');
    const payload = await res.json();
    return { payload };
};

export default Origin;