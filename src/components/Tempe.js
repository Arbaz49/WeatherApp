import React, { useEffect, useState } from 'react';
import Weathercard from './weathercard';
import "./style.css";

const Tempe = () => {
  const [searchvalue,setsearchvalue]=useState("Mumbai");

  const[tempinfo,settempinfo]=useState({});

  const getWeatherinfo = async () =>{
      try{
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchvalue}&units=metric&appid=05ad5c3184f040b7da917d4872b62722`;

            const res= await fetch(url);
            const data= await res.json();

          
            const {temp,humidity,pressure}= data.main;
            const {main:weathermood}=data.weather[0];
            const {name}=data;
            const {speed}=data.wind;
            const {country,sunset}=data.sys;

            const myewweatherinfo={
              temp,
              humidity,
              pressure,
              weathermood,
              name,
              speed,
              country,
              sunset,

            };
            settempinfo(myewweatherinfo);
      }

      catch(error){
        console.log(error);

      }
  };

  useEffect(()=>{
    getWeatherinfo();
  }, );

  return (
    <>
      
      <div className="wrap">
        <div className="search">
          <input type="search" placeholder='search' autoFocus id='search' className='searchterm' 
          value={ searchvalue}
           onChange={(e)=>setsearchvalue(e.target.value)}
           />
          <button className='searchButton' onClick={getWeatherinfo}>Search</button>
        </div>
      </div>

      <Weathercard tempinfo={tempinfo}/>
    
      
    </>
  )
}

export default Tempe
