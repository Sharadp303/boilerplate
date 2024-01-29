const { product } = require("../controllers/product")
const { verifyToken, isAdmin } = require("../middleware/auth")

module.exports=function(app){
    app.get('/product',[verifyToken,isAdmin],product)
}