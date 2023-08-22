import '../global.css';
import { Header } from '../components/Header';
import { Help } from '../components/Help';
import { MainPageContainer } from '../components/mainpage/MainPageContainer';

export function MainPage() {
  return(
    <div>
      <Header/>
      <MainPageContainer/>
      <Help/>
    </div>
  )
}
