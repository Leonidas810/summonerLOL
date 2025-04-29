import SearchBar from "./Sections/SearchBar/searchBar";
import useFetch from "../../../hooks/useFetch/useFetch";
import { useEffect, useRef, useState } from "react";
import SummonerCard from "./Sections/SummonerCard/SummonerCard";
import SummonerMatch from "./Sections/SummonerMatchs/SummonerMatch";

function Home({ }) {
    const [section, setSection] = useState(1);
    const [loadedAll, setLoadedAll] = useState(false);
    const summonerData = useRef({});

    const { data: dataSpells, loading: loadingSpells, error: errorSpells } = useFetch('getAllSpells', true, undefined, false);

    const { data: dataChampions, loading: loadingChampions, error: errorChampions } = useFetch('getAllChampions', true, undefined, false);

    const { data: dataAccount, loading: loadingAccount, error: errorAccount, execute: executeGetAccountbyRiotId } = useFetch("getAccountbyRiotId", false);

    const { data: dataSummoner, loading: loadingSummoner, error: errorSummoner, execute: executeGetSummonerbyPUUID } = useFetch("getSummonerbyPUUID", false);

    const { data: dataMastery, loading: loadingMastery, error: errorMastery, execute: executeGetMasterybyPUUID } = useFetch("getTopMasteryofSummoner", false);

    const { data: dataMatch, loading: loadingMatch, error: errorMatch, execute: executeGetMatchesbyPUUID } = useFetch("getMatchesofSummoner", false);

    const {data : dataLeague, loading:loadingLeague, error:errorLeague ,execute: executeGetLeagueByPuuid}= useFetch("getLeagueofSummoner",false)

    useEffect(() => {
        const handleGetSummonerData = async () => {
            if (!dataAccount) return;
            setLoadedAll(true);
            try {
                const pathParams = {
                    'region': summonerData.current.region,
                    'encryptedPUUID': dataAccount.puuid
                }
                const queryParams = {
                    'start': 0,
                    count: 5
                }
                await executeGetSummonerbyPUUID({ pathParams: { ...pathParams } });
                await executeGetMatchesbyPUUID({ pathParams: { ...pathParams }, queryParams: { ...queryParams } });
                await executeGetMasterybyPUUID({ pathParams: { ...pathParams } });
                await executeGetLeagueByPuuid({pathParams:{...pathParams}});
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
        const handleWheel = (e) => {
            const isInDropdown = e.target.closest('.dropdown-scroll');
            if (isInDropdown) return;
            if (errorAccount || errorSummoner) return;
            e.preventDefault();
            setSection((prevSection) => {
                if (e.deltaY > 0) {
                    return Math.min(prevSection + 1, 10);
                } else {
                    return Math.max(prevSection - 1, 1);
                }
            });
        };
        if (errorAccount || errorSummoner) setSection(1);
        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [errorAccount, errorSummoner]);

    const handleGetAccount = async (gameName, tagLine, region = undefined) => {
        try {
            const pathParams = {
                'region': region ? region : summonerData.current.region,
                'gameName': gameName,
                'tagLine': tagLine,
            }
            const customParams = {
                method: 'get',
                pathParams: { ...pathParams },
            }
            await executeGetAccountbyRiotId(customParams);
            summonerData.current = {
                ...summonerData.current,
                ...pathParams,
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleFilterMathes = async (params) => {
        try {
            await executeGetMatchesbyPUUID(params);
        } catch (err) {
            console.log(err);
        }
    }

    console.log(dataLeague);

    return (
        <>
            <div className='relative h-screen w-screen bg-linear-to-b from-[#141213] to-[#2B2B2B] overflow-hidden'>
                {/*Search Bar */}
                <SearchBar section={section} loadedAll={loadedAll} handleGetAccount={handleGetAccount} dataAccount={dataAccount} errorAccount={errorAccount} errorSummoner={errorSummoner} />
                {(dataAccount && dataSummoner) &&
                    <>
                        {/* Summoner Card */}
                        <SummonerCard section={section} loadedAll={loadedAll} dataSummoner={dataSummoner} dataMastery={dataMastery} dataLeague={dataLeague} summonerData={summonerData} />
                        {/* Summoner Matchs*/}
                        <SummonerMatch  section={section} loadedAll={loadedAll} handleFilterMathes={handleFilterMathes} handleGetAccount={handleGetAccount} summonerData={summonerData} dataMatch={dataMatch} dataSpells={dataSpells} />
                    </>
                }
            </div>
        </>
    )
}

export default Home;