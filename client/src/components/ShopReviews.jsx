import React from "react";
import axios from "axios";
import StarRating from "react-star-rating-component";
import ReviewEntry from "./ReviewEntry.jsx";
import SubmitReview from "./SubmitReview.jsx";

class ShopReviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      avgRating: null,
      shopId: null
    }
  }

  componentDidMount() {
    this.getReviews();
  }
  
  getReviews() {
    axios.get(`${window.location.pathname}reviews`)
      .then(response => {
        let avgRating = response.data.reduce((acc, val) => {
          return acc + val.rating;
        }, 0) / response.data.length;
        let shopId = response.data[0].shop_id;

        this.setState({
          reviews: response.data, 
          avgRating: Math.round(avgRating), 
          shopId: shopId
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h2>
          Reviews 
          <StarRating 
            name="avgRating" 
            value={this.state.avgRating} 
            editing={false} 
          /> 
          ({this.state.reviews.length})
        </h2>
        {this.state.reviews.map((review, i) => {
          if (i < 5) {
            return (
              <ReviewEntry data={review} key={review.id}/>
            )
          }
        })}
        <SubmitReview 
          getReviews={this.getReviews.bind(this)} 
          shopId={this.state.shopId}
        />
      </div>
    )
  }
}

export default ShopReviews;