// apiCatalog.js

const apiCatalog = {
  getAccountbyRiotId: {
    baseUrl: 'https://americas.api.riotgames.com',
    url: '/riot/account/v1/accounts/by-riot-id/:gameName/:tagLine',
  },
  getSummonerbyPUUID: {
    url: '/lol/summoner/v4/summoners/by-puuid/:encryptedPUUID',
  },
  getAllChampions: {
    baseUrl: 'https://ddragon.leagueoflegends.com',
    url: '/cdn/15.7.1/data/en_US/champion.json'
  },
  getTopMasteryofSummoner: {
    url: '/lol/champion-mastery/v4/champion-masteries/by-puuid/:encryptedPUUID/top'
  },
  getMatchesofSummoner: {
    baseUrl: 'https://americas.api.riotgames.com',
    url: '/lol/match/v5/matches/by-puuid/:encryptedPUUID/ids?'
  },
  getFullDataofMatch: {
    baseUrl: 'https://americas.api.riotgames.com',
    url: '/lol/match/v5/matches/:matchId'
  },
  getAllSpells: {
    baseUrl: 'https://ddragon.leagueoflegends.com',
    url: '/cdn/15.8.1/data/en_US/summoner.json'
  },
  getLeagueofSummoner :{
    url:'/lol/league/v4/entries/by-puuid/:encryptedPUUID'
  },
  getAllQueues :{
    baseUrl:'https://static.developer.riotgames.com',
    url:'/docs/lol/queues.json'
  }
};

export default apiCatalog;