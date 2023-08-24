import '../global.css';
import { Header } from '../components/Header';
import { Help } from '../components/Help';
import { MainPageContainer } from '../components/mainpage/MainPageContainer';
import { ExtensionAd } from '../components/modals/ExtensionAd';
import { useState, useEffect } from 'react';

export function MainPage() {

  const [showNotification, setShowNotification] = useState(true);

  const closeNotification = () => {
      setShowNotification(false);
  };

  var ExtensionId = "hhglkeeogekcimonpepemfjabkikbimh"

  useEffect(() => {
    const extensionId = ExtensionId;
    if (window.chrome && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage(extensionId, 'isExtensionInstalled', (response) => {
        if (response) {
          console.log('Extension is installed!');
          setShowNotification(false)
        }
      });
    }
  }, []);

  return(
    <div>
      <Header/>

        {(< ExtensionAd showing={showNotification} onClose={closeNotification} />)}

      <MainPageContainer/>
      <Help/>
    </div>
  )
}
