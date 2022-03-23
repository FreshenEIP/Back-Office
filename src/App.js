import React from 'react'
import { Route } from 'react-router-dom'
import { Routes, Sidebar, TopNav } from "./components"

import './assets/css/layout.css'
import './assets/css/sidebar.css'
import './assets/css/topnav.css'
import './assets/css/dropdown.css'
import './assets/css/statuscard.css'

const App = () => {
  return (
    <Route render={(props) => (
      <div className={"layout"}>
        <Sidebar {...props} />
        <div className={"layout__content"}>
          <TopNav />
          <div className={"layout__content-main"}>
            <Routes />
          </div>
        </div>
      </div>
    )} />
  )
}

export default App