var express = require('express');
var router = express.Router();

var Irelia = require('irelia');
var irelia = new Irelia({
    secure: true,
    host: 'na.api.pvp.net',
    path: '/api/lol/',
    key: 'a1051ea8-4b73-49ee-89d4-e4863a00b92e',
    debug: true
});

/* GET */
router.get('/', function(req, res) {
      console.log('default /lol page');
      res.render(
        'lol',
        {
          title : 'Irelia'
        }
      );
    
});

/* POST */

router.post('/', function(req, res, next) {
  var summonerRegion = req.body.region;
  var summonerName = req.body.summoner;
  var summoner = {};
  
  irelia.getSummonerByName(summonerRegion, summonerName, function (err, summoner){
    if(err){
          if(err.status){
              if(err.status.code == 429){
                  console.log(err.status.message);
              } else if(err.status.code == 404){
                  console.log(err.status.message);
                  res.render(
                    'lol',
                    {
                      title : 'Irelia',
                      error : 'Summoner ' + err.status.message
                    }
                  );
              } else if(err.status.code == 500){
                  console.log(err.status.message);
              } else {
                  console.log('Unknown error code');
              }
          } else {
              console.log(err); // Non http error
              next();
          }
      } else {
        summoner = summoner[summonerName];
        res.render(
          'lol',
          {
            title : 'Irelia',
            summoner : summoner
          }
        );
      }
  });
  
  
});


module.exports = router;