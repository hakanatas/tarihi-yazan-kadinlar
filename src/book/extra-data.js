/**
 * Extra timeline and inspirational quotes data for the PDF book.
 * Mini timeline (3-5 events) + 1-2 extra quotes per woman.
 */

const EXTRA_DATA = {
  // ═══════════ BATCH 1: Women 1-18 ═══════════

  "marie-curie": {
    timeline: [
      { year: 1867, event: "Varşova'da doğdu" },
      { year: 1891, event: "Paris'e taşınarak Sorbonne'da öğrenime başladı" },
      { year: 1898, event: "Polonyum ve radyumu keşfetti" },
      { year: 1903, event: "Nobel Fizik Ödülü'nü aldı" },
      { year: 1911, event: "Nobel Kimya Ödülü'nü aldı" }
    ],
    extraQuotes: [
      "Hayatta korkulacak bir şey yok, sadece anlaşılması gereken şeyler var.",
      "Bilimde insanları değil, yalnızca olguları görmeliyiz."
    ]
  },
  "ada-lovelace": {
    timeline: [
      { year: 1815, event: "Londra'da dünyaya geldi" },
      { year: 1833, event: "Charles Babbage ile tanıştı" },
      { year: 1843, event: "Analitik Motor için ilk algoritmayı yazdı" },
      { year: 1852, event: "36 yaşında Londra'da hayatını kaybetti" }
    ],
    extraQuotes: [
      "Analitik Motor, sayıları örmek için kullanılabilir; tıpkı Jacquard dokuma tezgâhının çiçekleri ve yaprakları örmesi gibi.",
      "Beyin kaslarından daha fazlasıdır; hayal gücü ile beslenen bir organdır."
    ]
  },
  "rosalind-franklin": {
    timeline: [
      { year: 1920, event: "Londra'da dünyaya geldi" },
      { year: 1945, event: "Cambridge'den fizikokimya doktorasını aldı" },
      { year: 1952, event: "DNA'nın yapısını ortaya koyan Fotoğraf 51'i çekti" },
      { year: 1958, event: "37 yaşında yumurtalık kanserinden hayatını kaybetti" }
    ],
    extraQuotes: [
      "Bilim insanlığa hizmet etmelidir. Bilimden korkmak için hiçbir neden yoktur.",
      "Büyük keşifler sabırlı gözlemden doğar."
    ]
  },
  "katherine-johnson": {
    timeline: [
      { year: 1918, event: "Batı Virginia'da dünyaya geldi" },
      { year: 1953, event: "NACA'da (NASA'nın öncüsü) çalışmaya başladı" },
      { year: 1962, event: "John Glenn'in yörünge uçuşu hesaplamalarını yaptı" },
      { year: 2015, event: "Başkanlık Özgürlük Madalyası'nı aldı" },
      { year: 2020, event: "101 yaşında hayatını kaybetti" }
    ],
    extraQuotes: [
      "Bir şeyi kendin yapmadığın sürece yapılıp yapılamayacağını bilemezsin.",
      "Saydığım her gün, en iyisini yapmaya çalıştım."
    ]
  },
  "tu-youyou": {
    timeline: [
      { year: 1930, event: "Çin'in Ningbo şehrinde dünyaya geldi" },
      { year: 1955, event: "Pekin Tıp Fakültesi'nden mezun oldu" },
      { year: 1972, event: "Artemisinin bileşiğini izole etti" },
      { year: 2011, event: "Lasker Ödülü'nü kazandı" },
      { year: 2015, event: "Nobel Fizyoloji veya Tıp Ödülü'nü aldı" }
    ],
    extraQuotes: [
      "Her bilim insanı, bilimi tüm insanlığın yararına kullanma sorumluluğu taşır.",
      "Geleneksel tıbbın hazinelerinden yararlanmak benim görevimdi."
    ]
  },
  "maryam-mirzakhani": {
    timeline: [
      { year: 1977, event: "Tahran'da dünyaya geldi" },
      { year: 1994, event: "Uluslararası Matematik Olimpiyatı'nda altın madalya kazandı" },
      { year: 2004, event: "Harvard'dan doktorasını aldı" },
      { year: 2014, event: "Fields Madalyası'nı kazanan ilk kadın oldu" },
      { year: 2017, event: "40 yaşında hayatını kaybetti" }
    ],
    extraQuotes: [
      "Güzelliği matematik çözerken hissedebilirsiniz; bu, bir bulmacayı çözmenin verdiği duyguya benzer.",
      "Bazen zorluğun kendisi sizi güdüleyen şeydir."
    ]
  },
  "chien-shiung-wu": {
    timeline: [
      { year: 1912, event: "Çin'in Liuhe kasabasında dünyaya geldi" },
      { year: 1936, event: "Fizik eğitimi için ABD'ye gitti" },
      { year: 1956, event: "Parite korunumunun ihlal edildiğini deneysel olarak kanıtladı" },
      { year: 1975, event: "Amerikan Fizik Derneği'nin ilk kadın başkanı oldu" },
      { year: 1997, event: "New York'ta hayatını kaybetti" }
    ],
    extraQuotes: [
      "Bir fizikçinin cinsiyetinin araştırma yapma yeteneğiyle hiçbir ilgisi olmamalıdır.",
      "Doğanın yasalarını keşfetmek, bir bilim insanının en büyük ayrıcalığıdır."
    ]
  },
  "sabiha-gokcen": {
    timeline: [
      { year: 1913, event: "Bursa'da dünyaya geldi" },
      { year: 1925, event: "Atatürk tarafından evlat edinildi" },
      { year: 1936, event: "Dünyanın ilk kadın savaş pilotu oldu" },
      { year: 1938, event: "Türk Hava Kurumu Uçuş Okulu'nda baş öğretmen pilot oldu" },
      { year: 2001, event: "88 yaşında İstanbul'da hayatını kaybetti" }
    ],
    extraQuotes: [
      "Havacılığı yalnızca bir meslek değil, bir yaşam biçimi olarak seçtim.",
      "Göklerde uçmak, yerdeki tüm zorlukları unutturuyor."
    ]
  },
  "mae-jemison": {
    timeline: [
      { year: 1956, event: "Alabama'da dünyaya geldi" },
      { year: 1981, event: "Cornell Tıp Fakültesi'nden doktorasını aldı" },
      { year: 1987, event: "NASA astronot programına kabul edildi" },
      { year: 1992, event: "Uzaya giden ilk Afro-Amerikalı kadın oldu" },
      { year: 1993, event: "NASA'dan ayrılarak bilim eğitimi girişimlerini kurdu" }
    ],
    extraQuotes: [
      "Asla hayal gücünüzün başkalarının dar görüşlülüğüyle sınırlanmasına izin vermeyin.",
      "Uçmak istiyorsan seni aşağı çeken her şeyi bırakmalısın."
    ]
  },
  "hedy-lamarr": {
    timeline: [
      { year: 1914, event: "Viyana'da dünyaya geldi" },
      { year: 1933, event: "Sinema kariyerine Çekoslovakya'da başladı" },
      { year: 1942, event: "Frekans atlamalı yayılmış spektrum teknolojisinin patentini aldı" },
      { year: 1997, event: "Elektronik Sınır Vakfı Öncü Ödülü'nü aldı" },
      { year: 2000, event: "Florida'da hayatını kaybetti" }
    ],
    extraQuotes: [
      "Herhangi bir kız güzel görünebilir. Tek yapman gereken hareketsiz durup aptal gibi bakmaktır. Ben öyle yapmadım.",
      "İnsanlar her zaman beni güzel buldular ama ben zeki olmayı tercih ederdim."
    ]
  },
  "jane-goodall": {
    timeline: [
      { year: 1934, event: "Londra'da dünyaya geldi" },
      { year: 1960, event: "Tanzanya'daki Gombe'de şempanze araştırmalarına başladı" },
      { year: 1964, event: "Cambridge'den doktora derecesini aldı" },
      { year: 1977, event: "Jane Goodall Enstitüsü'nü kurdu" },
      { year: 2002, event: "Birleşmiş Milletler Barış Elçisi seçildi" }
    ],
    extraQuotes: [
      "Yapmamız gereken en önemli şey, her birimizin bir fark yaratabileceğini anlamaktır.",
      "Bir sorunu çözmek için önce onu anlamalısınız; anlamak için de gözlemlemelisiniz."
    ]
  },
  "frida-kahlo": {
    timeline: [
      { year: 1907, event: "Meksika'nın Coyoacán bölgesinde dünyaya geldi" },
      { year: 1925, event: "Ağır bir otobüs kazası geçirdi, resim yapmaya başladı" },
      { year: 1938, event: "New York'ta ilk kişisel sergisini açtı" },
      { year: 1953, event: "Meksika'da ilk büyük kişisel sergisi açıldı" },
      { year: 1954, event: "47 yaşında Coyoacán'da hayatını kaybetti" }
    ],
    extraQuotes: [
      "Kanatlarım varsa neden yürüyeyim ki?",
      "Acı, yalnızlık ve hayal kırıklığı en iyi öğretmenlerimdir."
    ]
  },
  "virginia-woolf": {
    timeline: [
      { year: 1882, event: "Londra'da dünyaya geldi" },
      { year: 1915, event: "İlk romanı 'Yolculuk'u yayımladı" },
      { year: 1925, event: "'Mrs Dalloway' romanını yayımladı" },
      { year: 1929, event: "'Kendine Ait Bir Oda'yı yayımladı" },
      { year: 1941, event: "Sussex'te hayatını kaybetti" }
    ],
    extraQuotes: [
      "Bir kadının kurgu yazabilmesi için parası ve kendine ait bir odası olmalıdır.",
      "Bir insan kendini ne kadar çok tanırsa, başkalarına o kadar çok merhamet duyar."
    ]
  },
  "maya-angelou": {
    timeline: [
      { year: 1928, event: "Missouri'de dünyaya geldi" },
      { year: 1969, event: "'Kafesteki Kuşun Neden Şarkı Söylediğini Biliyorum'u yayımladı" },
      { year: 1993, event: "Başkan Clinton'ın yemin töreninde şiir okudu" },
      { year: 2011, event: "Başkanlık Özgürlük Madalyası'nı aldı" },
      { year: 2014, event: "86 yaşında hayatını kaybetti" }
    ],
    extraQuotes: [
      "İnsanlar söylediklerinizi unutacak, yaptıklarınızı unutacak, ama onlara nasıl hissettirdiğinizi asla unutmayacaklar.",
      "Cesaret, erdemlerin en önemlisidir; çünkü cesaret olmadan diğer erdemler sürdürülemez."
    ]
  },
  "halide-edib-adivar": {
    timeline: [
      { year: 1884, event: "İstanbul'da dünyaya geldi" },
      { year: 1901, event: "İstanbul Amerikan Kız Koleji'nden mezun olan ilk Müslüman Türk kadını oldu" },
      { year: 1920, event: "Sultanahmet Meydanı'nda tarihi mitingde halka seslendi" },
      { year: 1922, event: "Kurtuluş Savaşı'nda cephede görev aldı" },
      { year: 1964, event: "İstanbul'da hayatını kaybetti" }
    ],
    extraQuotes: [
      "Milletler yalnız silahla değil, kalemle de kurtarılır.",
      "Kadınların kurtuluşu, milletin kurtuluşundan ayrı düşünülemez."
    ]
  },
  "zaha-hadid": {
    timeline: [
      { year: 1950, event: "Bağdat'ta dünyaya geldi" },
      { year: 1977, event: "Londra'da kendi mimarlık ofisini kurdu" },
      { year: 2004, event: "Pritzker Mimarlık Ödülü'nü kazanan ilk kadın oldu" },
      { year: 2010, event: "MAXXI Müzesi tasarımıyla Stirling Ödülü'nü aldı" },
      { year: 2016, event: "Miami'de hayatını kaybetti" }
    ],
    extraQuotes: [
      "Alanınızda ilk kadın olduğunuzda, her şeyi iki katı iyi yapmanız gerekir.",
      "Dünyayı tek bir bakış açısıyla görmek zorunda değilsiniz."
    ]
  },
  "toni-morrison": {
    timeline: [
      { year: 1931, event: "Ohio'da dünyaya geldi" },
      { year: 1970, event: "İlk romanı 'En Mavi Göz'ü yayımladı" },
      { year: 1988, event: "'Sevilen' romanıyla Pulitzer Ödülü'nü kazandı" },
      { year: 1993, event: "Nobel Edebiyat Ödülü'nü aldı" },
      { year: 2019, event: "88 yaşında hayatını kaybetti" }
    ],
    extraQuotes: [
      "Eğer okumak istediğiniz bir kitap henüz yazılmamışsa, onu siz yazmalısınız.",
      "Özgürlük dünyayı olduğu gibi görmek ve yine de ona karşı çalışmaktır."
    ]
  },
  "umm-kulthum": {
    timeline: [
      { year: 1898, event: "Mısır'ın Dakahlia ilinde dünyaya geldi" },
      { year: 1924, event: "Kahire'ye taşınarak profesyonel kariyerine başladı" },
      { year: 1932, event: "İlk filminde rol aldı ve ulusal üne kavuştu" },
      { year: 1967, event: "Arap ülkeleri yararına konser turnelerine çıktı" },
      { year: 1975, event: "Kahire'de hayatını kaybetti; cenazesine milyonlarca kişi katıldı" }
    ],
    extraQuotes: [
      "Sanatçı halkının sesidir; halkını tanımayan sanatçı, gerçek sanatçı değildir.",
      "Müzik ruhun dilidir; kelimeler yetersiz kaldığında müzik konuşur."
    ]
  },

  // ═══════════ BATCH 2: Women 19-36 ═══════════

  "elif-safak": {
    timeline: [
      { year: 1971, event: "Strasbourg, Fransa'da doğdu" },
      { year: 1998, event: "İlk romanı 'Pinhan' ile Mevlâna Büyük Ödülü'nü kazandı" },
      { year: 2006, event: "'Baba ve Piç' romanıyla uluslararası üne kavuştu" },
      { year: 2010, event: "'Aşk' romanı dünya çapında bestseller oldu" },
      { year: 2019, event: "Royal Society of Literature üyeliğine seçildi" }
    ],
    extraQuotes: [
      "Hiçbir şey tesadüf değildir. Rüzgârın savurduğu bir yaprak bile bir anlam taşır.",
      "Dünyada ne kadar çok dil bilirsen, o kadar çok insansın."
    ]
  },
  "murasaki-shikibu": {
    timeline: [
      { year: 978, event: "Kyoto'da aristokrat bir ailenin kızı olarak doğdu" },
      { year: 998, event: "Fujiwara no Nobutaka ile evlendi" },
      { year: 1001, event: "Kocasının ölümünün ardından yazarlığa yöneldi" },
      { year: 1008, event: "'Genji'nin Hikâyesi'ni tamamladı; dünyanın ilk romanı kabul edilir" }
    ],
    extraQuotes: [
      "Gerçek güzellik, dış görünüşte değil, kalbin derinliklerinde yatar."
    ]
  },
  "fahrelnissa-zeid": {
    timeline: [
      { year: 1901, event: "Büyükada, İstanbul'da doğdu" },
      { year: 1928, event: "Paris'te Académie Ranson'da resim eğitimi aldı" },
      { year: 1934, event: "d Grubu ile İstanbul'da sergi açtı" },
      { year: 1948, event: "Paris'te ilk büyük kişisel sergisini açtı" },
      { year: 1975, event: "Amman'da Kraliyet Güzel Sanatlar Enstitüsü'nü kurdu" }
    ],
    extraQuotes: [
      "Ben resim yapmıyorum, resim beni yapıyor.",
      "Renk benim dilim, tuval benim vatanımdır."
    ]
  },
  "billie-holiday": {
    timeline: [
      { year: 1915, event: "Philadelphia, ABD'de doğdu" },
      { year: 1933, event: "İlk stüdyo kaydını John Hammond ile yaptı" },
      { year: 1939, event: "'Strange Fruit' şarkısını seslendirdi; ırkçılığa karşı protesto marşı oldu" },
      { year: 1944, event: "'Lover Man' ile büyük ticari başarı elde etti" },
      { year: 1956, event: "Otobiyografisi 'Lady Sings the Blues' yayımlandı" }
    ],
    extraQuotes: [
      "Başkalarının zaten söylediği şeyleri söylemek istemiyorum. Hissettiklerimi söylemek istiyorum."
    ]
  },
  "malala-yousafzai": {
    timeline: [
      { year: 1997, event: "Mingora, Pakistan'da doğdu" },
      { year: 2009, event: "BBC Urduca için Taliban yönetimi altında yaşamı anlatan blog yazmaya başladı" },
      { year: 2012, event: "Taliban tarafından okul otobüsünde başından vuruldu, mucizevi şekilde hayatta kaldı" },
      { year: 2014, event: "17 yaşında Nobel Barış Ödülü'nü alan en genç kişi oldu" },
      { year: 2020, event: "Oxford Üniversitesi'nden mezun oldu" }
    ],
    extraQuotes: [
      "Bir çocuk, bir öğretmen, bir kalem ve bir kitap dünyayı değiştirebilir.",
      "Sesimizi yükselttiğimizde duyulur. Sustuğumuzda değil."
    ]
  },
  "rosa-parks": {
    timeline: [
      { year: 1913, event: "Tuskegee, Alabama'da doğdu" },
      { year: 1943, event: "NAACP Montgomery şubesine katıldı ve sekreter oldu" },
      { year: 1955, event: "Otobüste yerini beyaz bir yolcuya vermeyi reddetti; Montgomery Otobüs Boykotu başladı" },
      { year: 1957, event: "Detroit'e taşındı ve sivil haklar mücadelesine devam etti" },
      { year: 1996, event: "Başkanlık Özgürlük Madalyası ile onurlandırıldı" }
    ],
    extraQuotes: [
      "İnsanlar benim ayaklarım yorgun olduğu için oturmaya devam ettiğimi söylüyor, ama bu doğru değil. Boyun eğmekten yorulmuştum.",
      "Nereye gittiğinizi bilmek için nereden geldiğinizi bilmelisiniz."
    ]
  },
  "emmeline-pankhurst": {
    timeline: [
      { year: 1858, event: "Manchester, İngiltere'de doğdu" },
      { year: 1903, event: "Kadınların Sosyal ve Politik Birliği'ni (WSPU) kurdu" },
      { year: 1913, event: "Militan eylemler nedeniyle defalarca tutuklandı ve hapsedildi" },
      { year: 1918, event: "30 yaş üstü kadınlara oy hakkı tanıyan yasa kabul edildi" },
      { year: 1928, event: "Tam oy hakkı yasasının kabulünden birkaç hafta önce hayatını kaybetti" }
    ],
    extraQuotes: [
      "Yasaları yapanlar olmadığımız sürece, yasalara boyun eğme zorunluluğumuz yoktur.",
      "Söz değil eylem; süfrajet hareketinin sloganıydı."
    ]
  },
  "benazir-bhutto": {
    timeline: [
      { year: 1953, event: "Karaçi, Pakistan'da doğdu" },
      { year: 1977, event: "Harvard ve Oxford'dan mezun olarak Pakistan'a döndü" },
      { year: 1988, event: "Müslüman çoğunluklu bir ülkede seçilen ilk kadın başbakan oldu" },
      { year: 1993, event: "İkinci kez başbakan seçildi" },
      { year: 2007, event: "Rawalpindi'de suikaste kurban gitti" }
    ],
    extraQuotes: [
      "Demokrasi en iyi intikam yoludur.",
      "Bir ülkenin ahlaki standardını, kadınlarına nasıl davrandığından anlayabilirsiniz."
    ]
  },
  "wangari-maathai": {
    timeline: [
      { year: 1940, event: "Nyeri, Kenya'da doğdu" },
      { year: 1971, event: "Doğu ve Orta Afrika'da doktora derecesi alan ilk kadın oldu" },
      { year: 1977, event: "Yeşil Kuşak Hareketi'ni kurdu; milyonlarca ağaç dikilmesine öncülük etti" },
      { year: 2004, event: "Nobel Barış Ödülü'nü alan ilk Afrikalı kadın oldu" }
    ],
    extraQuotes: [
      "Bugün bir ağaç diktiğinizde, yarının iklimi sizin kontrolünüzde demektir.",
      "Yukarıya bakmaktan vazgeçmediğiniz sürece her zaman gökkuşağını görebilirsiniz."
    ]
  },
  "ruth-bader-ginsburg": {
    timeline: [
      { year: 1933, event: "Brooklyn, New York'ta doğdu" },
      { year: 1956, event: "Harvard Hukuk Fakültesi'ne kabul edilen ilk kadın öğrencilerden biri oldu" },
      { year: 1972, event: "ACLU Kadın Hakları Projesi'nin kurucu ortağı oldu" },
      { year: 1993, event: "ABD Yüksek Mahkemesi yargıcı olarak atandı" },
      { year: 2013, event: "Karşı oylarıyla popüler kültür ikonu 'Notorious RBG' haline geldi" }
    ],
    extraQuotes: [
      "Kadınlar karar verilen her yere aittir.",
      "Gerçek değişim, kalıcı değişim, adım adım gerçekleşir."
    ]
  },
  "angela-merkel": {
    timeline: [
      { year: 1954, event: "Hamburg, Almanya'da doğdu" },
      { year: 1989, event: "Berlin Duvarı'nın yıkılmasının ardından siyasete girdi" },
      { year: 2000, event: "CDU parti başkanı seçildi" },
      { year: 2005, event: "Almanya'nın ilk kadın şansölyesi oldu" },
      { year: 2021, event: "16 yıl görev yaptıktan sonra şansölyelik görevini bıraktı" }
    ],
    extraQuotes: [
      "Dış politikada önemli olan güvenilir olmaktır.",
      "Duvarlarla deneyimi olan biri olarak size söyleyebilirim: hiçbir duvar sonsuza kadar ayakta kalamaz."
    ]
  },
  "ellen-johnson-sirleaf": {
    timeline: [
      { year: 1938, event: "Monrovia, Liberya'da doğdu" },
      { year: 1970, event: "Harvard'da kamu yönetimi alanında yüksek lisans yaptı" },
      { year: 1985, event: "Siyasi muhalefet nedeniyle hapis cezasına çarptırıldı" },
      { year: 2006, event: "Afrika'nın demokratik seçimle iş başına gelen ilk kadın devlet başkanı oldu" },
      { year: 2011, event: "Nobel Barış Ödülü'nü kazandı" }
    ],
    extraQuotes: [
      "Geleceğin boyutu, bugün kız çocuklarımıza yaptığımız yatırıma bağlıdır.",
      "Eğer gelecekleriniz yoksa planlarınızın hiçbir önemi kalmaz."
    ]
  },
  "tansu-ciller": {
    timeline: [
      { year: 1946, event: "İstanbul'da doğdu" },
      { year: 1978, event: "Boğaziçi Üniversitesi'nde profesör oldu" },
      { year: 1990, event: "DYP'den siyasete atıldı" },
      { year: 1993, event: "Türkiye'nin ilk ve tek kadın başbakanı olarak göreve başladı" },
      { year: 1996, event: "Dışişleri bakanlığı ve başbakan yardımcılığı görevlerini üstlendi" }
    ],
    extraQuotes: [
      "Ben sadece bir kadın olarak değil, tüm Türkiye'nin başbakanı olarak buradayım."
    ]
  },
  "rigoberta-menchu": {
    timeline: [
      { year: 1959, event: "El Quiché, Guatemala'da yoksul bir yerli ailede doğdu" },
      { year: 1981, event: "Ailesinin öldürülmesinin ardından Meksika'ya sürgüne gitti" },
      { year: 1983, event: "Otobiyografisi 'Ben, Rigoberta Menchú' yayımlandı" },
      { year: 1992, event: "Nobel Barış Ödülü'nü kazandı" },
      { year: 2007, event: "Guatemala devlet başkanlığına aday oldu" }
    ],
    extraQuotes: [
      "Barış, yalnızca silahlara son vermekle gelmez; insanların haklarına saygı duymakla gelir.",
      "Biz yerli halklar, dünya üzerindeki köprülerin kurucularıyız."
    ]
  },
  "jacinda-ardern": {
    timeline: [
      { year: 1980, event: "Hamilton, Yeni Zelanda'da doğdu" },
      { year: 2008, event: "Yeni Zelanda parlamentosuna seçildi" },
      { year: 2017, event: "37 yaşında dünyanın en genç kadın başbakanlarından biri oldu" },
      { year: 2019, event: "Christchurch saldırısı sonrası silah yasalarını hızla değiştirdi" },
      { year: 2023, event: "Başbakanlıktan kendi isteğiyle istifa etti" }
    ],
    extraQuotes: [
      "Güçlü olmak ile nazik olmak birbirinin zıttı değildir.",
      "Empatinin zayıflık olduğuna inanmıyorum. Empati güçtür."
    ]
  },
  "cleopatra": {
    timeline: [
      { year: -69, event: "Mısır'ın başkenti İskenderiye'de doğdu" },
      { year: -51, event: "18 yaşında Mısır'ın firavunu oldu" },
      { year: -48, event: "Julius Caesar ile ittifak kurarak tahtını geri kazandı" },
      { year: -41, event: "Marcus Antonius ile siyasi ve romantik ittifak kurdu" },
      { year: -30, event: "Actium Savaşı'ndaki yenilginin ardından hayatına son verdi" }
    ],
    extraQuotes: [
      "Ben tahtımı teslim etmeyeceğim; ne Roma'ya, ne de kadere."
    ]
  },
  "serena-williams": {
    timeline: [
      { year: 1981, event: "Saginaw, Michigan'da doğdu" },
      { year: 1999, event: "17 yaşında US Open'ı kazanarak ilk Grand Slam zaferini elde etti" },
      { year: 2003, event: "Dört büyük turnuvayı üst üste kazanarak 'Serena Slam'i tamamladı" },
      { year: 2017, event: "Hamile iken Avustralya Açık'ı kazandı" },
      { year: 2022, event: "23 Grand Slam tekler şampiyonluğuyla profesyonel tenisten emekli oldu" }
    ],
    extraQuotes: [
      "Bir kadının hayalleri için mücadele etmesini engelleyecek hiçbir güç yoktur.",
      "Her seferinde düştüm ve her seferinde daha güçlü kalktım."
    ]
  },
  "nadia-comaneci": {
    timeline: [
      { year: 1961, event: "Onești, Romanya'da doğdu" },
      { year: 1976, event: "Montreal Olimpiyatları'nda jimnastik tarihinin ilk 10.00 puanını aldı" },
      { year: 1976, event: "Aynı olimpiyatlarda toplamda yedi kez 10.00 puan aldı ve üç altın madalya kazandı" },
      { year: 1980, event: "Moskova Olimpiyatları'nda iki altın ve iki gümüş madalya kazandı" },
      { year: 1989, event: "Romanya'dan kaçarak ABD'ye sığındı" }
    ],
    extraQuotes: [
      "Mükemmellik peşinde koşmadım, sadece elimden gelenin en iyisini yaptım.",
      "Zor olan şeyleri başarmak sizi sıradan olmaktan kurtarır."
    ]
  },

  // ═══════════ BATCH 3: Women 37-54 ═══════════

  "billie-jean-king": {
    timeline: [
      { year: 1943, event: "Long Beach, Kaliforniya'da doğdu" },
      { year: 1966, event: "İlk Wimbledon tekler şampiyonluğunu kazandı" },
      { year: 1971, event: "Tek sezonda 100.000 dolar kazanan ilk kadın tenisçi oldu" },
      { year: 1973, event: "Bobby Riggs'i yenerek 'Cinsiyetler Savaşı' maçını kazandı" },
      { year: 1974, event: "Kadın Tenis Birliği'ni (WTA) kurdu" }
    ],
    extraQuotes: [
      "Şampiyon olmak bir ruh halidir. Hiçbir zaman asla pes etmeyeceğine dair bir kararlılıktır.",
      "Baskı bir ayrıcalıktır; ancak önemli anlarda hissedilir."
    ]
  },
  "tegla-loroupe": {
    timeline: [
      { year: 1973, event: "Kenya'nın Batı Pokot bölgesinde doğdu" },
      { year: 1994, event: "New York Maratonu'nu kazanan ilk Afrikalı kadın oldu" },
      { year: 1999, event: "2:20:43 ile kadınlar maraton dünya rekorunu kırdı" },
      { year: 2003, event: "Tegla Loroupe Barış Vakfı'nı kurdu" },
      { year: 2016, event: "Rio Olimpiyatları'nda Mülteci Olimpik Takımı'nın şefi oldu" }
    ],
    extraQuotes: [
      "Koşmak benim silahımdır; barış için koşuyorum.",
      "Bir topluluk barış içinde değilse hiçbir şey başarılamaz."
    ]
  },
  "megan-rapinoe": {
    timeline: [
      { year: 1985, event: "Redding, Kaliforniya'da doğdu" },
      { year: 2011, event: "Kadınlar Dünya Kupası'nda ABD milli takımıyla çeyrek finalde unutulmaz gol attı" },
      { year: 2019, event: "FIFA Kadınlar Dünya Kupası'nda Altın Top ve Altın Ayakkabı ödüllerini kazandı" },
      { year: 2019, event: "Ballon d'Or Féminin ödülünü aldı" },
      { year: 2022, event: "Başkan Biden tarafından Özgürlük Madalyası ile onurlandırıldı" }
    ],
    extraQuotes: [
      "Her gün savaşmaya hazır olmalısınız; bu konuda alçakgönüllü olmayacağım.",
      "Daha iyisini yapmalıyız. Hepimizin sorumluluğu var."
    ]
  },
  "caster-semenya": {
    timeline: [
      { year: 1991, event: "Güney Afrika'nın Limpopo eyaletinde doğdu" },
      { year: 2009, event: "Berlin'de 800 metrede dünya şampiyonu oldu; cinsiyet testi tartışması başladı" },
      { year: 2012, event: "Londra Olimpiyatları'nda 800 metrede gümüş madalya kazandı" },
      { year: 2016, event: "Rio Olimpiyatları'nda 800 metrede altın madalya kazandı" },
      { year: 2019, event: "CAS'ın testosteron kuralı kararına karşı Avrupa İnsan Hakları Mahkemesi'ne başvurdu" }
    ],
    extraQuotes: [
      "Tanrı beni olduğum gibi yarattı ve ben kendimden memnunum.",
      "Ben doğal olarak hızlıyım; bundan özür dilemem gerekmiyor."
    ]
  },
  "ibtihaj-muhammad": {
    timeline: [
      { year: 1985, event: "Maplewood, New Jersey'de doğdu" },
      { year: 2011, event: "ABD Eskrim Milli Takımı'na seçildi" },
      { year: 2014, event: "Dünya Eskrim Şampiyonası'nda takım olarak altın madalya kazandı" },
      { year: 2016, event: "Rio Olimpiyatları'nda başörtüsüyle yarışan ilk ABD'li sporcu oldu" },
      { year: 2018, event: "Onuruna Barbie bebek tasarlandı; ilk başörtülü Barbie oldu" }
    ],
    extraQuotes: [
      "Kendinizi temsil edilmiş görmediğiniz yerlerde var olun; bu başkaları için kapı açar.",
      "Farklılığınız sizi zayıflatmaz, güçlü kılar."
    ]
  },
  "simone-biles": {
    timeline: [
      { year: 1997, event: "Columbus, Ohio'da doğdu; koruyucu aile tarafından büyütüldü" },
      { year: 2013, event: "16 yaşında ilk Dünya Jimnastik Şampiyonası altın madalyasını kazandı" },
      { year: 2016, event: "Rio Olimpiyatları'nda dört altın madalya kazandı" },
      { year: 2021, event: "Tokyo Olimpiyatları'nda ruh sağlığını korumak için yarışmalardan çekildi" },
      { year: 2024, event: "Paris Olimpiyatları'nda üç altın ve bir gümüş madalya kazandı" }
    ],
    extraQuotes: [
      "Gülümseyerek yapmam onu kolay kılmıyor.",
      "Ruh sağlığım altın madalyalardan önemlidir."
    ]
  },
  "madam-cj-walker": {
    timeline: [
      { year: 1867, event: "Louisiana'da Sarah Breedlove olarak doğdu" },
      { year: 1905, event: "Saç bakım ürünleri geliştirmeye ve satmaya başladı" },
      { year: 1910, event: "Indianapolis'e taşındı ve fabrikasını kurdu" },
      { year: 1913, event: "Ulusal Zenci İş Birliği'nde kadınların ekonomik bağımsızlığı hakkında konuşma yaptı" },
      { year: 1919, event: "ABD'nin kendi başına servet edinen ilk kadın milyoneri olarak hayata veda etti" }
    ],
    extraQuotes: [
      "Kendi işimi kurdum; kendi temelimi attım. Pişmanlık duymuyorum.",
      "Başka birinin size fırsat vermesini beklemeyin; kendinize kapı açın."
    ]
  },
  "coco-chanel": {
    timeline: [
      { year: 1883, event: "Saumur, Fransa'da doğdu" },
      { year: 1910, event: "Paris'te ilk şapka dükkanını açtı" },
      { year: 1921, event: "Chanel No. 5 parfümünü piyasaya sürdü" },
      { year: 1926, event: "Küçük siyah elbiseyi moda dünyasına kazandırdı" },
      { year: 1954, event: "71 yaşında moda dünyasına geri döndü ve ikinci kez devrim yarattı" }
    ],
    extraQuotes: [
      "Moda değişir, ama stil kalır.",
      "Bir kadının en güzel parfümü özgüvenidir."
    ]
  },
  "oprah-winfrey": {
    timeline: [
      { year: 1954, event: "Mississippi, Kosciusko'da doğdu" },
      { year: 1983, event: "Chicago'da sabah talk show'unu devraldı ve programı zirveye taşıdı" },
      { year: 1986, event: "The Oprah Winfrey Show ulusal yayına başladı" },
      { year: 2003, event: "Dünyanın ilk siyahi kadın milyarderi oldu" },
      { year: 2013, event: "Başkan Obama tarafından Özgürlük Madalyası ile onurlandırıldı" }
    ],
    extraQuotes: [
      "Gerçek başarı, kendinizi hazırladığınızda fırsatın kapınızı çalmasıdır.",
      "Kim olduğunuzu dünyaya göstermekten korkmayın; çünkü dünya cesaretinize ihtiyaç duyuyor."
    ]
  },
  "indra-nooyi": {
    timeline: [
      { year: 1955, event: "Chennai, Hindistan'da doğdu" },
      { year: 1980, event: "Yale School of Management'tan MBA derecesiyle mezun oldu" },
      { year: 1994, event: "PepsiCo'ya katıldı ve stratejik planlama direktörü oldu" },
      { year: 2006, event: "PepsiCo'nun CEO'su oldu" },
      { year: 2018, event: "12 yıl sonra CEO görevinden ayrıldı; PepsiCo gelirlerini %80 artırmıştı" }
    ],
    extraQuotes: [
      "Lider olarak göreviniz insanlara ilham vermek, onları yönetmek değildir.",
      "Cesaretinizi asla kaybetmeyin; kendinize olan inancınız en büyük silahınızdır."
    ]
  },
  "sara-blakely": {
    timeline: [
      { year: 1971, event: "Clearwater, Florida'da doğdu" },
      { year: 1998, event: "5.000 dolar birikimiyle Spanx fikrini geliştirmeye başladı" },
      { year: 2000, event: "Spanx ürünlerini piyasaya sürdü ve Oprah'ın 'Favori Şeyler' listesine girdi" },
      { year: 2012, event: "Kendi başına servet edinen en genç kadın milyarder oldu" }
    ],
    extraQuotes: [
      "Başarısızlık sonuç değildir; başarısızlık denemekten vazgeçmektir.",
      "Hayatınızı değiştirecek fikirlerin çoğu sizi korkutanlardır."
    ]
  },
  "whitney-wolfe-herd": {
    timeline: [
      { year: 1989, event: "Salt Lake City, Utah'ta doğdu" },
      { year: 2014, event: "Kadınların ilk adımı attığı flört uygulaması Bumble'ı kurdu" },
      { year: 2019, event: "Bumble kullanıcı sayısı 100 milyonu aştı" },
      { year: 2021, event: "31 yaşında şirketi halka arz eden en genç kadın CEO oldu" }
    ],
    extraQuotes: [
      "Hayattaki en cesur adım, değişimi kendiniz başlatmaktır.",
      "Nezaket bir zayıflık değil, en büyük güçtür."
    ]
  },
  "cher-wang": {
    timeline: [
      { year: 1958, event: "Taipei, Tayvan'da doğdu" },
      { year: 1987, event: "VIA Technologies şirketini kurdu" },
      { year: 1997, event: "HTC Corporation'ı eşiyle birlikte kurdu" },
      { year: 2011, event: "HTC akıllı telefon pazar payıyla Forbes'un en güçlü kadınlar listesine girdi" },
      { year: 2015, event: "HTC Vive sanal gerçeklik başlığını geliştirdi" }
    ],
    extraQuotes: [
      "İnovasyon risk almayı gerektirir; konfor alanınızdan çıkmadan ilerleme sağlayamazsınız.",
      "Teknolojiyi insanların hayatlarını iyileştirmek için kullanmalıyız."
    ]
  },
  "folorunso-alakija": {
    timeline: [
      { year: 1951, event: "Lagos, Nijerya'da doğdu" },
      { year: 1974, event: "İngiltere'de moda tasarımı eğitimi aldı ve Supreme Stitches'ı kurdu" },
      { year: 1993, event: "Nijerya hükümetinden petrol arama lisansı aldı" },
      { year: 2008, event: "Famfa Oil aracılığıyla Afrika'nın en zengin kadını unvanını kazandı" },
      { year: 2014, event: "Rose of Sharon Vakfı ile dul ve yetim kadınlara destek programları başlattı" }
    ],
    extraQuotes: [
      "Hayal kurmaktan asla vazgeçmeyin; her büyük başarı bir hayalle başlamıştır.",
      "Başarı bir varış noktası değil, sürekli devam eden bir yolculuktur."
    ]
  },
  "vuslat-dogan-sabanci": {
    timeline: [
      { year: 1971, event: "Ankara'da doğdu" },
      { year: 1994, event: "Hürriyet gazetesinde gazetecilik kariyerine başladı" },
      { year: 2004, event: "Doğan Gazetecilik yönetim kurulu başkanlığına getirildi" },
      { year: 2015, event: "Vuslat Vakfı'nı kurarak empati ve sanat odaklı projeler başlattı" }
    ],
    extraQuotes: [
      "Empati, dünyayı dönüştürecek en güçlü araçtır.",
      "Sanat, toplumların birbirleriyle iletişim kurmasının en evrensel dilidir."
    ]
  },
  "yasemin-dalkilic": {
    timeline: [
      { year: 1976, event: "İstanbul'da doğdu" },
      { year: 1998, event: "Serbest dalışa başladı ve ilk ulusal rekorlarını kırdı" },
      { year: 2000, event: "Değişken ağırlıkla 81 metre dalarak dünya rekoru kırdı" },
      { year: 2003, event: "Sınırsız dalışta 105 metreye ulaşarak yeni bir dünya rekoru kırdı" },
      { year: 2006, event: "Denizlerin korunması için aktif savunuculuk çalışmalarına başladı" }
    ],
    extraQuotes: [
      "Derinlere indikçe kendinle yüzleşirsin; suyun altında hiçbir masken kalmaz.",
      "Korku insanı durdurmaz; korkuyla yüzleşmek insanı özgürleştirir."
    ]
  },
  "nur-tatar": {
    timeline: [
      { year: 1992, event: "Samsun'da doğdu" },
      { year: 2010, event: "Avrupa Tekvando Şampiyonası'nda ilk büyük madalyasını kazandı" },
      { year: 2012, event: "Londra Olimpiyatları'nda 67 kg kategorisinde bronz madalya kazandı" },
      { year: 2016, event: "Rio Olimpiyatları'nda 67 kg kategorisinde bronz madalya kazandı" }
    ],
    extraQuotes: [
      "Başarı, her gün bir adım daha ileri gitme cesaretinden doğar.",
      "Mindere her çıktığımda ülkemi temsil etmenin gururunu yaşıyorum."
    ]
  },
  "leyla-alaton": {
    timeline: [
      { year: 1963, event: "İstanbul'da doğdu" },
      { year: 1985, event: "ABD'de eğitimini tamamladıktan sonra Alarko Holding'de çalışmaya başladı" },
      { year: 2004, event: "Alarko Holding Yönetim Kurulu Üyesi oldu" },
      { year: 2015, event: "Kadın girişimciliği destekleyen sivil toplum kuruluşlarında aktif rol üstlendi" }
    ],
    extraQuotes: [
      "İş dünyasında kadınlar sadece eşitlik değil, liderlik de talep etmelidir.",
      "Cam tavanı kırmak cesaret ister; ama o cesaret hepimizde var."
    ]
  }
};

export default EXTRA_DATA;
