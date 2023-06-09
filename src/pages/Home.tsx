import * as Dialog from "@radix-ui/react-dialog"
import { useState, useEffect } from "react"

import logoImage from "../assets/logo.svg"
import { GameBanner } from "../components/GameBanner"
import { CreateAdBanner } from "../components/CreateAdBanner"
import { CreateAdModal } from "../components/CreateAdModal"
import axios from "axios"

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

export function Home(){


  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {

    axios("http://localhost:3333/games")
      .then( response => setGames(response.data))

  }, [])

  return (
    <div 
    className="max-w-[1344px] px-4 mx-auto flex flex-col items-center my-20" 
    >
      <img src={logoImage} alt="" />
      <h1 className="text-4xl md:text-6xl text-white font-black mt-20">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-1 gap-6 mt-16 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 ">
      
        { games && games.map((game) => {
          return (
            <GameBanner
            key={String(game.id)}
            id={String(game.id)}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
          />
          )
        })}



      </div>
      
      <Dialog.Root>
        <CreateAdBanner/>
        <CreateAdModal/>
 
      </Dialog.Root>
    </div>
  )
}