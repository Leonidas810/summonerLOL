import { useState } from "react";
import Img from "../../../../atoms/Img";

function SummonerCard({
    section,
    loadedAll,
    dataSummoner,
    dataMastery,
    dataLeague,
    summonerData
}) {
    const [currentSide, setCurrentSide] = useState(false);

    const handleSectionMoveStyle = (section) => {
        switch (section) {
            case 1:
                return { top: '100%' };
            case 2:
                return { top: '50%', transform: `translateY(-50%) ${currentSide ? 'rotateY(360deg)' : ''}` };
            case 3:
                return { top: '25%', transform: `translateY(-50%) ${currentSide ? 'rotateY(360deg)' : ''}` };
            case 4:
                return { top: '-50%', transform: `translateY(-50%) ${currentSide ? 'rotateY(360deg)' : ''}` }
            default:
                return { visibility: 'hidden', top: '-50%' };
        }
    }

    return (
        <div className={`z-10 absolute w-3/4 left-1/2 -translate-x-1/2 transition-all duration-300 text-white shadow-2xl`} style={handleSectionMoveStyle(section)} onClick={() => setCurrentSide(prevState => !prevState)}>
            {
                (loadedAll) ?
                    <div className="animate-pulse flex flex-col sm:flex-row items-center justify-between space-x-2 p-4 rounded-2xl bg-[#1E2939]">
                        <div className="size-48 rounded-full bg-[#333F50]" />
                        <div className="flex sm:flex-col items-center justify-center space-x-6 sm:space-x-0 sm:space-y-6">
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
                        <div className="rounded-2xl" style={
                            currentSide ?
                                {
                                    background: '#D9D9D9',
                                }
                                :
                                {
                                    backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${summonerData.current?.topMasteryChamps[0].img}_0.jpg)`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }}>

                            <div className="flex flex-col sm:flex-row items-center justify-between space-y-10 sm:space-y-0 sm:space-x-2 p-4">
                                {currentSide ?
                                    <div className="grid gap-y-2 text-black">
                                        {dataLeague && dataLeague.map((e,i)=>{    
                                            console.log(e)                                        
                                            return(
                                            <div key={i} className="flex items-center select-none">
                                                <Img type="rankEmblem" params={{ rankId: e.tier }} className={"w-28 bg-gray-500 rounded-full"}/>
                                                <div className="ml-2">
                                                    <p className="text-xl font-bold">{e.queueType}</p>
                                                    <p>{e.tier} {e.rank}</p>
                                                    <p>PL: {e.leaguePoints}</p>
                                                    <p>W: {e.wins} L: {e.losses}</p>
                                                </div>
                                            </div> 
                                            )
                                        })}
                                        
                                    </div>
                                    :
                                    <Img type="profile" params={{ 'idIcon': dataSummoner.profileIconId }} className={"flex items-center justify-center relative size-48"} imgClassName={"rounded-full"}>
                                        <div className="absolute border-2 border-[#484848] top-0 -right-0 -translate-x-1/2 bg-black rounded-full p-[4px]">
                                            <p className="font-bold">{dataSummoner.summonerLevel}</p>
                                        </div>
                                        <div className="absolute border-2 border-[#484848] bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 bg-black rounded-lg p-[4px]">
                                            <p className="font-bold truncate">{summonerData.current.gameName}#{summonerData.current.tagLine}</p>
                                        </div>
                                    </Img>
                                }
                                <div className="flex flex-row sm:flex-col items-center justify-center space-x-6 sm:space-x-0 sm:space-y-6 font-semibold text-sm ">
                                    {summonerData.current?.topMasteryChamps.map((e, i) => {
                                        return (
                                            <div key={i}>
                                                <Img className={"size-20 relative"} type="champion" params={{ champ: e.img }} >
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
                        </div>

            }

        </div >
    )

}

export default SummonerCard;