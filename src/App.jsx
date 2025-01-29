// import { Outlet } from 'react-router-dom'
// import * as React from 'react'
import './App.css'
// import Login from './pages/login'
import { RouterProvider } from 'react-router-dom'
import Router from './router'

function App() {
	return (
		<RouterProvider router={Router} />
	)
}

export default App
