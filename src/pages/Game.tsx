import axios from "axios";
import { ArrowLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdsCard } from "../components/AdsCard";
import { Loading } from "../components/Loading";


export interface AdsProps {
  hourEnd: string;
  hourStart: string;
  id: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface GameProps {
  bannerUrl: string;
  title: string;
}


export function Game() {
  const { id } = useParams();
  const [ads, setAds] = useState<AdsProps[]>([]);
  const [game, setGame] = useState<GameProps>({ bannerUrl: '', title: ''});
  const [discord, setDiscord] = useState('')
  const navigate = useNavigate()

  function navigationToBack() {
    navigate(-1)
  }

  
  async function handleConnectDiscord(id: string){
    await axios(`http://localhost:3333/ads/${id}/discord`)
      .then(response => setDiscord(response.data.discord))

    console.log(discord)
  }


  useEffect(() => {

   async function getGameAndAds() {

     await axios(`http://localhost:3333/games/${id}/ads`)
      .then(response => setAds(response.data))
  
     await axios(`http://localhost:3333/games/${id}`)
      .then(response => setGame(response.data))

    } 

    getGameAndAds();
    

  }, [])

  return (
    <div className=" p-4 max-w-[1344px] mx-auto flex flex-col my-20">
      <div className="mb-10 text-white">
        <button onClick={navigationToBack} className="flex items-center justify-center gap-4">
          <ArrowLeft size={24}/>
          Voltar
        </button>
      </div>
      <div className="w-full flex flex-col gap-6 lg:flex-row items-center">
        <div className="h-80 w-full md:w-[80%] lg:w-80">
          {game.bannerUrl 
          ? <img 
              src={game.bannerUrl}  
              className="rounded-md lg:rounded-[50%] w-full h-80 object-cover"
            /> 
          : <Loading size={64}/> }
        </div>
        
        <h1 className="text-6xl ml-8 text-zinc-100 font-black">{game.title}</h1>
      </div>

      <div className="mt-20">
        <h2 className="text-4xl text-zinc-100 font-semibold text-center md:text-left" >Conecte-se e comece a jogar!</h2>
        
        <div className="mt-8 flex gap-4 flex-wrap justify-center md:justify-start ">
          {ads.length > 0 
          ? ads.map(ad => <AdsCard key={ad.id} info={ad} discord={discord} ConnectToDiscord={() => handleConnectDiscord( ad.id)}/> )
          : (
            <div className="mt-10">
              <strong className="text-zinc-300 text-xl">Sem anúncios no momento</strong>
              <button onClick={navigationToBack} className="text-white px-2 py-3 w-full rounded-lg mt-4 block bg-violet-500">Voltar</button>
            </div>
          )}
        </div>
      </div>
      
    </div>
  )
}