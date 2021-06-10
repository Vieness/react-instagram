class LocalStorageService{
  constructor() {
  }

  setToken(token = ""){
    localStorage.setItem("token", JSON.stringify(token))
  }

  getToken(){
    localStorage.getItem("token")
  }

}

export default  new LocalStorageService();