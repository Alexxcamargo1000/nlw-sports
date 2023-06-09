import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog"

export function CreateAdBanner() {
  return (
    <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">
        <div className="bg-[#2A2634] py-6 px-8 flex flex-col gap-10 sm:flex-row justify-between items-center">
          <div>
            <strong className="text-2xl text-white font-black block">Não encontrou seu duo?</strong>
            <span className="text-zinc-400">Publique um anúncio para encontrar novos players!</span>
          </div>

          <Dialog.Trigger className="flex w-full justify-center sm:w-fit items-center gap-3 py-3 px-4 bg-violet-500 text-white hover:bg-violet-600 transition-all rounded-lg font-medium">
            <MagnifyingGlassPlus size={24}/>
            Publicar anúncio
          </Dialog.Trigger>
        </div>
    </div>
  )
}