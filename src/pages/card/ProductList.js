import { useContext } from "react";
import { Button, Image, Card } from "react-bootstrap";
import "../../assets/styles/main/card/style.css";
import DataContext from "../../context/DataContext";

function ProductList() {
  const context = useContext(DataContext);

  const sorted = (a, b) => {
    if (context.sortValue === "recommended") {
      return a - b;
    } else if (context.sortValue === "low") {
      return a.price - b.price;
    } else if (context.sortValue === "high") {
      return b.price - a.price;
    }
  };

  return (
    <>
      <div className="product-list-container">
        {context.state.productList &&
          context.state.productList
            .filter((product) =>
              context.inputValue.length >= 3
                ? String(product.title)
                    .toLowerCase()
                    .includes(context.inputValue.toLowerCase())
                : product
            )
            .sort((a, b) => sorted(a, b))
            .map((product) => (
              <Card key={product.id}>
                <Image
                  className="like-indicator"
                  src={
                    context.state.favorite
                      .filter((favoriteItem) => favoriteItem.id === product.id)
                      .map((status) => status.fav)[0]
                      ? require("../../assets/images/main/icons/like.png")
                      : require("../../assets/images/main/icons/unlike.png")
                  }
                  id={`product-${product.id}`}
                  onClick={() => context.addToFavorite(product)}
                />
                <Card.Img
                  variant="top"
                  src={require(`../../assets/images/main/products/${product.id}.png`)}
                />
                <Card.Body>
                  <div className="card-body-text">
                    <Card.Text as="p">{product.title}</Card.Text>
                    <Card.Title as="h5">{product.price} TL</Card.Title>
                  </div>
                  <div className="card-body-content">
                    <div className="circle-content">
                      <span className="first-circle"></span>
                      <span className="second-circle"></span>
                      <span className="circle-text">2 Renk</span>
                    </div>
                    <div className="button-content">
                      <Button
                        bsPrefix="btn-add"
                        variant="primary"
                        onClick={() => context.addToCard(product)}
                      >
                        Sepete Ekle
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
      </div>
    </>
  );
}

export default ProductList;
