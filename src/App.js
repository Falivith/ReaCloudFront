import './global.css';
import { Header } from './components/Header';
import { Welcome } from './components/Welcome';
import styles from './App.module.css';

function App() {
  return (
    <div>
      <Header/>
      <div className = { styles.wrapper }>
        <Welcome/>
      </div>
    </div>
  );
}

export default App;
