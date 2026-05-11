export const Countries = ({ countriesToShow, setFilterWord}) => {

    return (
        <>
            {
            countriesToShow.length > 10 
            ?
            <p>Too many matches, specify another filter</p>
            :
            countriesToShow.map((country, i) => (
                <p key={i}>
                {country.name.common} <button onClick={() => setFilterWord(country.name.common)}> show </button>
                </p>
            ))
            }
        </>
    )
}