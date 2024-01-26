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
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/registrations" element={<LayoutWithNavBar><Registrations /></LayoutWithNavBar>}/>
                <Route path="/management" element={<LayoutWithNavBar><ApplicationSummary /></LayoutWithNavBar>}/>
                <Route path="/management/:userId" element={<LayoutWithNavBar><UserInfoDialog /></LayoutWithNavBar>} />
                <Route path="/visa" element={<LayoutWithNavBar><VisaStatusManagement /></LayoutWithNavBar>}/>
                <Route path="/employees" element={<LayoutWithNavBar><EmployeeProfiles/></LayoutWithNavBar>} />
                <Route path="/employees/:userId" element={<LayoutWithNavBar><EmployeeProfilesDetails/></LayoutWithNavBar>} />
                <Route path="/register" element={<SignUp/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/status" element={<LayoutWithNavBar><StatusCard/></LayoutWithNavBar>} />
                <Route path="/application" element={<LayoutWithNavBar><EmployeeForm/></LayoutWithNavBar>} />
                <Route path="/visafiles" element={<LayoutWithNavBar><Visa/></LayoutWithNavBar>}/>
                <Route path="/home" element={<LayoutWithNavBar><PersonalInformationPage/></LayoutWithNavBar>}/>
                <Route path="/inviteToRegister" element={<InviteUser/>} />
            </Routes>
        </Router>
    )
}

export default App
