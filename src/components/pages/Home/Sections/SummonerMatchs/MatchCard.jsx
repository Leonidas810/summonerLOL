import { useEffect, useRef } from "react";
import useFetch from "../../../../../hooks/useFetch/useFetch";
import Img from "../../../../atoms/Img";

function MatchCard({ summonerData, match, dataSpells }) {

    const { data: dataMatchFull, loading: loadingMatchFull, error: errorMatchFull, execute: executeMatchFull } = useFetch("get", "getFullDataofMatch", false);
    const mySummoner = useRef(null)

    useEffect(() => {
        const pathParams = {
            'matchId': match,
        }
        executeMatchFull(pathParams)
    }, [match])

    const handleGetTimeMatch = () => {

    }

    const participants = dataMatchFull?.info?.participants || null;
    const teamBlue = participants && participants.slice(0, 5) || null;
    const teamRed = participants && participants.slice(5) || null;

    return (
        loadingMatchFull || !dataMatchFull
            ? <div>Cargando...</div>
            :
            <div className={`shadow-2xl rounded-2xl ${mySummoner.current?.win ? "bg-blue-900" : "bg-red-900"} overflow-hidden`}>
                <div className="flex justify-between p-2">
                    <div className="space-y-2">
                        {!mySummoner.current ?
                            <div>cargando</div> :
                            <>
                                <div className="flex space-x-1">
                                    <Img className={"w-20 relative"} imgClassName={"rounded-full"} type="champion" params={{ champ: mySummoner.current.championName }} />
                                    <div>
                                        {[1, 2].map((e, i) => {
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
                                        <p>{mySummoner.current?.win ? "Victoria" : "Derrota"}</p>
                                        <p>{mySummoner.current.kills}/{mySummoner.current.assists}/{mySummoner.current.deaths}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-1">
                                    {[0, 1, 2, 3, 4, 5, 6].map((e, i) => {
                                        const item = 'item' + e;
                                        const idItem = mySummoner.current[item];
                                        if (idItem === 0) {
                                            return (
                                                <div key={i} className="size-8 bg-red-500 rounded-sm" />
                                            );
                                        }
                                        return (
                                            <Img key={i} type={"item"} params={{ idItem: idItem }} className={"w-8 relative"} />
                                        );
                                    })}
                                </div>
                            </>
                        }

                    </div>
                    <div className="flex">
                        <div className="grid">
                            {teamBlue && teamBlue.map((participant, i) => {
                                if (summonerData.current.gameName === participant.riotIdGameName) mySummoner.current = participant;
                                return (
                                    <div key={i} className="flex w-48 overflow-hidden text-wrap">
                                        <Img className={"w-8 relative"} imgClassName={"rounded-full"} type="champion" params={{ champ: participant.championName }} />
                                        <p>{participant.riotIdGameName}#{participant.riotIdTagline}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="grid">
                            {teamRed && teamRed.map((participant, i) => {
                                if (summonerData.current.gameName === participant.riotIdGameName) mySummoner.current = participant;
                                return (
                                    <div key={i} className="flex w-48 overflow-hidden text-wrap">
                                        <Img className={"w-8 relative"} imgClassName={"rounded-full"} type="champion" params={{ champ: participant.championName }} />
                                        <p>{participant.riotIdGameName}#{participant.riotIdTagline}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
    )

}

export default MatchCard;