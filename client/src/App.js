import './App.css';
import Header from './Header';
import Test from './Test';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Header />
        <Routes>
          <Route path="/test" element={<Test />} />
        </Routes>
    </div>
  );
}

export default App;
