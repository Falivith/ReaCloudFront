import googleLogo from '../assets/Google.png'


const buttonStyle = {"position":"absolute","width":"22.75rem","height":"3rem","left":"33.625rem","top":"27.5625rem","background":"#4F518C","borderRadius":"0.625rem"}
const button2Style = {"boxSizing":"border-box","position":"absolute","width":"22.75rem","height":"3rem","left":"33.625rem","top":"31.8125rem","background":"#FFFFFF","border":"0.0625rem solid #4F518C","borderRadius":"0.625rem"}
const button3Style = {"boxSizing":"border-box","position":"absolute","width":"22.75rem","height":"3rem","left":"33.625rem","top":"36.0625rem","border":"0.0625rem solid #4F518C","borderRadius":"0.625rem", "background":"#FFFFFF"}

const textButton = {"color":"#4F518C","fontSize":"1rem","lineHeight":"1.375rem", "fontStyle": "normal"}


const googleLogoStyle = {"height":"1.25rem","width":"1.25rem","left":"4.6875rem","top":"1rem","borderRadius":"0rem"}
const normalText = {"position":"absolute","width":"19.125rem","height":"2.5625rem","left":"33.8125rem","top":"14.5rem","fontFamily":"'Roboto'","fontStyle":"normal","fontWeight":"700","fontSize":"1rem","lineHeight":"1.375rem","display":"flex","alignItems":"center","color":"#4F518C"}

const inputEmail = {"boxSizing":"border-box","position":"absolute","width":"22.75rem","height":"3rem","left":"33.625rem","top":"16.6875rem","border":"0.0625rem solid #D9D9D9","borderRadius":"0.75rem"}
const inputSenha = {"boxSizing":"border-box","position":"absolute","width":"22.75rem","height":"3rem","left":"33.625rem","top":"22.3125rem","border":"0.0625rem solid #D9D9D9","borderRadius":"0.75rem"}
const textSenha = {"position":"absolute","width":"19.125rem","height":"2.5625rem","left":"33.8125rem","top":"20.125rem","fontFamily":"'Roboto'","fontStyle":"normal","fontWeight":"700","fontSize":"1rem","lineHeight":"1.375rem","display":"flex","alignItems":"center","color":"#4F518C"}


export function FormLogin(){
    return(
<form> 
    <p style={normalText}> E-MAIL</p>
    <input style = {inputEmail} placeholder='exemplo@email.com'></input>
    <p style={textSenha}> SENHA</p>
    <input placeholder='• • • • • • •' style={inputSenha}></input>
    
    <button style = {buttonStyle}> <span style={{...textButton, "color":"#FFFFFF"}}> ENTRAR  </span></button>
    <button style = {button2Style}> <span style={textButton}><img src= {googleLogo} style = {googleLogoStyle} /> ENTRAR COM O GOOGLE </span></button>
    <button style = {button3Style}> <span style={textButton}> CADASTRAR  </span></button>
</form>
    )
}