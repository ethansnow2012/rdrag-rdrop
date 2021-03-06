
import bg_2 from 'assets/bg-2.jpg';
import bg_3 from 'assets/bg-3.jpg';

import React, {useState, useRef, useEffect, forwardRef, createRef} from 'react'
import styled from 'styled-components'

import {StaticBackgroundBlock, DefaultStyle as StaticBackgroundBlockStyle} from 'container/StaticBackgroundBlock'
import {rDragRDrop, rDragRDropContext} from 'rDragRDrop/index'
import {DefaultPopup} from 'components/popup/index.js'

import {PageSection_1} from './PageSection_1/index'
import {PageSection_2} from './PageSection_2/index'
import {PageSection_3} from './PageSection_3'




const Styled = styled.div`
    .posts-rDragRDropRoot-wrapper{
        display: flex;
        justify-content: center;
        max-width: 100%;
        overflow: auto;
    }
    
`

export function MainPage() {
    console.log('MainPage')
    return (
        <Styled>
            <PageSection_1/>
            <PageSection_2/>
            <PageSection_3/> 
        </Styled>
    )
}