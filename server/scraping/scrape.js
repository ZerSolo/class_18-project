const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setUserAgent(randomUseragent.getRandom());

        const cities = ['amsterdam', 'London'];

        for (const location_city of cities) {
            // const location_city = 'Brussels';
            let houseURL = `https://european-property.com/search/properties/location/${location_city}/tenure/sale`;

            await page.goto(houseURL);

            await page.waitForSelector('.property-image');

            const ListURL = await page.evaluate(() => {
                const links = document.querySelectorAll('.property-image > a ');
                return Array.from(links).map(link => link.href);
            });

            const EachPage = await browser.newPage();
            await EachPage.setUserAgent(randomUseragent.getRandom());
            for (const eachUrl of ListURL) {
                await EachPage.goto(`${eachUrl}`, {
                    waitUntil: 'networkidle2',
                });
                await EachPage.waitForSelector('.container');

                const houseDetails = await EachPage.evaluate(() => {
                    const dataExtractor = selector => {
                        const dataContent = document.querySelectorAll(selector);
                        return Array.from(dataContent).map(
                            value => value.innerHTML
                        );
                    };
                    const linkExtractor = selector => {
                        const dataContent = document.querySelectorAll(selector);
                        return Array.from(dataContent).map(
                            value => value.action
                        );
                    };

                    const imageExtractor = selector => {
                        const dataContent = document.querySelectorAll(selector);
                        return Array.from(dataContent).map(value => value.href);
                    };

                    // const address = () => {
                    //     const dataContent = document.querySelectorAll(
                    //         '.address div.address-line.full-width'
                    //     );
                    //     return Array.from(dataContent).map(
                    //         value => value.innerHTML
                    //     );
                    // };

                    const link = linkExtractor('.main-enquiry > form ').join(
                        ''
                    );

                    const title = dataExtractor(
                        '.property-item-display h1'
                    ).join('');

                    const size_rooms = dataExtractor(
                        '.beds .sidebar-number'
                    ).join('');
                    const price_value = dataExtractor(
                        '.property-item-details p'
                    )
                        .join('')
                        .slice(1);
                    const price_currency = 'Eur';
                    const location = dataExtractor(
                        '.content .property-item-details .property-item-display > span'
                    )
                        .join(',')
                        .split(',');

                    const locationCity = location[location.length - 2];
                    const locationCountry = location[location.length - 1];

                    const description = dataExtractor(
                        '.content .property-item-description div'
                    );
                    //  const ad = address();
                    const images = imageExtractor('.carousel ul li a ');

                    const allDetails = {
                        images,
                        link,
                        title,
                        size_rooms,
                        price_value,
                        price_currency,
                        locationCity,
                        locationCountry,
                        //description,
                    };
                    return allDetails;
                });
                const address = await EachPage.evaluate(() => {
                    const dataCo = document.querySelectorAll(
                        '.address div.address-line.full-width'
                    );
                    let leng = dataCo.length;
                    let contentArray = [1];
                    for (i = 0; i < dataCo.length; i++) {
                        contentArray.push(dataCo[i].innerHTML);
                    }
                    return { contentArray, leng };
                });

                console.log(houseDetails, address);
            }
        }

        // await browser.close();
    } catch (error) {
        console.log('this is error', error);
    }
})();
