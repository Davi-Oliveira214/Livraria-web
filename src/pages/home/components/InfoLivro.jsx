export function Titulo({ titulo }) {
   return <p className='text-xl text-white font-semibold'>{titulo}</p>
}

export function Informacao({ tema, texto, className = '' }) {
   return (
      <p
         className={`bg-[#2D4A35] text-white text-xs px-2.5 py-2 rounded-lg border border-verde-300 ${className}`}
      >
         <Tema tema={tema} /> {texto}
      </p>
   )
}

export function Tema({ tema }) {
   return <span className='capitalize text-[#A3B18A] font-medium'>{tema}:</span>
}

export function Sinopse({ texto }) {
   return (
      <div className='flex flex-col gap-2'>
         <p className='text-xs text-[#A3B18A] font-medium'>Sinopse</p>

         <p className='w-full h-25 bg-[#2D4A35] border border-verde-300 rounded-lg p-3 text-xs text-[#F1F5E9] overflow-y-auto'>
            {texto}
         </p>
      </div>
   )
}

export function Estoque({ estoque }) {
   return (
      <span className='shrink-0 text-[10px] text-[#F1F5E9] bg-[#2D4A35] px-2 py-1 rounded-md border border-verde-300/50'>
         Estoque: {estoque}
      </span>
   )
}
