import SelectDropDown from "../../../../atoms/SelectDropDows"
import Input from "../../../../atoms/input"

const SummonerFilter = ({section}) => {

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


    return (
        <div className="absolute left-1/2 -translate-x-1/2 w-3/4 transition-all duration-300" style={handleSectionMoveStyle(section)}>
            <form className="relative flex bg-[#D9D9D9] rounded-lg h-14">
                <SelectDropDown
                    containerClass={"w-2/4"}
                    type={"date"}
                    name={"Queue"}
                    placeholder={"Introduce la Cola"} />
                <Input
                    containerClass={"w-1/4"}
                    type={"date"}
                    name={"startTime"}
                    placeholder={"Feche de inicio"}
                    inputClass={"border-l-2"} />
                <Input
                    containerClass={"w-1/4"}
                    type={"date"}
                    name={"endTime"}
                    placeholder={"Feche de fin"}
                    inputClass={"border-l-2"} />
            </form>
        </div>
    )
}

export default SummonerFilter