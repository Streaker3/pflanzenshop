// Pflanzendaten für den Pflanzen-Shop
const PLANTS = [
  {
    id: "5938",
    name: "Monstera Klein",
    category: "Monstera",
    image: "images/IMG_5938.jpg",
    size: "Klein",
    care: "Mittel",
    light: "Hell, indirektes Licht",
    waterWinter: "alle 2–3 Wochen",
    importance: "Niedrig",
    shortDesc: "Junge Monstera deliciosa mit den ersten typischen Fensterblättern.",
    desc: "Die Monstera deliciosa ist einer der beliebtesten Zimmerpflanzen-Klassiker. Diese kleine Pflanze steht noch am Anfang ihrer Entwicklung – die charakteristischen Löcher und Einschnitte in den Blättern (Fensterung) bilden sich erst mit zunehmendem Alter aus. Sie bevorzugt einen hellen Platz ohne pralle Mittagssonne und mag es, wenn die oberste Erdschicht zwischen den Wassergaben leicht antrocknet. Im Winter braucht sie deutlich weniger Wasser als im Sommer. Ein Rankgitter oder Moosstab hilft ihr später beim Wachsen."
  },
  {
    id: "5939",
    name: "Monstera Mittel",
    category: "Monstera",
    image: "images/IMG_5939.jpg",
    size: "Mittel",
    care: "Mittel",
    light: "Hell, indirektes Licht",
    waterWinter: "alle 2–3 Wochen",
    importance: "Niedrig",
    shortDesc: "Kräftige Monstera deliciosa mit mehreren großen, gefensterten Blättern.",
    desc: "Diese Monstera deliciosa ist schon etwas weiter gewachsen und zeigt die typischen tiefen Einschnitte in den Blättern. Sie wächst zügig, wenn sie einen hellen, warmen Standort ohne direkte Sonne bekommt. Gegossen wird, sobald sich die oberen 2–3 cm der Erde trocken anfühlen – im Winter reicht meist alle 2 bis 3 Wochen. Gelegentliches Abstauben der großen Blätter fördert die Photosynthese und beugt Schädlingen vor."
  },
  {
    id: "5940",
    name: "Monstera Adansonii",
    category: "Monstera",
    image: "images/IMG_5940.jpg",
    size: "Klein",
    care: "Mittel",
    light: "Hell, indirektes Licht",
    waterWinter: "alle 1–2 Wochen",
    importance: "Hoch",
    shortDesc: "Fensterblatt mit filigranen, stark durchlöcherten Blättern – rankt gerne.",
    desc: "Die Monstera adansonii, auch Fensterblatt genannt, unterscheidet sich von der klassischen Monstera durch ihre kleineren, dicht durchlöcherten Blätter und die stark rankende Wuchsform. Sie liebt es hell und luftfeucht, aber ohne direkte Sonne. An einer Rankhilfe oder einem Moosstab klettert sie besonders schön in die Höhe. Die Erde sollte leicht feucht gehalten werden, im Winter genügt es, etwa alle ein bis zwei Wochen zu gießen."
  },
  {
    id: "5948",
    name: "Monstera Thai Constellation",
    category: "Monstera",
    image: "images/IMG_5948.jpg",
    size: "Mittel",
    care: "Hoch",
    light: "Hell, indirektes Licht (keine pralle Sonne)",
    waterWinter: "alle 1–2 Wochen",
    importance: "Hoch",
    shortDesc: "Seltene, panaschierte Monstera-Variante mit cremeweißer Marmorierung.",
    desc: "Die Monstera Thai Constellation ist eine besonders gefragte, panaschierte Sorte mit cremeweißer bis gelblicher Marmorierung auf dunkelgrünem Blattgrund. Da ihr die weißen Blattbereiche keine Photosynthese ermöglichen, wächst sie langsamer als eine normale Monstera und ist etwas anspruchsvoller in der Pflege. Sie braucht einen hellen Standort ganz ohne direkte Sonne, da die hellen Blattpartien sonst leicht verbrennen. Staunässe unbedingt vermeiden – lieber etwas seltener, dafür gründlich gießen."
  },
  {
    id: "5949",
    name: "Monstera Groß",
    category: "Monstera",
    image: "images/IMG_5949.jpg",
    size: "Groß",
    care: "Mittel",
    light: "Hell, indirektes Licht",
    waterWinter: "alle 1–2 Wochen",
    importance: "Hoch",
    shortDesc: "Ausgewachsene Monstera deliciosa mit großen, stark gefensterten Blättern.",
    desc: "Diese ausgewachsene Monstera deliciosa besticht mit großen, tief eingeschnittenen und gefensterten Blättern. Sie braucht mittlerweile etwas mehr Platz und Wasser als eine junge Pflanze, sollte aber weiterhin nur gegossen werden, wenn die Erde angetrocknet ist. Ein heller Standort ohne direkte Mittagssonne und gelegentliches Düngen in der Wachstumsphase lassen sie prächtig gedeihen. Im Winter wird die Wassergabe reduziert, sollte aber nicht komplett ausbleiben."
  },
  {
    id: "5935",
    name: "Euphorbia Trigona Groß",
    category: "Wolfsmilch",
    image: "images/IMG_5935.jpg",
    size: "Groß",
    care: "Niedrig",
    light: "Ein bisschen Licht reicht",
    waterWinter: "alle 5–6 Wochen",
    importance: "Mittel",
    shortDesc: "Große, stark verzweigte Wolfsmilch-Säule – sieht aus wie ein Kaktus.",
    desc: "Die Euphorbia trigona (Dreikantige Wolfsmilch) wird oft mit einem Kaktus verwechselt, ist botanisch aber eine Sukkulente aus der Wolfsmilchfamilie. Diese große, stark verzweigte Pflanze ist absolut pflegeleicht: Ein normaler, heller Platz genügt völlig, viel direkte Sonne braucht sie nicht. Sie übersteht auch mal längere Trockenphasen problemlos. Im Winter reicht es, alle 5 bis 6 Wochen sparsam zu gießen. Vorsicht beim Umtopfen: Der milchige Pflanzensaft ist hautreizend, am besten Handschuhe tragen."
  },
  {
    id: "5941",
    name: "Euphorbia Trigona Steckling",
    category: "Wolfsmilch",
    image: "images/IMG_5941.jpg",
    size: "Klein",
    care: "Niedrig",
    light: "Ein bisschen Licht reicht",
    waterWinter: "alle 5–6 Wochen",
    importance: "Niedrig",
    shortDesc: "Junger Ableger der Dreikantigen Wolfsmilch, noch mit wenigen Trieben.",
    desc: "Dieser junge Steckling der Euphorbia trigona hat gerade erst begonnen, sich zu verzweigen. Wie alle Wolfsmilchgewächse ist er extrem genügsam und verzeiht auch mal vergessenes Gießen. Ein normaler, heller Standort reicht völlig, pralle Sonne braucht er nicht. Gegossen wird sparsam und nur, wenn die Erde komplett durchgetrocknet ist – im Winter reicht das etwa alle 5 bis 6 Wochen."
  },
  {
    id: "5943",
    name: "Euphorbia Trigona Mittel",
    category: "Wolfsmilch",
    image: "images/IMG_5943.jpg",
    size: "Mittel",
    care: "Niedrig",
    light: "Ein bisschen Licht reicht",
    waterWinter: "alle 5–6 Wochen",
    importance: "Niedrig",
    shortDesc: "Schlanke, aufrecht wachsende Wolfsmilchsäule mit dekorativen Kanten.",
    desc: "Diese mittelgroße Euphorbia trigona wächst schön aufrecht mit den typischen drei- bis vierkantigen, dornbesetzten Trieben. Sie kommt mit einer ganz normalen Zimmerumgebung zurecht und braucht kaum Pflege. In der Wachstumsphase im Sommer darf gelegentlich gegossen und leicht gedüngt werden, im Winter reicht eine sehr sparsame Wassergabe alle paar Wochen."
  },
  {
    id: "5944",
    name: "Euphorbia Trigona Klein",
    category: "Wolfsmilch",
    image: "images/IMG_5944.jpg",
    size: "Klein",
    care: "Niedrig",
    light: "Ein bisschen Licht reicht",
    waterWinter: "alle 5–6 Wochen",
    importance: "Niedrig",
    shortDesc: "Kompakte, kleinere Wolfsmilchsäule mit hellen Dornenreihen.",
    desc: "Eine kompakte, etwas kürzer gewachsene Euphorbia trigona mit gut sichtbaren, hellen Dornenreihen entlang der Kanten. Auch sie ist eine pflegeleichte Sukkulente, die mit ein bisschen Licht und wenig Gießen gut zurechtkommt. Staunässe sollte unbedingt vermieden werden, ein durchlässiges Kakteensubstrat ist ideal."
  },
  {
    id: "5954",
    name: "Feigenkaktus",
    category: "Sonstige",
    image: "images/IMG_5954.jpg",
    size: "Groß",
    care: "Niedrig",
    light: "Ein bisschen Licht reicht, normale Zimmerumgebung",
    waterWinter: "alle 3–4 Wochen",
    importance: "Niedrig",
    shortDesc: "Hoch aufragender Feigenkaktus (Opuntia) mit flachen, gefleckten Trieben.",
    desc: "Diese Pflanze wurde ursprünglich fälschlich als Euphorbia trigona eingeordnet – tatsächlich handelt es sich um einen Feigenkaktus (Opuntia), erkennbar an den flachen, ovalen, mit kleinen Dornenpolstern gesprenkelten Trieben. In seiner natürlichen Heimat steht der Feigenkaktus oft an sehr sonnigen Standorten, kommt als Zimmerpflanze aber auch mit einer normalen, hellen Umgebung ohne pralle Sonne gut zurecht. Gegossen wird sparsam, nur wenn die Erde komplett durchgetrocknet ist – im Winter reicht es alle 3 bis 4 Wochen."
  },
  {
    id: "5936",
    name: "Aloe Vera Gruppe",
    category: "Aloe Vera",
    image: "images/IMG_5936.jpg",
    size: "Mittel",
    care: "Niedrig",
    light: "Ein bisschen Licht reicht",
    waterWinter: "alle 4 Wochen",
    importance: "Niedrig",
    shortDesc: "Mehrere Aloe-Vera-Pflanzen zusammen an einem hellen Fensterplatz.",
    desc: "Diese Gruppe aus mehreren Aloe-Vera-Töpfen zeigt, wie unkompliziert sich Aloe Vera vermehren und gruppieren lässt. Man kann sich hier auch einzelne Pflanzen aus der Gruppe aussuchen, statt gleich die ganze Gruppe zu nehmen. Ein bisschen Licht reicht den Pflanzen völlig, viel pralle Sonne braucht es nicht. Gegossen wird erst, wenn die Erde komplett trocken ist – Staunässe verträgt Aloe Vera gar nicht. Der Gel-Inhalt der Blätter wird traditionell für Haut und Wunden verwendet."
  },
  {
    id: "5937",
    name: "Aloe Vera Mittel",
    category: "Aloe Vera",
    image: "images/IMG_5937.jpg",
    size: "Mittel",
    care: "Niedrig",
    light: "Ein bisschen Licht reicht",
    waterWinter: "alle 4 Wochen",
    importance: "Niedrig",
    shortDesc: "Aloe Vera mit vereinzelt noch sichtbaren weißen Blattsprenkeln.",
    desc: "Diese Aloe Vera zeigt an einigen Blättern noch die weißen Sprenkel, die bei jüngeren Pflanzen typisch sind, ist inzwischen aber schon zu einer ansehnlichen, mittelgroßen Pflanze herangewachsen. Sie ist denkbar pflegeleicht: Ein bisschen Licht reicht ihr, viel Wasser braucht sie nicht. Im Winter genügt es völlig, sie alle vier Wochen leicht zu gießen."
  },
  {
    id: "5953",
    name: "Aloe Vera Klein",
    category: "Aloe Vera",
    image: "images/IMG_5953.jpg",
    size: "Klein",
    care: "Niedrig",
    light: "Ein bisschen Licht reicht",
    waterWinter: "alle 4 Wochen",
    importance: "Niedrig",
    shortDesc: "Kompakte, kleinere Aloe Vera mit schön dicken, fleischigen Blättern.",
    desc: "Diese kleinere Aloe Vera hat trotz ihrer kompakten Größe schon schön dicke, fleischige Blätter entwickelt. Sie speichert Wasser in ihren Blättern und kommt daher auch mit unregelmäßigem Gießen gut zurecht – ein bisschen Licht reicht ihr völlig. Im Winter sollte die Wassergabe auf ein Minimum reduziert werden, etwa alle vier Wochen."
  },
  {
    id: "5942",
    name: "Geldbaum",
    category: "Sonstige",
    image: "images/IMG_5942.jpg",
    size: "Klein",
    care: "Niedrig",
    light: "Viel Sonne / sehr helles Licht",
    waterWinter: "alle 4 Wochen",
    importance: "Mittel",
    shortDesc: "Crassula ovata mit dicken, runden Blättern – gilt als Glücksbringer.",
    desc: "Der Geldbaum (Crassula ovata) ist eine robuste Sukkulente mit dicken, glänzenden, ovalen Blättern und gilt traditionell als Glücksbringer. Er bevorzugt einen hellen bis sonnigen Standort und speichert Wasser in seinen Blättern, weshalb er sehr genügsam beim Gießen ist. Im Winter reicht eine Wassergabe etwa alle vier Wochen völlig aus – zu viel Wasser lässt die Wurzeln schnell faulen."
  },
  {
    id: "5945",
    name: "Strelitzie",
    category: "Sonstige",
    image: "images/IMG_5945.jpg",
    size: "Groß",
    care: "Mittel",
    light: "Hell, auch direkte Sonne",
    waterWinter: "alle 1–2 Wochen",
    importance: "Hoch",
    shortDesc: "Große Strelitzia nicolai mit bananenblattartigen Blättern – echter Blickfang.",
    desc: "Die Strelitzia nicolai (Bananen-Strelitzie) ist mit ihren großen, paddelförmigen Blättern ein imposanter Blickfang und kann als Zimmerpflanze mehrere Meter hoch werden. Sie braucht viel Licht, verträgt auch direkte Sonne, und in der Wachstumsphase regelmäßig Wasser und Dünger. Im Winter wird etwas sparsamer gegossen, etwa alle ein bis zwei Wochen. Zugluft und ständige Standortwechsel mag sie nicht."
  },
  {
    id: "5946",
    name: "Grünlilie Mittel",
    category: "Grünlilie",
    image: "images/IMG_5946.jpg",
    size: "Mittel",
    care: "Niedrig",
    light: "Hell bis Halbschatten",
    waterWinter: "alle 1–2 Wochen",
    importance: "Mittel",
    shortDesc: "Buschige, panaschierte Grünlilie mit weiß-grün gestreiften Blättern.",
    desc: "Die Grünlilie (Chlorophytum comosum) zählt zu den pflegeleichtesten und robustesten Zimmerpflanzen überhaupt und filtert nebenbei effektiv die Raumluft. Sie kommt sowohl mit hellen als auch etwas schattigeren Standorten gut zurecht. Gegossen wird mäßig, sobald die Erde angetrocknet ist. Mit der Zeit bildet sie an langen Trieben kleine 'Kindel', die sich leicht als neue Pflanzen abtrennen lassen."
  },
  {
    id: "5947",
    name: "Grünlilie Klein",
    category: "Grünlilie",
    image: "images/IMG_5947.jpg",
    size: "Klein",
    care: "Niedrig",
    light: "Hell bis Halbschatten",
    waterWinter: "alle 2–3 Wochen",
    importance: "Niedrig",
    shortDesc: "Junge Grünlilie mit schmalen, überhängenden Blättern.",
    desc: "Diese junge Grünlilie zeigt bereits die schmalen, überhängenden Blätter, die typisch für die Art sind. Sie ist extrem anpassungsfähig und verzeiht auch mal eine vergessene Gießrunde. Ein Platz mit hellem bis halbschattigem Licht und mäßiges Gießen reichen für gutes Wachstum völlig aus."
  },
  {
    id: "5952",
    name: "Efeutute",
    category: "Efeutute",
    image: "images/IMG_5952.jpg",
    size: "Klein",
    care: "Niedrig",
    light: "Halbschatten bis hell",
    waterWinter: "alle 2–3 Wochen",
    importance: "Mittel",
    shortDesc: "Buschige Efeutute (Pothos) mit herzförmigen, glänzenden Blättern.",
    desc: "Die Efeutute (Epipremnum aureum), auch Pothos genannt, ist eine der pflegeleichtesten Rank- und Hängepflanzen. Sie kommt sowohl mit hellen als auch mit schattigeren Standorten zurecht und verzeiht kleinere Pflegefehler locker. Gegossen wird, sobald die Erde angetrocknet ist. An einer Rankhilfe wächst sie in die Höhe, ohne Stütze bildet sie lange, hängende Triebe."
  },
  {
    id: "5956",
    name: "Efeu",
    category: "Efeu",
    image: "images/IMG_5956.jpg",
    size: "Mittel",
    care: "Niedrig",
    light: "Halbschatten bis hell",
    waterWinter: "alle 2–3 Wochen",
    importance: "Mittel",
    shortDesc: "Ganz normaler Efeu mit langen, herabhängenden Ranken.",
    desc: "Diese Pflanze wurde ursprünglich fälschlich als Efeutute eingeordnet – tatsächlich handelt es sich um einen klassischen Efeu (Hedera helix) mit den typischen gelappten, dunkelgrünen Blättern und langen Ranken. Efeu ist pflegeleicht und toleriert auch schattigere Standorte, wächst an einem etwas helleren Platz aber gleichmäßiger. Gegossen wird mäßig, wenn die Erde angetrocknet ist – im Winter reicht das etwa alle zwei bis drei Wochen. An einer Rankhilfe oder einem Regal kommen die herabhängenden Triebe besonders schön zur Geltung."
  },
  {
    id: "5950",
    name: "Mango-Pflanze",
    category: "Sonstige",
    image: "images/IMG_5950.jpg",
    size: "Klein",
    care: "Mittel",
    light: "Hell, keine pralle Mittagssonne",
    waterWinter: "alle 1–2 Wochen",
    importance: "Niedrig",
    shortDesc: "Aus einem Kern selbst gezogene, junge Mangopflanze.",
    desc: "Diese Mangopflanze wurde aus einem Mangokern selbst gezogen und zeigt schon die ersten kräftigen, länglichen Blätter. Sie mag es warm und hell, aber ohne pralle Mittagssonne, und gleichmäßig feuchte, nicht durchnässte Erde. Mangopflanzen wachsen recht zügig und sollten regelmäßig umgetopft werden, sobald der Topf zu klein wird. Trockene Heizungsluft im Winter mag sie gar nicht – gelegentliches Besprühen der Blätter mit Wasser hilft."
  },
  {
    id: "5951",
    name: "Drachenbaum",
    category: "Sonstige",
    image: "images/IMG_5951.jpg",
    size: "Mittel",
    care: "Niedrig",
    light: "Hell bis Halbschatten",
    waterWinter: "alle 3 Wochen",
    importance: "Niedrig",
    shortDesc: "Dracaena marginata mit schmalen, rot gerandeten Blättern.",
    desc: "Der Drachenbaum (Dracaena marginata) ist eine robuste, sehr pflegeleichte Zimmerpflanze mit schmalen, spitz zulaufenden Blättern, die oft einen rötlichen Rand zeigen. Er kommt mit hellen bis leicht schattigen Standorten gut zurecht und verträgt problemlos trockene Heizungsluft. Gegossen wird sparsam, sobald die Erde angetrocknet ist – im Winter reicht meist alle drei Wochen."
  },
  {
    id: "5955",
    name: "Glücksbambus",
    category: "Sonstige",
    image: "images/IMG_5955.jpg",
    size: "Klein",
    care: "Niedrig",
    light: "Halbschatten, kein direktes Sonnenlicht",
    waterWinter: "Wasser alle 3 Wochen wechseln",
    importance: "Niedrig",
    shortDesc: "Dracaena sanderiana in der Vase – wächst direkt im Wasser.",
    desc: "Der Glücksbambus (Dracaena sanderiana) ist botanisch gar kein Bambus, wächst aber genauso unkompliziert – meist direkt in einer Vase mit Wasser statt in Erde. Er mag einen hellen Platz ohne direkte Sonneneinstrahlung. Statt zu gießen wird regelmäßig, etwa alle drei Wochen, das Wasser in der Vase gewechselt, um Fäulnis und Algenbildung vorzubeugen. Kalkarmes, abgestandenes Wasser ist ideal."
  }
];

// ===== Reservierungen =====
// Wird von Hand gepflegt, sobald eine "Pflanze gesichert"-E-Mail eingeht:
// einfach die Pflanzen-ID der bestellten Pflanze mit dem Namen der Person eintragen.
const RESERVATIONS = {
  "5954": "Leni", // Feigenkaktus
  "5947": "Leni", // Grünlilie Klein
  "5951": "Leni", // Drachenbaum
  "5936": "Leni", // Aloe Vera Gruppe
  "5952": "Falk", // Efeutute
  "5942": "Falk", // Geldbaum
  "5956": "Leni"  // Efeu
};
