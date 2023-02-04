const SearchBar = ({filterData}) =>{
    return(
        <input className="input" onChange={(e)=>filterData(e.target.value)}/>
    )
}

export default SearchBar