import express from 'express'
import { MongoClient, ObjectId } from 'mongodb'
import cors from 'cors'
import nodemailer from 'nodemailer'
import Stripe from 'stripe';
import bodyParser from 'body-parser';

const stripe = new Stripe('sk_test_51Pj12HP1mnBMkZyD4BSVBElFcc04pPlXyIKySeHQl9aIE3egQB0jqRzOPfm2DU3TPKiGhSzho8ROxQCvHFnVA1Kk00qDGUBjSX')

const app = express()
app.use(bodyParser.json())
let ogOtp = null
app.use(cors())
app.use(express.json())
const client = new MongoClient('mongodb+srv://nandhagopy:24122000@cluster0.wfk7s1i.mongodb.net/')

app.get('/signup', async (req, res) => {
    try {
        const { email, password, crtpassword, phone } = req.query;
        if (password !== crtpassword) {
            res.send('notmatching');
            return;
        }

        const data = await userCollection.find().toArray();
        let newUser = true;

        if (data.length === 0) {
            res.send(true);
        } else {
            for (const user of data) {
                if (user.email === email || user.phone === phone) {
                    newUser = false;
                    break;
                }
            }

            if (newUser) {
                let otp = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');
                ogOtp = otp;

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: "nandhagopy@gmail.com",
                        pass: "ygph wxal eita vujf",
                    },
                });

                const mailOptions = {
                    from: '"Pacifico" <nandhagopy@gmail.com>',
                    to: email,
                    subject: "Email Verification",
                    html: `<p>Thank you for signing up with <b>Pacifico</b>. To complete your registration, please use the following One-Time Password (OTP):
    
    OTP: <b>${otp}</b><br/>
    
    Please enter this OTP on the registration page to verify your email address and complete the signup process. This OTP is valid for the next 10 minutes.
    
    <br/>If you have any questions or did not request this OTP, please contact our support team immediately.
    
    Thank you for choosing <b>Pacifico</b></p>`,
                };

                await transporter.sendMail(mailOptions);
                console.log("Message sent");
                res.send(true);
            } else {
                res.send(false);
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/sendemail', async (req, res) => {
    try {
        const { email, qty, cart, color, ttlprice, price, product, size } = req.query;
        if (ttlprice !== 'undefined') {
            const jsonString = cart;
            const jsonArrayString = `[${jsonString}]`;
            const cartList = JSON.parse(jsonArrayString);

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "nandhagopy@gmail.com",
                    pass: "ygph wxal eita vujf",
                },
            });

            const mailOptions = {
                from: '"Pacifico" <nandhagopy@gmail.com>',
                to: email,
                subject: "Order Successfully Placed",
                html: `<p style="color: black;">Thank you for shopping with us! We’re excited to let you know that your order has been received and is currently being processed.</p>
                <div>
                        <h1 style="color: black;">Order Details</h1>
                        ${cartList.map((data) => {
                            return `<div>
                                <div>
                                    <h3 style="color: black;">${data.product}</h3>
                                    <h4 style="color: black;">${data.color}</h4>
                                    <h4 style="color: black;">${data.qty} x ₹${data.price} = ₹${data.qty * data.price}</h4>
                                </div>
                                <h4 style="color: black;">Size Or Variant: ${data.size}</h4>
                            </div>`;
                        }).join('')}
                        <h2 style="color: black;">Total Bill Amount (INR) : ₹${ttlprice}</h2>
                    </div>
                <p style="color: black;">Thank you for choosing Pacifico. We hope you enjoy your purchase!
    
    Best regards,
    
    The Pacifico Team</p>`,
            };

            await transporter.sendMail(mailOptions);
            console.log("Message sent");
        } else {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "nandhagopy@gmail.com",
                    pass: "ygph wxal eita vujf",
                },
            });

            const mailOptions = {
                from: '"Pacifico" <nandhagopy@gmail.com>',
                to: email,
                subject: "Order Successfully Placed",
                html: `<p style="color: black;">Thank you for shopping with us! We’re excited to let you know that your order has been received and is currently being processed.</p>
                <div>
                        <h1 style="color: black;">Order Details</h1>
                        <div>
                            <h3 style="color: black;">${product}</h3>
                            <h4 style="color: black;">${color}</h4>
                            <h4 style="color: black;">${qty} x ₹${price} = ₹${qty * price}</h4>
                        </div>
                        <h4 style="color: black;">Size Or Variant: ${size}</h4>
                        <h2 style="color: black;">Total Bill Amount (INR) : ₹${qty * price}</h2>
                    </div>
                <p style="color: black;">Thank you for choosing Pacifico. We hope you enjoy your purchase!
    
    Best regards,
    
    The Pacifico Team</p>`,
            };

            await transporter.sendMail(mailOptions);
            console.log("Message sent");
        }
        res.send('Email sent');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/verify', async (req, res) => {
    try {
        const { otp, name, email, password, phone } = req.query;
        if (String(otp) === ogOtp) {
            const data = await userCollection.find().toArray();
            let newUser = true;

            if (data.length > 0) {
                for (const user of data) {
                    if (user.email === email || user.phone === phone) {
                        newUser = false;
                        break;
                    }
                }
            }

            if (newUser) {
                await userCollection.insertOne({ name, password, email, phone, cart: [], history: [] });
                ogOtp = null;
                res.send(true);
            } else {
                res.send(false);
            }
        } else {
            res.send(false);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/login', async (req, res) => {
    try {
        const { enteredmail, enteredpass } = req.query;
        const data = await userCollection.find().toArray();
        let oldUser = false;

        for (const user of data) {
            if (user.email === enteredmail && user.password === enteredpass) {
                oldUser = true;
                const CurrentColl = db.collection('currentuser');
                await CurrentColl.updateOne({ key: 'dummy' }, {
                    $set: {
                        name: user.name,
                        password: user.password,
                        email: user.email,
                        phone: user.phone,
                        cart: user.cart
                    }
                });
                break;
            }
        }

        res.send(oldUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/getusercred', async (req, res) => {
    try {
        const { email } = req.query;
        if (email) {
            const data = await userCollection.findOne({ email });
            res.send(data);
        } else {
            res.send(false);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/getcart', async (req, res) => {
    try {
        const { email } = req.query;
        await client.connect();
        const db = client.db('Ecommerce');
        const userCollection = db.collection('users');
        const result = await userCollection.findOne({ email: email });
        res.send(result);
    } catch (error) {
        console.error('Error in /getcart:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/fetch', async (req, res) => {
    try {
        const { key, email } = req.query;
        await client.connect();
        const db = client.db('Ecommerce');
        const productCollection = db.collection('allproducts');
        const userCollection = db.collection('users');

        if (email !== 'null') {
            const result = await userCollection.updateOne({ email: email }, { $addToSet: { history: key } });
            console.log(result);

            const userHistory = await userCollection.findOne({ email: email });
            if (userHistory.history.length > 5) {
                userHistory.history.shift();
            }
            const response = await userCollection.updateOne({ email: email }, { $set: { history: userHistory.history } });
            console.log(response);
        }

        const data = await productCollection.find().toArray();
        const fetchList = data.filter((product) => {
            return (
                product.color.toUpperCase().includes(key.toUpperCase()) ||
                product.for.toUpperCase().includes(key.toUpperCase()) ||
                product.product.toUpperCase().includes(key.toUpperCase()) ||
                product.category.toUpperCase().includes(key.toUpperCase()) ||
                product.subcategory.toUpperCase().includes(key.toUpperCase())
            );
        });
        res.send(fetchList);
    } catch (error) {
        console.error('Error in /fetch:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/history', async (req, res) => {
    try {
        const { email } = req.query;
        await client.connect();
        const db = client.db('Ecommerce');
        const userCollection = db.collection('users');
        const user = await userCollection.findOne({ email: email });
        res.send(user);
    } catch (error) {
        console.error('Error in /history:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/newarrivals', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('Ecommerce');
        const productCollection = db.collection('allproducts');

        const data = await productCollection.find().toArray();
        const newArrivals = data.sort((a, b) => {
            const idA = a._id.toString();
            const idB = b._id.toString();

            if (idB < idA) return -1;
            if (idB > idA) return 1;
            return 0;
        });
        res.send(newArrivals);
    } catch (error) {
        console.error('Error in /newarrivals:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/refershallproducts', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('Ecommerce');
        const productCollection = db.collection('allproducts');

        const data = await productCollection.find().toArray();
        res.send(data);
    } catch (error) {
        console.error('Error in /refershallproducts:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/addcart', async (req, res) => {
    try {
        const { id, email, selSize } = req.query;
        await client.connect();
        const db = client.db('Ecommerce');
        const productCollection = db.collection('allproducts');
        const userCollection = db.collection('users');

        const objectId = new ObjectId(id);
        const itemData = await productCollection.findOne({ _id: objectId });
        itemData.quantity = 1;
        itemData.selectedsize = selSize;

        await userCollection.updateOne({ email: email }, { $push: { cart: JSON.stringify(itemData) } });

        const fetchingToSetCart = await userCollection.findOne({ email: email });
        res.send(fetchingToSetCart);
    } catch (error) {
        console.error('Error in /addcart:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/removecart', async (req, res) => {
    try {
        const { product, email } = req.query;
        await client.connect();
        const db = client.db('Ecommerce');
        const userCollection = db.collection('users');

        const user = await userCollection.findOne({ email: email });

        const tempArr = user.cart.map((data) => JSON.parse(data));
        const updatedCart = tempArr.filter((data) => data.product !== product);
        const parcedCart = updatedCart.map((data) => JSON.stringify(data));

        await userCollection.updateOne({ email: email }, { $set: { cart: parcedCart } });
        const data = await userCollection.findOne({ email: email });
        res.send(data);
    } catch (error) {
        console.error('Error in /removecart:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/addquantity', async (req, res) => {
    try {
        const { productref, email } = req.query;
        console.log(productref, email);

        await client.connect();
        const db = client.db('Ecommerce');
        const userCollection = db.collection('users');

        const user = await userCollection.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updatedCart = user.cart.map((item) => {
            const parsedItem = JSON.parse(item);
            if (parsedItem.product === productref) {
                parsedItem.quantity += 1;
            }
            return JSON.stringify(parsedItem);
        });

        const result = await userCollection.updateOne({ email: email }, { $set: { cart: updatedCart } });
        console.log(result);

        const data = await userCollection.findOne({ email: email });
        res.send(data);
    } catch (error) {
        console.error('Error adding quantity:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/getlist', async (req, res) => {
    try {
        const { key } = req.query;
        await client.connect();
        const db = client.db('Ecommerce');
        const productCollection = db.collection('allproducts');
        const data = await productCollection.find().toArray();

        const subCateList = data.filter((item) => item.subcategory === key);
        res.send(subCateList);
    } catch (error) {
        console.error('Error in /getlist:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/lessquantity', async (req, res) => {
    const { productref, email } = req.query;
    console.log(productref, email);

    try {
        await client.connect();
        const db = client.db('Ecommerce');
        const userCollection = db.collection('users');

        const user = await userCollection.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updatedCart = user.cart.map(item => {
            const parsedItem = JSON.parse(item);
            if (parsedItem.product === productref) {
                if (parsedItem.quantity > 1) {
                    parsedItem.quantity -= 1;
                } else {
                    // Optionally handle case when quantity is 1 and needs to be removed.
                }
            }
            return JSON.stringify(parsedItem);
        });

        await userCollection.updateOne({ email: email }, { $set: { cart: updatedCart } });
        const data = await userCollection.findOne({ email: email });
        res.send(data);

    } catch (error) {
        console.error('Error in /lessquantity:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/getuserforcart', async (req, res) => {
    try {
        const { email } = req.query;
        await client.connect();
        const db = client.db('Ecommerce');
        const userCollection = db.collection('users');
        const data = await userCollection.findOne({ email: email });
        console.log(data);
        res.send(data);
    } catch (error) {
        console.error('Error in /getuserforcart:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/valformoney', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('Ecommerce');
        const productCollection = db.collection('allproducts');
        const data = await productCollection.find().toArray();

        const valformoney = data.slice(0).sort((a, b) => {
            const percentageA = 100 - Math.floor((a.price / a.MRP) * 100);
            const percentageB = 100 - Math.floor((b.price / b.MRP) * 100);
            return percentageB - percentageA;
        });

        res.send(valformoney);
    } catch (error) {
        console.error('Error in /valformoney:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/applyfilter', async (req, res) => {
    try {
        const { forbrand, color, price, brands, subcate, forprice, forcolor } = req.query;
        const brandsArr = brands.split(',');
        const colorArr = color.split(',');
        const priceArr = price.split(',');
        const brandkeys = forbrand.split(',');
        const pricekeys = forprice.split(',');
        const colorkeys = forcolor.split(',');

        await client.connect();
        const db = client.db('Ecommerce');
        const productCollection = db.collection('allproducts');
        const allproducts = await productCollection.find().toArray();

        const subCategoryProducts = allproducts.filter((product) => product.subcategory === subcate);

        let brandsSet = new Set(brandkeys);
        let priceSet = new Set(pricekeys);
        let colorSet = new Set(colorkeys);

        if (priceSet.has('')) {
            priceSet = new Set(priceArr);
        }
        if (brandsSet.has('')) {
            brandsSet = new Set(brandsArr);
        }
        if (colorSet.has('')) {
            colorSet = new Set(colorArr);
        }

        const filteredProducts = subCategoryProducts.filter((product) => {
            return (
                (priceSet.has('below 500') && product.price < 500 ||
                priceSet.has('500 to 1000') && product.price >= 500 && product.price < 1000 ||
                priceSet.has('1000 to 5000') && product.price >= 1000 && product.price < 5000 ||
                priceSet.has('5000 to 10000') && product.price >= 5000 && product.price < 10000 ||
                priceSet.has('10000 to 25000') && product.price >= 10000 && product.price < 25000 ||
                priceSet.has('25000 to 50000') && product.price >= 25000 && product.price < 50000 ||
                priceSet.has('50000 to 100000') && product.price >= 50000 && product.price < 100000) &&
                brandsSet.has(product.brand) &&
                colorSet.has(product.color)
            );
        });

        res.send(filteredProducts);
    } catch (error) {
        console.error('Error in /applyfilter:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/cate', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('Ecommerce');
        const productCollection = db.collection('allproducts');
        const data = await productCollection.find().toArray();

        const seen = {};
        const uniqueData = data.filter(item => {
            if (!seen[item.category]) {
                seen[item.category] = true;
                return true;
            }
            return false;
        });

        res.send(uniqueData);
    } catch (error) {
        console.error('Error in /cate:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/displaycate', async (req, res) => {
    try {
        const { selCate } = req.query;
        await client.connect();
        const db = client.db('Ecommerce');
        const productCollection = db.collection('allproducts');
        const data = await productCollection.find({ category: selCate }).toArray();

        const seen = {};
        const uniqueData = data.filter(item => {
            if (!seen[item.subcategory]) {
                seen[item.subcategory] = true;
                return true;
            }
            return false;
        });

        res.send(uniqueData);
    } catch (error) {
        console.error('Error in /displaycate:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/fetchnewlyadded', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('Ecommerce');
        const productCollection = db.collection('allproducts');
        const latestProducts = await productCollection
            .find()
            .sort({ _id: -1 })
            .limit(7)
            .toArray();
        res.send(latestProducts);
    } catch (error) {
        console.error('Error in /fetchnewlyadded:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount } = req.body;
        if (amount < 10000) {
            throw new Error('Amount must be at least ₹10.00.');
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'inr',
            automatic_payment_methods: { enabled: true },
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error in /create-payment-intent:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, async () => {
    try {
        console.log('Server Started');
        await client.connect();
        console.log('Db Connected');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});