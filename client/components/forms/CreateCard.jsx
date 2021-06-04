import React from 'react';
import axios from 'axios';

class CreateCard extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: '',
      Email: '',
      phoneNumber: '',
      spendingLimit: '',
      spendingLimitTimeframe: '',
    };
    this.createCard = this.createCard.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  onSubmit(evt) {
    evt.preventDefault();
    this.createCard();
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  async createCard() {
    await axios.post('/api/cards');
    console.log('card created');
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>Full Name </label>
          <input
            type="text"
            id="fname"
            name="fullName"
            onChange={this.handleChange}
          />
          <label>Email </label>
          <input
            type="text"
            id="email"
            name="Email"
            onChange={this.handleChange}
          />
          <label>Phone Number </label>
          <input
            type="text"
            id="phone number"
            name="phoneNumber"
            onChange={this.handleChange}
          />
          <label>Spending Limit </label>
          <input
            type="text"
            id="spending limit"
            name="spendingLimit"
            onChange={this.handleChange}
          />
          <label>Spending Limit Timeframe </label>
          <input
            type="text"
            id="spending limit timeframe"
            name="spendingLimitTimeframe"
            onChange={this.handleChange}
          />
          <input type="submit" value="Create Card" />
        </form>
      </div>
    );
  }
}

export default CreateCard;
