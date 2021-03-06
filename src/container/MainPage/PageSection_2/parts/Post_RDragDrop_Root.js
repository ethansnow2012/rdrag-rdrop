import {ref, useRef, useContext, useEffect, useLayoutEffect} from 'react'
import styled from 'styled-components'
import {rDragRDropContext, rDragRDrop} from 'rDragRDrop/index'

const Styled = styled.div`
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    /*
        bug: scroll ... flickered.
        backdrop-filter: blur(5px);    
    */
    padding: 1em 2em;
    min-width:90vw;
    min-height:100vh;
    position: relative;

`

export function Post_RDragDrop_Root(props){
    const ref = useRef(null)
    const {contextInstance} = useContext(rDragRDropContext)
    const [context, setContext] = contextInstance
    const rDragRDropRootInitObject = {
        usedContext: [context, setContext],
        ref,
        options:{
            draggableWrapper:true
        }
    }
    const init = rDragRDrop.dragRoot.init(
            rDragRDropRootInitObject
        )
    useLayoutEffect(init,[ref])

    const dragOver = rDragRDrop.dragRoot.dragOver(
        rDragRDropRootInitObject,
        (ev) => {
            //console.log('dragOver')
            //console.log('dataTransfer over', ev.nativeEvent.dataTransfer.getData('text/plain')=='ccccc'?'A':'B')
        }
    )
    const drop = rDragRDrop.dragRoot.drop(
            rDragRDropRootInitObject,
            (ev) => {
                console.log('drop-root')
            }
        )
    return (
        <Styled 
            ref={ref}
            onDragOver={dragOver}
            onDrop={drop}>
            <div style={{
                    background: 'blanchedalmond',
                    width: 'max-content',
                    padding: '0 6px 2px 5px',
                    position: 'relative',
                    left: '-62px',
                    top: '10px',
                    }}>
                Try to move black block or drag to small black to another block.</div>
            {props.children}
        </Styled>
    )
}