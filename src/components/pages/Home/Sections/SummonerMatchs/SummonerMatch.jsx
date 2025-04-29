import SummonerFilter from "./SummonerFilter";
import MatchCard from "./MatchCard";

function SummonerMatch({
    loadedAll,
    summonerData,
    handleGetAccount,
    section,
    dataMatch,
    dataSpells,
    handleFilterMathes
}) {

    const handleSectionMoveStyle = (section) => {
        switch (section) {
            case 1:
            case 2:
                return { visibility: 'hidden', top: '100%' };
            case 3:
                return { top: '45%' };
            case 4:
                return { top: '0%' }
            default:
                return { top: `${0 - ((section - 4) * 22)}%` }
        }
    }

    return (
        <div className={`absolute w-3/4 left-1/2 -translate-x-1/2 transition-all duration-300 space-y-2`}
            style={handleSectionMoveStyle(section)}>\
            <SummonerFilter section={section} handleFilterMathes={handleFilterMathes} />
            {(dataMatch && !loadedAll) ?
                dataMatch.length === 0
                    ? <div>No info</div>
                    : (
                        <>
                            {dataMatch.map((match, _) => (
                                <MatchCard key={match} summonerData={summonerData} match={match} dataSpells={dataSpells} handleGetAccount={handleGetAccount} />
                            ))}
                        </>
                    )
                :
                <div className="flex items-center justify-center">
                    <div className="size-12 rounded-full border-4 border-gray-300 border-t-white animate-spin" />
                </div>

            }
        </div>
    )

}

export default SummonerMatch;