import React from 'react';
import clsx from 'clsx';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';

const TextBox = props => {
    const useStyles = makeStyles({
        root: {
          color: 'white',
          background: '#262626',
          border: 'none',
          width: '100%',
          maxHeight: '150px',
          minHeight: '25px',
          maxWidth: '620px' 
        },
      });

    function handleChange(event) {
        props.setContent(event.target.value);
    }

    const classes = useStyles();
    const className = clsx(classes.root);

    return (
            <article className='textBox'>
                <TextareaAutosize
                    onChange={handleChange}
                    // defaultValue={props.content}
                    value={props.content}
                    aria-label="empty textarea"
                    placeholder="You can write here"
                    className={clsx(className)}
                />
            <style jsx>{`
                article {
                    padding: 10px 20px;
                    background: #262626;
                    color: white;
                    max-width: 650px;
                    border-radius: 5px;
                    min-height: 45px;
                    max-height: 150px;
                }

                .textField {
                    color: white;
                    background: black;
                    width: 100%;
                }
            `}</style>
            </article>
    );
}

export default TextBox;