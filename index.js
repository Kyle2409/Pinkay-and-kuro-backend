require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

const app = express()

app.use(express.json())
app.use(cors())

const productRouter = require('./routes/productRoute')
const userRouter = require('./routes/userRoute')
const contactRouter = require('./routes/contactRoute')

app.use('/products', productRouter)
app.use('/users', userRouter)
app.use('/contact', contactRouter)

app.get('/', (req, res) => {
    res.json({ 
        msg: "Welcome to Pinkay and Kuro backend API (≧ω<)人(ゝω≦）, below will show you how to use it.",
        Users: {
            getUsers: "GET /users",
            getSingleUser: "GET /users/:id",
            registerUser: "POST /users/signup",
            signInUser: "POST /users/signin",
            updateUser: "PUT /users/:id",
            deleteUser: "DELETE /users/:id"
        },
        Products:{
            getProducts: "GET /products",
            getSingleProduct: "GET /products/:id",
            createProduct: "POST /products (admin authorisation)",
            updateProduct: "PUT /products/:id (only creator of product can update)",
            deleteProduct: "DELETE /products/:id (only creator of product can delete)"
        },
        Contact: {
            getContactPage: "GET /contact",
            contactMe: "POST /contact"
        }
    })
})

app.listen(process.env.PORT||4423, () => console.log('Server running'))