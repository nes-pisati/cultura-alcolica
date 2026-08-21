export type TipoTappa = 'culturale' | 'bacaro'

export type Ordinazione = {
  nome: string
  prezzo: string
}

export type Tappa = {
  id: number
  titolo: string
  tipo: TipoTappa
  coordinate: [number, number]
  raggio: number
  distanzaDallaPrecedente: number
  descrizione?: string
  paragrafi?: string[]
  ordinazioni?: Ordinazione[]
}

export const TAPPE: Tappa[] = [
  {
    id: 1,
    titolo: 'Squero di San Trovaso',
    tipo: 'culturale',
    coordinate: [12.32662, 45.43034],
    raggio: 35,
    distanzaDallaPrecedente: 0,
    paragrafi: [
      'Il tour comincia davanti all’unico cantiere di gondole che si può ancora guardare da vicino senza salire su una barca. Lo squero è il cantiere dove si costruiscono e si riparano gli scafi in legno, e questo di San Trovaso lavora sullo stesso rio da secoli. La cosa che colpisce subito è l’edificio: tetto spiovente, legno a vista, ballatoi. Sembra una baita di montagna finita per sbaglio in laguna, e in un certo senso è proprio così, perché i maestri d’ascia arrivavano dal Cadore assieme al legname che scendeva lungo il Piave.',
      'Una gondola è fatta di otto legni diversi e non è simmetrica: il fianco sinistro è più largo del destro di circa venti centimetri, perché deve compensare il peso del gondoliere e la spinta di un remo solo. I maestri piegano il legno a vapore e un tempo rendevano impermeabili gli scafi con la pece. Non è un mestiere che si impara sui libri, si impara guardando.',
      'Se siete in pochi e chiedete con garbo, dall’ingresso da terra in campo San Trovaso a volte vi fanno entrare. Se non si può, il cantiere si guarda benissimo dall’altra riva, dove fra poco ci berremo la prima ombra.',
    ],
  },
  {
    id: 2,
    titolo: 'Cantine del Vino già Schiavi',
    tipo: 'bacaro',
    coordinate: [12.32667, 45.4309],
    raggio: 25,
    distanzaDallaPrecedente: 70,
    descrizione:
      'Bottiglieria storica ai piedi del ponte San Trovaso, in famiglia da generazioni. Dentro le pareti sono foderate di bottiglie, fuori si beve sul ponte; i crostini nascono da abbinamenti inventati al momento.',
    ordinazioni: [
      { nome: 'Ombra di pinot della casa', prezzo: '1,50 €' },
      { nome: 'Crostino con tonno e zenzero', prezzo: '1,80 €' },
    ],
  },
  {
    id: 3,
    titolo: 'Campo Santo Stefano',
    tipo: 'culturale',
    coordinate: [12.3303, 45.4333],
    raggio: 45,
    distanzaDallaPrecedente: 410,
    paragrafi: [
      'Abbiamo attraversato il Canal Grande sul ponte di legno dell’Accademia, lasciandoci sulla destra la vista verso il bacino di San Marco, e siamo sbucati in uno dei campi più larghi della città. Al centro c’è la statua di Niccolò Tommaseo, che i veneziani chiamano con affetto il cagalibri: la pila di libri dietro la schiena del poeta è stata aggiunta per ragioni di statica, ma si presta a equivoci che nessuno qui ha mai voluto correggere.',
      'In questo campo c’era una delle farmacie autorizzate a produrre la Theriaca, la medicina che secondo i veneziani curava tutti i mali. La ricetta era attribuita ad Andromaco, medico personale di Nerone, che l’aveva lasciata scritta in forma di poesia. Fra i molti ingredienti c’erano polvere di testicolo di cervo e carne di vipera, e soprattutto l’oppio, che al rimedio dava buona parte della sua fama.',
      'Era vietato fabbricarla in casa: potevano prepararla solo gli spezieri abilitati, circa quaranta in tutta Venezia, e la preparazione durava tre giorni e doveva essere pubblica, con gli ingredienti esposti e i pubblici ufficiali a controllare. Se cercate fra le pietre della pavimentazione, di fronte al civico 2800 sulla destra, trovate ancora tre incavi rotondi: sono gli alloggiamenti dei mortai in cui si pestava la mistura.',
    ],
  },
  {
    id: 4,
    titolo: 'Corte dei Santi e calle de la Mandola',
    tipo: 'culturale',
    coordinate: [12.33276, 45.43474],
    raggio: 30,
    distanzaDallaPrecedente: 290,
    paragrafi: [
      'Siamo passati per il campiello Novo, detto anche dei Morti, perché prima di Napoleone i morti si seppellivano nelle chiese o subito accanto, e questo campo era terra di sepolture. Poco più in là si apre la corte delle Pizzocchere: le pizzocchere erano donne, spesso vedove o prostitute pentite, che conducevano vita monastica senza prendere i voti e portavano un abito povero di lana grezza, da cui il nome.',
      'All’incrocio con rio terà degli Assassini il toponimo dice tutto: qui si ritrovavano di frequente i cadaveri dei malcapitati uccisi durante la notte, e per scoraggiare gli agguati furono messi degli altarini votivi, perché una fiammella accesa era il modo più economico di illuminare una calle buia.',
      'Ma la storia che ci interessa è più recente. Durante la seconda guerra mondiale in città giravano molti soldati, prima tedeschi e poi americani, e in anni di fame il meretricio andava fortissimo: solo in questo isolato si contavano tre bordelli, il Diana, il Rivetta e lo Scalon, quest’ultimo così chiamato per la scala ripida. Lo Scalon aveva due ingressi: quello ufficiale nella stretta calle dei Albanesi e un secondo, più discreto, in corte dei Santi. Indovinate quale preferiva il clero. Per trovarla, pochi metri lungo calle de la Mandola e subito a sinistra dentro un piccolo portale in pietra: la corte è lì, con la porta di fronte che portava ai paradisi terreni.',
    ],
  },
  {
    id: 5,
    titolo: 'Ponte di Rialto e il Gobbo',
    tipo: 'culturale',
    coordinate: [12.33565, 45.43807],
    raggio: 40,
    distanzaDallaPrecedente: 600,
    paragrafi: [
      'Salendo da salizada Pio X, in mezzo alle bancarelle, alzate lo sguardo sopra le vetrine: c’è una testa d’oro in bronzo dorato solo in superficie. Era l’insegna dell’antica spezieria Alla Testa d’Oro, e quel capo cinto d’alloro è probabilmente Andromaco. Al popolo, in gran parte analfabeta, l’insegna diceva che lì dentro c’erano sapienza e conoscenza preziose come l’oro. Sul muro posteriore si leggono ancora i resti della scritta teriachia andromachi: qui la Theriaca si produceva ogni quattro mesi, mentre alle altre farmacie era concesso farla una volta all’anno.',
      'Il ponte, prima, non c’era: si attraversava in barca, poi lo fecero di legno e andava regolarmente a fuoco o marciva. Nel 1507 si decise la pietra, ma le discussioni su progetto e finanziamento durarono decenni. Gli abitanti di San Polo, per lo più prostitute e piccoli commercianti, presero a deriderlo: gli uomini dicevano che il ponte sarebbe stato finito quando il membro avrebbe messo l’unghia, le donne che sarebbe finito quando a loro avrebbe preso fuoco la fica. Quando il ponte fu davvero costruito, fra il 1588 e il 1591, l’amministrazione si vendicò facendo scolpire quei due bassorilievi osceni sul palazzo dei Camerlenghi, proprio dirimpetto: guardateli, sono ancora lì.',
      'Il progetto fu affidato al quasi sconosciuto Antonio da Ponte, il cui nome era già una garanzia. La leggenda racconta che il diavolo gli chiese in cambio l’anima del primo essere vivente che avesse attraversato il ponte, e che l’architetto lo fregò facendoci passare un gallo. Il diavolo, per vendetta, andò dalla moglie incinta di Antonio dicendole che il marito la aspettava dall’altra parte: la donna corse, e l’anima del bambino, nato morto, vagò a lungo sul ponte prima di trovare pace grazie a un gondoliere.',
      'Scesi dal ponte, in campo San Giacometto, guardate il Gobbo di Rialto: una scala in marmo da cui si leggevano bandi e condanne della Serenissima. Era anche il traguardo dei condannati, che partivano da San Marco frustati lungo tutto il percorso e arrivati qui dovevano baciare la statua. A furia di baci si consumava, così il punto d’arrivo fu spostato sulla prima colonna a sinistra del sottoportego del Bancogiro, dove era incisa una croce sormontata dal leone di San Marco: la legge veneziana veniva prima di qualsiasi norma, anche religiosa. In tempi meno rigorosi il leone è stato scalpellato.',
    ],
  },
  {
    id: 6,
    titolo: 'Cantina Do Mori',
    tipo: 'bacaro',
    coordinate: [12.33396, 45.43896],
    raggio: 20,
    distanzaDallaPrecedente: 170,
    descrizione:
      'Il bacaro più antico di Venezia, sullo stesso banco dal Quattrocento: niente tavoli, pentole di rame appese al soffitto e due ingressi su due calli diverse. Si beve in piedi, stretti.',
    paragrafi: [
      'Guardate da che parte entra la gente: i turisti passano dalla calle principale, i veneziani girano su calle Galeazza, dove c’è un banco più defilato e si beve in pace. La specialità della casa è il francobollo, un minitramezzino di pane nero che si manda giù in due morsi.',
      'Uscendo, prendete ramo Do Mori fino all’incrocio con ruga dei Spezieri e cercate il pilastro d’angolo: c’è scolpito il rilievo di due pesche con i piccioli intrecciati. Era il simbolo della Confraternita della Persicata, una confettura gelatinosa a base di pesche, in veneziano persichi, che stava sulle tavole fin dal Rinascimento. La versione con le mele cotogne si trova ancora oggi per la festa di San Martino.',
      'La strada è intitolata agli Spezieri, che nel Trecento si divisero in due rami: quelli da medicine e quelli da grosso, cioè droghieri, raffinatori di zucchero, ceraioli, mandoleri e spezieri da confetti. Erano loro a preparare i dolcetti ricoperti di zucchero e miele a base di mandorle, pinoli, anice e cedro.',
    ],
    ordinazioni: [
      { nome: 'Ombra di rosso', prezzo: '2,20 €' },
      { nome: 'Francobollo di pane nero', prezzo: '1,80 €' },
    ],
  },
  {
    id: 7,
    titolo: 'All’Arco',
    tipo: 'bacaro',
    coordinate: [12.3343, 45.4384],
    raggio: 20,
    distanzaDallaPrecedente: 70,
    descrizione:
      'Banco minuscolo dietro il mercato di Rialto, con il pesce che arriva dalle bancarelle a pochi metri. I cicchetti si compongono al momento, su richiesta; chiude nel primo pomeriggio.',
    paragrafi: [
      'Prima di entrare, tornate indietro di qualche passo in calle dell’Arco e cercate il civico 456: è la porta della botte. La parte inferiore degli stipiti in pietra è stata allargata e sagomata apposta perché ci passassero le botti di vino. Anche allora c’erano priorità indiscutibili.',
      'Poco più in là, in campo Rialto Novo, c’è inciso il simbolo dei Boteri, i bottai. Al tempo della Serenissima erano una confraternita di peso, e fra i loro obblighi c’era quello di riparare gratuitamente le botti del Doge.',
    ],
    ordinazioni: [
      { nome: 'Calice di soave', prezzo: '3,50 €' },
      { nome: 'Cicchetto con lardo e fico', prezzo: '3,00 €' },
    ],
  },
  {
    id: 8,
    titolo: 'Ponte Storto e la casa di Bianca Cappello',
    tipo: 'culturale',
    coordinate: [12.33183, 45.43819],
    raggio: 30,
    distanzaDallaPrecedente: 210,
    paragrafi: [
      'Il ponte che avete davanti si chiama Ponte Storto, e l’edificio dirimpetto è il palazzo della nobile famiglia Cappello. Qui nacque Bianca Cappello, e la sua è la storia d’amore più sciagurata e più fortunata che Venezia ricordi.',
      'Era bella, raffinata e intelligente. La madre, una Contarini, morì quando Bianca aveva dieci anni, e il padre si risposò con Lucrezia Grimani, nipote di un doge e signora che non perdeva occasione di ricordarlo. La ragazza, che la matrigna non la sopportava proprio, fece conoscenza con Pietro Bonaventuri, un giovane contabile del vicino Banco Salviati, filiale di una banca toscana. Il ragazzo millantava parentele importanti e le prometteva a Firenze una vita agiata. Sedotta al punto di affidargli i gioielli della propria dote, nella notte fra il 28 e il 29 novembre 1563, a quindici anni, Bianca scappò con lui abbandonando di nascosto la casa paterna.',
      'La fuga fece scandalo. Fu messa una taglia sul Bonaventuri e, tramite gli ambasciatori, Venezia chiese la restituzione della figlia; i due furono convocati davanti al Duca, che però non prese alcun provvedimento, forse per la buona impressione che gli fecero e per la determinazione con cui Bianca seppe difendersi. A Firenze, però, la realtà era un’altra: miseria e stenti, altro che vita brillante. Poi l’incontenibile marito fu ammazzato a pugnalate dai parenti di una vedova che aveva compromesso.',
      'Rimasta sola, Bianca cominciò a frequentare la corte medicea, conobbe il granduca Francesco, ne divenne l’amante e dopo anni di concubinaggio lo sposò, appena lui rimase vedovo. Da ragazzina fuggita di casa era diventata granduchessa di Toscana. Una decina d’anni dopo i due furono trovati morti avvelenati, e il sospetto cadde sul fratello di Francesco, il cardinale Ferdinando de’ Medici, che Bianca non l’aveva mai sopportata: non la fece seppellire con gli onori dovuti e fece togliere i suoi stemmi da tutti i luoghi pubblici. Poco più avanti, all’incrocio con campiello del Sol, una targa ricorda la sua casa.',
    ],
  },
  {
    id: 9,
    titolo: 'Ponte de le Tette e le Carampane',
    tipo: 'culturale',
    coordinate: [12.33098, 45.43882],
    raggio: 30,
    distanzaDallaPrecedente: 100,
    paragrafi: [
      'Siamo nel cuore del quartiere a luci rosse di Venezia, e il nome del ponte non lascia dubbi su quale fosse la mercanzia esposta. Le prostitute si affacciavano a seno scoperto dalle finestre per richiamare i clienti, e la Repubblica non solo lo tollerava: lo incoraggiava, convinta che fosse il modo migliore per distogliere gli uomini dall’adulterio e soprattutto dalla sodomia.',
      'I numeri spiegano perché la cosa fosse presa sul serio. Nel 1340 a Venezia le prostitute censite erano 11.654 su una popolazione di 120.000 abitanti. Nel 1360 si decise di raggrupparle in un luogo circoscritto e presidiato da pubblici ufficiali, il Castelletto, un’area vicino a Rialto oggi demolita, dove c’erano delle nicchie chiamate volte in cui si consumavano i rapporti. Le donne non potevano uscirne se non il sabato mattina, pena venticinque frustate e dieci lire di multa. Al Castelletto potevano accedere anche i chierici, il che dice parecchio sul realismo della Serenissima.',
      'L’esperimento riuscì a metà e poco alla volta le donne si spostarono qui, in contrada San Cassiano, nelle case della famiglia Rampani: le ca’ Rampane, poi Carampane. Quando le prostitute furono libere di muoversi per la città, qui restarono solo le più anziane, e da quel residuo la lingua italiana ha ricavato la parola carampana.',
      'Le cortigiane si dividevano in due categorie. Quelle di lume, di basso rango, con orari, luoghi e frequentazioni controllati e punizioni in denaro o pubbliche frustate. E quelle di alto rango, ricche, colte, capaci di scrivere versi e suonare, riconoscibili dai tessuti sgargianti, dai pizzi e dai gioielli. Nel 1543 Venezia arrivò a vietare loro l’oro, l’argento e la seta per distinguerle dalle nobili. Esisteva perfino un catalogo a stampa delle più onorate cortigiane, con nome, indirizzo, prestazioni e tariffa: la più famosa, Veronica Franco, poetessa oltre che cortigiana, ebbe un incontro galante con il figlio ventiduenne di Caterina de’ Medici, che passò da Venezia poco prima di essere incoronato re di Francia.',
    ],
  },
  {
    id: 10,
    titolo: 'Osteria alla Ciurma',
    tipo: 'bacaro',
    coordinate: [12.3304, 45.4393],
    raggio: 20,
    distanzaDallaPrecedente: 70,
    descrizione:
      'Bacaro stretto e rumoroso a poca distanza da Rialto, celebre per il fritto: polpette, moscardini e verdure in pastella da mangiare in piedi sulla calle.',
    ordinazioni: [
      { nome: 'Ombra di merlot', prezzo: '1,80 €' },
      { nome: 'Polpetta fritta', prezzo: '1,80 €' },
    ],
  },
  {
    id: 11,
    titolo: 'Campo San Giacomo dall’Orio',
    tipo: 'culturale',
    coordinate: [12.32776, 45.44004],
    raggio: 45,
    distanzaDallaPrecedente: 290,
    paragrafi: [
      'Uno dei campi più vivi di Venezia, e uno dei pochi che sembra ancora un quartiere: mamme e anziani sulle panchine all’ombra dei platani, ragazzini che corrono in monopattino, feste e concerti organizzati dalle associazioni di residenti, che curano anche gli ortaggi piantati nelle aiuole pubbliche. Dal campanile della chiesa un uomo con la conchiglia ricorda che da qui partivano i pellegrinaggi per Santiago de Compostela.',
      'L’edificio bianco dall’altra parte del ponte dell’Anatomia era il teatro anatomico. Dopo una legge del 1368 i medici veneziani si esercitavano qui nelle dissezioni dei cadaveri. In città esistevano due collegi, quello dei medici fisici e quello dei chirurghi, in perenne polemica fra loro; per pacificare il clima la Repubblica nel 1545 li fuse in uno solo, che nel 1671 trovò sede in questo edificio, con una grande sala a tre ordini di gradinate ellittiche e, al piano superiore, biblioteca e archivio. Un incendio lo devastò nel 1800 e oggi sono appartamenti e uffici.',
      'L’ultimo palazzo sulla destra prima di calle Larga è palazzo Pemma, del Seicento, e ha un’anomalia che si nota solo guardandolo bene: gli stipiti delle finestre, il portone e alcuni elementi della balaustra non sono ortogonali alla facciata, ma piegano verso sinistra. Si racconta che il proprietario, di origine ebrea, non gradisse avere di fronte casa una chiesa cattolica con il suo campanile, e abbia fatto modificare l’architettura per deviare lo sguardo. Sul palazzo una targa ricorda il poeta veneziano Mario Stefani: solitudine non è esser soli, è amare gli altri inutilmente.',
    ],
  },
  {
    id: 12,
    titolo: 'Bacareto da Lele',
    tipo: 'bacaro',
    coordinate: [12.32126, 45.43755],
    raggio: 25,
    distanzaDallaPrecedente: 630,
    descrizione:
      'Chiosco senza insegna in campo dei Tolentini: si ordina alla finestra, si beve in piedi sul campo e un paninetto costa poco più di un euro. Chiude presto e la domenica resta chiuso.',
    paragrafi: [
      'Siamo scesi lungo rio Marin e ci siamo infilati in un basso sottoportego che ci ha portati in campo de la Lana, e da lì in campo dei Tolentini. Nell’angolo affacciato sul canale c’è un chiosco minuscolo con due tavoli di pietra fuori e nessuna insegna che valga la pena di fotografare: è il Bacareto da Lele, e per mezza Venezia è il bacaro. Dalle prime ore del mattino ci si fermano operai, netturbini in pausa ombra e studenti delle università, che qui attorno sono di casa.',
      'Si beve un’ombra che costa meno di un caffè e si mangia un paninetto farcito, uno di quelli piccoli che spariscono in tre morsi e di cui se ne prendono sempre due. Non si entra e non ci si siede: si ordina alla finestra, si sta in piedi sul campo, si guarda passare l’acqua. Chiude presto e la domenica non apre: se lo trovate serrato, è la vita.',
      'Bevuto il bicchiere, salite i gradini della chiesa di San Nicola da Tolentino, qui accanto. Nella parete della facciata, sulla destra, c’è conficcata una bomba austriaca del 1849. È un souvenir del Risorgimento: il generale Radetzky, indispettito dal rifiuto dei veneziani di arrendersi, fece piovere sulla città oltre trentamila bombe in ventiquattro giorni. Venezia, già prostrata dal colera, dovette cedere. Restano i versi di Arnaldo Fusinato: il morbo infuria, il pan ci manca, sul ponte sventola bandiera bianca.',
      'Uscendo di lato dal pronao ci si affaccia sul piazzotto dove c’è l’ingresso dello IUAV, la facoltà di architettura, disegnato da Carlo Scarpa. Se il cortile è aperto, entrate a vedere l’antico portale in pietra d’Istria ritrovato durante i restauri e rimesso in piedi dentro il progetto nuovo.',
    ],
    ordinazioni: [
      { nome: 'Ombra di rosso', prezzo: '0,80 €' },
      { nome: 'Paninetto farcito', prezzo: '1,20 €' },
    ],
  },
  {
    id: 13,
    titolo: 'Campo San Geremia',
    tipo: 'culturale',
    coordinate: [12.32495, 45.44304],
    raggio: 40,
    distanzaDallaPrecedente: 910,
    paragrafi: [
      'Abbiamo attraversato il ponte degli Scalzi e risalito il rio terà Lista di Spagna fra trolley e fast food. Il termine terà indica che lì un tempo scorreva un canale, poi interrato sotto il governo austriaco a metà Ottocento: quando leggete rio terà, state camminando sopra dell’acqua.',
      'Nella chiesa dei Santi Geremia e Lucia si trovano le reliquie di santa Lucia, protettrice degli occhi e degli oculisti. La leggenda racconta che si fosse cavata gli occhi per donarli, su un piatto d’argento, a un giovane che si era innamorato del loro splendore. Le reliquie sono qui perché la chiesa di Santa Lucia e il suo monastero furono demoliti nel 1861 per costruire la stazione ferroviaria, e una targa in marmo nel piazzale davanti alla stazione ricorda ancora la facciata scomparsa.',
      'In angolo con la chiesa c’è palazzo Labia, barocco, oggi sede regionale della Rai. I Labia erano patrizi ricchissimi e amanti del lusso: fecero affrescare il palazzo da Giambattista Tiepolo con la serie dedicata ad Antonio e Cleopatra e spendevano fortune in feste memorabili. Si racconta che alla fine dei banchetti, serviti in piatti e posate d’oro, il padrone di casa buttasse le stoviglie nel canale invitando i commensali a fare lo stesso, e commentasse: le abia o non le abia, sarò sempre Labia.',
    ],
  },
  {
    id: 14,
    titolo: 'Luca e Fred',
    tipo: 'bacaro',
    coordinate: [12.32623, 45.44363],
    raggio: 20,
    distanzaDallaPrecedente: 130,
    descrizione:
      'Banco piccolo in fondamenta Cannaregio, servizio spiccio e nessuna cerimonia. I cicchetti di pesce si preparano la mattina e il disco volante, due dischi di pane farciti, è la specialità.',
    ordinazioni: [
      { nome: 'Ombra di bianco', prezzo: '1,50 €' },
      { nome: 'Disco volante', prezzo: '2,00 €' },
    ],
  },
  {
    id: 15,
    titolo: 'Campo del Ghetto Novo',
    tipo: 'culturale',
    coordinate: [12.32689, 45.44533],
    raggio: 40,
    distanzaDallaPrecedente: 360,
    paragrafi: [
      'Siamo arrivati per calle Calesele attraversando il Ghetto Novissimo, e adesso siamo nel campo che ha dato un nome a tutti i ghetti del mondo. Alzate la testa: le case qui sono altissime per gli standard veneziani, fino a otto piani, con soffitti bassi e scale strette. Non è una scelta architettonica, è una conseguenza: chi ci abitava non poteva espandersi in orizzontale e nel periodo di massima densità qui vivevano cinquemila persone.',
      'Gli ebrei erano presenti a Venezia dal 1152, perché la città è sempre stata tollerante verso le religioni diverse, un po’ per indole libera e molto per convenienza commerciale. La loro presenza però suscitava malumori, sia per la storica ostilità cristiana sia per l’invidia verso il potere finanziario di chi esercitava il prestito di denaro, un mestiere che ai cristiani era vietato. Nel 1516 la Repubblica decise di relegarli in una piccola isola dove prima c’erano delle fonderie che gettavano le bombarde: da getto viene ghetto, e da qui la parola è andata in tutto il mondo.',
      'Attenzione ai nomi, perché ingannano tutti: il più antico è il Ghetto Novo, che sorse nell’area delle fonderie nuove e ne prese il nome. L’isola era chiusa da cancelli che si aprivano all’alba e si richiudevano a mezzanotte, sorvegliati da guardie cristiane pagate dagli ebrei stessi. Ai piani alti degli edifici si trovano cinque sinagoghe delle diverse scole, riconoscibili dall’esterno per le cinque finestre in fila, e alcune si possono visitare. Con una cifra modesta si visita anche il Banco Rosso, il più antico banco dei pegni del ghetto.',
      'Nel campo, sul muro, i bassorilievi di Arbit Blatas ricordano la deportazione: nel dicembre 1943 e nell’agosto 1944 furono portati via 246 ebrei veneziani. Ne tornarono otto.',
    ],
  },
  {
    id: 16,
    titolo: 'Al Timon',
    tipo: 'bacaro',
    coordinate: [12.32844, 45.44556],
    raggio: 25,
    distanzaDallaPrecedente: 130,
    descrizione:
      'Ultima tappa sulla fondamenta degli Ormesini, con la barca ormeggiata davanti che d’estate fa da panchina. Crostini di carne salada, musica dal vivo e serate che finiscono tardi.',
    ordinazioni: [
      { nome: 'Ombra di rosso', prezzo: '2,00 €' },
      { nome: 'Crostino con carne salada', prezzo: '2,50 €' },
      { nome: 'Spritz', prezzo: '3,50 €' },
    ],
  },
]

export const PERCORSO: [number, number][] = [
  [12.32662, 45.43034],
  [12.32647, 45.4305],
  [12.32667, 45.4309],
  [12.32726, 45.43111],
  [12.32785, 45.43153],
  [12.32844, 45.43154],
  [12.32913, 45.43186],
  [12.32962, 45.43247],
  [12.33001, 45.43299],
  [12.3303, 45.4333],
  [12.33033, 45.43357],
  [12.33078, 45.4343],
  [12.3313, 45.43456],
  [12.33192, 45.43472],
  [12.33234, 45.43478],
  [12.33276, 45.43474],
  [12.33301, 45.43523],
  [12.33337, 45.43563],
  [12.33372, 45.43593],
  [12.33445, 45.43622],
  [12.33472, 45.43622],
  [12.335, 45.43622],
  [12.33547, 45.43652],
  [12.33605, 45.43682],
  [12.33662, 45.43732],
  [12.33699, 45.43762],
  [12.33666, 45.43777],
  [12.33616, 45.43792],
  [12.33565, 45.43807],
  [12.33515, 45.43837],
  [12.33465, 45.43856],
  [12.33426, 45.43876],
  [12.33396, 45.43896],
  [12.3343, 45.4384],
  [12.3339, 45.4382],
  [12.3335, 45.438],
  [12.33241, 45.438],
  [12.33183, 45.43819],
  [12.33135, 45.43855],
  [12.33098, 45.43882],
  [12.33082, 45.43901],
  [12.33066, 45.43911],
  [12.3304, 45.4393],
  [12.33033, 45.4397],
  [12.32996, 45.43999],
  [12.32979, 45.44028],
  [12.32859, 45.44026],
  [12.32776, 45.44004],
  [12.32782, 45.43981],
  [12.32737, 45.43954],
  [12.32675, 45.43959],
  [12.32604, 45.43964],
  [12.32503, 45.43949],
  [12.32411, 45.43935],
  [12.3233, 45.4388],
  [12.32219, 45.43805],
  [12.32167, 45.4377],
  [12.32126, 45.43755],
  [12.32058, 45.43813],
  [12.31999, 45.43861],
  [12.31931, 45.43899],
  [12.31963, 45.44007],
  [12.31995, 45.44085],
  [12.32086, 45.44164],
  [12.32188, 45.44212],
  [12.3228, 45.4426],
  [12.32372, 45.44288],
  [12.32443, 45.44296],
  [12.32495, 45.44304],
  [12.32524, 45.4434],
  [12.32564, 45.44347],
  [12.32623, 45.44363],
  [12.32728, 45.44394],
  [12.32812, 45.44435],
  [12.32845, 45.44485],
  [12.32783, 45.44504],
  [12.32741, 45.44524],
  [12.32689, 45.44533],
  [12.32728, 45.44549],
  [12.32756, 45.44564],
  [12.32795, 45.4456],
  [12.32844, 45.44556],
]

export const NUMERI_TOUR = {
  tappe: TAPPE.length,
  bacari: TAPPE.filter((tappa) => tappa.tipo === 'bacaro').length,
  conAudio: TAPPE.filter((tappa) => tappa.paragrafi).length,
  distanza: '4,4 km',
  durata: '3h 52m',
}

export const PESI_DOWNLOAD = {
  mappa: 3.7,
  audio: 8.2,
  testi: 2.6,
}
