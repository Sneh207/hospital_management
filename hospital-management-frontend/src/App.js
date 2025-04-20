
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import PatientLogin from './pages/patient/PatientLogin';
// import PatientRegister from './pages/patient/PatientRegister';
// import PatientDashboard from './pages/patient/PatientDashboard';
// import BookAppointment from './pages/patient/BookAppointment';
// import DoctorLogin from './pages/doctor/DoctorLogin';
// import DoctorDashboard from './pages/doctor/DoctorDashboard';
// import AppointmentList from './pages/doctor/AppointmentList';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
// import ProtectedRoute from './components/ProtectedRoute';
// import { AuthProvider } from './pages/context/AuthContext';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// function App() {
//   return (
//     <AuthProvider>
//       <div className="App">
//         <Navbar />
//         <div className="container mt-4">
//           <Routes>
//             <Route path="/" element={<Home />} />
            
//             {/* Patient Routes */}
//             <Route path="/patient/login" element={<PatientLogin />} />
//             <Route path="/patient/register" element={<PatientRegister />} />
//             <Route 
//               path="/patient/dashboard" 
//               element={
//                 <ProtectedRoute>
//                   <PatientDashboard />
//                 </ProtectedRoute>
//               } 
//             />
//             <Route 
//               path="/patient/book-appointment" 
//               element={
//                 <ProtectedRoute>
//                   <BookAppointment />
//                 </ProtectedRoute>
//               } 
//             />
            
//             {/* Doctor Routes */}
//             <Route path="/doctor/login" element={<DoctorLogin />} />
//             <Route 
//               path="/doctor/dashboard" 
//               element={
//                 <ProtectedRoute>
//                   <DoctorDashboard />
//                 </ProtectedRoute>
//               } 
//             />
//             <Route 
//               path="/doctor/appointments" 
//               element={
//                 <ProtectedRoute>
//                   <AppointmentList />
//                 </ProtectedRoute>
//               } 
//             />
//           </Routes>
//         </div>
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;



// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PatientLogin from './pages/patient/PatientLogin';
import PatientRegister from './pages/patient/PatientRegister';
import PatientDashboard from './pages/patient/PatientDashboard';
import BookAppointment from './pages/patient/BookAppointment';
import DoctorLogin from './pages/doctor/DoctorLogin';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import AppointmentList from './pages/doctor/AppointmentList';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              
              {/* Patient Routes */}
              <Route path="/patient/login" element={<PatientLogin />} />
              <Route path="/patient/register" element={<PatientRegister />} />
              <Route path="/patient/dashboard" element={
                <ProtectedRoute>
                  <PatientDashboard />
                </ProtectedRoute>
              } />
              <Route path="/patient/book-appointment" element={
                <ProtectedRoute>
                  <BookAppointment />
                </ProtectedRoute>
              } />
              
              {/* Doctor Routes */}
              <Route path="/doctor/login" element={<DoctorLogin />} />
              <Route path="/doctor/dashboard" element={
                <ProtectedRoute>
                  <DoctorDashboard />
                </ProtectedRoute>
              } />
              <Route path="/doctor/appointments" element={
                <ProtectedRoute>
                  <AppointmentList />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;