import Input from "../../../../atoms/input";
import SelectDropDown from "../../../../atoms/SelectDropDows";
import Img from "../../../../atoms/Img";
import regionOptions from "./constants";

function SearchBar({ 
    section,
    handleGetAccount, 
    loadingSummoner, 
    dataAccount, 
    loadingAccount, 
    errorAccount,
    errorSummoner
}) {

    const handleSectionSearchBar = (section) => {
        if(!dataAccount)return 'top-1/2 -translate-y-1/2';
        switch (section) {
            case 1:
                return 'top-1/2 -translate-y-1/2';
            case 2:
                return 'top-1/10 -translate-y-1/2';
            case 3:
                return '-top-1/2';
            default:
                return 'hidden -top-1/2';
        }
    };

    const handleSectionLogo = (section) => {
        if(!dataAccount)return 'w-28 top-1/10 left-1/10';
        switch (section) {
            case 1:
                return 'w-28 top-1/10 left-1/10';
            case 2:
                return 'w-12 top-1/10 -translate-y-1/2 left-10 hidden sm:block';
            case 3:
                return 'w-12 -top-1/2 left-10';
            default:
                return 'hidden';
        }
    };
    

    const handleSubmit =  (e) => {
        e.preventDefault();
        const { region, name } = Object.fromEntries(new FormData(e.target));
        const [gameName, tagLine] = name.split("#");
        handleGetAccount(gameName,tagLine,region);
    }

    return (
        <>
            {/* LOL LOGO */}
            <div className={`absolute transition-all duration-300  
                ${handleSectionLogo(section)}`}>
                <Img type="icon" params={{ icon: "logo-LOL" }} />
            </div>
            {/* Summoner Search Bar */}
            <div className={`absolute w-3/4 left-1/2 -translate-x-1/2 transition-all duration-300 shadow-2xl ${handleSectionSearchBar(section)}`}>
                <p className={`text-4xl sm:text-6xl mb-6 italic text-white ${(!dataAccount || section === 1) ? "block" :"hidden"}`}>Summoner Search</p>
                <form onSubmit={handleSubmit} className='relative flex bg-[#D9D9D9] rounded-lg h-14'>
                    <SelectDropDown options={regionOptions} name={"region"} containerClass={"w-1/4 h-full rounded-l-lg"} placeholder={"Region"} icon={"hashtag"} iconClass={"w-6"} inputClass={"w-full"} />
                    <Input type={"text"} name={"name"} containerClass={"w-3/4 rounded-r-lg"} placeholder={"Summoner name + #TAG"} inputClass={"w-7/8 border-l-2"} />
                    <button type="submit" className="absolute right-[1rem] top-1/2 -translate-y-1/2"
                        disabled={loadingAccount}>
                        {loadingAccount || loadingSummoner
                            ?
                            <div className="flex items-center justify-center">
                                <div className="size-6 border-4 border-black border-t-transparent rounded-full animate-spin" />
                            </div>
                            :
                            <Img params={{ icon: "search" }} />}
                    </button>
                    {(errorAccount || errorSummoner) && <p className="absolute -bottom-1/2 left-[1rem] text-white">Summoner not found</p>}
                </form>
            </div>
        </>
    )
}

export default SearchBar;