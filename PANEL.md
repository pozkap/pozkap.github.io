# Duyuru ve haber paneli (Pages CMS)

Duyurular ve haberler `icerik.json` dosyasında durur. Site bu dosyayı okur; sayfanın kodu değişmez.

## Kurulum (bir kez, site GitHub'da yayına alındıktan sonra)
1. https://app.pagescms.org adresine gidin ve `pozkap` GitHub hesabıyla giriş yapın.
2. Pages CMS uygulamasına yalnızca site deposu (`pozkap.github.io`) için izin verin.
3. Depoyu seçin. Panel, depodaki `.pages.yml` dosyasını okur ve "Duyurular ve haberler" bölümünü gösterir.

## Yeni kayıt ekleme
1. Panelde "Duyurular ve haberler" bölümünü açın ve yeni bir satır ekleyin.
2. Türü (Duyuru ya da Haber) ve tarihi seçin.
3. Türkçe başlığı ve metni yazın. İngilizce alanları boş bırakırsanız İngilizce sayfada Türkçe metin görünür.
4. Kaydedin. Panel değişikliği depoya yazar; site bir iki dakika içinde güncellenir.

## Başka hocalara yetki
GitHub'da depoya "collaborator" olarak eklenen herkes aynı panele kendi GitHub hesabıyla girebilir.

## Notlar
- Kayıtlar sitede tarihe göre, en yeni üstte sıralanır.
- `.pages.yml` henüz gerçek panelde denenmedi; ilk kurulumda alanların doğru göründüğü kontrol edilmeli.
