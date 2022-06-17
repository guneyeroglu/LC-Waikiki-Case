import { useContext, useEffect, useState } from "react";
import headerLogo from "../../assets/images/header/header-logo.png";
import favorite from "../../assets/images/header/favorite.png";
import shopping from "../../assets/images/header/shopping.png";
import "../../assets/styles/header/style.css";
import {
  Image,
  Popover,
  InputGroup,
  FormControl,
  Button,
  OverlayTrigger,
} from "react-bootstrap";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import DataContext from "../../context/DataContext";
import Favorite from "../favorite/Favorite";

function Header() {
  const [clicked, setClicked] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [value, setValue] = useState("");
  const context = useContext(DataContext);

  function checkMyBox(e) {
    setMobileNav(e);
  }

  const popover = (
    <Popover id="popover-basic" className="fav-heading">
      <Popover.Header as="h3">
        Favorilerim ({context.state.favorite.length} ürün)
      </Popover.Header>
      <Popover.Body className="fav-body">
        {context.state.favorite.length > 0 ? (
          <Favorite />
        ) : (
          <div className="empty-fav">
            <span>Favorilerinde hiç ürün yok.</span>
          </div>
        )}
      </Popover.Body>
    </Popover>
  );
  const changeInput = () => {
    document.getElementById("i-search").style.borderBottomLeftRadius = "1.4ch";
    document.getElementById("btn-search").style.borderBottomRightRadius =
      "1.4ch";
    document.getElementById("search-list").classList.remove("search-active");
  };

  const clickInput = (bool) => {
    setClicked(bool);
    if (bool) {
      document.getElementById("i-search").style.borderBottomLeftRadius = 0;
      document.getElementById("btn-search").style.borderBottomRightRadius = 0;
      document.getElementById("search-list").classList.add("search-active");
    } else {
      setTimeout(changeInput, 200);
    }
  };

  const addToHistory = (e) => {
    if (context.searchHistory.length === 0 && e.length > 2) {
      context.setSearchHistory([
        ...context.searchHistory,
        { value: String(e).toLowerCase() },
      ]);
    } else if (
      context.searchHistory.some(
        (search) =>
          String(search.value).toLowerCase() === String(e).toLowerCase()
      ) === false &&
      e.length > 2
    ) {
      context.setSearchHistory([
        ...context.searchHistory,
        { value: String(e).toLowerCase() },
      ]);
    }
  };

  const handleChanged = () => {
    context.setInputValue(value);
    addToHistory(value);

    if (value.length > 2) {
      setMobileSearch(false);
    }
  };

  const selectedInputValue = (e) => {
    setValue(e);
    context.setInputValue(e);
    addToHistory(e);
    setMobileSearch(false);
  };

  useEffect(() => {
    document.getElementById("btn-search").style.borderBottomRightRadius =
      "1.4ch";
  }, []);

  const mobileSearchBar = () => {
    setMobileSearch(true);
  };

  return (
    <>
      <header className="header-container">
        <div className="header-top">
          <div className="header-top-left">
            <Link to="/" className="main-header-logo">
              <Image src={headerLogo} alt="lc-waikiki" />
            </Link>
          </div>
          <div className="header-top-center">
            <InputGroup>
              <FormControl
                placeholder="Tüm ürünlerde ara"
                as="input"
                type="text"
                id="i-search"
                onFocus={() => clickInput(true)}
                onBlur={() => clickInput(false)}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                autoComplete="off"
              />
              <Button
                as="input"
                type="button"
                id="btn-search"
                variant="outline-primary"
                value="Ara"
                active={clicked}
                style={clicked ? { color: "white" } : { color: "#61666A" }}
                onClick={handleChanged}
              />
              <div className="header-search-list" id="search-list">
                <ol>
                  {value.length > 0 && value.length < 3 ? (
                    <li>{value}</li>
                  ) : (
                    <>
                      {value.length > 2 ? (
                        <li
                          onClick={(e) =>
                            selectedInputValue(e.target.innerHTML)
                          }
                        >
                          {value}
                        </li>
                      ) : (
                        ""
                      )}
                      {value.length > 2 &&
                        context.search
                          .filter((filterSearch) =>
                            String(filterSearch)
                              .toLowerCase()
                              .includes(String(value).toLowerCase())
                          )
                          .map((search, index) => (
                            <li
                              key={index}
                              onClick={(e) =>
                                selectedInputValue(e.target.innerHTML)
                              }
                            >
                              {search}
                            </li>
                          ))}
                    </>
                  )}
                  <div className="search-last">
                    <div className="search-history">
                      <span>Son Arananlar</span>
                    </div>
                    <ul>
                      {context.searchHistory.map((item, index) => (
                        <li
                          key={index}
                          onClick={(e) =>
                            selectedInputValue(e.target.innerHTML)
                          }
                        >
                          {item.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ol>
              </div>
            </InputGroup>
          </div>
          <div className="header-top-right">
            <div className="header-section">
              <div className="card-dropdown card-mobile">
                <Link to="#">
                  <SearchIcon
                    fontSize="small"
                    color="primary"
                    onClick={mobileSearchBar}
                  />
                  <span>Ara</span>
                </Link>
              </div>
              <div className="card-dropdown">
                <OverlayTrigger
                  trigger="focus"
                  placement="bottom"
                  overlay={popover}
                >
                  <Link to="#">
                    <Image src={favorite} alt="fav" />
                    <span>Favorilerim</span>
                  </Link>
                </OverlayTrigger>
              </div>
              <div className="card-dropdown">
                <Link to="/sepet">
                  <Image src={shopping} alt="sepet" />
                  <span>Sepetim</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="header-bottom" id="header-bottom">
          <nav>
            <ul>
              <li>
                <Link to="/">KADIN</Link>
              </li>
              <li>
                <Link to="/">ERKEK</Link>
              </li>
              <li>
                <Link to="/">ÇOCUK</Link>
              </li>
              <li>
                <Link to="/">BEBEK</Link>
              </li>
              <li>
                <Link to="/">LCW HOME</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div
          className={
            mobileNav
              ? "header-bottom-mobile"
              : "header-bottom-mobile mobile-close"
          }
        >
          <nav>
            <ul>
              <li>
                <Link to="/">KADIN</Link>
              </li>
              <li>
                <Link to="/">ERKEK</Link>
              </li>
              <li>
                <Link to="/">ÇOCUK</Link>
              </li>
              <li>
                <Link to="/">BEBEK</Link>
              </li>
              <li>
                <Link to="/">LCW HOME</Link>
              </li>
            </ul>
          </nav>
        </div>
        <input
          type={"checkbox"}
          className="nav-toggle"
          id="nav-toggle"
          onClick={(e) => checkMyBox(e.target.checked)}
        />
        <label htmlFor="nav-toggle" className="nav-toggle-label">
          {mobileNav ? <CloseIcon /> : <MenuIcon />}
        </label>
      </header>
      {mobileSearch ? (
        <div className="mobile-search-click">
          <InputGroup className="mobile-search-group">
            <ArrowBackIosIcon
              color="primary"
              className="mobile-search-backspace"
              onClick={() => setMobileSearch(false)}
            />
            <FormControl
              placeholder="Tüm ürünlerde ara"
              as="input"
              type="text"
              id="i-search"
              onFocus={() => clickInput(true)}
              onBlur={() => clickInput(false)}
              onChange={(e) => setValue(e.target.value)}
              value={value}
              autoComplete="off"
            />
            <Button
              as="input"
              type="button"
              id="btn-search"
              variant="outline-primary"
              value="Ara"
              active={clicked}
              style={clicked ? { color: "white" } : { color: "#61666A" }}
              onClick={handleChanged}
            />
          </InputGroup>
          <div className="mobile-header-search-list" id="mobile-search-list">
            <ol>
              {value.length > 0 && value.length < 3 ? (
                <li>{value}</li>
              ) : (
                <>
                  {value.length > 2 ? (
                    <li onClick={(e) => selectedInputValue(e.target.innerHTML)}>
                      {value}
                    </li>
                  ) : (
                    ""
                  )}
                  {value.length > 2 &&
                    context.search
                      .filter((filterSearch) =>
                        String(filterSearch)
                          .toLowerCase()
                          .includes(String(value).toLowerCase())
                      )
                      .map((search, index) => (
                        <li
                          key={index}
                          onClick={(e) =>
                            selectedInputValue(e.target.innerHTML)
                          }
                        >
                          {search}
                        </li>
                      ))}
                </>
              )}
              <div className="mobile-search-last">
                <div className="mobile-search-history">
                  <span>Son Arananlar</span>
                </div>
                <ul>
                  {context.searchHistory.map((item, index) => (
                    <li
                      key={index}
                      onClick={(e) => selectedInputValue(e.target.innerHTML)}
                    >
                      {item.value}
                    </li>
                  ))}
                </ul>
              </div>
            </ol>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Header;
