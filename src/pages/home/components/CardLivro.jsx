import { useState } from 'react'
import CardDetalhes from './CardDetalhes'
import { Estoque, Informacao, Sinopse, Titulo } from './InfoLivro'
import CardEditar from './CardEditar'

export default function CardLivro({ livro }) {
   const {
      id,
      titulo,
      autor,
      preco,
      isbn,
      estoque,
      sinopse,
      genero,
      lancamento,
   } = livro

   const [openDetalhes, setOpenDetalhes] = useState(false)
   const [openEditar, setOpenEditar] = useState(false)

   const openCardDetalhes = () => {
      setOpenDetalhes((prev) => !prev)
   }

   const openCardEditar = () => {
      setOpenEditar((prev) => !prev)
   }

   return (
      <>
         <div className='bg-verde-800 rounded-xl p-3 flex flex-col gap-4 border border-verde-300 shadow-lg snap-center'>
            <div className='flex items-start justify-between gap-2'>
               <Titulo titulo={titulo} />

               <Estoque estoque={estoque} />
            </div>

            <div className='grid grid-cols-2 gap-2'>
               <Informacao tema='autor' texto={autor} />
               <Informacao tema='gênero' texto={genero} />
               <Informacao tema='preço' texto={`R$ ${preco}`} />
               <Informacao tema='isbn' texto={`${isbn}`} />
               <Informacao
                  tema='lançamento'
                  texto={new Date(lancamento).toLocaleDateString()}
                  className='col-span-2'
               />
            </div>

            <Sinopse texto={sinopse} />

            <div className='flex flex-col gap-2'>
               <div className='grid grid-cols-2 gap-2'>
                  <Botao texto='detalhes' onClick={openCardDetalhes} />
                  <Botao
                     texto='editar'
                     tipo='editar'
                     onClick={openCardEditar}
                  />
               </div>

               <Botao texto='apagar' tipo='apagar' />
            </div>
         </div>
         {openDetalhes && <CardDetalhes id={id} onClick={openCardDetalhes} />}
         {openEditar && <CardEditar id={id} onClick={openCardEditar} />}
      </>
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
         className={`capitalize border rounded-lg text-white py-2 text-xs font-medium transition-colors cursor-pointer ${cores[tipo]}`}
      >
         {texto}
      </button>
   )
}
