const bcrypt = require('bcryptjs')

console.log('Replicating DB')

const Category = require('../models/category').Category
const PasswordInit = require('../models/passwordInit').PasswordInit
const User = require('../models/user').User
const Table = require('../models/table').Table
const MenuItem = require('../models/menuItem').MenuItem

const pwIni = new PasswordInit({
    key: 'xxxxx',
    userId: '60730a9c09af6a37943579aa'
})
pwIni.save();

const category11 = new Category({name: 'Õlud', order: 1})
const category12 = new Category({name: 'Veinid', order: 2})
const category13 = new Category({name: 'Salatid', order: 3})
const category14 = new Category({name: 'Snäkid', order: 4})
const category15 = new Category({name: 'Pitsad', order: 5})
const category16 = new Category({name: 'Magustoidud', order: 6})

const category21 = new Category({name: 'Beverages', order: 1})
const category22 = new Category({name: 'Vegan pizzas', order: 2})
const category23 = new Category({name: 'Meat pizzas', order: 3})
const category26 = new Category({name: 'Beer', order: 4})

category11.save()
category12.save()
category13.save()
category14.save()
category15.save()
category21.save()
category22.save()
category23.save()
category16.save()
category26.save()

async function addUsers() {
    const password = await bcrypt.hash('asdasd', 10)
    let user = new User({
        username: "Nils-Emil Lille",
        password: password,
        email: 'nilsemil.lille@gmail.com',
    })
    await user.save()

    let user2 = new User({
        username: "Nils-Emil Lille",
        password: password,
        email: 'nilill@ttu.ee',
    })
    await user2.save()
}

addUsers()

const table1 = new Table({
    code: '111111',
    number: 1,
    width: 100,
    height: 300,
    xPosition: 50,
    yPosition: 50
})
const table2 = new Table({
    code: '222AAA',
    number: 2,
    width: 100,
    height: 300,
    xPosition: 300,
    yPosition: 50
})
const table3 = new Table({
    code: '586TGJ',
    number: 3,
    width: 100,
    height: 300,
    xPosition: 550,
    yPosition: 50
})
//const table4 = new Table({ code: '333QQQ' })
/*const table5 = new Table({ code: 'QQQAAA' })
const table6 = new Table({ code: 'ADSASD' })
const table7 = new Table({ code: '11ASD1' })
const table8 = new Table({ code: '222222' })*/
table1.save()
table2.save()
table3.save()
//table4.save()

/*
table5.save()
table6.save()
table7.save()
table8.save()
*/


const menuItem = new MenuItem({
    title: 'Seene-spinati lasanje',
    description: 'Kõigepealt vajad sa ühte korralikku ahjuvormi. Meie leidsime oma kauni ja praktilise ahjuvormi Pood Apelsini valikust. Kui sul ei ole veel head ahjuvormi, või soovid oma vana välja vahetada, siis soovitame külastada Pood Apelsin kodulehte. Sealt leiab igas valikus just sulle paraja suurusega ahjuvormi.',
    price: 5.2,
    categoryId: category13._id,
    imageUrl: 'https://retseptisahtel.ee/wp-content/uploads/2019/10/Retseptisahtel-Seenelasanje9-696x366.jpg'
})
menuItem.save()

const menuItem3 = new MenuItem({
    title: 'Kalkuni-avokaado wrap',
    description: 'Ka meil valmis ühe värske ideena kalkuni-avokaado wrap. Inspireeritud Kikase uutest maitsetest. Kuigi suvi on läbi ja grillhooaeg on justkui nagu minevik, siis marinaadis lihad on endiselt teemas! Marineeritud lihasid on ideaalne nii pannil praadida, ahjus grillida või küpsetada. Sellest räägib ka meie tänase roa “staari” nimi Ahju&Valmis. Me soovisime, et meie wrap saaks eriti mahlane. Selleks valisime sisuks Picobello marinaadis kalkuniliha, mis osutus tõeliseks linnulihade eliidiks!',
    price: 5.2,
    categoryId: category14._id,
    imageUrl: 'https://retseptisahtel.ee/wp-content/uploads/2019/10/Retseptisahtel-Kalkuniwrap5.jpg'
})
menuItem3.save()

const menuItem4 = new MenuItem({
    title: 'Tervislikum šokolaadikook',
    description: 'Selle imelise magustoidu põhi valmib mandlitest, mis sisaldavad suures koguses kehale väga vajalikke Oomega 9 rasvhappeid ja looduslikest magustajatest datlitest. Tume šokolaad koogi kattena on suhkruvaesem valik, kui tema piimašokolaadist sõbrad ning seega ka taljesõbralikum alternatiiv. Magususe eest hoolitsevad vahekihis olevad vaarikad ja banaan.',
    price: 5.2,
    categoryId: category16._id,
    imageUrl: 'https://i.ytimg.com/vi/vsSz7t5lqzw/maxresdefault.jpg'
})
menuItem4.save()

const menuItem41 = new MenuItem({
    title: 'Tervislikum šokolaadikook kaks',
    description: 'Selle imelise magustoidu põhi valmib mandlitest, mis sisaldavad suures koguses kehale väga vajalikke Oomega 9 rasvhappeid ja looduslikest magustajatest datlitest. Tume šokolaad koogi kattena on suhkruvaesem valik, kui tema piimašokolaadist sõbrad ning seega ka taljesõbralikum alternatiiv. Magususe eest hoolitsevad vahekihis olevad vaarikad ja banaan kaks.',
    price: 1.2,
    categoryId: category16._id,
    imageUrl: 'https://i.ytimg.com/vi/vsSz7t5lqzw/maxresdefault.jpg'
})
menuItem41.save()


const menuItem5 = new MenuItem({
    title: 'Punane vein',
    description: 'See punane vein on valmistatud 100% Primitivo kohapeal kasvanud viinamarjadest. Erinevalt teistest Primitivo veinidest nagu näiteks Gioia del Colle Primitivo, mis on segu erineva päritoluga viinamarjadest.',
    price: 6.2,
    categoryId: category12._id,
    imageUrl: 'https://retseptisahtel.ee/wp-content/uploads/2019/10/Retseptisahtel-Punane-vein-6-696x366.jpg'
})
menuItem5.save()

const menuItem6 = new MenuItem({
    title: 'MOODNE KLASSIKA MÄRZEN',
    description: 'See merevaigukarva magusapoolne laager on õllesõpru meelitanud juba sajandeid. Endiste aegade pruulmeistrite poolt täiuslikkuseni lihvitud stiilile on raske midagi lisada.',
    price: 5.2,
    categoryId: category11._id,
    imageUrl: 'https://lehepruulikoda.ee/img/moodne-klassika-marzen.jpg'
})
menuItem6.save()

const menuItem7 = new MenuItem({
    title: 'PUNANE JA MUST - Raspberry Porter6',
    description: 'Tulipunane ahvatlus ja tumedad ihad, kriimuke karget mõistust seda kõike kontrollimas6.',
    price: 5.2,
    categoryId: category26._id,
    imageUrl: 'https://lehepruulikoda.ee/img/punane-ja-must.jpg'
})
menuItem7.save()

const menuItem70 = new MenuItem({
    title: 'PUNANE JA MUST - Raspberry Porter4',
    description: 'Tulipunane ahvatlus ja tumedad ihad, kriimuke karget mõistust seda kõike kontrollimas4.',
    price: 5.2,
    categoryId: category26._id,
    imageUrl: 'https://lehepruulikoda.ee/img/punane-ja-must.jpg'
})
menuItem70.save()

const menuItem71 = new MenuItem({
    title: 'PUNANE JA MUST - Raspberry Porter3',
    description: 'Tulipunane ahvatlus ja tumedad ihad, kriimuke karget mõistust seda kõike kontrollimas3.',
    price: 5.2,
    categoryId: category26._id,
    imageUrl: 'https://lehepruulikoda.ee/img/punane-ja-must.jpg'
})
menuItem71.save()

const menuItem72 = new MenuItem({
    title: 'PUNANE JA MUST - Raspberry Porter1',
    description: 'Tulipunane ahvatlus ja tumedad ihad, kriimuke karget mõistust seda kõike kontrollimas1.',
    price: 5.2,
    categoryId: category26._id,
    imageUrl: 'https://lehepruulikoda.ee/img/punane-ja-must.jpg'
})
menuItem72.save()

const menuItem73 = new MenuItem({
    title: 'PUNANE JA MUST - Raspberry Porter2',
    description: 'Tulipunane ahvatlus ja tumedad ihad, kriimuke karget mõistust seda kõike kontrollimas2.',
    price: 5.2,
    categoryId: category26._id,
    imageUrl: 'https://lehepruulikoda.ee/img/punane-ja-must.jpg'
})
menuItem73.save()

const menuItem8 = new MenuItem({
    title: 'TRADITSIOONILINE LIMONAAD 500 ML',
    description: 'Traditsiooniline, iseloomuliku ja ainulaadse maitsega karastusjook Limonaad on turul olnud 80 aastat. Limonaadi koostise valmistamisel on kasutatud Venemaa stepiavarustest pärit ravimtaimede ekstrakti, millest saadud ainulaadset maitset pole suutnud jäljendada ükski teine ettevõte. Just meie Limonaadi ainulaadne ja klassikaline maitse on hoidnud tänaseid lapsevanemaid selle joogi juures ja toonud juurde uusi väikseid sõpru.',
    price: 5.2,
    categoryId: category21._id,
    imageUrl: 'https://s3-eu-west-1.amazonaws.com/balticsimages/images/180x220/3ed43e373090b67f4054e7d933f75e2e.png'
})
menuItem8.save()

const menuItem9 = new MenuItem({
    title: 'VAARIKAKALI',
    description: 'A. Le Coqi Vaarikakaljas on ühendatud traditsiooniliselt kääritatud kalja parimad omadused ja vaarikamahl. Küpsest viljast valminud rukki-, odra- ja nisulinnastega kääritatud kaljale annavad mahlased vaarikad küllusliku suvemaitse.',
    price: 5.2,
    categoryId: category21._id,
    imageUrl: 'https://www.selver.ee/media/catalog/product/cache/1/image/409x/9df78eab33525d08d6e5fb8d27136e95/4/7/4740098091028.jpg'
})
menuItem9.save()

const menuItem10 = new MenuItem({
    title: 'Pizza Murixana',
    description: 'Hautatud kana kuubikud, kaste, juust, peekon, rukola, kirsstomat, oliivid',
    price: 5.2,
    categoryId: category15._id,
    imageUrl: 'http://www.peetripizza.ee/wp-content/uploads/2017/07/Capturehh2-2-e1500451341942.jpg'
})
menuItem10.save()

const menuItem11 = new MenuItem({
    title: 'Hawaij Pizza',
    description: 'Juust, tex-mex kaste, barbeque kana, sibul, mais, paprika',
    price: 5.2,
    categoryId: category23._id,
    imageUrl: 'https://assets.blog.foodnetwork.ca/wp-content/uploads/sites/6/2016/04/hawaiian-pizza.jpg'
})
menuItem11.save()

const menuItem12 = new MenuItem({
    title: 'Vegan pizza',
    description: 'Any pizza can be made vegan at Domino\'s by specifically ordering a thin or gluten-free crust with only the "robust inspired tomato" or barbecue-based sauce and, of course, no cheese. ... At Domino\'s, vegans can order any of the non-meat, non-cheese toppings, so load up your pie with veggies.',
    price: 5.2,
    categoryId: category22._id,
    imageUrl: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/11/vegan-pizza.jpg?itok=DZwI2Bfn'
})
menuItem12.save()

const menuItem14 = new MenuItem({
    title: 'PUNANE JA MUST - Raspberry Porter',
    description: 'Tulipunane ahvatlus ja tumedad ihad, kriimuke karget mõistust seda kõike kontrollimas.',
    price: 5.2,
    categoryId: category11._id,
    imageUrl: 'https://lehepruulikoda.ee/img/punane-ja-must.jpg'
})
menuItem14.save()













