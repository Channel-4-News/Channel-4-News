import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { editWishListCard } from '../../store/actions/wishListActions/editWishListCard';

class EditWishListCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      imgUrl: '',
      cost: 0,
      category: '',
      description: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    const { itemName, imgUrl, cost, category, description } =
      this.props.wishListItem;
    await this.setState({
      itemName,
      imgUrl,
      cost,
      category,
      description,
    });
  }

  componentDidUpdate() {
    if (this.state.itemName.length > 35) {
      let shortened = this.state.itemName.slice(0, 35);
      this.setState({ itemName: shortened });
    }
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  async onSubmit() {
    const { itemName, imgUrl, cost, category, description } = this.state;
    await this.props.editWishListCard({
      itemName,
      imgUrl,
      cost,
      category,
      description,
      id: this.props.wishListItem.id,
    });
    this.props.state();
  }

  render() {
    const item = this.props.wishListItem;
    const { onChange, onSubmit } = this;
    return (
      <form type="submit" id="editWish">
        <Card id="wishListCardWrapper">
          <input
            id="changeWishListTitle"
            onChange={onChange}
            name="itemName"
            type="text"
            defaultValue={item.itemName}
          ></input>
          <div id="itemRow">
            <Paper id="itemImage" className="itemImage" variant="outlined">
              <img name="imgUrl" src={item.imgUrl} />
              <div id="editImageContainer">
                <div>Image URL:</div>

                <input
                  className="wishListFormInput"
                  id="editImage"
                  onChange={onChange}
                  name="imgUrl"
                  type="text"
                  defaultValue={item.imgUrl}
                ></input>
              </div>
            </Paper>
            <div id="itemInfoEdit">
              <div className="editInput editCost">
                <div>Cost:</div>
                <Paper className="itemValues" variant="outlined">
                  <input
                    className="wishListFormInput"
                    onChange={onChange}
                    name="cost"
                    type="text"
                    defaultValue={item.cost}
                  ></input>
                </Paper>
              </div>
              <div className="editInput">
                <div>Category:</div>
                <Paper className="itemValues" variant="outlined">
                  <select
                    className="wishListFormInput"
                    onChange={onChange}
                    name="category"
                    id="wishListCategorySelect"
                    defaultValue={item.category}
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Toys">Toys</option>
                    <option value="Food">Food</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                  </select>
                </Paper>
              </div>
              <br />
            </div>
            <div>
              <Button
                onClick={onSubmit}
                color="secondary"
                size="large"
                variant="contained"
              >
                Save Edit
              </Button>
            </div>
          </div>
        </Card>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editWishListCard: (wishListCard) => {
      return dispatch(editWishListCard(wishListCard));
    },
  };
};

export default connect(null, mapDispatchToProps)(EditWishListCard);
