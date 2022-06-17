import { useState, createContext } from "react";
import { data } from "./Data";
import { search } from "./Search";
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [inputValue, setInputValue] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [sortValue, setSortValue] = useState("recommended");
  const [state, setState] = useState({
    productList: data,
    card: [],
    favorite: [],
  });
  const [warning, setWarning] = useState(false);
  const [warningIncrease, setWarningIncrease] = useState(false);

  /* 
    addToCard fonksiyonu product isimli parametre alıyor. 
    setState methodu ile state bilgilerini güncelliyoruz.
    ...state ile state öncelikle state'imizi açıyoruz ve içindekileri tekrardan ekliyoruz.
    state'in içindeki card objesine ise ekleme yapmak için ekstradan yazıyoruz.
    Her card içeriğini değiştirmek istemiyoruz. Bu yüzden find methodunu kullanıyoruz.
    product parametresinin yardımı ile card içerisindeki doğru objeye ulaşıyoruz.
    Bilgisini de şartlara göre güncelliyoruz.
    Böyle bir product eğer ki card içerisinde yoksa count değeri 1 oluyor.
    Varsa eğer + 1 ekleyecek şekilde ilerletiyoruz.
  */

  const addToCard = (product) => {
    setState({
      ...state,
      card: state.card.find((cardItem) => cardItem.id === product.id)
        ? state.card.map((cardItem) =>
            cardItem.id === product.id
              ? { ...cardItem, count: cardItem.count + 1 }
              : cardItem
          )
        : [...state.card, { ...product, count: 1 }],
    });
  };

  /*
    product parametresini alıp state'imi güncelliyorum.
    state'teki card ve favorite hariç diğer her şey aynı kalsın diye açıyorum. "..."
    Sonrasında card objesinde ilgili ürünü buluyorum.
    Aynı işlemi favorite objesi için de yapıyorum.
    İçerikler genel olarak addToFav ve removeFromCard ile aynı mantıkta ilerliyor.
    Tek fark var ki o da şu:
    Gelen product'ı sil ve fav ekle seçeneği seçen kişi zaten bu ürünü fav eklemiş olabilir.
    Ürün fav eklendiyse hiç dokunmuyor, eğer fav eklenmemişse fav ekliyor şeklinde düzenlendi.

  */

  const removeCardAddFav = (product) => {
    setState({
      ...state,
      card: state.card.filter((cardItem) => cardItem.id !== product.id),
      favorite: state.favorite.find(
        (favoriteItem) => favoriteItem.id === product.id
      )
        ? state.favorite.filter((favoriteItem) => favoriteItem)
        : [...state.favorite, { ...product, fav: true }],
    });
  };

  /*
    Gelen id'ye göre card objesinde öğeyi buluyor.
    Bu id'ye eşit olmayanları geri döndürecek şekilde filtreliyor.
  */

  const removeFromCard = (product) => {
    setState({
      ...state,
      card: state.card.filter((cardItem) => cardItem.id !== product.id),
    });
  };

  /* 
    addToFavorite fonksiyonun card yerine fav bilgilerini güncellediği bir fonksiyon.
    Parametre olarak product bilglerinin hepsini alıyor.
    state'imizde ilgili product'ı buluyor ve diğerlerini hiç dokunmuyor.
    İlgili product'ın favorite değerine bakıyor.
    Eğer ki fav değeri varsa o objeyi filtreleyerek o obje haricindeki objeleri döndürüyor.
    Eğer ki fav değeri yoksa o objenin fav değerini true yapıp dönüyor. 
  */

  const addToFavorite = (product) => {
    setState({
      ...state,
      favorite: state.favorite.find(
        (favoriteItem) => favoriteItem.id === product.id
      )
        ? state.favorite.filter(
            (favoriteItem) => favoriteItem.id !== product.id
          )
        : [...state.favorite, { ...product, fav: true }],
    });
  };

  /* 
    addToCard fonksiyonunun aynı mantığı ile çalışıyor.
    Tek fark ise tüm product bilgisine ihtiyacımız yok. product yerine productId alıyoruz.
    Gelen produtId parametresindeki değere göre map'liyoruz.
    Çıkan sonucun count değerini 1 arttırıyor, diğer sonuçlara dokunmadan dönüyoruz.
    count değerinin 10'u geçmesine izin vermiyoruz; çünkü stok adedi 10 varsayılmıştır.
  */

  const btnIncrease = (productId) => {
    setState({
      ...state,
      card: state.card.map((cardItem) =>
        cardItem.id === productId
          ? {
              ...cardItem,
              count: cardItem.count < 10 ? cardItem.count + 1 : 10,
            }
          : cardItem
      ),
    });

    let count = state.card
      .filter((cardItem) => cardItem.id === productId)
      .map((product) => product.count);

    setWarning(false);

    if (parseInt(count) === 10) {
      setWarningIncrease(true);
    } else {
      setWarningIncrease(false);
    }
  };

  /* 
    addToCard fonksiyonunun aynı mantığı ile çalışıyor.
    Tek fark ise tüm product bilgisine ihtiyacımız yok. product yerine productId alıyoruz.
    Gelen produtId parametresindeki değere göre map'liyoruz.
    Çıkan sonucun count değerine bakıyoruz ve 1'den büyük olup olmadığını kontrol ediyoruz.
    1'den büyükse, count değerini 1 azaltıyor, diğer sonuçlara dokunmadan dönüyoruz.
    1'den büyük değilse, count değerini değiştirmiyor ve 1'e set'liyoruz. 
    Diğer sonuçlara dokunmadan dönüyoruz.
  */

  const btnDecrease = (productId) => {
    setState({
      ...state,
      card: state.card.map((cardItem) =>
        cardItem.id === productId
          ? { ...cardItem, count: cardItem.count > 1 ? cardItem.count - 1 : 1 }
          : cardItem
      ),
    });

    let count = state.card
      .filter((cardItem) => cardItem.id === productId)
      .map((product) => product.count);

    if (parseInt(count) === 1) {
      setWarning(true);
    } else {
      setWarning(false);
    }

    setWarningIncrease(false);
  };

  /*
    Sepet sayfasındaki input değeri için yapıldı. 
    2 parametre alıyor ve onChange method'u ile tetikleniyor.
    onChange method'u ile gönderilen 2 parametreden, productId ve value(e.target.value) alıyor.
    Gelen iki değerin, ilk parametresine göre mapleme işlemi yapıp product'ı buluyoruz.
    Gelen value değerinin true olduğu, -undefined olmaması durumu- kontrol ediliyor.
    value değeri 1'den büyükse, 10'dan küçükse ve true ise productId'nin count değeri value'a eşleniyor.
    1'den küçük bir değer girilmeye çalıştıysa veya false dönerse de 1'e eşitleniyor.
    10'dan büyük bir değer girilmeye çalıştıysa 10'a eşitleniyor.
  */

  const changeCount = (productId, value) => {
    setState({
      ...state,
      card: state.card.map((cardItem) =>
        cardItem.id === productId
          ? {
              ...cardItem,
              count:
                value && value >= 1 && value <= 10
                  ? value
                  : value > 10
                  ? 10
                  : 1,
            }
          : cardItem
      ),
    });

    if (value < 1) {
      setWarning(true);
    } else {
      setWarning(false);
    }

    if (value > 10) {
      setWarningIncrease(true);
    } else {
      setWarningIncrease(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        state: state,
        addToCard,
        addToFavorite,
        inputValue: inputValue,
        setInputValue,
        btnIncrease,
        btnDecrease,
        changeCount,
        removeFromCard,
        removeCardAddFav,
        sortValue: sortValue,
        setSortValue,
        search: search,
        searchHistory: searchHistory,
        setSearchHistory,
        warning: warning,
        setWarning,
        warningIncrease: warningIncrease,
        setWarningIncrease,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
