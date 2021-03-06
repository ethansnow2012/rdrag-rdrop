
import React, {useState, useRef, useEffect, forwardRef, createRef} from 'react'
import styled from 'styled-components'
import {rDragRDrop, rDragRDropContext, defaultComponents} from 'rDragRDrop/index'
import {H1,H2} from 'components/Headers'
import Highlight from 'react-highlight'

const {
    root: _root,
    wrapper: _wrapper,
    target: _target
    } = defaultComponents
const {Element: Root, DefaultStyle: RootStyle} = _root
const {Element: Wrapper, DefaultStyle: WrapperStyle} = _wrapper
const {Element: Target, DefaultStyle: TargetStyle} = _target

const Styled = styled.div`
    & ${RootStyle}{
        display: flex;
        padding: 1em 0em;
    }

    ${WrapperStyle}{
        height: 100%;
    }
    
    & ${RootStyle} > ${WrapperStyle}{
        margin-right: 2em;
    }

    & ${RootStyle} ${WrapperStyle}.isDragHover{
        background: red;
    }

    & ${RootStyle} ${WrapperStyle} ${TargetStyle}{
        padding: 5px 10px;
    }
    
    .black-block{
        width: 100px;
        height: 100px;
        background: black;
        color: white;
        font-size: 1.5em;
        display:flex;
        justify-content: center;
        align-items: center;
    }
`

export function BasicUsage() {
    
    const contextInstance = rDragRDrop.initContext()()
    const [dataState, setDataState] = useState(data)
    const contextObject = {
        data: dataState, 
        setData: setDataState, 
        contextInstance: contextInstance
    }
    return (
        <Styled>
            <div className="c-blockseparator-1">
                <div className="c-blockseparator-2">
                    <H2 >BasicUseage: {/*dataState.title*/}</H2>
                </div>    
                <div className="c-blockseparator-2">
                    <div className="c-blockseparator-3">
                        Although rDrag-rDrop.js is designed to just provide the helpers for drag-drop events. It still has the default components so that anyone can get started with minimal effort.
                    </div>
                    <div className="c-blockseparator-3">
                        To start, you just need to get a three-layer structure json each layer with two required fields -- id&lt;string&gt;, data&lt;Array&gt;. As below:
                        <div style={{height:"calc(var(--smooth-space-unit) * 1)"}}></div>
                        <Highlight language="json">
                            {`
{
    "id":"sssfsdfsfjklhjkg",
    "title":"Title for the Wrapper",
    "data":[
       {
          "id":"01588147-106e-45dd-b54d-ed71da05fb77",
          "title":"Human Intranet Executive",
          "data":[
             {
                "id":"eaed08e2-9891-4b94-a06e-1473f660ba43",
                "title":"one"
             },
             /* -- */
             /* -- */
          ]
       },
       {
          "id":"4a107b1a-c157-4c98-b7df-26935153d7a2",
          "title":"Human Configuration Executive",
          "data":[
             {
                "id":"91a93433-618e-45db-82b5-033d3e72ddff",
                "title":"six"
             }
             /* -- */
             /* -- */
          ]
       },
       /* -- */
    ]
 }
                            `}
                        </Highlight>
                        <div style={{height:"calc(var(--smooth-space-unit) * 2)"}}></div>
                            Initial some state.
                        <div style={{height:"calc(var(--smooth-space-unit) * 1)"}}></div>
                        <Highlight language="javascript">
                        {`
const contextInstance = rDragRDrop.initContext()() // <= Yes, do it this way.
const [dataState, setDataState] = useState(data)
const contextObject = {
    data: dataState, 
    setData: setDataState, 
    contextInstance: contextInstance
}
                        `}
                        </Highlight>
                        <div style={{height:"calc(var(--smooth-space-unit) * 2)"}}></div>
                        Just loop through this data with "defaultComponents" then you will see the drag-drop component working.
                        <div style={{height:"calc(var(--smooth-space-unit) * 1)"}}></div>
                        <Highlight language="javascript">
                            {`
<rDragRDropContext.Provider value={contextObject}>
<Root>
{
  dataState.data
    ?.map((wrapperData) =>
      {
      return(  
          <div>
          <div>
              <h3 style={{fontSize: '0.8em', height: '43px', paddingRight:'1.5em'}}>{wrapperData.title}</h3>
          </div>
          <Wrapper key={wrapperData.id} self={wrapperData} parent={dataState.data}>
              {
              wrapperData.data
                  .map((target, ii)=>(
                  <Target key={target.id} self={target} parent={wrapperData}>
                      <div className='black-block'>{target.title}</div>
                  </Target>
                  ))
              }
          </Wrapper>
          </div>
      )
    }
  )
}
</Root>
</rDragRDropContext.Provider>
                            `}
                        </Highlight>
                        <div style={{height:"calc(var(--smooth-space-unit) * 2.5)"}}></div>
                        <div style={{fontWeight:'bolder'}}>Just like the exmaple here:</div>
                    </div>
                </div>
            </div>
            <div className="c-blockseparator-1">
                <rDragRDropContext.Provider value={contextObject}>
                    <Root>
                        {
                            dataState.data
                                ?.map((wrapperData) =>
                                {
                                    return(  
                                        <div>
                                            <div>
                                                <h3 style={{fontSize: '0.8em', height: '43px', paddingRight:'1.5em'}}>{wrapperData.title}</h3>
                                            </div>
                                            <Wrapper key={wrapperData.id} self={wrapperData} parent={dataState.data}>
                                                {
                                                    wrapperData.data
                                                        .map((target, ii)=>(
                                                            <Target key={target.id} self={target} parent={wrapperData}>
                                                                <div className='black-block'>{target.title}</div>
                                                            </Target>
                                                        ))
                                                }
                                            </Wrapper>
                                        </div>
                                    )
                                }
                            )
                        }
                    </Root>
                </rDragRDropContext.Provider>
            </div>
            
            
        </Styled>
    )
}

const data = {
    "id":"sssfsdfsfjklhjkg",
    "title":"Title for the Wrapper",
    "data":[
       {
          "id":"01588147-106e-45dd-b54d-ed71da05fb77",
          "title":"Human Intranet Executive",
          "data":[
             {
                "id":"eaed08e2-9891-4b94-a06e-1473f660ba43",
                "title":"one"
             },
             {
                "id":"5dec03ae-2b1a-4b16-af51-d7f8fae4f18e",
                "title":"two"
             },
             {
                "id":"b4070ebd-f0cf-4648-bbb0-7f0ba2395f9b",
                "title":"three"
             },
             {
                "id":"8860187a-96e0-4b36-b6d2-a4f6adede779",
                "title":"four"
             },
             {
                "id":"dab6c1c5-de9b-4846-9c2c-ad67417fd8ca",
                "title":"five"
             }
          ]
       },
       {
          "id":"4a107b1a-c157-4c98-b7df-26935153d7a2",
          "title":"Human Configuration Executive",
          "data":[
             {
                "id":"91a93433-618e-45db-82b5-033d3e72ddff",
                "title":"six"
             }
          ]
       },
       {
          "id":"94dc9b15-68a8-4502-8ce4-4d802e7e7e45",
          "title":"Central Group Technician",
          "data":[
             {
                "id":"1d75ec54-9504-486c-853b-ee793ad2679c",
                "title":"seven"
             },
             {
                "id":"fd747ded-f92e-4ead-a5cc-0bd8e5eea9bd",
                "title":"eight"
             }
          ]
       },
       {
          "id":"d621f0bc-20f2-4d95-bd45-deb3dcf309bf",
          "title":"Lead Usability Specialist",
          "data":[
             {
                "id":"b12803c1-4566-4d60-b420-a501b35f07c6",
                "title":"nine"
             },
             {
                "id":"4e8b12e8-5aea-408b-97ee-2f79c945f0fb",
                "title":"ten"
             }
          ]
       }
    ]
 }