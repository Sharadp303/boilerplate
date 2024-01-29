const { signUp, signIn, logOut } = require("../controllers/auth")

module.exports=function(app){
    app.post('/signup',signUp)
    app.post('/signin',signIn)
    app.get('/logout',logOut)
}