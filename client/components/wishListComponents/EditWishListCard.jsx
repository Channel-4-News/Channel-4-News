import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
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

  onChange(ev) {
    console.log(this.state);
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSubmit() {
    const { itemName, imgUrl, cost, category, description } = this.state;
    this.props.editWishListCard({
      itemName,
      imgUrl,
      cost,
      category,
      description,
      id: this.props.wishListItem.id,
    });
    this.props.state(false);
  }

  render() {
    const item = this.props.wishListItem;
    const { onChange, onSubmit } = this;
    return (
      <form type="submit">
        <Card id="wishListCardWrapper">
          <Typography
            className="title"
            gutterBottom
            variant="h5"
            component="h2"
          >
            <input
              id="changeWishListTitle"
              onChange={onChange}
              name="itemName"
              type="text"
              defaultValue={item.itemName}
            ></input>
          </Typography>
          <div id="itemRow">
            <Paper id="itemImage" variant="outlined">
              <img name="imgUrl" src={item.imgUrl} />
              <input
                className="wishListFormInput"
                onChange={onChange}
                name="imgUrl"
                type="text"
                defaultValue={item.imgUrl}
              ></input>
            </Paper>
            <div id="itemInfo">
              <div>Wish Cost:</div>
              <Paper className="itemValues" variant="outlined">
                <input
                  className="wishListFormInput"
                  onChange={onChange}
                  name="cost"
                  type="text"
                  defaultValue={item.cost}
                ></input>
              </Paper>
              <br />
              <div>Wish Category:</div>
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
              <br />
              <div>Wish Description:</div>
              <Paper
                id="itemDescriptionWrapper"
                className="itemValues"
                variant="outlined"
              >
                <Typography
                  id="itemDescription"
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  <textarea
                    className="wishListFormInput"
                    id="wishListTextAreaEdit"
                    onChange={onChange}
                    name="description"
                    defaultValue={item.description}
                  ></textarea>
                </Typography>
              </Paper>
            </div>
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
