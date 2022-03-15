import {setCssPositionViaRef, calcMousePosition} from './coreHelpers'
export const dragAndDropRoot = function () {}

dragAndDropRoot.prototype.dragOver = function({usedContext, stateDragging, props, ref, options}, callback){
    return function(ev){
        const [context, setContext] = usedContext

        if(options&&options.draggableWrapper==true){
            console.log('root dragOver',ev)
            const {x, y} = calcMousePosition(ev, ref)
            setCssPositionViaRef(ref, x, y)
        }
        if(context.rootRef!=ref){
            setContext({...context, rootRef: ref})
        }
        ev.preventDefault()
        
        if(typeof callback=='function'){
            callback(ev)    
        }
    }
}

dragAndDropRoot.prototype.drop = function({usedContext, stateDragging, props}, callback){
    return function(ev){
        const [context, setContext] = usedContext
        if(context.hoverDelegated){
            const [isDragHover, setIsDragHover, _ref] = context.hoverDelegated
            setIsDragHover(false)   
        }
        
        console.log('root drop next')
    }
}
