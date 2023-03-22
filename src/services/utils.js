export async function checkLoginStatus() {
    const user = window.localStorage.getItem('user')   
  const userObject = JSON.parse(user)
  
  const config = {
    headers: { Authorization: `Bearer ${userObject?.token}` },
  }
  // futuramente colocar essa parte de cima em uma função(util), já que repeti no UpdateUser logo abaixo
  return user,config
}
