import './global.css';
import { Header } from './components/Header';
import { Welcome } from './components/Welcome';
import { Filters } from './components/Filters';
import { Art } from './components/Art';
import styles from './App.module.css';

function App() {
  return (
    <div>
      <Header/>
      <div className = { styles.wrapper }>
        <Welcome/>
      </div>
        <Filters/>
        <Art/>
    </div>
  );
}

export default App;
