import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import All from './components/All'
import Favorite from './components/Favorite'

function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route index element={<All />} />
						<Route path="/favorite" element={<Favorite />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
