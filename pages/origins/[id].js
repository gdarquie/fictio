import fetch from 'isomorphic-unfetch';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Layout from '../../components/Layout';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const Origin = (props) => {
    const originUuid = props.payload.uuid;

    // when I click on a text, and when i am focus on a text content, I have a menu that appears
    

    return (
        <Layout>
            {/* <h1 className='origin-title'>{props.payload[0].content} </h1> */}

            {props.payload.map(narrative => (
                <article className='origin-card'>
                    <Card key = {narrative.uuid}>
                        <CardContent>
                            <TextareaAutosize className='editable-narrative-content'>
                                {narrative.content}
                            </TextareaAutosize>

                            {/* <div><i>dernière modification : {narrative.updated_at}</i></div> */}
                            {/* <div>{narrative.lvl}</div> */}
                            {/* <div>{narrative.content}</div> */}
                            <div className='delete action'>x</div>
                        </CardContent>
                    </Card>
                </article>
            ))};
                {/* {props.payload.slice(0,3).map(narrative => (
                    <Narrative key = {narrative.uuid} item = {narrative} />
                ))} */}
            <style jsx global>{`
                .origin-title {
                    color:red;
                }

                .origin-card{
                    margin: auto;
                    width: 600px;
                    margin-top: 6px;
                    position: relative;
                }

                article {
                    color: white;
                    background: #262626;
                }

                .action {
                    cursor: pointer;
                    text-decoration: underline
                  }

                .delete:hover {
                    color: black;
                    cursor:pointer;
                }

                .delete {
                    position: absolute;
                    right: 1px;
                    top: 1px;
                    padding: 0px 3px;
                    text-decoration: none;
                    color: grey;
                }
                
            `}</style>

            <style jsx global>{`
                .MuiPaper-root {
                    background: #262626;
                    color: white;
                }

                .origin-card {
                    background: #262626;
                    color: white;
                }

                .editable-narrative-content {
                    background: #262626;
                    color:white;
                    font-size: 16px;
                    width: 100%;
                    border: none;
                    font-family: Roboto, 'sans-serif';
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