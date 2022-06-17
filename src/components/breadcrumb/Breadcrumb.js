import React, { useContext, useState } from "react";
import { Button, Image, Breadcrumb as BC } from "react-bootstrap";
import "../../assets/styles/main/home/style.css";
import sortIcon from "../../assets/images/main/icons/sort.png";
import DataContext from "../../context/DataContext";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function Breadcrumb() {
  const context = useContext(DataContext);
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <>
      <div className="lcw-breadcrumb">
        <BC>
          <BC.Item href="/">Ana Sayfa</BC.Item>
          <BC.Item href="/">Erkek</BC.Item>
          <BC.Item active>Sweatshirt</BC.Item>
        </BC>
      </div>
      <div className="product-list-heading">
        <div className="pl-first-row">
          <h3>Erkek Sweatshirt Modelleri</h3>
        </div>
        <div className="pl-second-row">
          <p>
            {
              context.state.productList.filter((product) =>
                context.inputValue.length >= 3
                  ? String(product.title)
                      .toLowerCase()
                      .includes(context.inputValue.toLowerCase())
                  : product
              ).length
            }{" "}
            ürün
          </p>
          <div className="filter-row">
            <Button bsPrefix="btn-sort" onClick={() => setSortOpen(!sortOpen)}>
              <Image src={sortIcon} />
              <span>Sırala</span>
            </Button>
          </div>
        </div>
        {sortOpen ? (
          <div className="sort-list">
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="recommended"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="recommended"
                control={<Radio size="small" />}
                label="Önerilen sıralama"
                onClick={() => context.setSortValue("recommended")}
              />
              <FormControlLabel
                value="low"
                control={<Radio size="small" />}
                label="En düşük fiyat"
                onClick={() => context.setSortValue("low")}
              />
              <FormControlLabel
                value="high"
                control={<Radio size="small" />}
                label="En yüksek fiyat"
                onClick={() => context.setSortValue("high")}
              />
            </RadioGroup>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Breadcrumb;
