import apiImg from './apiImg';

function Img({
    type = 'icon',
    params,
    className,
    imgClassName,
    children,
    onClick=undefined,
}) {

    let finalSrc = '';
    const baseUrl = 'https://ddragon.leagueoflegends.com';
    let url = apiImg[type]?.url || null;
    if(!url) return
    params && Object.keys(params).forEach((key) => {
        const placeholder = `:${key}`
        if (url.includes(placeholder)) {
            url = url.replace(placeholder, params[key]);
        }
    })

    finalSrc = `${!url.includes("assets") ? `${baseUrl}${url}` : `${url}`}`;

    return (
        <div className={`${className || ""}`}
        onClick={onClick ?? (() => {})}
        >
            <img className={`${imgClassName || ""}`} src={`${finalSrc}`} alt={`icon`} />
            {children}
        </div>
    )

}

export default Img;