import React from 'react'
import classes from './PaymentMethods.module.css'
import { FaPaypal, FaCreditCard, FaBitcoin } from 'react-icons/fa';
import Title from '../Shared/Title';
const PaymentMethods = () => {
  return (
    <section className={classes.paymentSection}>
        <Title title="Payment Methods"/>
        <div className={classes.paymentGrid}>
            <div className={classes.paymentMethod}>
                <FaPaypal className={classes.paymentIcon} />
                <span>PayPal</span>
            </div>
            <div className={classes.paymentMethod}>
                <FaCreditCard className={classes.paymentIcon} />
                <span>Western Union</span>
            </div>
            <div className={classes.paymentMethod}>
                <FaBitcoin className={classes.paymentIcon} />
                <span>USDT (Crypto)</span>
            </div>
            <div className={classes.paymentMethod}>
                <FaCreditCard className={classes.paymentIcon} />
                <span>Bank Transfer</span>
            </div>
        </div>
    </section>
  )
}

export default PaymentMethods
