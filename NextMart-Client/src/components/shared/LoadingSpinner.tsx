import { ScaleLoader } from 'react-spinners'

import { Loader2 } from "lucide-react"

const LoadingSpinner = ({ smallHeight }: { smallHeight: boolean }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <ScaleLoader height={35} width={4} color='red' />
      {/* <Loader2 className="w-10 h-10 animate-spin" /> */}
    </div>
  )
}

export default LoadingSpinner
