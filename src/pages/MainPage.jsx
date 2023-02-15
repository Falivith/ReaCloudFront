import '../global.css';
import { Header } from '../components/Header';
import { Welcome } from '../components/mainpage/Welcome';
import { Filters } from '../components/Filters';
import { Art } from '../components/mainpage/Art';
import { Help } from '../components/Help';

export function MainPage() {
  return(
    <div>
      <Header/>
      <Welcome/>
      <Filters/>
      <Art/>
      <Help/>
    </div>
  )
}
