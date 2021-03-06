
//import { DefaultStyle } from 'container/StaticBackgroundBlock'
import React, { useEffect } from 'react'
import ReactDom from 'react-dom'
import style from 'styled-components'
const Styled = style.div`
    position: fixed;
    left:50%;
    top:50%;
    transform:translate(-50%, -50%);
    padding: 40px;
    background: white;
    max-height:calc(100vh - 80px);
    max-width: calc(100vw - 40px);
    overflow: scroll;
`
const Overlay = style.div`
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
     background: #000000b5;
    //background:black;
`


export const DefaultPopup  = function(props){
    const [popupState, setPopupState] = props.popupState
    const overLayClick = ()=>{
        setPopupState(!popupState)
    }
    useEffect(()=>{
        if(typeof popupState=='boolean'){
            popupState?
                (document.body.style.overflow = "hidden"):
                (document.body.style.overflow = "")
        }
        return ()=>{
            document.body.style.overflow = ""
        }
    }, [popupState])
    return ReactDom.createPortal(
        (popupState)
            ?(
                <>
                    <Overlay onClick={overLayClick}></Overlay>
                    {
                        (props.portalStyled)?
                        <props.portalStyled>
                            <Styled className={props.className}>
                                {props.children}
                            </Styled>
                        </props.portalStyled>
                        :
                        <Styled className={props.className}>
                            {props.children}
                        </Styled>
                    }
                    

                    
                    
                </>
            )
            :""
        ,document.querySelector(props.portalTarget||"#popup-root")
    )
}

export const DefaultStyle = Styled;