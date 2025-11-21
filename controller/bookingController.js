const bookings = require("../model/bookingModel");
const jwt = require("jsonwebtoken")
require("dotenv").config
const stripe = require('stripe')(process.env.STRIPESECRETKEY);


//for booking a pickup
exports.bookpickupController = async (req, res) => {
    console.log(`Inside pickup controller`);
    const { wastetype, time, address, username, date, instructions, password, amount, weight } = req.body
    const userMail = req.payload;
    console.log(wastetype, time, address, username, date, instructions, password, amount, weight);
    try {
        const newbookpickup = new bookings({
            wastetype, time, address, username, date, instructions, userMail, password, amount, weight
        })

        await newbookpickup.save()

        res.status(200).json(newbookpickup)
    } catch (error) {
        res.status(500).json(error)
    }

}

//for a user booking history
exports.ubookinghistoryController = async (req, res) => {
    const userMail = req.payload
    try {
        const userhistory = await bookings.find({ userMail })
        res.status(200).json(userhistory)
    } catch (error) {
        res.status(500).json(error)
    }
}


//for all user booking history-admin
//for user booking history
exports.getallhistoryController = async (req, res) => {
    const userMail = req.payload
    try {
        const userhistory = await bookings.find()
        res.status(200).json(userhistory)
    } catch (error) {
        res.status(500).json(error)
    }
}

//for updating booking status
exports.updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedBooking = await bookings.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: "Error updating booking status", error });
    }
};
//payment
exports.paymentcontroller = async (req, res) => {
    console.log(`Inside payment controller`);
    
    const email = req.payload
    console.log(email);

    const { bookingdetails } = req.body
    console.log(bookingdetails);
    try {
        const existingBooking = await bookings.findByIdAndUpdate({ _id: bookingdetails._id }, {
            username: bookingdetails.username,
            wastetype: bookingdetails.wastetype,
            password: bookingdetails.password,
            address: bookingdetails.address,
            date: bookingdetails.date,
            time: bookingdetails.time,
            amount: bookingdetails.amount,
            weight: bookingdetails.weight,
            instructions: bookingdetails.instructions,
            password: bookingdetails.password,
            status: bookingdetails.status,
            userMail: bookingdetails.userMail,
            pstatus: "Payed",
            paidby: email

        }, { new: true })
        console.log(existingBooking);

        const line_item = [{
            price_data: {
                currency: "usd",//dollars
                product_data: {
                    name: bookingdetails.username,
                    description: `${bookingdetails.wastetype}|${bookingdetails.weight}`,

                    metadata: {
                        username: bookingdetails.username,
                        wastetype: bookingdetails.wastetype,
                        password: bookingdetails.password,
                        address: bookingdetails.address,
                        date: bookingdetails.date,
                        time: bookingdetails.time,
                        amount: `${bookingdetails.amount}`,
                        weight: bookingdetails.weight,
                        instructions: bookingdetails.instructions,
                        password: bookingdetails.password,
                        status: bookingdetails.status,
                        userMail: bookingdetails.userMail,
                        pstatus: "Paid",
                        paidby: email


                    },
                },
                unit_amount: Math.round(bookingdetails.amount * 10),//cent purchase amount
            },
            quantity: 1
        }]
console.log("Stripe key:", process.env.STRIPE_SECRET_KEY)

        //create checkout session for stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: line_item,
            mode: 'payment',
            success_url: `http://clearwaste-frontend.vercel.app/confirmation`,
            cancel_url: `http://clearwaste-frontend.vercel.app/payment`
        })
        console.log(session);
        // res.status(200).json({sessionId:session.id})
        res.status(200).json({ sessionURL: session.url })
    } catch (error) {
        res.status(500).json(error)
    }


}

//delete a booking
exports.deleteabookingController=async(req,res)=>{
    const {id}=req.params
    try {
        await bookings.findByIdAndDelete({_id:id})
        res.status(200).json("Removed the booking")
    } catch (error) {
        res.status(500).json(error)
    }
}









