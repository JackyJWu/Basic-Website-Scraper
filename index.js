var cheerio = require('cheerio');
var request = require('request');

request('https://jackyjwu.github.io/', (error, response, html) => {
  if(!error && response.statusCode == 200){
    //Keep
    const $ = cheerio.load(html);

    // Gets site Heading
    const siteHeading = $('.intro h1');
    const siteHeadText = siteHeading.text();
    console.log(siteHeadText);


    // Get navbar link
     $('a.nav-link').each((i, el) => {
       const item = $(el).text();
       console.log(item);
     });

     //Get navbar href
     console.log('ALL THE HREF ATTRIBUTE');
     $('a.nav-link').each((i, el) => {
       const thing = $(el).text();
       const link = $(el).attr('href');
       console.log(link);
     });


  }
});
