import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetails from './pages/CourseDetails'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminRoute from './ProtectedRoutes/AdminRoutes'
import CreateCourse from './components/CreateCourse'
import ManageCourse from './pages/ManageCourse'
import PublicRoute from './ProtectedRoutes/PublicRoutes'

function App() {
  return (
    <div className='min-h-screen'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/courses' element={<Courses/>}/>
        <Route path='/course-details/:id' element={<CourseDetails/>}/>
        <Route path='/login' element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/create-course' element={<AdminRoute><CreateCourse/></AdminRoute>}/>
        <Route path='/manage-course' element={<AdminRoute><ManageCourse/></AdminRoute>}/>

      </Routes>
      <Footer/>
    </div>
  )
}

export default App