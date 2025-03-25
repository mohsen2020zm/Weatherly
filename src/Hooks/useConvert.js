const useConvert = (temp, tempType) => {
    let result = 0

    if(tempType == 'c') result = Math.floor(temp - 273.15)
    else result = Math.floor((temp - 273.15) * 9.5 + 32)
    
    return result
}

export default useConvert