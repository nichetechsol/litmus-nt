import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './pages/App.tsx'
import Crm from './container/dashboards/crm/crm.tsx'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <BrowserRouter>
        <React.Suspense>
               <Routes>
               <Route path={`${import.meta.env.BASE_URL}`} element={<App/>}>
          <Route index element={<Crm/>} />
          <Route path={`${import.meta.env.BASE_URL}dashboards/crm`} element={<Crm/>} />
           </Route>
               </Routes>
        </React.Suspense>
    </BrowserRouter>
  </React.Fragment>
)
