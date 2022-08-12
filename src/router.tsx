import { Route, Routes } from 'react-router-dom';
import Appointments from './pages/appointments';
import Booking from './pages/booking';
import DoctorDetail from './pages/doctor_detail';
import DoctorList from './pages/doctor_list';
import LandingPage from './pages/landing';

const Router = () =>{
    return(
    <Routes>
        <Route index element={<LandingPage/>}/>
        <Route path="doctors" element={<DoctorList/>}/>
        <Route path="appointments" element={<Appointments/>}/>
        <Route path="doctors/:doctorId" element={<DoctorDetail/>}/>
        <Route path="doctors/:doctorId/booking" element={<Booking/>}/>
    </Routes>
    )
}

export default Router