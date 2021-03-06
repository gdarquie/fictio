import React from 'react';
import { Add } from '@material-ui/icons';

const IconAdd = props => {

    function saveContent() {
        alert('Create new narrative');
    }

    return (
        <article className='element' onClick={saveContent} >
            <Add fontSize="small"/>
            
            <style jsx>{`
                article {
                    background: black;
                    color:white;
                    width:20px;
                    height:20px;
                    border:1px solid white;
                    border-radius: 50%;
                    text-align:center;
                    padding:10px 10px 10px 10px;
                }

                article:hover {
                    color: grey;
                    cursor: pointer;
                    border: grey 1px solid;
                }
            `}</style>
        </article>
    );
}

export default IconAdd;