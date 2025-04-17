import SearchBar from "./Sections/SearchBar/searchBar";
import useFetch from "../../../hooks/useFetch/useFetch";
import { useEffect, useRef, useState } from "react";
import SummonerCard from "./Sections/SummonerCard/SummonerCard";
import SummonerMatch from "./Sections/SummonerMatchs/SummonerMatch";

function Home({ }) {
    const [section, setSection] = useState(1);
    const summonerData = useRef({});
    const parseSpells = useRef({});

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
        const handleParseSpells = () => {
            console.log(dataSpells);
        }
        handleParseSpells();
    }, [dataSpells])




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

    useEffect(() => {
        const handleGetSummonerData = async () => {
            if (!dataAccount) return;
            try {
                const pathParams = {
                    'region': summonerData.current.region,
                    'encryptedPUUID': dataAccount.puuid
                }
                const queryParams = {
                    'start': 0,
                    count: 2
                }
                await executeGetSummonerbyPUUID(pathParams);
                await executeGetMasterybyPUUID(pathParams);
                await executeGetMatchesbyPUUID(pathParams, queryParams)
                setSection(2);

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
                    return Math.min(prevSection + 1, 3);
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


    return (
        <>
            <div className='relative h-screen w-screen bg-linear-to-b from-[#141213] to-[#2B2B2B] overflow-hidden'>
                {/*Search Bar */}
                <SearchBar section={section} summonerData={summonerData} loadingSummoner={loadingSummoner} executeGetAccountbyRiotId={executeGetAccountbyRiotId} dataAccount={dataAccount} loadingAccount={loadingAccount} errorAccount={errorAccount} />
                {/* Summoner Card */}
                {dataAccount &&
                    <>
                        <SummonerCard section={section} loadingSummoner={loadingSummoner} loadingMastery={loadingMastery} loadingMatch={loadingMatch} dataSummoner={dataSummoner} dataMastery={dataMastery} dataMatch={dataMatch} summonerData={summonerData} />
                        {dataMatch && <SummonerMatch summonerData={summonerData} section={section} dataMatch={dataMatch} dataAccount={dataAccount} dataSpells={dataSpells} />}
                    </>
                }
            </div>
        </>
    )
}

export default Home;