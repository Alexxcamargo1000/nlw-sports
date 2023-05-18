import {CheckCircle, GameController, X} from "phosphor-react"
import { AdsProps } from "../pages/Game";
import * as Dialog from "@radix-ui/react-dialog";
import { Loading } from "./Loading";
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useState } from "react";

interface AdsCardProps  {
  info: AdsProps,
  ConnectToDiscord?: () => void;
  discord: string;
}

export function AdsCard({ info, ConnectToDiscord, discord }: AdsCardProps ) {

  const [copied, setCopied] = useState(false);

  function handleCopyDiscordToClipboard() {
    setCopied(true)
    //alert(`o discord do ${discord} foi copiado`)
    setTimeout(() => {
      setCopied(false)
    }, 2000);
  }

  
  return (
    <div className=" p-7 bg-[#2A2634]  rounded-lg text-white flex flex-col min-w-[300px]">
      <div className="flex flex-col">
        <span className="text-zinc-400">Nome</span>
        <strong>{info.name}</strong>
      </div>
      <div className="flex flex-col mt-4">
        <span className="text-zinc-400" >Tempo de jogo</span>
        <strong>{info.yearsPlaying} anos</strong>
      </div>
      <div className="flex flex-col mt-4">
        <span className="text-zinc-400" >Disponibilidade</span>
        <strong>{info.weekDays.length} dias <span className="text-zinc-400">&bull;</span> {info.hourStart.split(':')[0]}h - {info.hourEnd.split(':')[0]}h</strong>
      </div>
      <div className="flex flex-col mt-4">
        <span className="text-zinc-400" >Chamada de áudio?</span>

        {info.useVoiceChannel 
        ? <strong className="text-green-500">Sim</strong>
        : <strong className="text-red-500">Não</strong>}
      </div>
      <Dialog.Root>
        <Dialog.Trigger onClick={ConnectToDiscord} className="flex items-center justify-center gap-2 w-full py-3 rounded-lg mt-4 bg-violet-500 font-semibold transition-colors hover:bg-violet-600">
          <GameController size={24}/> Conectar
        </Dialog.Trigger>


        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="flex justify-center items-center flex-col fixed rounded-lg w-[300px] md:w-[480px] bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-black/25">
            <Dialog.Close className="flex justify-end w-full mb-5">
              <X size={24} />
            </Dialog.Close>
            <CheckCircle size={64} weight="bold" className="text-green-500 mb-5"/>
      
            <Dialog.Title className="text-3xl font-bold mb-10">Let’s play!</Dialog.Title>

            <CopyToClipboard text={discord} onCopy={handleCopyDiscordToClipboard}>
              <button className="flex items-center justify-center w-full h-14 rounded-lg bg-zinc-900">
                {discord ? discord : <Loading size={24}/>}
              </button>
            </CopyToClipboard>
            <span className={copied ? `transition-600 opacity-1` : 'transition-600 opacity-0' }>Copiado</span>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
