const express = require ('express')
const { insertToDB, getAll, deleteObject,getDocumentById , updateDocument} = require('./databaseHandler')
const app = express()

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended:true}))


const path = require('path')
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))


app.get('/', async(req, res) => {
    var result = await getAll("Product")
    res.render('home',{products: result})
})

// app.get('/index', async(req, res) => {
//     var result = await getAll("Product")
//     res.render('index',{products: result})
// })


app.get('/delete/:id',(req, res) => {
    const idValue = req.params.id
    deleteObject(idValue,"Product")
    res.redirect('/')
})


app.get('/edit/:id',async(req, res) => {
    const idValue = req.params.id
    const productToedit = await getDocumentById(idValue, "Product")
    res.render('edit',{products: productToedit})
})


app.post('/editProduct', async(req, res) =>{
    const id = req.body.txtId
    const name = req.body.txtName
    const price = req.body.txtPrice
    const url = req.body.txtUrl;
    let updateValues = {$set: {name: name, price: price, picture: url}};
    await updateDocument(id, updateValues, "Product")
    res.redirect('/')
})


app.post('/insert', async (req, res) => {
    const name = req.body.txtName
    const price = req.body.txtPrice
    const url = req.body.txtURL;
    if(url.length == 0){
        var result = await getAll("Product")
        res.render('home', {products: result, picError:'must to insert picture'})
    }else{

        const obj = {name: name, price: price, picture: url}
        await insertToDB(obj,"Product")
        res.redirect('/')
    }
})



const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running!')