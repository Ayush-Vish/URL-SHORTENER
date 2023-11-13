function makeHttp ( longUrl  )  {
    if(!String(longUrl).includes("https")) { 
        longUrl = `https://` + longUrl;
    }
    return longUrl;



}

export default  makeHttp;