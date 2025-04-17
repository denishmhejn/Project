
import './App.css';
import React from 'react';
import AdLayout from './component/AdLayout';
import Banner from './component/Banner';
import Head from './component/Head';

import Footer from './component/Footer';
import Login from './component/Login';
import Signup from './component/Signup';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import College from './component/College';
import Home from './component/Home';

import CollegeDetails from './component/College/CollegeDetails';
import Program from './component/Programs/Program';
import ProgramCourseView from './component/Programs/ProgramCourseView';
import TUProgramList from './component/Programs/TUProgramList';
import TuSyllabusList from './component/Syllabus/TuSyllabusList';
import SyllabusDetail from './component/Syllabus/SyllabusDetail';
import CourseView from './component/Course/CourseView';
import TuUniversityDetails from './component/University/TuUniversityDetails';
import KuUniversityDetails from './component/University/KuUniversityDetails';
import PuUniversityDetails from './component/University/PuUniversityDetails';
import PurUniversityDetails from './component/University/PurUniversityDetails';
import Blogs from './component/Blogs/Blogs';
import Notes from './component/Blogs/Notes';
import CourseDetails from './component/Course/CourseDetails';
import KUProgramList from './component/Programs/KUProgramList';
import PUProgramList from './component/Programs/PUProgramList';
import PurProgranList from './component/Programs/PurProgranList';
import VerifyEmail from './component/Verification/VerifyEmail';
import ForgotPassword from './component/Verification/ForgotPassword';
import ResetPassword from './component/Verification/ResetPassaword';
import ProtectedRoute from './component/Verification/ProtectedRoute';
import OAuthCallback from './component/Verification/OAuthCallback';

const AppContent = () => {
  const location = useLocation();
  const showComponent = (location.pathname === "/Login" || location.pathname === "/Signup" ? false : true)

  return (
    <>
      <Head />
 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/College" element={<College />} />

        {/* for login signup */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path='/verify-email' element={<VerifyEmail/>}/>
        <Route path="/oauth-callback" element={<OAuthCallback />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>

        {/* Protected routes */}
        <Route element={<ProtectedRoute/>}>
          <Route path='/' element={<Home/>}/>
        </Route>
       



        {/* <Route path="College/:id" element={<CollegeViewById />} /> */}
        <Route path="College/:id" element={<CollegeDetails/>} />
        <Route path='/programOptions' element={<Program/>} />  
        <Route path="/program/:programId" element={<ProgramCourseView />} />

        {/* For Syllabus */}
       <Route path="/syllabus" element={<TuSyllabusList />} />
        <Route path="/syllabus/:id" element={<SyllabusDetail />} />


        {/* For Programs */}
        <Route path="/tuProgramList" element={<TUProgramList />} />
        <Route path='/kuProgramList' element={<KUProgramList/>}/>
        <Route path='/puProgramList' element={<PUProgramList/>}/>
        <Route path='/purProgramList' element={<PurProgranList/>}/>
        

      {/* For training-course */}
      <Route path="/training-courses" element={<CourseView/>} />
      <Route path="/course/:courseId" element={<CourseDetails/>}/>

      {/* For University details */}
      <Route path="/tribhuwan-university"element={<TuUniversityDetails/>} />
      <Route path="/kathmandu-university"element={<KuUniversityDetails/>} />
      <Route path="/pokhara-university"element={<PuUniversityDetails/>} />
      <Route path='/purbanchal-university'element={<PurUniversityDetails/>} />



      {/* For Blogs and course */}
      <Route path="/blogs" element={<Blogs/>} />
      <Route path="/notes" element={<Notes/>}/>


      {/* for training courses */}
      
      
      </Routes>








  
    </>
  )
}
// const CollegeContent = () => {
//   const location = useLocation();
//   const showComponent = (location.pathname === "/Login" || location.pathname === "/Signup" ||location.pathname==="/College"? false : true)
//   return (
//     <>
//       <Head />
//       <Navbar />
//       <Banner />
//       <Routes>
//         {/* <Route path="/" element={<AppContent />} /> */}
//         <Route path="/Login" element={<Login />} />
//         <Route path="/Signup" element={<Signup />} />
//         <Route path="/College" element={<College />} />
//       </Routes>
//       {showComponent &&
//         <>
         
//           <AdLayout />
//           <ProgramOffered />
//           <Footer />
//           <College />
//         </>
//       }
//     </>
//   )
// }




function App() {

  return (
    <>
      <BrowserRouter>
        <AppContent />
        {/* <CollegeContent /> */}
      </BrowserRouter>



    </>


  );
}

export default App;
