function Icon ({
    riotIcon=false,
    icon,
    className
}){
    return(
        <div className={`${className}`}>
            <img src={`${riotIcon ? `https://ddragon.leagueoflegends.com/cdn/15.7.1/img/profileicon/${icon}.png` : `assets/icons/${icon}.webp`} `} alt={`${icon} icon`}/>
        </div>
    )

}

export default Icon;