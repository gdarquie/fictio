import TextBox from '../../atoms/TextBox/TextBox';
import NarrativeMenu from '../NarrativeMenuMolecule/NarrativeMenuMolecule';
import CrossDelete from '../../atoms/CrossDelete/CrossDelete';
import IconDisplay from '../../atoms/IconDisplay/IconDisplay';
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Narrative = props => {
    const [narrativeState, setNarrativeState] = useState(props.narrative);

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

    function displayIconDisplay() {
        if(props.narrative.children.length > 0) {
            return  <IconDisplay />
        }
    }
    
    return (
        <div>  
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
                                narrative={narrativeState} 
                                saveNarrative={saveNarrative} 
                                setContent={setContent}
                            />
                        </aside>

                            <div className = 'content'>
                                
                                <div className="textBox">
                                    <TextBox content={narrativeState.content} setContent={setContent} />
                                </div>
                                
                                <div className = 'delete'>
                                    <CrossDelete />
                                </div>

                                <div className = 'display'>
                                    {displayIconDisplay()}
                                </div>

                            </div>
                    </article>
                )}
            </Draggable>
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
                }

                .delete {
                    position: absolute;
                    right: 6px;
                    top: 3px;
                    color: white;
                }

                .content {
                    width: 650px;
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