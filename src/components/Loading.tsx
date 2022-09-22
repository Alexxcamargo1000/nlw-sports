import { Spinner } from "phosphor-react";

interface LoadingProps {
  size: number;
}

export function Loading({size}: LoadingProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin text-white w-fit">
      <Spinner size={size} weight="bold"/>
      </div>
    </div>
  )
}