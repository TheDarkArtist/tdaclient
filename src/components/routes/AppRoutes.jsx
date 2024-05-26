import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Components 

import Home from "../pages/Home";
import About from "../pages/About";
import Dashboard from "../pages/Dashboard";
import {BlogList, BlogCreate, BlogDelete, BlogUpdate, BlogDetails} from '../blog'
import {ProjectBlogCreate, ProjectBlogDelete, ProjectBlogDetails, ProjectBlogList, ProjectBlogUpdate} from '../projectblog';
import NotFound from "../pages/NotFound";




const AppRoutes = () => {
	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route path="/projects" >
				<Route path='' element={<ProjectBlogList />} />
				<Route path='details/:id' element={<ProjectBlogDetails />} />
				<Route path='create' element={<ProjectBlogCreate />} />
				<Route path='update/:id' element={<ProjectBlogUpdate />} />
				<Route path='delete/:id' element={<ProjectBlogDelete />} />
			</Route>
			<Route path="/about" element={<About />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path='/blog' >
				<Route path='' element={<BlogList />} />
				<Route path='details/:id' element={<BlogDetails />} />
				<Route path='create' element={<BlogCreate />} />
				<Route path='update/:id' element={<BlogUpdate />} />
				<Route path='delete/:id' element={<BlogDelete />} />
			</Route>
			
			<Route path="*" element={<NotFound />} />
		</Routes>

	)
}

export default AppRoutes
