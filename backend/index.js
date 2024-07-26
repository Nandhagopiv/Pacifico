import express from 'express'
import { MongoClient, ObjectId } from 'mongodb'
import cors from 'cors'
import nodemailer from 'nodemailer'

const app = express()
let ogOtp = null
app.use(cors())
app.use(express.json())
const client = new MongoClient('mongodb+srv://nandhagopy:24122000@cluster0.wfk7s1i.mongodb.net/')

app.get('/signup', async (req, res) => {
    const { email, password, crtpassword, phone } = req.query
    await client.connect();
    const db = client.db('Ecommerce');
    const userCollection = db.collection('users')
    let newUser = null
    const data = await userCollection.find().toArray()
    if (password === crtpassword) {
        if (data.length === 0) {
            res.send(true)
            let a = Math.floor(Math.random() * 10)
            let b = Math.floor(Math.random() * 10)
            let c = Math.floor(Math.random() * 10)
            let d = Math.floor(Math.random() * 10)
            let otp = String(a) + String(b) + String(c) + String(d)
            ogOtp = otp

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "nandhagopy@gmail.com",
                    pass: "ygph wxal eita vujf",
                },
            });

            async function main() {
                const info = await transporter.sendMail({
                    from: '"Pacifico" <nandhagopy@gmail.com>',
                    to: `${email}`,
                    subject: "Email Verification",
                    html: `<p>Thank you for signing up with <b>Pacific</b>. To complete your registration, please use the following One-Time Password (OTP):
    
    OTP: <b>${otp}</b><br/>
    
    Please enter this OTP on the registration page to verify your email address and complete the signup process. This OTP is valid for the next 10 minutes.
    
    <br/>If you have any questions or did not request this OTP, please contact our support team immediately.
    
    Thank you for choosing <b>Pacifico</b></p>`,
                })
                console.log("Message sent: %s", info.messageId)
            }

            main().catch(console.error);
        } else {
            data.map((user) => {
                if (newUser === false) {
                    return
                } else {
                    if (user.email === email || user.phone === phone) {
                        newUser = false
                    } else {
                        newUser = true
                    }
                }
            })

            if (newUser === true) {
                let a = Math.floor(Math.random() * 10)
                let b = Math.floor(Math.random() * 10)
                let c = Math.floor(Math.random() * 10)
                let d = Math.floor(Math.random() * 10)
                let otp = String(a) + String(b) + String(c) + String(d)
                ogOtp = otp

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: "nandhagopy@gmail.com",
                        pass: "ygph wxal eita vujf",
                    },
                });

                async function main() {
                    const info = await transporter.sendMail({
                        from: '"Pacifico" <nandhagopy@gmail.com>',
                        to: `${email}`,
                        subject: "Email Verification",
                        html: `<p>Thank you for signing up with <b>Pacifico</b>. To complete your registration, please use the following One-Time Password (OTP):
    
    OTP: <b>${otp}</b><br/>
    
    Please enter this OTP on the registration page to verify your email address and complete the signup process. This OTP is valid for the next 10 minutes.
    
    <br/>If you have any questions or did not request this OTP, please contact our support team immediately.
    
    Thank you for choosing <b>Pacifico</b></p>`,
                    })
                    console.log("Message sent: %s", info.messageId)
                }

                main().catch(console.error);
                res.send(true)

            } else {
                res.send(false)
            }
        }
    } else {
        res.send('notmatching')
    }
})

app.get('/verify', async (req, res) => {
    const { otp, name, email, password, phone } = req.query
    console.log(req.query)

    if (String(otp) === ogOtp) {
        await client.connect();
        const db = client.db('Ecommerce');
        const userCollection = db.collection('users')
        let newUser = null
        const data = await userCollection.find().toArray()

        if (data.length === 0) {
            const result = await userCollection.insertOne({ name: name, password: password, email: email, phone: phone, cart: [] })
            console.log(result);
            ogOtp = null
            res.send(true)
        } else {
            data.map((user) => {
                if (newUser === false) {
                    return
                } else {
                    if (user.email === email || user.phone === phone) {
                        newUser = false
                    } else {
                        newUser = true
                    }
                }
            })

            if (newUser === true) {
                const result = await userCollection.insertOne({ name: name, password: password, email: email, phone: phone, cart: [] })
                console.log(result);
                ogOtp = null
                res.send(true)
            } else {
                res.send(false)
            }
        }
    } else {
        res.send(false)
    }


})

app.get('/login', async (req, res) => {
    const { enteredmail, enteredpass } = req.query
    await client.connect();
    const db = client.db('Ecommerce');
    const userCollection = db.collection('users')
    let oldUser = null
    const data = await userCollection.find().toArray()

    data.map(async (user) => {
        if (oldUser === true) {
            return
        } else {
            if (user.email === enteredmail && user.password === enteredpass) {
                oldUser = true
                const CurrentColl = db.collection('currentuser')
                const result = await CurrentColl.updateOne({ key: 'dummy' }, {
                    $set: {
                        name: user.name,
                        password: user.password,
                        email: user.email,
                        phone: user.phone,
                        cart: user.cart
                    }
                })
                console.log(result);
            } else {
                oldUser = false
            }
        }
    })

    if (oldUser === true) {
        res.send(true)
    } else {
        res.send(false)
    }
})

app.get('/getusercred', async (req, res) => {
    const { email } = req.query
    console.log(email);
    if (email !== null) {
        await client.connect();
        const db = client.db('Ecommerce');
        const userColl = db.collection('users')
        const data = await userColl.findOne({ email: email })
        res.send(data)
    } else {
        res.send(false)
    }
})

app.get('/getcart', async (req, res) => {
    const { email } = req.query

    await client.connect();
    const db = client.db('Ecommerce');
    const userCollection = db.collection('users')
    const result = await userCollection.findOne({ email: email })
    res.send(result)
})

app.get('/fetch', async (req, res) => {
    const { key } = req.query
    await client.connect();
    const db = client.db('Ecommerce');
    const productCollection = db.collection('allproducts')

    const data = await productCollection.find().toArray()
    const fetchList = data.filter((product) => {
        if (product.color.toUpperCase().includes(key.toUpperCase()) || product.product.toUpperCase().includes(key.toUpperCase()) || product.category.toUpperCase().includes(key.toUpperCase()) || product.subcategory.toUpperCase().includes(key.toUpperCase())) {
            return true
        } else {
            return false
        }
    })
    res.send(fetchList)
})

app.get('/newarrivals', async (req, res) => {
    await client.connect();
    const db = client.db('Ecommerce');
    const productCollection = db.collection('allproducts')

    const data = await productCollection.find().toArray()
    const newArrivals = data.sort((a, b) => {

        const idA = a._id.toString();
        const idB = b._id.toString();

        if (idB < idA) return -1;
        if (idB > idA) return 1;
        return 0;
    })
    res.send(newArrivals)
})

app.get('/refershallproducts', async (req, res) => {
    await client.connect();
    const db = client.db('Ecommerce');
    const productCollection = db.collection('allproducts')

    const data = await productCollection.find().toArray()
    res.send(data)
})

app.get('/addcart', async (req, res) => {
    const { id, email } = req.query
    await client.connect();
    const db = client.db('Ecommerce');
    const productCollection = db.collection('allproducts')
    const objectId = new ObjectId(id);
    const itemData = await productCollection.findOne({ _id: objectId });
    itemData.quantity = 1
    console.log(itemData);

    const userCollection = db.collection('users')
    await userCollection.updateOne({ email: email }, { $push: { cart: JSON.stringify(itemData) } })

    const fetchingToSetCart = await userCollection.findOne({ email: email })
    res.send(fetchingToSetCart)
})

app.get('/removecart', async (req,res)=>{
    const {product, email} = req.query
    await client.connect()
    const db = client.db('Ecommerce');
    const userCollection = db.collection('users')

    const user = await userCollection.findOne({email:email})

    const tempArr = user.cart.map((data)=>{
        return JSON.parse(data)
    })
    const updatedCart = tempArr.filter((data)=>{
        if (product === data.product) {
            return false
        } else{
            return true
        }
    })
    const parcedCart = updatedCart.map(data => {return JSON.stringify(data)})
    await userCollection.findOneAndUpdate({email:email},{$set:{cart:parcedCart}})
    const data = await userCollection.findOne({email:email})
    res.send(data)
})

app.get('/addquantity', async (req, res) => {
    const { productref, email } = req.query;
    console.log(productref, email);

    try {
        await client.connect();
        const db = client.db('Ecommerce');
        const userCollection = db.collection('users');

        const user = await userCollection.findOne({ email: email })

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const updatedCart = user.cart.map(item => {
            const parsedItem = JSON.parse(item);
            if (parsedItem.product === productref) {
                parsedItem.quantity += 1
            }
            return JSON.stringify(parsedItem)
        });

        const result = await userCollection.updateOne(
            { email: email },
            { $set: { cart: updatedCart } }
        )
        console.log(result)

        const data = await userCollection.findOne({email:email})
        res.send(data)

    } catch (error) {
        console.error('Error adding quantity:', error);
        res.status(500).json({ error: 'Server error' });
    }
})

app.get('/lessquantity', async (req, res) => {
    const { productref, email } = req.query;
    console.log(productref, email);

    try {
        await client.connect();
        const db = client.db('Ecommerce');
        const userCollection = db.collection('users');

        const user = await userCollection.findOne({ email: email })

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const updatedCart = user.cart.map(item => {
            const parsedItem = JSON.parse(item);
            if (parsedItem.product === productref) {
                parsedItem.quantity -= 1;
            }
            return JSON.stringify(parsedItem);
        });

        const result = await userCollection.updateOne(
            { email: email },
            { $set: { cart: updatedCart } }
        )
        console.log(result)

        const data = await userCollection.findOne({email:email})
        res.send(data)

    } catch (error) {
        console.error('Error lessing quantity:', error);
        res.status(500).json({ error: 'Server error' });
    }
})

app.get('/getuserforcart', async (req, res) => {
    const {email} = req.query
    await client.connect();
    const db = client.db('Ecommerce');
    const userCollection = db.collection('users')

    const data = await userCollection.findOne({email:email})
    console.log(data);
    res.send(data)
})

app.get('/valformoney', async (req, res) => {
    await client.connect();
    const db = client.db('Ecommerce');
    const productCollection = db.collection('allproducts')

    const data = await productCollection.find().toArray()

    const valformoney = data.slice(0).sort((a, b) => {
        const percentageA = 100 - Math.floor((a.price / a.MRP) * 100);
        const percentageB = 100 - Math.floor((b.price / b.MRP) * 100);

        return percentageB - percentageA
    });

    res.send(valformoney);
})

app.get('/cate', async (req, res) => {
    await client.connect();
    const db = client.db('Ecommerce');
    const productCollection = db.collection('allproducts')

    const data = await productCollection.find().toArray()

    const seen = {};

    const uniqueData = data.filter(item => {
        if (!seen[item.category]) {
            seen[item.category] = true;
            return true;
        }
        return false;
    });

    res.send(uniqueData)
})

app.get('/displaycate', async (req, res) => {
    const { selCate } = req.query
    await client.connect();
    const db = client.db('Ecommerce');
    const productCollection = db.collection('allproducts')

    const data = await productCollection.find({ category: selCate }).toArray()
    const seen = {};

    const uniqueData = data.filter(item => {
        if (!seen[item.subcategory]) {
            seen[item.subcategory] = true;
            return true;
        }
        return false;
    });
    res.send(uniqueData)
})

app.listen(5000, async () => {
    console.log('Server Started');
    await client.connect()
    console.log('Db Connected');
})