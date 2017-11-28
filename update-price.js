import path from 'path';
import fs from 'fs';
import xlsx from 'node-xlsx';
import process from 'process';
import cheerio from 'cheerio';

// пути к файлам прайс, страница орехи, страница сухофрукты
const priceFile = path.join(__dirname, 'assets/price/price_src.xlsx');
const nutsFile = path.join(__dirname, 'nuts.html');
const driedFile = path.join(__dirname, 'dried-fruits.html');

let workSheetsPrice, nutsPage, driedPage;

try {
    workSheetsPrice = xlsx.parse(priceFile);
    if (workSheetsPrice.length > 0 && workSheetsPrice[0].name !== 'Прайс') {
        console.log('Первый лист должен называтся прайс');
        process.exit(1);
    }
} catch (err) {
    console.log(`Ошибка чтения файла assets/price/price_src.xlsx - ${err}`);
}

try {
    nutsPage = cheerio.load(fs.readFileSync(nutsFile), { decodeEntities: false });
} catch (err) {
    console.log(`Ошибка чтения файла nuts.html - ${err}`);
    process.exit(1);
}

try {
    driedPage = cheerio.load(fs.readFileSync(driedFile), { decodeEntities: false })
} catch (err) {
    console.log(`Ошибка чтения файла dried-fruits.html - ${err}`);
    process.exit(1);
}

const priceData = workSheetsPrice[0].data;

const ruble = '<span> руб.</span>';
// el - строка прайса 0 - id, 1 - наименование, 2 - цена
const proccessPrice = (page, el) => {
    page(`#${el[0]}`).html(`${el[2]}${ruble}`);
    console.log(`Цена "${el[1]}" установлена ${el[2]}`);
}

priceData.forEach((element, idx) => {
    if (idx === 0) {
        return;
    }
    let productType = element[0].split('_')[0];
    switch(productType) {
        case 'nuts':
            proccessPrice(nutsPage, element);
            break;
        case 'dried':
            proccessPrice(driedPage, element);
            break;
        default:
            console.log(`Неизвестный тип продукта строка ${idx + 2} - ${element.toString()}`);
    }
});
try {
    console.log('Записываем файл nuts.html');
    fs.writeFileSync(nutsFile, nutsPage.html());
}
catch (err) {
    console.log(`Ошибка записи файла nuts.html - ${err}`)
}
try {
    console.log('Записываем файл dried-fruits.html');
    fs.writeFileSync(driedFile, driedPage.html());
}
catch (err) {
    console.log(`Ошибка записи файла dried-fruits.html - ${err}`)
}
