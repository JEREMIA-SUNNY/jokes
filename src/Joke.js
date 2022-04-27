import React, { useEffect, useState } from "react";
import { BiLaugh } from "react-icons/bi";
import ReactAudioPlayer from "react-audio-player";
const Joke = () => {
  const [arr, setArr] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [jokes, setJoke] = useState("");
  const [jokes2, setJoke2] = useState("");
  const [aud, setAud] = useState("");
  useEffect(() => {
    const url = "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&amount=10";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const {jokes} = await response.json();
          setArr(jokes);
         setJoke(jokes[0].jokes);
      
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  function clicked() {
    let randoms = Math.floor(Math.random() * arr.length);
    console.log(arr);
    setJoke(arr[randoms]?.joke);
  }
  /////callling api of sound
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://api.voicerss.org/?key=07b98d289c0e4464ba4ae39062f4cb6e&hl=en-us&c=MP3&f=16khz_16bit_stereo&src=${jokes}${jokes2}`
        ).then((data) => {
          setAud(data.url);
        });
      } catch (error) {
        console.log("error", error);
      }
    };
    if (jokes) fetchData();
  }, [jokes]);

  //////////////////////////////////////////////////////
  useEffect(() => {
    console.log(arr);
  }, [arr]);

  return (
    <div className="mainbox">
      <div>Have some jokes</div>
      <button className="btn-joke" onClick={clicked}>
        Getjokes
        <BiLaugh className="laugh" />
      </button>
      <div className="joketext">
        <h4>{jokes}</h4>
        <h3>{jokes2}</h3>
        <ReactAudioPlayer src={aud} autoPlay controls q/>
      </div>
    </div>
  );
};

export default Joke;
