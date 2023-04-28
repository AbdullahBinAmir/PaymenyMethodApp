import express from 'express'
import Stripe from 'stripe'

const app = express()
const port = process.env.port || 3000
const PUBLISHER_KEY = "pk_test_51Mz2mOFtSbngplj5sp2Pba79HaKul9b9pMxJVUMIxtBDlY7j82LjeL9iP94NY1zVbmFF4VA4fC8pN9diQIKQMtQs00o0rhpcgv"
const SECRET_KEY = "sk_test_51Mz2mOFtSbngplj5dgubjYKYthofYdr6MP36ZJjrc2qzrlFBRyBXT9qF3obsLgyEqdonBFWCjD7snB5S2iFyx7oN00uYuJPUs3"

const stripe = Stripe(SECRET_KEY,{apiVersion:'2022-11-15'})

app.listen(port, ()=>{
    console.log(`Server Started At ${port}`)
})

app.post('/create-payment-intent', async (req,res)=>{
    try{
        console.log(req.query.amount)
        const paymentIntent = await stripe.paymentIntents.create(
            {
                amount: req.query.amount,
                currency:'usd',
                payment_method_types: ['card']
            }   
        )

        const clientSecret = paymentIntent.client_secret
        res.json({
            clientSecret: clientSecret
        })
    }
    catch(e){
        res.json({error:e.message})
    }
})