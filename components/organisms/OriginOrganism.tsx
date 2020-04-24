import NarrativeMolecule from '../molecules/NarrativeMolecule/NarrativeMolecule';
import NarrativeList from '../model/NarrativesList';
import React, {useState} from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { resetServerContext } from 'react-beautiful-dnd';
import styles from './OriginOrganism.module.css';

const Origin = props => {
    // Configuration for drag and drop
    // we reset SSR context
    resetServerContext();

    // set State for column
    const [columnState, setColumnState] = useState('');
    const [activeUuid, setActiveUuid] = useState('');
    const [hiddenNarrativesList, setHiddenNarrativesList] = useState([]);
    const narrativeList = new NarrativeList(props.narratives);

    /**
     *
     * @param narrativeUuid
     */
    function postReorder(narrativeUuid) {

        const body = {
            "narrativeUuid": narrativeUuid,
            "position": 1,
            "parentUuid": "6284e5ac-09cf-4334-9503-dedf31bafdd0" //todo = replace with dynamic data
          };

        const response = fetch(process.env.edoAPIUrl + 'reorders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })

        //todo: replace with a real modal
        alert("Reorder ok for " + narrativeUuid);
    }

    /**
     * 
     * @param uuid 
     */
    function openModalOrigin(uuid) {
        props.openModal(uuid);
    }

    /**
     * 
     * @param key 
     */
    function handleClick(narrativeUuid) {
        setActiveUuid(narrativeUuid);
    }

    /**
     * 
     * @param result 
     */
    function handleOnDragEnd(result) {
        const {destination, source, draggableId} = result;

        if(!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        // we keep in a var the narrative we have dragged
        const selectedNarrative = props.narratives[source.index];
        // we remove the narrative that we have moved        
        props.narratives.splice(source.index, 1);
        // we add the narrative to a new place
        props.narratives.splice(destination.index, 0, selectedNarrative);

        // send a post resquest  to edo to save the new position
        postReorder(selectedNarrative.uuid);
    }

    /**
     * 
     * @param children 
     */
    function displayChildren(children) {
        var response = [];
        
        if(children) {
            children.map( (child, index) => {
                response.push(displayNarrative(child, index))
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

        if (!hiddenNarrativesList.includes(narrative.uuid)) {
            response.push(
                <article className={styles.lvl} key={narrative.uuid}>
                    <div className="parent">
                        <NarrativeMolecule 
                            isActive={`${(narrative.uuid === activeUuid) ? true : false}`}
                            // isActive={isActive}
                            key = {narrative.uuid} 
                            narrative={narrative} 
                            onClick={() => handleClick(narrative.uuid)}
                            openModal={openModalOrigin} 
                            index = {index} //todo : to check
                            draggableId = {narrative.uuid}
                            originHandlesDisplayIconClick = {handleNarrativeDisplay}
                        />
                    </div>
                    <div className={styles.children}>
                        {displayChildren(narrative.children)}
                    </div>
                </article>
            );
        }

        return response;
    }

    function handleNarrativeDisplay(list) {
        // todo : upgrade by keeping all the uuid
        setHiddenNarrativesList(list);    
    }

    return (
        <div className={styles.element}>
            <DragDropContext onDragEnd={handleOnDragEnd} className='dropContext element' >
                <Droppable droppableId='droppable-1' >
                    { provided => (
                        <div 
                            { ...provided.droppableProps } 
                            ref={provided.innerRef}
                            className='narrativesList' 
                        >
                            {displayNarrative(props.narratives[0])}
                            {provided.placeholder}
                        </div>
                    )}

                </Droppable>
            </DragDropContext>
            <style jsx>{`
                p {
                    color:white;
                }

            `}</style>
        </div>
    );
}

export default Origin;