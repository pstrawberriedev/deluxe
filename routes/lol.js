Array.prototype.getIndexBy = function (name, value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][name] == value) {
            return i;
        }
    }
}

// The good stuff
var express = require('express');
var router = express.Router();
var get = require('../config/lol');
var events = require('events');
var event = new events.EventEmitter();
var extend = require('extend');

event.on('render', function(req, res, options)
{
    var defaults =
    {
      view: 'lol',
      title: 'Irelia'
    };

    // Deep combine our defaults with the requested options
    options = extend(true, defaults, options);
    res.render(options.view, options);
});

/* GET */
router.get('/', function(req, res) {
      console.log('default /lol page');
      res.render(
        'lol',
        {
          title : 'Summoner Lookup'
        }
      );
});

/* POST */

router.post('/', function(req, res, next) {
   
  // Base Globals
  var summonerRegion = req.body.region;
  var summonerName = req.body.summoner.replace(/\s+/g, ''); //remove whitespace
  var summoner = {};
  
  get.summoner(summonerRegion, summonerName, function(response) {
    if(response.status == 'error')
    {
	  var status = response.data.status;
	
      if(response.data && status){
        if(status.code == 429){
            console.log(status.message);
        } else if(status.code == 404){
            console.log(status.message);
            event.emit('render', req, res, {error: 'Summoner ' + status.message});
        } else if(status.code == 500){
            console.log(status.message);
          event.emit('render', req, res, {error: 'Summoner ' + status.message});
        } else {
          console.log('Unknown error code');
          event.emit('render', req, res, {error: 'Unknown error code'});
        }
      } else {
        console.log(response.data); // Non http error
        event.emit('render', req, res, {error : 'Sorry, there was some crazy error.'});
      }
    }
    else
    {
      // More stuff here
      summoner = response.data;
      summoner.region = summonerRegion;

      var stuff = ['summary', 'ranked', 'league'];
      var finished = 0;

      stuff.forEach(function(func){
        get[func](summoner, function(response){
          if(response.status == 'error')
          {
            summoner[func] = 'error';
            console.log("Error:", response.data.message);
          }
          else
          {
            summoner[func] = response.data;
          }

          finished++;

          if(finished === stuff.length)
          {
            //console.log(summoner);
            var crawlMe = summoner.league[0]['entries'];
            var rankedId = summoner.league[0].participantId;
            var leagueSingle = crawlMe[crawlMe.getIndexBy("playerOrTeamId", rankedId)];
            
            
            summoner.league[0]['entries'].forEach(function(entry) {
              console.log(entry);
            });

            
            // Render All the info into a view!
            event.emit('render', req, res, {
              summoner : summoner,
              profileIcon : 'images/lolstatic/5.18.1/img/profileicon/' + summoner.profileIconId + '.png',
              leagueInfo : summoner.league[0],
              leagueSingle : leagueSingle,
            });
          }
        });
      });
    }
  });
});


module.exports = router;