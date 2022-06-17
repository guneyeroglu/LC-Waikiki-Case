import React, { useContext } from "react";
import { Image } from "react-bootstrap";
import "../../assets/styles/main/favorite/style.css";
import DataContext from "../../context/DataContext";

function Favorite() {
  const context = useContext(DataContext);

  return (
    <>
      {context.state.favorite &&
        context.state.favorite.map((favorite) => (
          <div className="fav-product-item" key={favorite.id}>
            <div className="fav-left-row">
              <div className="fav-product-img">
                <Image
                  src={require(`../../assets/images/main/products/${favorite.id}.png`)}
                />
              </div>
              <div className="fav-product-info">
                <div className="fav-product-top">
                  <span>{favorite.title}</span>
                </div>
                <div className="fav-product-bottom">
                  <p>
                    Beden: <span>{favorite.size}</span>
                  </p>
                  <p>
                    Renk: <span>{favorite.colour}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="fav-right-row">
              <div className="fav-right-price">
                <span>
                  {(favorite.price + favorite.discount).toFixed(2)} TL
                </span>
                <span>{favorite.price} TL</span>
              </div>
              <div className="fav-right-like">
                <Image
                  src={require("../../assets/images/main/icons/like.png")}
                  onClick={() => context.addToFavorite(favorite)}
                />
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default Favorite;
