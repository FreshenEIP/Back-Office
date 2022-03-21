import React from 'react'
import { Route } from 'react-router-dom'
import { Routes, Sidebar } from "./components"

const App = () => {
  return (
    <Route render={(props) => (
      <div className={"layout"}>
        <Sidebar {...props} />
        <div className={"layout__content"}>
          <div className={"layout__content-main"}>
            <Routes />
          </div>
        </div>
      </div>
    )} />
  )
}

export default App