import MatchCard from "./MatchCard";
import useFetch from "../../../../../hooks/useFetch/useFetch";

function SummonerMatch ({summonerData,section,dataMatch,dataAccount,dataSpells}){

    const handleSectionMove = (section) =>{
        switch(section){
            case 1 :
                return 'hidden';
            case 2 :
                return 'top-2/2';
            case 3:
                return 'top-1/2';
            default:
                return ''
        }
    }

    return(
    <div className={`text-white absolute w-3/4 left-1/2 -translate-x-1/2 transition-all duration-300 ${handleSectionMove(section)} text-white space-y-2`}>
            {section===3 && dataMatch && dataMatch.map((match,i)=>{
                return(
                    <MatchCard key={match} summonerData={summonerData} match={match} dataSpells={dataSpells}/>
                )
            })}
    </div>
    )

}

export default SummonerMatch;