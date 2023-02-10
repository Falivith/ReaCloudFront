import { Header } from '../components/Header';
import { ReaCloudStaticLogo } from '../components/ReaCloudStaticLogo';
import googleLogo from '../assets/Google.png'

const wrapper = {"marginTop":"4.875rem","maxWidth":"100rem","display":"flex","justifyContent":"center"}

const buttonStyle = {"position":"absolute","width":"364px","height":"48px","left":"538px","top":"441px","background":"#4F518C","borderRadius":"10px"}
const button2Style = {"boxSizing":"border-box","position":"absolute","width":"364px","height":"48px","left":"538px","top":"509px","background":"#FFFFFF","border":"1px solid #4F518C","borderRadius":"10px"}
const button3Style = {"boxSizing":"border-box","position":"absolute","width":"364px","height":"48px","left":"538px","top":"577px","border":"1px solid #4F518C","borderRadius":"10px", "background":"#FFFFFF"}

const textButton = {"color":"#4F518C","fontSize":"16px","lineHeight":"22px", "fontStyle": "normal"}


const googleLogoStyle = {"height":"20px","width":"20px","left":"75px","top":"16px","borderRadius":"0px"}
const normalText = {"position":"absolute","width":"306px","height":"41px","left":"541px","top":"232px","fontFamily":"'Roboto'","fontStyle":"normal","fontWeight":"700","fontSize":"16px","lineHeight":"22px","display":"flex","alignItems":"center","color":"#4F518C"}


export function Login() {
    return (
    <div>
        
        <Header showLogin = {false}/>    
        {/* ler sobre form e react */}
        <div style = {wrapper}>
        <ReaCloudStaticLogo/>
        <p style={normalText}> E-MAIL</p>
        



        <button style = {buttonStyle}> <span style={{...textButton, "color":"#FFFFFF"}}> ENTRAR  </span></button>
        <button style = {button2Style}> <span style={textButton}><img src= {googleLogo} style = {googleLogoStyle} /> ENTRAR COM O GOOGLE </span></button>
        <button style = {button3Style}> <span style={textButton}> CADASTRAR  </span></button>
        
        </div>
    </div>    )
}