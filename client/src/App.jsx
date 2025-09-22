import { BrowserRouter, Route, Routes } from 'react-router';
import Dashboard from './views/Dashboard';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Home from './views/Home';
import AddTransaction from './views/AddTransaction';
import Profile from './views/Profile';
import GoogleSuccess from './components/GoogleSuccess';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signin' element={<SignIn/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/transactions' element={<Dashboard/>}></Route>
      <Route path='/addtransactions' element={<AddTransaction/>}></Route>
      <Route path='/reports' element={<Dashboard/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/google-success' element={<GoogleSuccess />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App