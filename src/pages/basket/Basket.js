import React, { useContext } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../assets/styles/main/basket/style.css";
import DataContext from "../../context/DataContext";
import CardList from "../card/CardList";
import CardSum from "../card/CardSum";

function Basket() {
  const context = useContext(DataContext);

  const totalAmount = context.state.card
    .reduce(
      (total, product) =>
        (total += (product.price + product.discount) * product.count),
      0
    )
    .toFixed(2);
  const discountAmount = context.state.card
    .reduce((total, product) => (total += product.discount * product.count), 0)
    .toFixed(2);

  const shippingPrice = (300 - (totalAmount - discountAmount)).toFixed(2);

  const totalProduct = context.state.card.reduce(
    (total, product) => (total += product.count),
    0
  );

  return (
    <>
      {context.state.card.length > 0 ? (
        <div className="basket-row">
          <div className="basket-left-row">
            {context.state.card.length > 0 && shippingPrice > 0 ? (
              <div className="shipping-info">
                <span>
                  SEPETİNE {shippingPrice} TL'LİK ÜRÜN EKLE, KARGO BEDAVA OLSUN!
                </span>
              </div>
            ) : (
              ""
            )}
            <div className="basket-left-heading">
              <div className="basket-text">
                <span>Sepetim</span>
                <p>({parseInt(totalProduct)} ürün)</p>
              </div>
              <Link className="btn-backspace" to="/">
                <Image
                  src={require("../../assets/images/main/icons/arrow.png")}
                  alt="Geri"
                />
                <span>Alışverişe Devam Et</span>
              </Link>
            </div>
            <CardList />
          </div>
          <div className="basket-right-row">
            <div className="price-info-area">
              <CardSum />
            </div>
          </div>
        </div>
      ) : (
        <div className="basket-row-empty">
          <div className="empty-basket-content">
            <p>Sepetinizde ürün bulunmamaktadır.</p>
            <span>LCWaikiki'de binlerce ürün seni bekliyor.</span>
            <Link to="/">ALIŞVERİŞE BAŞLA</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Basket;
