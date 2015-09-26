// lol.js -- config
// Do all API calls here
var Irelia = require('irelia');
var irelia = new Irelia({
    secure: true,
    host: 'na.api.pvp.net',
    path: '/api/lol/',
    key: 'a1051ea8-4b73-49ee-89d4-e4863a00b92e',
    debug: true
});


function getSummoner(summonerRegion, summonerName, callback)
{
  // Grab Basic Summoner Info, pass it into var summoner
  irelia.getSummonerByName(summonerRegion, summonerName, function (err, summoner){
    if(err){
        callback({status: 'error', data: err});
      } else {
        // Make summoner object top-level
        callback({status: 'success', data: summoner[summonerName]});
      }
  });
}

function getSummary(summoner, callback)
{
  // Summary info
  irelia.getSummaryStatsBySummonerId(summoner.region, summoner.id, function (err, summonerSummary) {
    if(err) {
      callback({status: 'error', data: err});
    } else {
      callback({status: 'success', data: summonerSummary.playerStatSummaries});
    }
  });
}

function getRanked(summoner, callback)
{
  // Ranked info
  irelia.getRankedStatsBySummonerId(summoner.region, summoner.id, function (err, summonerRankedInfo) {
    if(err) {
      callback({status: 'error', data: err});
    } else {
      callback({status: 'success', data: summonerRankedInfo});
    }
  });
}

module.exports = {
  summoner: getSummoner,
  summary: getSummary,
  ranked: getRanked
};