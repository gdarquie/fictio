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

    // /**
    //  * 
    //  * @param children 
    //  */
    // function displayChildren(narrative) {
    //     var response = [];

    //     if(narrative.children.length > 0) {
    //         narrative.hasChild = 'true';
    //         narrative.children.map( (child, index) => {
    //             response.push(
    //                 <ExpansionPanelDetails>
    //                     {displayNarrative(child, index)}
    //                 </ExpansionPanelDetails>
    //                 )
    //         })
    //     }

    //     return response;
    // }
    
    // /**
    //  * 
    //  * @param narrative 
    //  * @param index 
    //  */
    // function displayNarrative(narrative, index = 0) {

    //     var response = [];

    //     if (narrative.children.length === 0) {
    //         response.push(
    //             <NarrativeMolecule 
    //                 isActive={`${(narrative.uuid === activeUuid) ? true : false}`}
    //                 key = {narrative.uuid} 
    //                 narrative={narrative} 
    //                 onClick={() => handleClick(narrative.uuid)}
    //                 openModal={openModalOrigin} 
    //                 index = {index} //todo : to check
    //                 draggableId = {narrative.uuid}
    //             />
    //         )
    //     }
    //     else {
    //     response.push(
    //         <article className={styles.lvl} key={narrative.uuid}>
    //             <ExpansionPanel 
    //                 // expanded={true}
    //             >
    //                     <ExpansionPanelSummary
    //                         expandIcon={narrative.children.length > 0 ? <ExpandMoreIcon /> :null}
    //                         aria-controls="panel1a-content"
    //                         id="panel1a-header"
    //                     >
    //                         {/* <Typography className={classes.heading}>Expansion Panel 1</Typography> */}

    //                         <Typography className={classes.heading}>
    //                             <div className="parent">
    //                                 <NarrativeMolecule 
    //                                     isActive={`${(narrative.uuid === activeUuid) ? true : false}`}
    //                                     key = {narrative.uuid} 
    //                                     narrative={narrative} 
    //                                     onClick={() => handleClick(narrative.uuid)}
    //                                     openModal={openModalOrigin} 
    //                                     index = {index} //todo : to check
    //                                     draggableId = {narrative.uuid}
    //                                     // update = {updateNarrative}
    //                                     dipslay= 'true'
    //                                 />
    //                             </div>
    //                         </Typography>
    //                     </ExpansionPanelSummary>

    //                     {displayChildren(narrative)}
    
    //             </ExpansionPanel>
    //         </article>
    //     );
    //     }

    //     return response;
    // }

    // function removeChildNarrative(narrativeUuid) {
    //     let updatedOrigin = originState;

    //     // only if origins has one + child
    //     if (updatedOrigin.children.length > 0) {
    //         //todo: add recursivity
    //         updatedOrigin.children.map((child) => {
    //             if (child.uuid === narrativeUuid) {
    //                 if (child.children.length > 0) {
    //                     const hidden_children = [];
    //                     child.children.map( grandChild => {
    //                         hidden_children.push(grandChild);
    //                     })
    //                     child.hidden_children = hidden_children;
    //                     console.log(child.hidden_children);

    //                     child.children.splice(0, child.children.length);
    //                 }
    //             }
    //         })
    //     }
    //     // todo : remove the narrative from the origin

    //     setOriginState(updatedOrigin); 
    // }

    // function addNarratives(narratives) {
    //     console.log(narratives[0].content);
    // }

    /**
     * description : toogle the narrative display
     * todo: use on narrative, not on origin parent only
     */
    // function toogleNarrativeDisplay() {
    //     const origin = originState;

    //     if (origin.display === 'false') {
    //         origin.display = 'true';
    //     }
    //     else {
    //         origin.display = 'false';
    //     }

    //     setOriginState(origin);
    // }

    // function testMe() {
    //     toogleNarrativeDisplay();
    //     alert(originState.display);
    // }

    // function updateNarrative(uuidToRemove:string, narrativesToAdd) {
    //     if (uuidToRemove) {
    //         removeChildNarrative(uuidToRemove);
    //     }
        
    //     if (narrativesToAdd.length > 0) {
    //         addNarratives(narrativesToAdd);
    //     }
    //     // const selectedNarrative = originState.findNarrative(narrative.uuid);
    //     // alert(selectedNarrative.content);
    // }

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
            <style jsx>{`
                p {
                    color:white;
                }

            `}</style>
        </div>
    );
}

export default Origin;