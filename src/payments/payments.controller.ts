import { Controller, Post, Body } from '@nestjs/common';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51QUxGMHTf0cZJ45b8oNquGnAPzl0jfR5uV6sen3dzIgvp9wQDF0alGgFaq0EcUvNjvqfUpmtGpwsQmkGTHJZl0Rs00Wqa7PSOO', { apiVersion: '2024-11-20.acacia' });

@Controller('payments')
export class PaymentsController {
    @Post('create-payment-intent')
    async createPaymentIntent(@Body() body: { amount: number; currency: string }) {
        const { amount, currency } = body;

        const customer = await stripe.customers.create();
        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id },
            { apiVersion: '2024-11-20.acacia' },
        );

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            customer: customer.id,
        });

        return {
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
        };
    }
}
