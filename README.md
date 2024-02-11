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


