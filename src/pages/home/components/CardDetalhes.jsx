import { useEffect, useState } from 'react'
import { Estoque, Informacao, Sinopse, Titulo } from './InfoLivro'
import { api } from '../../../api/api'
import { IconInfoCircle } from '@tabler/icons-react'

export default function CardDetalhes({ id, onClick }) {
   const [livro, setLivro] = useState(null)
   const [mensagem, setMensagem] = useState('Carregando...')

   useEffect(() => {
      const buscar = async () => {
         setMensagem('Carregando...')
         try {
            const { data, status } = await api.get(`/${id}`)
            if (status === 200) setLivro(data)
            else setMensagem('Livro não encontrado.')
         } catch {
            setMensagem('Erro ao carregar os detalhes do livro.')
         }
      }
      buscar()
   }, [id])

   return (
      <div
         className='fixed z-100 inset-0 flex items-center justify-center bg-verde-800/50 backdrop-blur-xs px-4'
         onClick={onClick}
      >
         {livro ? (
            <div
               className='w-full max-w-sm bg-verde-800 border border-verde-300/20 rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.5)]'
               onClick={(e) => e.stopPropagation()}
            >
               {/* Header */}
               <div className='flex items-start justify-between gap-2 px-4 py-3.5 bg-preto/25 border-b border-branco/[.06]'>
                  <Titulo titulo={livro.titulo} />
                  <Estoque estoque={livro.estoque} />
               </div>

               <div className='flex flex-col gap-3 p-4'>
                  {/* Informações */}
                  <div className='grid grid-cols-2 gap-1.5'>
                     <Informacao tema='autor' texto={livro.autor} />
                     <Informacao tema='gênero' texto={livro.genero} />
                     <Informacao tema='preço' texto={`R$ ${livro.preco}`} />
                     <Informacao tema='isbn' texto={livro.isbn} />
                     <Informacao
                        tema='lançamento'
                        texto={new Date(livro.lancamento).toLocaleDateString()}
                        className='col-span-2'
                     />
                  </div>

                  <Sinopse texto={livro.sinopse} />

                  <div className='h-px bg-branco/[.06]' aria-hidden='true' />

                  <Botao texto='Fechar' onClick={onClick} />
               </div>
            </div>
         ) : (
            <div
               className='flex items-center gap-2.5 px-4 py-3 bg-verde-800 border border-verde-300/20 rounded-xl'
               onClick={(e) => e.stopPropagation()}
            >
               <IconInfoCircle stroke={2} size={25} color='#588157' />
               <p className='text-base text-verde-300 font-medium'>
                  {mensagem}
               </p>
            </div>
         )}
      </div>
   )
}

function Botao({ texto, onClick }) {
   return (
      <button
         type='button'
         onClick={onClick}
         className='w-full py-2.5 rounded-xl border border-verde-300/20 bg-verde-700/30 text-verde-300/90 text-xs font-bold uppercase tracking-[.06em] transition-all duration-150 hover:bg-verde-700/55 hover:text-branco active:scale-[.98] cursor-pointer'
      >
         {texto}
      </button>
   )
}
