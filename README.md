# Workflow
### Kurulum

Repoyu bilgisayarınıza kaydettikten sonra backend için ilgili paketlerin yüklü olduğundan emin olun.(dotnet etc.)
terminalden migration dosyanız yoksa Vk.Data dizinine gelip 

dotnet ef migrations add Initial -s ../VkApi/ 

komutunu çalıştırın.

ardındand bi üst dizine çıkıp ;

dotnet ef database update --project  "./Vk.Data" --startup-project "./VkApi"

komutu ile migration işleminizi tamamlayın.

( connection string ve db mevcut olmasına özen gösterin .)

Önyüzün olduğu dizinde terminale npm install komutu ile gerekli kütüphaneleri indirin. npm start ile başlıyabilir. (Nodejs gerekli.)

arka tarafta admini oluşturmak için
```javascript
{
  "email": "admin@gmail.com",
  "password": "admin",
  "fullName": "Admin",
  "profit": 0,
  "role": "admin",
  "credit": 5000
}
{
  "email": "user@gmail.com",
  "password": "admin",
  "fullName": "user user",
  "profit": 0,
  "role": "user",
  "credit": 5000
}
```
jsonunu /vk/api/v1/Users ucuna post edin ilk user admin yapmak için. 

böylece ;
admin@gmail.com"
admin

veya

user@gmail.com"
user

bilgileriyle login olabilirsiniz.


----------------------------------------------------------------------


![image](https://github.com/uhuddurmus/Workflow/assets/74601877/f4b84fcb-5987-41fa-8996-49a18984f440)

Önyüz dosya düzeni yukarıdaki gibidir.

Redux toolkit kullanmış olduğumuz projede redux ile alakalaı her şey redux içinde bulunmaktadır.

Rolü 'admin' olan kullanıcılar 

bu sayfayı görebilmektedir.

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/cc7a9ecb-3c8a-49a1-8dbb-86873b135614)

Rolü 'user' ve 'admin' olanlar ise  bu sayfayı görebilmektedir.

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/dc7429b7-133e-4f1f-88dc-a94267f5a64d)

Bu yetkilendirmeyi root ile yaptım. admin verisi kullanıcın admin olmasına göre true false döndürüp buna göre bize rootu döndürüyor. Admin olmayanalar admin roota ulaşamıyor.

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/207bac20-e986-4dea-a5a3-4547ed0814c9)

css kütüphanesi olarak bootstrap kullandım

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/48d4c936-fa00-4843-bb5e-c2fb24852617)

Klasörlerde data klasörü içinde e-ticaret kısmı için mockaroo.com'dan oluşturduğum json verisi mevcut. Bu veriyi liste için kullandım. 

```javascript
{"id":468,
"name":"Edge",
"brandName":"Ford",
"price":1487,
"color":"Violet"
}
```
Örnek product yukarıdaki gibidir. Liste aşağıdaki gibi görünmekte İsme Markaya Renge ve fiyata göre filtreleme işlemi yapılabilmektedir.

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/ba546d2b-bc66-4561-95fa-9ec8d8403fe5)

Ürünler için redux'ta bir sepet oluşturuldu. Ürünler sepete eklenip session storage'e kaydediliyor.

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/23009ad8-3574-44f8-8541-9e7425d73b09)

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/fe09a33a-5b5f-482d-bec7-fc050f4d2dba)

Cart için 3 reducer mevcut bunlar addtocart, removefromcart ve clear cart.

addToCart;

Listedeki itemı cart'a eklemek.

removeFromCart;

Carttaki itemi id'sinden yakalayıp silmek.

clearCart;

Bütün sepeti boşaltmak için kullanıldı.

dosyası;

src\redux\slices\cartSlice.js

Authenticat işlemleri için oluştuduğumuz slice; 

src\redux\slices\authSlice.js

Login ve logout reducersları mevcut. Ayriyetten selectUser, electIsAuthenticated ve selectIsAdmin func'ları mevcut gerekli user datası için ihtiyaç duyulan fonksiyonlar.

Auth actionları için src\redux\authActions.js pathindeki dosyayı kullandık axios ile login isteği atıyor ve login işlemini token ile gerçekleştiriyoruz. fail olması durumları için react-toastify kullandım.

Örnek Sayfa çıktıları;

Loginde email doğrulama mevcut şifre ve email düzgün değil ise login butonu pasif. Enter ile bir alt satıra en sonunda login action çalışıyor. Şifre yanlış ise toat error fırlatıyor.

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/9a942504-0c7a-4994-9fea-08468804d42d)

Admin login olduğunda admin sayfası user login olduğunda user sayfası açılıyor user admin sayfasına hiçbir şekilde giriş yapamıyor. Menüdeki Admin sayfasına git buttonuda role göre kayboluyor.

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/c1747c01-3674-4f2d-baf8-0be18e32bcf8)

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/ee9d8360-c464-4dfd-b38f-f567443e34aa)

Liste ekranında multi filtre mevcut pagination var üstüne gelinen item hover oluyor. Ürünün sağ üstündeki market arabası ikonuna tıklandığında sepete ekleniyor. 

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/20b06e70-2494-420c-8ed7-037cd744c4e5)

Sepetteki itemin üstündeki ikon çöp kutusuna dönüşüyor istenilirse item sepetten çıkartılabiliyor. 

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/42269c82-1143-4324-8cb0-26fcc59d6557)

Sepet redux ve session storage'te tutuluyor çok item olduğu için listede userın listede kaybolmaması için ayrı bir sepet sayfası mevcut.

![image](https://github.com/uhuddurmus/Workflow/assets/74601877/accd327a-ef0c-4d95-ad03-905939ecb90f)






