
import './App.css';
import "./input.css";
import "./output.css";
import Header from './components/header/Header';
import CategoryIntro from './components/homepage/CategoryIntro';
import ContentHome from './components/homepage/ContentHome';



function App() {
  return (
    <div className="App ">
      <Header></Header>
      <CategoryIntro></CategoryIntro>
      <ContentHome></ContentHome>
    </div>
  );
}

export default App;
