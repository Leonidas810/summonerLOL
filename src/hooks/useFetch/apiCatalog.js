// apiCatalog.js

const apiCatalog = {
  getAccountbyRiotId: {
    baseUrl:'https://americas.api.riotgames.com',
    url: '/riot/account/v1/accounts/by-riot-id/:gameName/:tagLine',
  },
  getSummonerbyPUUID: {
    url: '/lol/summoner/v4/summoners/by-puuid/:encryptedPUUID',
  },
};

export default apiCatalog;
