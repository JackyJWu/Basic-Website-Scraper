var cheerio = require('cheerio');
var request = require('request');
//writestream
 const fs = require('fs');
 const writeStream = fs.createWriteStream('movies.csv');

//Write Headers for writestream
// writeStream.write('title, price,stock \n');

request('https://www.cineplex.com/Showtimes/any-movie/cineplex-odeon-crowfoot-crossing-cinemas?Date=9/3/2018', (error, response, html) => {
  if(!error && response.statusCode == 200){
    //Keep
    const $ = cheerio.load(html);



    //Prints prints all the titles of the books
    console.log('Prints all the movie titles');
    $('a.movie-details-link-click').each((i, el) => {
      const title = $(el).text().replace(/\s\s+/g, '');
      console.log(title);
      //writeStream.write(`${title} \n`);
    });
    console.log('');
    // Printing All the movie time duration
    console.log('Prints the times of the movies');
    $('div.h3 span:nth-of-type(2)').each((i, el) => {
      const leng = $(el).text()
      console.log(leng);
      //writeStream.write(`${leng}\n`);
    });

    // Prints both movie time and length
    console.log('Print Movie with Movie time');
    $('div.showtime-card div.h3').each((i, el) => {
      const movie = $(el).find('a.movie-details-link-click').text().replace(/\s\s+/g, '');


      const duration = $(el).find('div.h3 span:nth-of-type(2)').text();


      // const stock = $(el).find('p.instock.availability').text().replace(/\s\s+/g, '');
       console.log(movie+'\t\t\t' + duration );
      //write to CSV
      writeStream.write(`${movie}, ${duration} \n`);


    });

   // console.log('Prints all the titles of the books');
   // $('h3 a').each((i, el) => {
   //   const href = $(el).text()  ;
   //   const hrefText = $(el).attr('title');
   //   console.log(hrefText);
   // });
   //   console.log('');
   //  // Prints the Prices of all books
   //   console.log('Print all the values of the books');
   //   $('.price_color').each((i, el) => {
   //     const thing = $(el).text()  ;
   //     const link = $(el).attr('title');
   //     console.log(thing);
   //   });
   //   console.log('');
   //   console.log('Current stock of the books');
   //   $('p.instock.availability').each((i, el) => {
   //
   //     const stock = $(el).text().replace(/\s\s+/g, '')
   //     console.log( stock);
   //   });

     //Now we are putting the books and text together in the same line.. (teaches you how to iterate through two searches)
     // console.log('');
     // console.log('Putting all in the same line');
     // $('article.product_pod').each((i, el) => {
     //   const title = $(el).find('a').text();
     //
     //
     //   const price = $(el).find('p.price_color').text();
     //
     //
     //   const stock = $(el).find('p.instock.availability').text().replace(/\s\s+/g, '');
     //          // console.log(title+'\t\t\t' + price + '\t\t\t'+  stock);
     //          //write to CSV
     //  writeStream.write(`${title}, ${price}, ${stock} \n`);
     //
     // });
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
