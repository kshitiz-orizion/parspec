import { useEffect, useState, useRef } from 'react';
import './App.css';
import Card from './Components/Card';
import SearchBar from './Components/SearchBar';
import useApi from './CustomHooks/api';
import { inclusion } from './utils/inclusion';
function App() {
  const [loading,data] = useApi('http://www.mocky.io/v2/5ba8efb23100007200c2750c')
  const [queryData, setQueryData] = useState([])
  const [query, setQuery] = useState('')
  const [focusItem, _setFocusItem] = useState(null)
  const focusItemRef = useRef(focusItem);
  const queryDataRef = useRef(0)
  const setFocusItem = (id) =>{
    _setFocusItem(id)
    focusItemRef.current=id
  }

  const listener =(event)=>{
    if(event.keyCode === 38){
      if(focusItemRef.current > 0){
        setFocusItem(focusItemRef.current - 1)
      }
      const element = document.getElementById(`element${focusItemRef.current}`);
      element.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    }
    if(event.keyCode === 40 ){
      if(focusItemRef.current < queryDataRef.current - 1){
        if(focusItemRef?.current === null){
          setFocusItem(0)
        }
        else{
          setFocusItem(focusItemRef?.current +1)
        }
        const element = document.getElementById(`element${focusItemRef.current}`);
        element.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
      }
    }
  }
  useEffect(()=>{
    window.addEventListener('keydown',listener,false);
    return () => {
      window.removeEventListener('keydown', listener, false)
    };
  },[])

  if(loading){
    return <div className='loader'>Loading....</div>
  }
  const filterData = (query) => {
    setQuery(query)
    setFocusItem(null)
    const newQueryData = []
    for(let i =0;i<data.length ;i++){
      const eachObj =  data[i]
      if(inclusion(eachObj.address,query)
      || inclusion(eachObj.id, query)
      || inclusion(eachObj.name, query)
      || inclusion(eachObj.pincode, query)
      || inclusion(eachObj.items, query)
      ) {
        newQueryData.push(eachObj)
      }
    }
    setQueryData([...newQueryData])
    queryDataRef.current = newQueryData.length
    
  }
  const mouseHover = (e,id) => {
    setFocusItem(id)
  }
  return (
    <div className='searchBar'>
    <SearchBar filterData={filterData}/>
    <div className='queryResults' >
    {queryData.length === 0 && query &&
      <div className='dataContainer emptyResult'>
        No User Found
      </div>
    }
    {queryData.length > 0 && query && queryData.map((item,index)=>(
      <Card
        item={item}
        index={index}
        focusItem={focusItem}
        mouseHover={mouseHover}
        query={query}
        />
    ))}
    </div>
    </div>
  );
}

export default App;
