# Synaps 1 Kasım Seçimleri Embed Widget

Synaps seçim sonuçlarını yayınlamak istediğiniz sayfaların `</body>` etiketinden önce aşağıdaki kod parçacığını yükleyin.

```
<script data-synaps-token="[[token kodunuz]]" src="https://secim.synaps.ly/embed/widget.js" defer async>
(function() { var script = document.createElement('script'); script.async = true; script.src = 'https://secim.synaps.ly/embed/widget.js'; var entry = document.getElementsByTagName('script')[0]; entry.parentNode.insertBefore(sc ript, entry); })();
</script>
```

Daha sonrasında istediğiniz ekrana göre aşağıdaki html kodlarını sayfanızın istediğiniz bölümüne ekleyebilirsiniz.

## Özet ekranı

(Buraya ornek bir ekran goruntusu gelecek)

```
<div synaps-secim="ozet"></div>
```

## Detay ekranı

```
<div synaps-secim></div>
```

## Şehir detay ekranı

İstediğiniz şehrin sonuçlarını gösteren detay ekranı için ilgili alana aşağıdaki html kodunu ekleyebilirsiniz.

```
<div synaps-secim city-code="[[ sehir plaka kodu ]]"></div>
```
