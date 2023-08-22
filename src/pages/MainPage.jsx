import '../global.css';
import { Header } from '../components/Header';
import { Help } from '../components/Help';
import { MainPageContainer } from '../components/mainpage/MainPageContainer';
import { ExtensionAd } from '../components/modals/ExtensionAd';
import { useState } from 'react';

export function MainPage() {

  const [showNotification, setShowNotification] = useState(true);

  const closeNotification = () => {
      setShowNotification(false);
  };

  return(
    <div>
      <Header/>

        {(< ExtensionAd showing={showNotification} onClose={closeNotification} />)}

      <MainPageContainer/>
      <Help/>
    </div>
  )
}
