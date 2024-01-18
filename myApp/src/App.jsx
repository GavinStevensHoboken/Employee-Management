import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import EmployeeProfiles from './employees/employeeProfiles.jsx';
import SignUp from './user/SignUp.jsx';
import LayoutWithNavBar from './layout/LayoutWithNavBar.jsx';
import LogIn from './user/LogIn.jsx'
import StatusCard from './user/Onboarding.jsx'
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/visa" element={<VisaStatusManagement />}/>
                <Route path="/employees" element={<LayoutWithNavBar><EmployeeProfiles/></LayoutWithNavBar>} />
                <Route path="/register" element={<SignUp/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/dashboard" element={<LayoutWithNavBar><StatusCard/></LayoutWithNavBar>} />
            </Routes>
        </Router>
    )
}

export default App
