const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.nytimes.com/es/', {waitUntil: 'networkidle2'});

    const myLinks = await page.evaluate(() => {
        const encabezados = document.querySelectorAll('a[href*="pandemia"]');
        const temp = [];

        encabezados.forEach(item => temp.push(item.attributes.href.value));
        return temp.filter((item, idx) => temp.indexOf(item) === idx);
    })

    const screenshots = async () => { 
        for (const link of myLinks) {
            await page.goto(`https://www.nytimes.com${link}`, {waitUntil: 'networkidle2'});
            await page.screenshot({ path: `${link.slice(0, 8)}.png`});
        }
    };

    screenshots();

    //await page.goto(`https://www.nytimes.com${result[0]}`, {waitUntil: 'networkidle2'});
    //await page.screenshot({ path: `page ${1}.png`});

    await browser.close();
  })();

  /* Identificando mis elementos HTML 
  
<a data-rref="" href="/es/2021/03/17/espanol/opinion/papa-francisco-argentina.html">¿Debe el 
papa volver a la Argentina?</a>

FUNCIONANDO -> document.querySelector('a[href*="papa"]').innerHTML

#stream-panel > div.css-13mho3u > ol > li:nth-child(2) > div > div.css-1l4spti > a > h2
  */ 

