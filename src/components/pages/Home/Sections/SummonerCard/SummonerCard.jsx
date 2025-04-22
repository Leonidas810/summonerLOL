import Img from "../../../../atoms/Img";

function SummonerCard({section,loadedAll,dataSummoner,dataMastery,summonerData}) {
    
    const handleSectionMove = (section) =>{
        switch(section){
            case 1 :
                return 'top-2/2 translate-y-2/2';
            case 2 :
                return 'top-1/2 -translate-y-1/2';
            case 3:
                return 'top-10';
            default:
                return ''
        }
    }

    return (
        <div className={`absolute w-3/4 left-1/2 -translate-x-1/2 transition-all duration-300 
        ${handleSectionMove(section)} text-white shadow-2xl`}>
            {
                (loadedAll) ?
                    <div className="animate-pulse flex items-center justify-between space-x-2 p-4 rounded-2xl bg-[#1E2939]">
                        <div className="size-48 rounded-full bg-[#333F50]" />
                        <div className="flex flex-col space-y-6">
                            {[1, 2, 3].map((_, i) => {
                                return (
                                    <div key={i} className="size-20 bg-[#333F50] rounded-full" />
                                )
                            })}
                        </div>
                    </div>
                    :
                    (!dataSummoner || !dataMastery || !summonerData.current?.topMasteryChamps) ?
                        <div>Error</div>
                        :
                        <div className="flex items-center justify-between space-x-2 p-4 rounded-2xl" style={{
                            backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${summonerData.current?.topMasteryChamps[0].img}_0.jpg)`,
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
                                    <p className="font-bold truncate">{summonerData.current.gameName}#{summonerData.current.tagLine}</p>
                                </div>
                            </Img>
                            <div className="flex flex-col space-y-6 font-semibold text-sm ">
                                {summonerData.current?.topMasteryChamps.map((e, i) => {
                                    return (
                                        <div key={i} className="flex items-center">
                                            <Img className={"w-20 relative"} type="champion" params={{ champ: e.img }} >
                                                <div className="absolute border-2 border-[#484848] left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 bg-black rounded-lg **:p-[4px]"><p className="truncate">{e.name}</p></div>
                                                <div className="absolute border-2 border-[#484848] top-0 right-0 translate-x-1/2 bg-black rounded-full p-[4px]">
                                                    <p className="font-bold">{e.level}</p>
                                                </div>
                                            </Img>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
            }

        </div>
    )

}

export default SummonerCard;