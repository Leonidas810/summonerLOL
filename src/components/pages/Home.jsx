import Input from "../atoms/input";
import Img from "../atoms/Img";
import useFetch from "../../hooks/useFetch/useFetch";
import { useEffect, useRef, useState } from "react";

function Home({ }) {
    const [loading, setLoading] = useState(false);
    const summonerData = useRef({});

    const { data: dataChampions, loading: loadingChampions, error: errorChampions } = useFetch('get', 'getAllChampions', undefined, undefined, false);

    const { data: dataAccount, loading: loadingAccount, error: errorAccount, execute: executeGetAccountbyRiotId } = useFetch("get", "getAccountbyRiotId",
        false,
    );

    const { data: dataSummoner, loading: loadingSummoner, error: errorSummoner, execute: executeGetSummonerbyPUUID } = useFetch("get", "getSummonerbyPUUID",
        false,
    );

    const { data: dataMastery, loading: loadingMastery, error: errorMastery, execute: executeGetMasterybyPUUID } = useFetch("get", "getTopMasteryofSummoner",
        false,
    );


    useEffect(() => {
        const handleGetSummonerData = async () => {
            if (!dataAccount) return;
            try {
                const queryParams = {
                    'encryptedPUUID': dataAccount.puuid
                }
                await executeGetSummonerbyPUUID(queryParams);
                await executeGetMasterybyPUUID(queryParams);

            } catch (err) {
                console.log(err)
            }
        }
        handleGetSummonerData();
    }, [dataAccount])



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { region, name } = Object.fromEntries(new FormData(e.target));
            summonerData.current = {
                ...summonerData.current,
                region: region,
                name: name
            }
            const [gameName, tagLine] = name.split("#");
            const queryParams = {
                'gameName': gameName,
                'tagLine': tagLine,
            }
            await executeGetAccountbyRiotId(queryParams);
            if (errorAccount || !dataAccount) throw new Error("Not exist")
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div className='h-screen w-screen bg-linear-to-b from-[#141213] to-[#2B2B2B]'>
                {/* LOL LOGO */}
                <div className={`absolute transition-all duration-300  ${dataSummoner ? "w-12 top-12 left-10" : "w-28 top-1/10 left-1/10"}`}>
                    <img src="assets/logo-LOL.webp" />
                </div>
                {/* Summoner Search Bar */}
                <div className={`absolute w-3/4 sm:w-1/2 left-1/2 -translate-x-1/2 transition-all duration-300 ${dataSummoner ? "top-10" : "top-1/2 -translate-y-1/2"}`}>
                    {!dataSummoner && <p className=' text-6xl mb-4 italic text-white'>Summoner Search</p>}
                    <form onSubmit={handleSubmit} className='relative flex bg-[#D9D9D9] rounded-lg h-14'>
                        <Input name={"region"} containerClass={"w-1/3 h-full rounded-l-lg"} placeholder={"Region"} icon={"hashtag"} iconClass={"w-6"} inputClass={"w-full"} />
                        <Input name={"name"} containerClass={"w-2/3 h-full rounded-r-lg"} placeholder={"Summoner name + #TAG"} inputClass={"w-7/8 border-l-2"} />
                        <button type="submit" className="absolute right-[1rem] top-1/2 -translate-y-1/2">
                            {loadingAccount
                                ?
                                <div className="flex items-center justify-center">
                                    <div className="size-6 border-4 border-black border-t-transparent rounded-full animate-spin" />
                                </div>
                                :
                                <Img params={{icon:"search"}} />}
                        </button>
                        {errorAccount && <p className="absolute -bottom-1/2 left-[1rem] text-white">Summoner not found</p>}
                    </form>
                </div>
                {/* Summoner Card */}
                {loadingSummoner || loadingMastery ?
                    <div>cargando</div>
                    :
                    !dataSummoner || !dataMastery ?
                        <div>Error</div>
                        :
                        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-white">
                            <div className="flex justify-between space-x-2 p-4">
                                <Img type="profile" params={{'idIcon':dataSummoner.profileIconId}} className={"relative w-48"} imgClassName={"rounded-full"}>
                                    <div className="absolute bottom-0 left-1/2 translate-y-1/3 -translate-x-1/2 bg-black rounded-lg p-2">
                                        <p className="font-bold">{dataSummoner.summonerLevel}</p>
                                    </div>
                                </Img>
                                <div>
                                    <p>{summonerData.current.name}</p>
                                    <div className="flex space-x-2">
                                        {dataMastery.map((e, i) => {
                                            const champion = Object.values(dataChampions.data).find(champion => parseInt(champion.key) === e.championId);
                                            const championUrlName = champion.name.replace(/[^A-Za-z]/g, '');
                                            return (
                                                <div key={i}>
                                                    <Img type="champion" params={{champ:championUrlName}}/>
                                                    <div>{champion.name}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                }

            </div>
        </>
    )
}

export default Home;