import SelectDropDown from "../../../../atoms/SelectDropDows"
import Input from "../../../../atoms/input"

const SummonerFilter = ({section,handleFilterMathes}) => {

    const handleSectionMoveStyle = (section)=>{
        switch (section) {
            case 1:
            case 2:
                return {visibility:'hidden',top:'100%'};
            case 3:
                return {top:'45%'};
            case 4:
                return {top:'0%'}
            default:
                return {top:`${0 - ((section-4) * 22)}%`}
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const filters = Object.fromEntries(formData.entries());
        const params = {
            queryParams: filters
        };
        handleFilterMathes(params);
    }

    const queueOption = [
        {label:'Rankeds',value:'ranked'},
        {label:'Normal',value:'normal'},
        {label:'Torneo',value:'tourney'},
        {label:'Tutorial',value:'tutorial'}
    ]

    return (
        <div className="z-20 absolute left-1/2 -translate-x-1/2 w-3/4 transition-all duration-300" style={handleSectionMoveStyle(section)}>
            <form onSubmit={handleSubmit} className="relative flex bg-[#D9D9D9] rounded-lg h-14">
                <SelectDropDown
                    required={false}
                    options={queueOption}
                    containerClass={"w-2/4"}
                    name={"type"}
                    placeholder={"Introduce la Cola"} />
                <Input
                    required={false}
                    containerClass={"w-1/4"}
                    type={"date"}
                    name={"startTime"}
                    placeholder={"Feche de inicio"}
                    inputClass={"border-l-2"} />
                <Input
                    required={false}
                    containerClass={"w-1/4"}
                    type={"date"}
                    name={"endTime"}
                    placeholder={"Feche de fin"}
                    inputClass={"border-l-2"} />
                    <button type="submit">
                        <div className="p-2 mr-2 rounded-lg text-lg text-white bg-black">Filtrar</div>
                    </button>
            </form>
        </div>
    )
}

export default SummonerFilter