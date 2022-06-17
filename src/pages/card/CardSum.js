import React, { useContext } from "react";
import DataContext from "../../context/DataContext";

function CardSum() {
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

  const shippingPrice = totalAmount >= 300 ? 0 : 11.99;

  return (
    <>
      <div className="price-sum">
        <span>Sipariş Özeti</span>
      </div>
      <div className="price-info">
        <div className="price-info-first-row">
          <span>Ürün Toplamı</span>
          <p>{totalAmount} TL</p>
        </div>
        <div className="price-info-second-row">
          <span>İndirimler</span>
          <p>{discountAmount} TL</p>
        </div>
        <div className="price-info-third-row">
          <span>Ara Toplam</span>
          <p>{(totalAmount - discountAmount).toFixed(2)} TL</p>
        </div>
        <div className="price-info-fourth-row">
          <span>Kargo Ücreti</span>
          <p>
            {context.state.card.length === 0 || shippingPrice === 0
              ? "Bedava"
              : shippingPrice + " TL"}
          </p>
        </div>
        <div className="price-info-fifth-row">
          <span>Genel Toplam</span>
          <p>
            {context.state.card.length > 0
              ? (totalAmount - discountAmount + shippingPrice).toFixed(2)
              : "0.00"}{" "}
            TL
          </p>
        </div>
      </div>
    </>
  );
}

export default CardSum;
