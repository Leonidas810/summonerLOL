import Input from "../atoms/input";
import Icon from "../atoms/Icon";
import useFetch from "../../hooks/useFetch/useFetch";
import { useEffect, useState } from "react";

function Home({ }) {

    const [loading, setLoading] = useState(false);

    const { data: dataAccount, loading: loadingAccount, error: errorAccount, execute: executeGetAccountbyRiotId } = useFetch("get", "getAccountbyRiotId",
        false,
    );

    const { data: dataSummoner, loading: loadingSummoner, error: errorSummoner, execute: executeGetSummonerbyPUUID } = useFetch("get", "getSummonerbyPUUID",
        false,
    );

    const handleGetSummonerData = async () => {
        try {
            const queryParams = {
                'encryptedPUUID': dataAccount.puuid
            }
            await executeGetSummonerbyPUUID(queryParams)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { region, name } = Object.fromEntries(new FormData(e.target));
            const [gameName, tagLine] = name.split("#");
            const queryParams = {
                'gameName': gameName,
                'tagLine': tagLine,
            }
            await executeGetAccountbyRiotId(queryParams);
            handleGetSummonerData();

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    }

    console.log(errorAccount)

    return (
        <div className='h-screen w-screen bg-linear-to-b from-[#141213] to-[#2B2B2B]'>
            {/* Container */}
            <div className='h-full w-full flex justify-center items-center'>
                <div className="absolute top-1/10 left-1/10">
                    <img src="assets/logo-LOL.webp" />
                </div>
                {/* Search Bar */}
                <div className='w-3/4 sm:w-1/2'>
                    <p className=' text-6xl mb-4 italic text-white'>Summoner Search</p>
                    <form onSubmit={handleSubmit} className='relative flex bg-[#D9D9D9] rounded-lg h-14'>
                        <Input name={"region"} containerClass={"w-1/3 h-full rounded-l-lg"} placeholder={"Region"} icon={"hashtag"} iconClass={"w-6"} inputClass={"w-full"} />
                        <Input name={"name"} containerClass={"w-2/3 h-full rounded-r-lg"} placeholder={"Summoner name + #TAG"} inputClass={"w-7/8 border-l-2"} />
                        <button type="submit" className="absolute right-[1rem] top-1/2 -translate-y-1/2"><Icon icon={"search"} /></button>
                        {errorAccount && <p className="absolute -bottom-1/2 left-[1rem] text-white">Summoner not found</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home;