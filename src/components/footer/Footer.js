import React from "react";
import { Image } from "react-bootstrap";
import "../../assets/styles/footer/style.css";
import appStore from "../../assets/images/footer/appstore.png";
import googlePlay from "../../assets/images/footer/googleplay.png";
import appGallery from "../../assets/images/footer/appgallery.png";
import instagram from "../../assets/images/footer/instagram.png";
import facebook from "../../assets/images/footer/facebook.png";
import linkedin from "../../assets/images/footer/linkedin.png";
import youtube from "../../assets/images/footer/youtube.png";
import contact from "../../assets/images/footer/contact.png";
import phone from "../../assets/images/footer/phone.png";
import whatsapp from "../../assets/images/footer/whatsapp.png";

function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-top-left">
            <ul>
              <li>
                <span>Uygulamayı İndirin</span>
              </li>
              <li>
                <a
                  href="https://apps.apple.com/tr/app/id806222359"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={appStore}
                    width="75%"
                    height="auto"
                    alt="app-store"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.lcwaikiki.android&referrer=utm_source%3Dlcwwebsite%26utm_medium%3Dbanner%26utm_campaign%3Dappdownloadandroid"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={googlePlay}
                    width="75%"
                    height="auto"
                    alt="google-play"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://appgallery.huawei.com/#/app/C102105559"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={appGallery}
                    width="75%"
                    height="auto"
                    alt="app-gallery"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-top-right">
            <ul>
              <li>
                <span>Bizi Takip Edin</span>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/lcwaikiki"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={facebook}
                    width="60%"
                    height="auto"
                    alt="facebook"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/lc-waikiki/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={linkedin}
                    width="60%"
                    height="auto"
                    alt="linkedin"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/lcwaikiki/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={instagram}
                    width="60%"
                    height="auto"
                    alt="instagram"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/lcwaikiki"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={youtube}
                    width="60%"
                    height="auto"
                    alt="youtube"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <div className="first-row">
              <ul>
                <li>Yardım</li>
                <li>
                  <a
                    href="https://www.lcwaikiki.com/tr-TR/TR/yardim"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Sıkça Sorulan Sorular
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.lcwaikiki.com/tr-TR/TR/yardim/8"
                    target="_blank"
                    rel="noreferrer"
                  >
                    İade ve Değişim
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.lcwaikiki.com/tr-TR/TR/site-haritasi"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Site Haritası
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.lcwaikiki.com/tr-TR/TR/statik/kullanimkosullari"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Kullanım Koşulları
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.lcwaikiki.com/tr-TR/TR/islem-rehberi"
                    target="_blank"
                    rel="noreferrer"
                  >
                    İşlem Rehberi
                  </a>
                </li>
              </ul>
            </div>
            <div className="second-row">
              <ul>
                <li>Kurumlar</li>
                <li>
                  <a
                    href="https://corporate.lcwaikiki.com/hakkimizda"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Hakkımızda
                  </a>
                </li>
                <li>
                  <a
                    href="https://corporate.lcwaikiki.com/magazalar"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Mağazalarımız
                  </a>
                </li>
                <li>
                  <a
                    href="https://corporate.lcwaikiki.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Kurumsal/Corporate
                  </a>
                </li>
                <li>
                  <a
                    href="https://corporate.lcwaikiki.com/kariyer-firsatlari"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Kariyer Fırsatları
                  </a>
                </li>
                <li>
                  <a
                    href="https://corporate.lcwaikiki.com/Musteri-Hizmetleri"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Kurumsal Destek
                  </a>
                </li>
                <li>
                  <a
                    href="https://corporate.lcwaikiki.com/kurumsal-satis"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Hediye Kart
                  </a>
                </li>
              </ul>
            </div>
            <div className="third-row">
              <ul>
                <li>Politikalar</li>
                <li>
                  <a
                    href="https://www.lcwaikiki.com/tr-TR/TR/statik/AydinlatmaMetniEticaret"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Aydınlatma Metni
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.lcwaikiki.com/tr-TR/TR/statik/verigizliligiveguvenligipolitikasi"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Veri Gizliliği ve Güvenliği Politikası
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom-right">
            <div className="footer-bottom-text">
              <span>LC Waikiki Destek</span>
            </div>
            <div className="footer-bottom-contact">
              <a
                href="https://www.lcwaikiki.com/tr-TR/TR/iletisim"
                target="_blank"
                rel="noreferrer"
              >
                <Image src={contact} alt="contact" />
                <span>İletişim Formu</span>
              </a>
            </div>
            <div className="footer-bottom-phone">
              <a href="tel:4444529" target="_self">
                <Image src={phone} alt="phone" />
                <span>444 4 529</span>
              </a>
            </div>
            <div className="footer-bottom-whatsapp">
              <a
                href="https://api.whatsapp.com/send?phone=904444529"
                target="_blank"
                rel="noreferrer"
              >
                <Image src={whatsapp} alt="whatsapp" />
                <span>Whatsapp Destek 444 4 529</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
