# Synaps 1 Kasım Seçimleri Embed Widget

Synaps seçim sonuçlarını yayınlamak istediğiniz sayfaların `</body>` etiketinden önce aşağıdaki kod parçacığını yükleyin.

```
<script src="https://secim.synaps.ly/embed/widget.js" defer async></script>
```

Daha sonrasında istediğiniz ekrana göre aşağıdaki html kodlarını sayfanızın istediğiniz bölümüne ekleyebilirsiniz.

## Özet ekranı

Özet ekranı, sitenizin ana sayfasına son durumu özetleyen bir canlı veri ekranı yerleştirmek için tasarlanmıştır. 125 veya 160 piksel yüksekliğinde olabilir. Genişliği içinde bulunduğu elementi dolduracak şekilde(100%) tasarlanmıştır. Tasarım responsive olduğu için mobil, tablet ve masaüstünde farklı öğeler barındırmaktadır.

Özet ekranının görünmesini istediğiniz etikete `synaps-secim` attribute'u eklemeniz ve bu attribute'a `ozet` değeri vermiş olmanız gerekmektedir. Örnek:
```
<div synaps-secim="ozet"></div>
```

Bazı opsiyonel attribute değerleri mevcuttur:

*topbar*: Bu attribute eklendiği durumda verilerin üzerinde turuncu bir barda detay sayfasına link verilir.
*detail-url*: Bu attribute ile detay sayfasının adresi belirtilebilir. Belirtilmediği takdirde detaylar için kullanıcı https://secim.synaps.ly adresine yönlendirilir.

Örnek kullanım:

```
<div synaps-secim="ozet" topbar detail-url="http://www.siteadi.com/secim-2015"></div>
```

Özet ekranı örnek görüntüsü:

![](https://cloud.githubusercontent.com/assets/127687/10665432/d6127186-78d3-11e5-817e-be80bd5d6c39.png)

## Detay ekranı

Detay ekranının görünmesini istediğiniz sayfada ilgili bölüme aşağıdaki gibi `synaps-secim` özellikli bir element eklemeniz yeterlidir.

```
<div synaps-secim></div>
```

Bazı opsiyonel attribute değerleri mevcuttur:

*height*: `full` veya `auto` değerleri alabilir. `full` değeri verilirse iframe yüksekliği olarak `100%` değeri verilir ve içinde bulunduğu elementin yüksekliği kadar olması sağlanır. Bu sayede dışta bulunan elementin yüksekliğini değiştirerek farklı yüksekliklerde detay ekranları oluşturabilirsiniz. `auto` değerinde detay ekranının içeriğine göre otomatik yükseklik verilir. Varsayılan değer `auto` değeridir.

*city-code*: Plaka kodu verilen ilin seçili olduğu bir detay ekranı açılır.

```
<div synaps-secim city-code="[[ sehir plaka kodu ]]"></div>
```

## Notlar

* Bütün attribute değerlerini, dilerseniz `data-` attribute olarak da kullanabilirsiniz. Örneğin:

```
<div data-synaps-secim="ozet" data-topbar data-detail-url="http://www.siteadi.com/secim-2015"></div>
```

* Seçim gününden önce embed kodu çalıştığı yere ekranları basmayacaktır. Ancak test etmek için, etiketleri koyduğunuz sayfanın adresine `__synaps_test` ekleyebilirsiniz. Örneğin sitenizin adresi `http://www.siteadi.com` ise, `http://www.siteadi.com/?__synaps_test` şeklinde açtığınızda ekranlar örnek verilerle açılacaktır.
