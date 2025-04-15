import Input from "../../../atoms/input";
import SelectDropDown from "../../../atoms/SelectDropDows";
import Img from "../../../atoms/Img";
import regionOptions from "./constants";

function SearchBar({ dataAccount, summonerData, dataSummoner, executeGetAccountbyRiotId, loadingAccount, errorAccount }) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { region, name } = Object.fromEntries(new FormData(e.target));
            const [gameName, tagLine] = name.split("#");
            const pathParams = {
                'region': region,
                'gameName': gameName,
                'tagLine': tagLine,
            }
            console.log(pathParams)
            summonerData.current = {
                ...summonerData.current,
                ...pathParams,
            }
            await executeGetAccountbyRiotId(pathParams);
            if (errorAccount || !dataAccount) throw new Error("Not exist")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {/* LOL LOGO */}
            <div className={`absolute transition-all duration-300  ${dataSummoner ? "w-12 top-12 left-10" : "w-28 top-1/10 left-1/10"}`}>
                <Img type="icon" params={{icon:"logo-LOL"}}/>
            </div>
            {/* Summoner Search Bar */}
            <div className={`absolute w-3/4 left-1/2 -translate-x-1/2 transition-all duration-300 ${dataSummoner ? "top-12" : "top-1/2 -translate-y-1/2"}`}>
                {!dataSummoner && <p className=' text-6xl mb-4 italic text-white'>Summoner Search</p>}
                <form onSubmit={handleSubmit} className='relative flex bg-[#D9D9D9] rounded-lg h-14'>
                    <SelectDropDown options={regionOptions} name={"region"} containerClass={"w-1/4 h-full rounded-l-lg"} placeholder={"Region"} icon={"hashtag"} iconClass={"w-6"} inputClass={"w-full"} />
                    <Input name={"name"} containerClass={"w-3/4 h-full rounded-r-lg"} placeholder={"Summoner name + #TAG"} inputClass={"w-7/8 border-l-2"} />
                    <button type="submit" className="absolute right-[1rem] top-1/2 -translate-y-1/2">
                        {loadingAccount
                            ?
                            <div className="flex items-center justify-center">
                                <div className="size-6 border-4 border-black border-t-transparent rounded-full animate-spin" />
                            </div>
                            :
                            <Img params={{ icon: "search" }} />}
                    </button>
                    {errorAccount && <p className="absolute -bottom-1/2 left-[1rem] text-white">Summoner not found</p>}
                </form>
            </div>
        </>
    )
}

export default SearchBar;