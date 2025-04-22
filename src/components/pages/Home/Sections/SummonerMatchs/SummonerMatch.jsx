import MatchCard from "./MatchCard";

function SummonerMatch({ summonerData,loadedAll,handleGetAccount, section, dataMatch, dataSpells, executeGetAccountbyRiotId }) {

    const handleSectionMove = (section) => {
        switch (section) {
            case 1:
                return 'hidden';
            case 2:
                return 'top-2/2';
            case 3:
                return 'bottom-10';
            default:
                return ''
        }
    }

    return (
        <div className={`${handleSectionMove(section)} absolute w-3/4 left-1/2 -translate-x-1/2 transition-all duration-300 text-white space-y-2`}>
            {section === 3 && dataMatch && dataMatch.map((match, _) => {
                return (
                    <MatchCard key={match} loadedAll={loadedAll} summonerData={summonerData} match={match} dataSpells={dataSpells} executeGetAccountbyRiotId={executeGetAccountbyRiotId} handleGetAccount={handleGetAccount} />
                )
            })}
        </div>
    )

}

export default SummonerMatch;