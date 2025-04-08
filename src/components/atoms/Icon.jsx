function Icon ({
    icon,
    className
}){
    return(
        <div className={`${className}`}>
            <img src={`assets/icons/${icon}.webp`} alt={`${icon} icon`}/>
        </div>
    )

}

export default Icon;