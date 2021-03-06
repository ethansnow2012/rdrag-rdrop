import logo from './logo.svg';


import './App.css';
import {BrowserRouter, Routes, Route,useNavigate } from 'react-router-dom'
import { MainPage } from './container/MainPage'
import { AboutPage } from './container/AboutPage'
import { ExamplePage } from 'container/ExamplePage';
import GitHubPageRoute from 'hoc/router/GithubRoute'
import { TopNavigation } from 'container/TopNavigation'
import { GlobalStateProvider } from 'context/GlobalStateProvider'
import { GlobalWorker } from 'container/GlobalWorker'
import { FootScript } from 'components/FootScript'




let NODE_ENV = process.env.REACT_APP_NODE_ENV
//NODE_ENV = 'github_page'
export const baseName = NODE_ENV=='github_page'?'/rdrag-rdrop':''
function App() {
  
  return (
    <div style={{overflow:'hidden'}}>
      
      <GlobalStateProvider>
        <GlobalWorker></GlobalWorker> 
        
        <BrowserRouter >
          <TopNavigation></TopNavigation>
          <Routes basename={baseName}>
            <Route path={baseName+'/'} element={GitHubPageRoute(MainPage, baseName)}></Route>
            <Route path={baseName+'/about'} element={GitHubPageRoute(AboutPage, baseName)}></Route>
            <Route path={baseName+'/example'} element={GitHubPageRoute(ExamplePage, baseName)}></Route>
          </Routes>
          <FootScript/>
        </BrowserRouter> 
      </GlobalStateProvider> 
    </div>
  );
}

export default App;
