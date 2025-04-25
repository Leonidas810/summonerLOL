import SearchBar from "./Sections/SearchBar/searchBar";
import useFetch from "../../../hooks/useFetch/useFetch";
import { useEffect, useRef, useState } from "react";
import SummonerCard from "./Sections/SummonerCard/SummonerCard";
import SummonerMatch from "./Sections/SummonerMatchs/SummonerMatch";
import SummonerFilter from "./Sections/SummonerMatchs/SummonerFilter";

function Home({ }) {
    const [section, setSection] = useState(1);
    const [loadedAll, setLoadedAll] = useState(false);
    const summonerData = useRef({});

    const { data: dataSpells, loading: loadingSpells, error: errorSpells } = useFetch('get', 'getAllSpells', true, undefined, undefined, false);

    const { data: dataChampions, loading: loadingChampions, error: errorChampions } = useFetch('get', 'getAllChampions', true, undefined, undefined, false);

    const { data: dataAccount, loading: loadingAccount, error: errorAccount, execute: executeGetAccountbyRiotId } = useFetch("get", "getAccountbyRiotId", false,);

    const { data: dataSummoner, loading: loadingSummoner, error: errorSummoner, execute: executeGetSummonerbyPUUID } = useFetch("get", "getSummonerbyPUUID",
        false,
    );

    const { data: dataMastery, loading: loadingMastery, error: errorMastery, execute: executeGetMasterybyPUUID } = useFetch("get", "getTopMasteryofSummoner",
        false,
    );

    const { data: dataMatch, loading: loadingMatch, error: errorMatch, execute: executeGetMatchesbyPUUID } = useFetch("get", "getMatchesofSummoner", false);


    useEffect(() => {
        const handleGetChampAssets = () => {
            if (!dataChampions || !dataChampions.data || !dataMastery) return;
            const champsData = dataMastery.map(mastery => {
                const champion = Object.values(dataChampions.data).find(
                    champ => parseInt(champ.key) === mastery.championId
                );
                if (!champion) return null;
                const champData = {
                    name: champion.name,
                    img: champion.image.full.split(".")[0],
                    level: mastery.championLevel,
                }
                return champData;
            }).filter(name => name !== null);

            summonerData.current = {
                ...summonerData.current,
                topMasteryChamps: champsData
            };
            setLoadedAll(false);
        }
        handleGetChampAssets();

    }, [dataMastery])

    useEffect(() => {
        const handleGetSummonerData = async () => {
            setLoadedAll(true);
            if (!dataAccount) return;
            try {
                const pathParams = {
                    'region': summonerData.current.region,
                    'encryptedPUUID': dataAccount.puuid
                }
                const queryParams = {
                    'start': 0,
                    count: 10
                }
                await executeGetSummonerbyPUUID(pathParams);
                await executeGetMatchesbyPUUID(pathParams, queryParams);
                await executeGetMasterybyPUUID(pathParams);

            } catch (err) {
                console.log(err)
            }
        }
        handleGetSummonerData();
    }, [dataAccount])



    useEffect(() => {
        const handleWheel = (e) => {
            const isInDropdown = e.target.closest('.dropdown-scroll');
            if (isInDropdown) return;
            e.preventDefault();
            if (loadingSummoner || loadingMastery || loadingMatch) return;
            setSection((prevSection) => {
                if (e.deltaY > 0) {
                    return Math.min(prevSection + 1, 10);
                } else {
                    return Math.max(prevSection - 1, 1);
                }
            });
        };
        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, []);


    const handleGetAccount = async (gameName, tagLine, region = undefined) => {
        try {
            const pathParams = {
                'region': region ? region : summonerData.current.region,
                'gameName': gameName,
                'tagLine': tagLine,
            }
            await executeGetAccountbyRiotId(pathParams);
            summonerData.current = {
                ...summonerData.current,
                ...pathParams,
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            <div className='relative h-screen w-screen bg-linear-to-b from-[#141213] to-[#2B2B2B] overflow-hidden'>
                {/*Search Bar */}
                <SearchBar section={section} handleGetAccount={handleGetAccount} loadingSummoner={loadingSummoner} dataAccount={dataAccount} loadingAccount={loadingAccount} errorAccount={errorAccount} />
                {/* Summoner Card */}
                {dataAccount &&
                    <>
                        <SummonerCard section={section} loadedAll={loadedAll} dataSummoner={dataSummoner} dataMastery={dataMastery} summonerData={summonerData} />
                        <SummonerFilter/>
                        {/* Filter Card */}
                        {dataMatch &&
                            <SummonerMatch section={section} loadedAll={loadedAll} handleGetAccount={handleGetAccount} summonerData={summonerData} dataMatch={dataMatch} dataSpells={dataSpells} />}
                    </>
                }
            </div>
        </>
    )
}

export default Home;