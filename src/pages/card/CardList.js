import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../context/DataContext";
import { Button, Image, InputGroup, Form } from "react-bootstrap";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function CardList() {
  const context = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [openWarningIncrease, setOpenWarningIncrease] = useState(false);
  const [product, setProduct] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenWarning = () => {
    setOpenWarning(true);
  };

  const handleClickOpenWarningIncrease = () => {
    setOpenWarningIncrease(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseWarning = () => {
    setOpenWarning(false);
    context.setWarning(false);
  };

  const handleCloseWarningIncrease = () => {
    setOpenWarningIncrease(false);
    context.setWarningIncrease(false);
  };

  const getProduct = (product) => {
    handleClickOpen();
    setProduct(product);
  };

  const btnDelete = () => {
    context.removeFromCard(product);
    handleClose();
  };

  const btnDeleteFav = () => {
    context.removeCardAddFav(product);
    handleClose();
  };

  useEffect(() => {
    if (context.warning) {
      handleClickOpenWarning();
    }

    if (context.warningIncrease) {
      handleClickOpenWarningIncrease();
    }
  }, [context.warning, context.warningIncrease]);

  return (
    <>
      {context.state.card &&
        context.state.card.map((product) => (
          <div className="basket-left-item" key={product.id}>
            <div className="product-area">
              <div className="product-left-row">
                <div className="product-image">
                  <Image
                    src={require(`../../assets/images/main/products/${product.id}.png`)}
                    alt={product.title}
                  />
                </div>
                <div className="product-info">
                  <div className="product-info-first-row">
                    <p>{product.title}</p>
                    <span>{product.number}</span>
                  </div>
                  <div className="product-info-second-row">
                    <p>
                      Beden: <span>{product.size}</span>
                    </p>
                    <p>
                      Renk: <span>{product.colour}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="product-right-row">
                <div className="product-price">
                  <span>
                    {(
                      context.state.card
                        .filter((cardItem) => cardItem.id === product.id)
                        .map((productItem) => productItem.count) *
                      (product.price + product.discount)
                    ).toFixed(2)}{" "}
                    TL
                  </span>
                  <p>
                    {(
                      context.state.card
                        .filter((cardItem) => cardItem.id === product.id)
                        .map((productItem) => productItem.count) * product.price
                    ).toFixed(2)}{" "}
                    TL
                  </p>
                </div>
                <div className="product-fav-remove">
                  <Image
                    src={require("../../assets/images/main/icons/delete.png")}
                    alt="çöp"
                    onClick={() => getProduct(product)}
                  />
                  <Image
                    src={
                      context.state.favorite
                        .filter(
                          (favoriteItem) => favoriteItem.id === product.id
                        )
                        .map((productItem) => productItem.fav)[0]
                        ? require("../../assets/images/main/icons/like.png")
                        : require("../../assets/images/main/icons/unlike.png")
                    }
                    alt="kalp"
                    onClick={() => context.addToFavorite(product)}
                  />
                </div>
                <div className="product-add">
                  <InputGroup bsPrefix="product-quantity">
                    <Button
                      variant="outlined"
                      onClick={() => context.btnDecrease(product.id)}
                    >
                      -
                    </Button>
                    <Form.Control
                      type="text"
                      id="inputCount"
                      value={context.state.card
                        .filter((cardItem) => cardItem.id === product.id)
                        .map((productItem) => productItem.count)}
                      onChange={(e) =>
                        context.changeCount(product.id, e.target.value)
                      }
                      autoComplete="off"
                    />
                    <Button
                      variant="outlined"
                      onClick={() => context.btnIncrease(product.id)}
                    >
                      +
                    </Button>
                  </InputGroup>
                </div>
              </div>
            </div>
          </div>
        ))}
      <Dialog
        open={open}
        onClose={handleClose}
        onBlur={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="basket-dialog-title">
          <Image
            src={require("../../assets/images/main/icons/close.png")}
            onClick={handleClose}
            className="basket-dialog-img"
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="basket-dialog-text"
          >
            Ürünü sepetinizden sildikten sonra favorilerinizde saklamak ister
            misiniz?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="basket-dialog-actions">
          <Button onClick={() => btnDelete()}>Sil</Button>
          <Button onClick={() => btnDeleteFav()}>Sil ve Favorilere Ekle</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openWarning}
        onClose={handleCloseWarning}
        onBlur={handleCloseWarning}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="basket-dialog-warning-title">
          <Image
            src={require("../../assets/images/main/icons/close.png")}
            onClick={handleCloseWarning}
            className="basket-dialog-img"
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="basket-dialog-warning-text"
          >
            0 adet ürün seçemezsiniz.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="basket-dialog-warning-actions">
          <Button onClick={handleCloseWarning}>Tamam</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openWarningIncrease}
        onClose={handleCloseWarningIncrease}
        onBlur={handleCloseWarningIncrease}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="basket-dialog-warning-title">
          <Image
            src={require("../../assets/images/main/icons/close.png")}
            onClick={handleCloseWarningIncrease}
            className="basket-dialog-img"
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="basket-dialog-warning-text"
          >
            10 adet stok kalmıştır.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="basket-dialog-warning-actions">
          <Button onClick={handleCloseWarningIncrease}>Tamam</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CardList;
