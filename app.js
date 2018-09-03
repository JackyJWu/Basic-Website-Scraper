var cheerio = require('cheerio');
var request = require('request');
//writestream
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

//Write Headers for writestream
// writeStream.write('title, price,stock \n');

request('http://books.toscrape.com/', (error, response, html) => {
  if(!error && response.statusCode == 200){
    //Keep
    const $ = cheerio.load(html);



    //Prints prints all the titles of the books
   console.log('Prints all the titles of the books');
   $('h3 a').each((i, el) => {
     const href = $(el).text()  ;
     const hrefText = $(el).attr('title');
     console.log(hrefText);
   });
     console.log('');
    // Prints the Prices of all books
     console.log('Print all the values of the books');
     $('.price_color').each((i, el) => {
       const thing = $(el).text()  ;
       const link = $(el).attr('title');
       console.log(thing);
     });
     console.log('');
     console.log('Current stock of the books');
     $('p.instock.availability').each((i, el) => {

       const stock = $(el).text().replace(/\s\s+/g, '')
       console.log( stock);
     });

     //Now we are putting the books and text together in the same line.. (teaches you how to iterate through two searches)
     console.log('');
     console.log('Putting all in the same line');
     $('article.product_pod').each((i, el) => {
       const title = $(el).find('a').text();


       const price = $(el).find('p.price_color').text();


       const stock = $(el).find('p.instock.availability').text().replace(/\s\s+/g, '');
              // console.log(title+'\t\t\t' + price + '\t\t\t'+  stock);
              //write to CSV
              writeStream.write('${title}, ${price}, ${stock} \n');

     });
     console.log('Scraping Done...');

     //replace(/\s\s+/g removes whitespace
    // const siteHeading = $('.intro h1');
    // const siteHeadText = siteHeading.text();
    // console.log(siteHeadText);


    // Get navbar link
     // $('a.nav-link').each((i, el) => {
     //   const item = $(el).text();
     //   console.log(item);
     // });
     //
     // //Get navbar href
     // console.log('ALL THE HREF ATTRIBUTE');
     // $('a.nav-link').each((i, el) => {
     //   const thing = $(el).text();
     //   const link = $(el).attr('href');
     //   console.log(link);
     // });


  }
});
