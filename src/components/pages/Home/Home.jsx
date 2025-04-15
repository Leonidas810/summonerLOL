import SearchBar from "./Sections/searchBar";
import Img from "../../atoms/Img";
import useFetch from "../../../hooks/useFetch/useFetch";
import { useEffect, useRef, useState } from "react";

function Home({ }) {
    const summonerData = useRef({});

    const { data: dataChampions, loading: loadingChampions, error: errorChampions } = useFetch('get', 'getAllChampions', undefined, undefined, undefined, false);

    const { data: dataAccount, loading: loadingAccount, error: errorAccount, execute: executeGetAccountbyRiotId } = useFetch("get", "getAccountbyRiotId",
        false,
    );

    const { data: dataSummoner, loading: loadingSummoner, error: errorSummoner, execute: executeGetSummonerbyPUUID } = useFetch("get", "getSummonerbyPUUID",
        false,
    );

    const { data: dataMastery, loading: loadingMastery, error: errorMastery, execute: executeGetMasterybyPUUID } = useFetch("get", "getTopMasteryofSummoner",
        false,
    );

    const { data: dataMatch, loading: loadingMatch, error: errorMatch, execute: executeGetMatchesbyPUUID } = useFetch("get", "getMatchesofSummoner", false);

    const { data: dataMatchFull, loading: loadingMatchFull, error: errorMatchFull, execute: executeMatchFull } = useFetch("get", "getFullDataofMatch", false);


    useEffect(() => {
        const handleGetSummonerData = async () => {
            if (!dataAccount) return;
            try {
                const pathParams = {
                    'encryptedPUUID': dataAccount.puuid
                }
                const queryParams = {
                    'start': 0,
                    count: 20
                }
                await executeGetSummonerbyPUUID(pathParams);
                await executeGetMasterybyPUUID(pathParams);
                await executeGetMatchesbyPUUID(pathParams, queryParams)

            } catch (err) {
                console.log(err)
            }
        }
        handleGetSummonerData();
    }, [dataAccount])

    useEffect(() => {
        const handleGetChampAssets = () => {
            if (!dataChampions || !dataChampions.data || !dataMastery) return;

            const champsData = dataMastery.map(mastery => {
                const champion = Object.values(dataChampions.data).find(
                    champ => parseInt(champ.key) === mastery.championId
                );
                if (!champion) return null;
                const champData = {
                    name: champion.name.replace(/[^A-Za-z]/g, ''),
                    level: mastery.championLevel,
                }
                return champData;
            }).filter(name => name !== null);

            summonerData.current = {
                ...summonerData.current,
                topMasteryChamps: champsData
            };
        }
        handleGetChampAssets();

    }, [dataMastery])


    return (
        <>
            <div className='h-screen w-screen bg-linear-to-b from-[#141213] to-[#2B2B2B]'>
                {/*Search Bar */}
                <SearchBar dataAccount={dataAccount} summonerData={summonerData} dataSummoner={dataSummoner} executeGetAccountbyRiotId={executeGetAccountbyRiotId} loadingAccount={loadingAccount} errorAccount={errorAccount} />
                {/* Summoner Card */}
                {loadingSummoner || loadingMastery || loadingMatch ?
                    <div>cargando</div>
                    :
                    !dataSummoner || !dataMastery || !dataMatch ?
                        <div>Error</div>
                        :
                        <div className="absolute w-3/4 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-white">
                            <div className="flex items-center justify-between space-x-2 p-4 rounded-2xl" style={{
                                backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${summonerData.current?.topMasteryChamps[0].name}_0.jpg)`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                            >
                                <Img type="profile" params={{ 'idIcon': dataSummoner.profileIconId }} className={"relative w-48"} imgClassName={"rounded-full"}>
                                    <div className="absolute border-2 border-[#484848] top-0 -right-0 -translate-x-1/2 bg-black rounded-full p-[4px]">
                                        <p className="font-bold">{dataSummoner.summonerLevel}</p>
                                    </div>
                                    <div className="absolute border-2 border-[#484848] bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 bg-black rounded-lg p-[4px]">
                                        <p className="font-bold">{summonerData.current.gameName}#{summonerData.current.tagLine}</p>
                                    </div>
                                </Img>
                                <div className="flex flex-col space-y-6 font-semibold text-sm ">
                                    {summonerData.current?.topMasteryChamps.map((e, i) => {
                                        return (
                                            <div key={i} className="flex items-center">
                                                <Img className={"w-20 relative"} type="champion" params={{ champ: e.name }} >
                                                    <div className="absolute border-2 border-[#484848] left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 bg-black rounded-lg **:p-[4px]"><p>{e.name}</p></div>
                                                    <div className="absolute border-2 border-[#484848] top-0 right-0 translate-x-1/2 bg-black rounded-full p-[4px]">
                                                        <p className="font-bold">{e.level}</p>
                                                    </div>

                                                </Img>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                }

            </div>
        </>
    )
}

export default Home;