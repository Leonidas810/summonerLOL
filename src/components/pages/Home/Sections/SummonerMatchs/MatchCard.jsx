import { useEffect, useRef } from "react";
import useFetch from "../../../../../hooks/useFetch/useFetch";
import Img from "../../../../atoms/Img";

function MatchCard({ summonerData, loadedAll, match, dataSpells,handleGetAccount }) {
    const { data: dataMatchFull, loading: loadingMatchFull, error: errorMatchFull, execute: executeMatchFull } = useFetch("get", "getFullDataofMatch", false);
    const mySummoner = useRef(null)

    useEffect(() => {
        const pathParams = {
            'matchId': match,
        }
        executeMatchFull(pathParams)
    }, [match])

    const handleOnClick = (riotIdGameName, riotIdTagline) => {
        handleGetAccount(riotIdGameName,riotIdTagline);
    }

    const handleParticipantClick = (event) => {
        const target = event.target;
        if (target && target.dataset.gameName && target.dataset.tagline) {
          const gameName = target.dataset.gameName;
          const tagline = target.dataset.tagline;
          handleOnClick(gameName, tagline);
        }
      };
      

    const participants = dataMatchFull?.info?.participants || null;
    const teamBlue = participants && participants.slice(0, 5) || null;
    const teamRed = participants && participants.slice(5) || null;

    return (
        <div className={`shadow-2xl rounded-2xl ${loadedAll || loadingMatchFull || !mySummoner.current ? "bg-[#333F50]" : mySummoner.current?.win ? "bg-blue-900" : "bg-red-900"}`}>
            <div className="flex justify-between p-2">
                <div className="space-y-2">
                    <div className="flex space-x-1">
                        {loadedAll || loadingMatchFull || !mySummoner.current
                            ?
                            <div className="size-20 rounded-full bg-[#333F50]" />
                            :
                            <Img className={"w-20 relative"} imgClassName={"rounded-full"} type="champion" params={{ champ: mySummoner.current.championName }} >
                                <div className="absolute border-2 border-[#484848] top-0 -translate-x-1/2 bg-black rounded-full p-[4px]">
                                    <p className="font-bold">{mySummoner.current?.champLevel || "..."}</p>
                                </div>
                            </Img>
                        }
                        <div>
                            {[1, 2].map((e, _) => {
                                if (loadedAll || loadingMatchFull || !mySummoner.current) return (<div className="size-8 rounded-full bg-[#333F50]" />)
                                const spell = `summoner${e}Id`;
                                const idSpell = mySummoner.current[spell];
                                const nameSpell = Object.keys(dataSpells.data).find((e) => parseInt(dataSpells.data[e].key) === parseInt(idSpell)
                                );
                                return (
                                    <Img className={"w-8 relative"} type="spell" params={{ idSpell: nameSpell }} />
                                )
                            })
                            }
                        </div>
                        <div>
                            <p>{loadedAll || loadingMatchFull || !mySummoner.current ? "Cargando..." : mySummoner.current?.win ? "Victoria" : "Derrota"}</p>
                            <p>
                                {!mySummoner.current
                                    ? "Cargando..."
                                    : `${mySummoner.current.kills}/${mySummoner.current.assists}/${mySummoner.current.deaths}`}
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-1">
                        {[0, 1, 2, 3, 4, 5, 6].map((e, _) => {
                            if (loadedAll || loadingMatchFull || !mySummoner.current) return (<div className="size-8 rounded-full bg-[#333F50]" />)
                            const item = 'item' + e;
                            const idItem = mySummoner.current[item];
                            if (idItem === 0) {
                                return (
                                    <div key={e} className="size-8 bg-gray-500 rounded-sm" />
                                );
                            }
                            return (
                                <Img key={e} type={"item"} params={{ idItem: idItem }} className={"w-8 relative"} />
                            );
                        })}
                    </div>
                </div>
                <div className="flex space-x-2 overflow-hidden">
                    <div className="grid gap-y-0.5" onClick={handleParticipantClick}>
                        {loadedAll || loadingMatchFull ? (
                            <div>Cargando...</div>
                        ) : (
                            teamBlue &&
                            teamBlue.map((participant, i) => {
                                if (summonerData.current.gameName === participant.riotIdGameName)
                                    mySummoner.current = participant;

                                return (
                                    <div key={i} className="flex w-44">
                                        <Img
                                            className={"size-6 relative flex-shrink-0"}
                                            imgClassName={"rounded-full"}
                                            type="champion"
                                            params={{ champ: participant.championName }}
                                        />
                                        <div
                                            className="truncate hover:underline underline-offset-1 cursor-pointer"
                                            data-game-name={participant.riotIdGameName}
                                            data-tagline={participant.riotIdTagline}
                                        >
                                            {participant.riotIdGameName}#{participant.riotIdTagline}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                    <div className="grid gap-y-0.5" onClick={handleParticipantClick}>
                        {loadedAll || loadingMatchFull ? (
                            <div>Cargando...</div>
                        ) : (
                            teamRed &&
                            teamRed.map((participant, i) => {
                                if (summonerData.current.gameName === participant.riotIdGameName)
                                    mySummoner.current = participant;

                                return (
                                    <div key={i} className="flex w-44">
                                        <Img
                                            className={"size-6 relative flex-shrink-0"}
                                            imgClassName={"rounded-full"}
                                            type="champion"
                                            params={{ champ: participant.championName }}
                                        />
                                        <div
                                            className="truncate hover:underline underline-offset-1 cursor-pointer"
                                            data-game-name={participant.riotIdGameName}
                                            data-tagline={participant.riotIdTagline}
                                        >
                                            {participant.riotIdGameName}#{participant.riotIdTagline}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                </div>
            </div>
        </div>
    )

}

export default MatchCard;