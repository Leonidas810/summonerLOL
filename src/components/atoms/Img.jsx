import apiImg from './apiImg';

function Img({
    type = 'icon',
    params,
    className,
    imgClassName,
    children
}) {

    let finalSrc = '';
    const baseUrl = 'https://ddragon.leagueoflegends.com';
    let url = apiImg[type]?.url || `assets/icons/:icon.webp`;
    params && Object.keys(params).forEach((key) => {
        const placeholder = `:${key}`
        if (url.includes(placeholder)) {
            url = url.replace(placeholder, params[key]);
        }
    })
    finalSrc = `${type === 'icon' ? '':baseUrl}${url}`;
    console.log(finalSrc);

    return (
        <div className={`${className}`}>
            <img className={`${imgClassName}`} src={`${finalSrc}`} alt={`icon`} />
            {children}
        </div>
    )

}

export default Img;