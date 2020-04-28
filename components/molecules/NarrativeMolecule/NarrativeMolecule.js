import TextBox from '../../atoms/TextBox/TextBox';
import NarrativeMenu from '../NarrativeMenuMolecule/NarrativeMenuMolecule';
import CrossDelete from '../../atoms/CrossDelete/CrossDelete';
import IconDisplay from '../../atoms/IconDisplay/IconDisplay';
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const Narrative = props => {
    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          background: "black",
        },
        heading: {
          fontSize: theme.typography.pxToRem(15),
          fontWeight: theme.typography.fontWeightRegular,
          background: "black",
        },
      }));

    const classes = useStyles();

    // set hooks state
    const [narrativeState, setNarrativeState] = useState(props.narrative);
    // const [openState, setOpenState] = useState('true');

    function openModalNarrative() {
        props.openModal(narrativeState.uuid);
    }

    function setContent(content) {
        narrativeState.content = content;
        setNarrativeState(narrativeState);  
    }

    function saveNarrative() {
        const body = {
            "uuid": narrativeState.uuid,
            "content": narrativeState.content,
            "type": "narrative",
            "fiction_uuid": "1b7df281-ae2a-40bf-ad6a-ac60409a9ce6"
        };

        const response = fetch(process.env.edoAPIUrl+'narratives', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })

        //todo: replace with a real modal
        alert("Save ok");
    }

    function handleClick() {
        props.onClick(props.narrative.uuid);
    }

    function getClassNames() {
        if (props.isActive == 'true') {
            return "";
        }
        else {
            return "hidden";
        }
    }

    /**
     * 
     * @param children 
     */
    function displayChildren(narrative) {
        var response = [];

        if(narrative.children.length > 0) {
            narrative.children.map( (child, index) => {
                response.push(
                    <ExpansionPanelDetails>
                        {displayNarrative(child, index)}
                    </ExpansionPanelDetails>
                    )
            })
        }

        return response;
    }
    
    /**
     * 
     * @param narrative 
     * @param index 
     */
    function displayNarrative(narrative, index = 0) {

        var response = [];

        if (narrative.children.length === 0) {
            response.push(
                <article key={narrative.uuid}>
                    <ExpansionPanel 
                    >
                            <ExpansionPanelSummary
                                expandIcon={narrative.children.length > 0 ? <ExpandMoreIcon /> :null}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                {/* <Typography className={classes.heading}>Expansion Panel 1</Typography> */}

                                <Typography className={classes.heading}>
                                    <Draggable key={props.narrative.uuid} draggableId={props.draggableId} index={props.index}>
                                        { provided => (
                                            <article  
                                                className='element'
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                onClick={handleClick}
                                            >

                                                <aside className={getClassNames()}>
                                                    <NarrativeMenu
                                                        openModal={openModalNarrative} 
                                                        narrative={narrative} 
                                                        saveNarrative={saveNarrative} 
                                                        setContent={setContent}
                                                    />
                                                </aside>

                                                <div className = 'content'>
                                                    
                                                    <div className="textBox">
                                                        <TextBox content = {narrative.content} setContent={setContent} />
                                                    </div>
                                                    
                                                    <div className = 'delete'>
                                                        <CrossDelete />
                                                    </div>
                                                    
                                                    <div className = 'display'>
                                                        <IconDisplay />
                                                    </div>
                                                </div>
                                            </article>
                                        )}
                                    </Draggable>
                                </Typography>
                            </ExpansionPanelSummary>

                            {displayChildren(narrative)}
        
                    </ExpansionPanel>
                
                </article>
            )
        }
        else {
            response.push(
                <article key={narrative.uuid}>
                    <ExpansionPanel 
                    >
                            <ExpansionPanelSummary
                                expandIcon={narrative.children.length > 0 ? <ExpandMoreIcon /> :null}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                {/* <Typography className={classes.heading}>Expansion Panel 1</Typography> */}

                                <Typography className={classes.heading}>
                                    <Draggable key={props.narrative.uuid} draggableId={props.draggableId} index={props.index}>
                                        { provided => (
                                            <article  
                                                className='element'
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                onClick={handleClick}
                                            >

                                                <aside className={getClassNames()}>
                                                    <NarrativeMenu
                                                        openModal={openModalNarrative} 
                                                        narrative={narrative} 
                                                        saveNarrative={saveNarrative} 
                                                        setContent={setContent}
                                                    />
                                                </aside>

                                                <div className = 'content'>
                                                    
                                                    <div className="textBox">
                                                        <TextBox content = {narrative.content} setContent={setContent} />
                                                    </div>
                                                    
                                                    <div className = 'delete'>
                                                        <CrossDelete />
                                                    </div>
                                                    
                                                    <div className = 'display'>
                                                        <IconDisplay />
                                                    </div>
                                                </div>
                                            </article>
                                        )}
                                    </Draggable>
                                </Typography>
                            </ExpansionPanelSummary>

                            {displayChildren(narrative)}
        
                    </ExpansionPanel>
                
                </article>
            );
        }

        return response;
    }
    


    return (
        <div>
            {displayNarrative(narrativeState)}

            
            <style jsx>{`
                .element {
                    display: flex;
                    align-items: center;
                }

                .textBox {
                    margin-bottom: 9px;
                }
                
                .display {
                    position: absolute;
                    bottom: 1px;
                    width: 4%;
                    left: 46%;
                    color: white;
                    cursor: pointer;
                }

                .delete {
                    position: absolute;
                    right: 6px;
                    top: 3px;
                    color: white;
                }

                .content {
                    // width: 650px;
                    width: 100%;
                    margin-top: 5px;
                    position: relative;
                }

                .hidden {
                    visibility: hidden;
                }

            `}</style>
        </div>
    );
}

export default Narrative;