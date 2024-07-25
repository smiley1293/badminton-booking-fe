
import './App.css';
import "./input.css";
import "./output.css";
import Header from './components/header/Header';
import CategoryIntro from './components/homepage/CategoryIntro';
import ContentHome from './components/homepage/ContentHome';
import { ToastContainer } from 'react-toastify';



function App() {
  return (
    <div className="App ">
      <Header></Header>
      <ContentHome></ContentHome>
    </div>
  );
}

export default App;
