// apiCatalog.js

const apiCatalog = {
  getAccountbyRiotId: {
    baseUrl:'https://americas.api.riotgames.com',
    url: '/riot/account/v1/accounts/by-riot-id/:gameName/:tagLine',
  },
  getSummonerbyPUUID: {
    url: '/lol/summoner/v4/summoners/by-puuid/:encryptedPUUID',
  },
  getAllChampions :{
    baseUrl:'https://ddragon.leagueoflegends.com',
    url:'/cdn/15.7.1/data/en_US/champion.json'
  },
  getTopMasteryofSummoner:{
    url:'/lol/champion-mastery/v4/champion-masteries/by-puuid/:encryptedPUUID/top'
  }
};

export default apiCatalog;
