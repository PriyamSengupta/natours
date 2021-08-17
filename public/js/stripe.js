/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
var stripe = Stripe("pk_test_51JP7cbSGpscA6uaCIXpD74l8bciiIRYR71XQrPG5dIjG5YqyvvMIsHbJRKV5CfTQLgUiyqx9LdY8hohdEhCM5WjP00UBI681J9");
export const bookTour = async tourId => {
    try{
        const session = await axios(`http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`)
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    }
    catch(err){
        showAlert('error', err)
    }
}