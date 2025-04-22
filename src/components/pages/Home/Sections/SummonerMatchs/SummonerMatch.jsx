import MatchCard from "./MatchCard";

function SummonerMatch({ summonerData,loadedAll,handleGetAccount, section, dataMatch, dataSpells }) {

    const handleSectionMoveStyle = (section)=>{
        switch (section) {
            case 1:
            case 2:
                return {visibility:'hidden',top:'100%'};
            case 3:
                return {top:'50%'};
            case 4:
                return {top:'0%'}
            default:
                return {top:`${0 - ((section-4) * 22)}%`}
        }
    }

    return (
        <div className={`absolute w-3/4 left-1/2 -translate-x-1/2 transition-all duration-300 space-y-2`}
        style={handleSectionMoveStyle(section)}>
            {dataMatch && dataMatch.map((match, _) => {
                return (
                    <MatchCard key={match} loadedAll={loadedAll} summonerData={summonerData} match={match} dataSpells={dataSpells}  handleGetAccount={handleGetAccount} />
                )
            })}
        </div>
    )

}

export default SummonerMatch;