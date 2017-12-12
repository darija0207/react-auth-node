import React, {Component} from 'react';
import ReactDOM from 'react-dom';

let PayPalButton = paypal.Button.driver('react', {React, ReactDOM});

export default class PayPalForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      env: 'sandbox',
      commit: true,
      // client: {
      //   sandbox: 'Aan8rqxouckG4YJZ5gRnZdJYwGIKvU52z4AToKXwRl2BUMoqijvFtdDWS7lHf1GKE4aHV0QxvkTr15Lv',
      //   production: 'AUBUuUsb6mjOTBQp3StSm9dt-CLNOHDL3aUlvoQfNr__4jE-Gb21WyKAW0ONUXTskSUJAJ3kWsaOLzzA'
      // },
    };

    this.onAuthorize = this.onAuthorize.bind(this);
  }

  payment(data, actions) {
    return actions.payment.create({
      payment: {
        transactions: [
          {
            amount: {total: '1.00', currency: 'USD'}
          }
        ]
      }
    });
  }

  onAuthorize(data, actions) {
    return actions.payment.execute().then(function (paymentData) {
      console.log('The payment is complete!', paymentData)
    });
  }


  render() {
    return (
      <div className="container">
        <h4 className="text-center"> PayPal payment </h4>
        {/*<form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post">*/}
          {/*<input type="hidden" name="cmd" value="_s-xclick"/>*/}
            {/*<input type="hidden" name="hosted_button_id" value="221"/>*/}
            {/*<input type="image" name="submit"*/}
                   {/*src="https://www.paypalobjects.com/en_US/i/btn/btn_buynow_LG.gif"*/}
                   {/*alt="PayPal - The safer, easier way to pay online"/>*/}
              {/*<img alt="" width="1" height="1"*/}
                   {/*src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" />*/}

        {/*</form>*/}
      </div>
    );
  }
}
