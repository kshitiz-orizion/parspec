
export const inclusion = (data,query) =>{
    if(Array.isArray(data)){
        const index = data.indexOf(query)
        if(index !== -1 ) return true
    }
    return data.includes(query) ? true : false
}
