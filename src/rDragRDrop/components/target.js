import styled from 'styled-components'
import {useRef, useState, useContext} from 'react'
import React from 'react'; 
import {rDragRDrop, rDragRDropContext} from '../index'

const Styled = styled.div`
    ---color: yellow;
    ---placeholder-height: unset;
    position:relative;
    box-sizing: context-box;
    &:hover{
        cursor: grab;
        cursor: -moz-grab;
        cursor: -webkit-grab;
    }
    &.isDragging{
        background: green;
        transition: height 1s;/* this seems to avoid some flickers.*/
    }
    &.isDragging:active{
        //cursor: grabbing !important;
        //cursor: url(https://www.google.com/intl/en_ALL/mapfiles/closedhand.cur);
    }
    &.isDragHover:not(.isDragging){
        z-index: 1;
        margin-top: calc(1 * var(---placeholder-height));
    }
    &.isDragHover:not(.isDragging)::after{
        position: absolute;
        content: '';
        bottom: 100%;
        background: grey; /* this should be overwrited*/
        width: 100%;
        height: 100%;
        left: 0;
    }
`



export function RDragRDropTarget(props){
    const ref = useRef(null)
    const {contextInstance} = useContext(rDragRDropContext)
    const [isDragHover, setIsDragHover] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [context, setContext] = contextInstance

    const dragTargetInitObject = {
            usedContext: [context, setContext],
            stateDragging: [isDragging, setIsDragging],
            stateDragHover: [isDragHover, setIsDragHover],
            props,
            ref,
            latestDrop: props.self,
            latestDropParent: props.parent,
        }

    const dragStart = rDragRDrop.dragTarget.dragStart(
            dragTargetInitObject,
            (ev)=>{console.log('dragStart');}
        )
    const dragOver = rDragRDrop.dragTarget.dragOver(
            dragTargetInitObject
        )
    
    const dragEnd = rDragRDrop.dragTarget.dragEnd(
            dragTargetInitObject
        )
    const drop = rDragRDrop.dragTarget.drop(
            dragTargetInitObject
        )
    const dragEnter = rDragRDrop.dragTarget.dragEnter(
            dragTargetInitObject
        )
    const dragLeave = rDragRDrop.dragTarget.dragLeave(
            dragTargetInitObject
        )
    
    return (
        <Styled 
            ref={ref}
            draggable='true' 
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            onDragOver={dragOver}
            onDrop={drop}
            onDragEnter={dragEnter} 
            onDragLeave={dragLeave} 
            className={(isDragging?' isDragging':'') + (isDragHover?' isDragHover':'')}
        >
                {props.children}
        </Styled>
    )
}

export const DefaultStyle = Styled;

export default {
    Element: RDragRDropTarget,
    DefaultStyle: Styled
}