const Card = ({item, index, focusItem, mouseHover, query}) =>{
    const replaceString=(item) =>{
        const newStr = item.replace(query,`<span>${query}</span>`)
        return newStr
    }

    return (
        <div id={`element${index}`} className={`dataContainer ${focusItem === index ? 'focusItem' : ''}`} key={item.id} onMouseOver={(e)=>mouseHover(e,index)}>
        <p dangerouslySetInnerHTML={{__html: replaceString(item.id)}}/>   
        <p dangerouslySetInnerHTML={{__html: replaceString(item.name)}}/>
        <p dangerouslySetInnerHTML={{__html: replaceString(item.address)}}/>
        <p dangerouslySetInnerHTML={{__html: replaceString(item.pincode)}}/>
        <p>{item?.items.indexOf(query) !==-1 && `items found in ${item.items[item?.items.indexOf(query)]}`}</p>
      </div>
    )
}

export default Card