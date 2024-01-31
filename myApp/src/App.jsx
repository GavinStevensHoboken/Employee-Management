import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import EmployeeProfiles from './employees/employeeProfiles.jsx';
import SignUp from './user/SignUp.jsx';
import LayoutWithNavBar from './layout/LayoutWithNavBar.jsx';
import LogIn from './user/LogIn.jsx'
import StatusCard from './user/Onboarding.jsx'
import VisaStatusManagement from './pages/Hr';
import EmployeeForm from "./employees/employeeApplication.jsx";
import Visa from './pages/Visa/index.jsx';
import ApplicationSummary from './visaStatus/HRManagement.jsx';
import UserInfoDialog from './visaStatus/DetailForm.jsx';
import Registrations from './visaStatus/RegistrationManagement.jsx';
import InviteUser from "./user/inviteToRegister.jsx";
import EmployeeProfilesDetails from './employees/employeeProfilesHRView.jsx';
import PersonalInformationPage from "./user/PersonalInfo.jsx";
import NotFoundPage from "./errorPage/404.jsx";
import SummaryPage from "./user/summary.jsx";
import ProtectedRoute from './utils/HRProtect.jsx';
import ProtectedRouteForAll from './utils/ProtectedRoute.jsx'
import Home from './home/home.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<ProtectedRouteForAll/>}>
                    <Route path="/registrations" element={
                        <ProtectedRoute><LayoutWithNavBar><Registrations/></LayoutWithNavBar></ProtectedRoute>}/>
                    <Route path="/management" element={
                        <ProtectedRoute><LayoutWithNavBar><ApplicationSummary/></LayoutWithNavBar></ProtectedRoute>}/>
                    <Route path="/management/:userId" element={
                        <ProtectedRoute><LayoutWithNavBar><UserInfoDialog/></LayoutWithNavBar></ProtectedRoute>}/>
                    <Route path="/visa" element={<ProtectedRoute><LayoutWithNavBar><VisaStatusManagement/></LayoutWithNavBar></ProtectedRoute>}/>
                    <Route path="/employees" element={
                        <ProtectedRoute><LayoutWithNavBar><EmployeeProfiles/></LayoutWithNavBar></ProtectedRoute>}/>
                    <Route path="/employees/:userId" element={
                        <ProtectedRoute><LayoutWithNavBar><EmployeeProfilesDetails/></LayoutWithNavBar></ProtectedRoute>}/>
                    <Route path="/status" element={<LayoutWithNavBar><StatusCard/></LayoutWithNavBar>}/>
                    <Route path="/application" element={<LayoutWithNavBar><EmployeeForm/></LayoutWithNavBar>}/>
                    <Route path="/visafiles" element={<LayoutWithNavBar><Visa/></LayoutWithNavBar>}/>
                    <Route path="/profiles" element={<LayoutWithNavBar><PersonalInformationPage/></LayoutWithNavBar>}/>
                    <Route path="/summary" element={<LayoutWithNavBar><SummaryPage/></LayoutWithNavBar>}/>
                </Route>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/" element={<LayoutWithNavBar><Home/></LayoutWithNavBar>}/>
                <Route path="/404" element={<LayoutWithNavBar><NotFoundPage/></LayoutWithNavBar>}/>
                <Route path="/register" element={<SignUp/>}/>
                <Route path="/inviteToRegister" element={<InviteUser/>}/>
            </Routes>
        </Router>
    )
}

export default App
