export default function CardLivro() {
   return (
      <div className='bg-verde-800 max-w-90 rounded-xl p-4 flex flex-col gap-4 border border-verde-300 shadow-lg'>
         <div className='flex items-start justify-between gap-2'>
            <Titulo titulo='Teste' />

            <span className='shrink-0 text-xs text-[#F1F5E9] bg-[#2D4A35] px-2 py-1 rounded-md border border-verde-300/50'>
               Estoque: 50
            </span>
         </div>

         <div className='grid grid-cols-2 gap-2'>
            <Informacao tema='autor' texto='Teste' />
            <Informacao tema='gênero' texto='Teste' />
            <Informacao tema='preço' texto='R$ 49,90' />
            <Informacao tema='lançamento' texto='2026' />
         </div>

         <Sinopse />

         <div className='flex flex-col gap-2'>
            <div className='grid grid-cols-2 gap-2'>
               <Botao texto='detalhes' />
               <Botao texto='editar' tipo='editar' />
            </div>

            <Botao texto='apagar' tipo='apagar' />
         </div>
      </div>
   )
}

function Botao({ texto, onClick, tipo = 'detalhes' }) {
   const cores = {
      detalhes: 'bg-verde-300/40 hover:bg-verde-300/70',
      editar: 'bg-verde-300/40 hover:bg-verde-300/70',
      apagar: 'bg-red-950/50 hover:bg-red-900/70 border-red-800/60',
   }

   return (
      <button
         onClick={onClick}
         className={`capitalize border rounded-lg text-white py-2 text-sm font-medium transition-colors cursor-pointer ${cores[tipo]}`}
      >
         {texto}
      </button>
   )
}

function Titulo({ titulo }) {
   return <p className='text-2xl text-white font-semibold'>{titulo}</p>
}

function Informacao({ tema, texto }) {
   return (
      <p className='bg-[#2D4A35] text-white text-sm px-3 py-2.5 rounded-lg border border-verde-300'>
         <Tema tema={tema} /> {texto}
      </p>
   )
}

function Tema({ tema }) {
   return <span className='capitalize text-[#A3B18A] font-medium'>{tema}:</span>
}

function Sinopse() {
   return (
      <div className='flex flex-col gap-2'>
         <p className='text-sm text-[#A3B18A] font-medium'>Sinopse</p>

         <p className='w-full h-30 bg-[#2D4A35] border border-verde-300 rounded-lg p-3 text-sm text-[#F1F5E9] overflow-y-auto'>
            Uma breve descrição sobre o livro, apresentando sua história e os
            principais acontecimentos.
         </p>
      </div>
   )
}
