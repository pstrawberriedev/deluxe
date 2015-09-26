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

// Grab Basic Summoner Info
function getSummoner(summonerRegion, summonerName, callback)
{
  irelia.getSummonerByName(summonerRegion, summonerName, function (err, summoner){
    if(err){
        callback({status: 'error', data: err});
      } else {
        // Play catch
        callback({status: 'success', data: summoner[summonerName]});
      }
  });
}

// Grab Summoner League Info
function getSummonerLeague(summoner, callback)
{
  // Summary info
  irelia.getLeagueBySummonerId(summoner.region, summoner.id, function (err, summonerLeague) {
    if(err) {
      // Play catch
      callback({status: 'error', data: err});
      console.log(err);
    } else {
      // Play catch
      callback({status: 'success', data: summonerLeague[summoner.id]});
    }
  });
}

// Grab Summoner Summary
function getSummary(summoner, callback)
{
  // Summary info
  irelia.getSummaryStatsBySummonerId(summoner.region, summoner.id, function (err, summonerSummary) {
    if(err) {
      // Play catch
      callback({status: 'error', data: err});
    } else {
      // Play catch
      callback({status: 'success', data: summonerSummary.playerStatSummaries});
    }
  });
}

// Grab Summoner Ranked Info
function getRanked(summoner, callback)
{
  // Ranked info
  irelia.getRankedStatsBySummonerId(summoner.region, summoner.id, function (err, summonerRankedInfo) {
    if(err) {
      // Play catch
      callback({status: 'error', data: err});
    } else {
      // Play catch
      callback({status: 'success', data: summonerRankedInfo});
    }
  });
}

module.exports = {
  summoner: getSummoner,
  summary: getSummary,
  ranked: getRanked,
  league: getSummonerLeague
};