# Sprint Challenge: React Twitter Clone Projesi için REST API Oluşturma

## Proje Açıklaması

Tebrikler, Backend konularını tamamladın. 

Bilgisayar bilimleri konularına geçmeden önce öğrendiğin her konuyu kullanarak -daha önce react tekrarı için yaptığın- twitter clone'u projesi için REST API oluşturacaksın. Bu senin Backend konusunda ne seviyede olduğunu gösterecek. 
Yaptığın siteyi Heroku'da da yayınlayacaksın(sanal kart girmeyi ve sanal karta LİMİT KOYMAmaya dikkat!!!). 
Workintech programını tamamladığında şirketler yaptığın bu projeye de bakacaklar. O yüzden öğrendiğin her konuyu kullandığın, tam çalışır durumda bir proje yapmanı tavsiye ederiz.


## Talimatlar

### Görev 1: Projenizin set-up'ını yapın.

- [ ] ilk olarak github hesabınızda bir repo oluşturun ve bilgisayarınıza clone'layın.
- [ ] `npm init -y` komutuyla package.json dosyası oluşturup kullanacağın kütüphaneleri projeye ekleyin. 
Örneğin:
  - `express`
  - `dotenv`
  - `knex` v.b.
- [ ] package.json dosyasında ihtiyacın olacak scriptleri yazmayı unutmayın.
- [ ] klasör yapısını anlaşılır ve anlamlı olacak şekilde hazırlayın.
- [ ] Her adımda commit atmayı unutmayın!!


### Görev 2: API

- [ ] Gerekli fonksiyonalite için ayrı endpointler oluşturun.
- [ ] En az 2 middleware fonksiyonu yazın ve doğru yerlerde kullanın.
- [ ] Postman'da her endpoint için ayrı bir request oluşturun. Oluşturduğunuz collection'ı export edin ve projenin içerisine ekleyin.
- [ ] Login için JWToken kullanın.


### Görev 3: DATA

- [ ] Knex configuration ayarlarını yapın.
- [ ] Farklı ortam(environment) ayarlarını yapın.
- [ ] Veritabanını tasarlayın.
- [ ] Migration ve seed dosyalarını oluşturun.


### Görev 4: UNIT ve ENTEGRASYON TESTİ

- [ ] Veritabanı erişim fonksiyonları için Unit Testleri oluşturun.
- [ ] API endpointleri için entegrasyon testleri yazın.
- [ ] Testler için environment'ı değiştirdiğinizden ve knex'de ayrı ayarlar kullandığınızdan emin olun.


#### PROJE DEĞERLENDİRME KRİTERLERİ:

- [ ] Proje dosyaları ve klasörleri doğru ve anlamlı olarak yapılandırılmış mı?
- [ ] .gitignore dosyası var mı?
- [ ] Dependency'ler doğru yapılandırılmış mı? (dependency, devDependency)
- [ ] Ayarlar farklı ortamlar için doğru yapılandırılmış mı ve doğru yerden okuyor mu?
- [ ] Router kullanılmış mı?
- [ ] Model fonksiyonları kullanılmış mı?
- [ ] response status kodları doğru mu, mesajları anlaşılır mı?
- [ ] reponse'da veri doğru şekilde dönüyor mu, gereksiz tekrar eden bilgiler var mı?
- [ ] Error Midlleware eklenmiş mi?
- [ ] En az 2 tane middleware fonskiyonu eklenmiş mi?
- [ ] JWToken doğru kullanılmış mı?
- [ ] Migration, Seed dosyaları doğru oluşturulmuş mu?
- [ ] Secret ve environment ayarları farklı ortamlar için ayrı olacak şekilde ayarlanmış mı?
- [ ] Postman'da collection oluşturulmuş ve export edilmiş mi?
- [ ] Unit ve entegrasyonları testleri yeterli miktarda yazılmış mı?

