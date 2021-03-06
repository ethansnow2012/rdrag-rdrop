import {setCssPositionViaRef, calcMousePosition} from './coreHelpers'
export const rDragRDropRoot = function () {}

rDragRDropRoot.prototype.init = function({usedContext, options, props, ref}){
    return function(){
        const [context, setContext] = usedContext
        console.log('root init')
        if(ref.current){
            setContext({...context, rootRef: ref})
        }else{
            console.log('Maybe invoked too early ref not ready.')
        }
        
    }
}

rDragRDropRoot.prototype.dragOver = function({usedContext, stateDragging, props, ref, options}, callback){
    return function(ev){
        const [context, setContext] = usedContext
        if(options&&options.draggableWrapper==true){
            if(!(document.psuedoDataTransferText=="TARGET_DRAGGED")){
                const {x, y} = calcMousePosition(ev, ref)
                setCssPositionViaRef(ref.current.querySelector('.isDragging'), x, y)
            }else{
                // ev.stopPropagation()
            }
        }
        if(context.rootRef!=ref){
            setContext({...context, rootRef: ref})
        }
        ev.preventDefault()
        
        if(typeof callback=='function'){
            callback(ev, {usedContext, stateDragging, props, ref, options})    
        }
    }
}

rDragRDropRoot.prototype.drop = function({usedContext, stateDragging, props}, callback){
    return function(ev){
        const [context, setContext] = usedContext
        if(context.hoverDelegated){
            const [isDragHover, setIsDragHover, _ref] = context.hoverDelegated
            setIsDragHover(false)   
            //const [isDragging, setIsDragging, _ref2] = context.draggingDelegated
            //setIsDragging(false)
        }
        
        
        if(typeof callback=='function'){
            callback(ev, {usedContext, stateDragging, props})    
        }
    }
}
