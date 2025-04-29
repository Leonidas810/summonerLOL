import SelectDropDown from "../../../../atoms/SelectDropDows"
import Input from "../../../../atoms/input"

const SummonerFilter = ({handleFilterMathes}) => {

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
        <div className="shadow-2xl rounded-2xl bg-[#D9D9D9] h-14">
            <form onSubmit={handleSubmit} className="relative flex h-full">
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