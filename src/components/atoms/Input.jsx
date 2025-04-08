import { useState, useRef } from "react";
import Icon from "./Icon";

function Input({ name,containerClass, placeholder,inputClass,icon,iconClass }) {
    const inputRef = useRef(null);
    const placeHolderStyle = useRef({
        top: "50%",
        transform: 'translateY(-50%)',
        left: icon ? "3rem":"1rem",
        fontSize: "1.2rem",
        color:"gray",
    })
    const [selectInput,setSelectInput] = useState(false);


    const handleOnFocus = () => {
        placeHolderStyle.current= {
            left: icon ? "3rem":"1rem",
            top: "0%",
            transform: 'translateY(0%)',
            fontSize: ".7rem",
            color:"#2B2B2B",
            fontWeight:"bold"
        }
        setSelectInput(true);
    }

    const handleOnBlur = () => {
        if (inputRef.current && inputRef.current.value === "") {
            placeHolderStyle.current= {
                left: icon ? "3rem":"1rem",
                top: "50%",
                transform: 'translateY(-50%)',
                fontSize: "1.2rem",
                color:"gray",
            }
            setSelectInput(false);
        }
    }

    return (
        <div className={`relative ${containerClass}`} onClick={() => inputRef.current.focus()}>
            <input 
                name={name}
                id={name}
                ref={inputRef} 
                className={`${inputClass} h-full text-xl ${icon ? "pl-[3rem]" :"pl-[1rem]"} outline-0`}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
            />
            <p className='absolute transition-all select-text' style={placeHolderStyle.current}>
                {placeholder}
            </p>
            {icon && <Icon className={`${iconClass} absolute top-1/2 -translate-y-1/2 left-[1rem] transition-colors ${selectInput ? "invert-0" : "invert-50"}`} icon={icon}/>}
        </div>
    );
}

export default Input;
