import './App.css';
import { BrowserRouter, Router } from "react-router-dom";
import { PageRoutes } from './components/PageRoutes';
import Navbar from './components/Navbar';
// import Hospital from './pages/Hospital';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        {/* PageRoutes handles all the route definitions */}
        <PageRoutes />
        {/* <Hospital/> */}
      </main>
     
    </BrowserRouter>
  );
}

export default App;
