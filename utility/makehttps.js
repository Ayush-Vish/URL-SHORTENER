function makeHttp ( longUrl  )  {
    console.log("dnsfbs");
    if(!String(longUrl).includes("https")) { 
        longUrl = `https://` + longUrl;
    }
    return longUrl;



}

export default  makeHttp;