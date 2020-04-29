import NarrativeMolecule from '../molecules/NarrativeMolecule/NarrativeMolecule';
import React, {useState} from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { resetServerContext } from 'react-beautiful-dnd';
import styles from './OriginOrganism.module.css';
import OriginModel from '../model/Origin';
import { makeStyles } from '@material-ui/core/styles';

const Origin = props => {
    // Configuration for drag and drop
    // we reset SSR context
    resetServerContext();

    // set State for column
    const [columnState, setColumnState] = useState('');
    const [activeUuid, setActiveUuid] = useState('');
    // const [hiddenNarrativesList, setHiddenNarrativesList] = useState([]);
    const origin = new OriginModel(props.narratives[0]);
    const [originState, setOriginState] = useState(origin);
    

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
                            <NarrativeMolecule 
                                    isActive={`${(originState.uuid === activeUuid) ? true : false}`}
                                    key = {originState.uuid} 
                                    narrative={originState} 
                                    onClick={() => handleClick(originState.uuid)}
                                    openModal={openModalOrigin} 
                                    index = {0} //todo : to check
                                    draggableId = {originState.uuid}
                                    dipslay= 'true'
                            />
                            
                            {provided.placeholder}

                        </div>
                    )}

                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default Origin;