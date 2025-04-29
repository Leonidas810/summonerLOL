import { useState, useRef } from "react";
import Img from "./Img";

function Input({
    name,
    placeholder,
    icon,
    type,
    containerClass,
    inputClass,
    iconClass,
    required = true
}) {
    const [selectedInput, setSelectedInput] = useState(false);
    const inputRef = useRef(null);

    const handleOnFocus = () => {
        setSelectedInput(true);
    }

    const handleOnBlur = () => {
        if (inputRef.current && inputRef.current.value === "") {
            setSelectedInput(false);
        }
    }

    return (
        <div className={`relative ${containerClass}`} onClick={() => inputRef.current.focus()}>
            {/* Ícono izquierdo opcional */}
            {icon && (
                <Img
                    type="icon"
                    params={{ icon }}
                    className={`${iconClass} absolute top-1/2 -translate-y-1/2 left-[1rem] transition-colors ${selectedInput ? "invert-0" : "invert-50"}`}
                />
            )}

            {/* Etiqueta flotante / placeholder */}
            {type === "text" &&
                <p
                    className={`absolute transition-all pointer-events-none select-none  ${icon ? "left-[3rem]" : "left-[1rem]"}  ${selectedInput ? `text-xs -top-1/2 translate-y-1/2 text-white font-bold` : `text-[1.2rem] top-1/2 -translate-y-1/2 text-[#616161]`
                        }`}
                >
                    {placeholder}
                </p>
            }

            {/* Campo de Input */}
            <input
                type={type}
                required={required}
                name={name}
                id={name}
                ref={inputRef}
                className={`${inputClass} h-full text-xl ${icon ? "px-[3rem]" : "px-[1rem]"} outline-0 `}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
            />


        </div>
    );
}

export default Input;
