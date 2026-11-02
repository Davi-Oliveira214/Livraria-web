import { useEffect, useRef, useState } from 'react'
import { Aviso, Estoque, Informacao, Sinopse, Titulo } from './InfoLivro'
import { api } from '../../../api/api'
import { IconAlertCircle } from '@tabler/icons-react'

export function CardApagar({ id, onClick }) {
   const [livro, setLivro] = useState(null)
   const [mensagem, setMensagem] = useState('Carregando...')
   const [segundos, setSegundos] = useState(null)
   const [aviso, setAviso] = useState('')

   const timerRef = useRef(null)

   useEffect(() => {
      const buscarLivro = async () => {
         setMensagem('Carregando...')

         try {
            const { data } = await api.get(`/${id}`)
            setLivro(data)
         } catch (error) {
            if (error.response?.status === 404) {
               setMensagem('Livro não encontrado.')
            } else {
               setMensagem('Erro ao carregar os detalhes do livro.')
            }
         }
      }

      buscarLivro()

      return () => clearInterval(timerRef.current)
   }, [id])

   const apagar = async () => {
      try {
         const { data } = await api.delete(`/${id}`)

         definirAviso(data.message || 'Livro apagado com sucesso')
      } catch (error) {
         if (error.response?.status === 404) {
            setMensagem('Livro não encontrado.')
         } else {
            setAviso('Erro ao apagar o livro.')
         }
      }
   }

   // Exibe o aviso e inicia a contagem
   const definirAviso = (mensagem) => {
      setAviso(mensagem)

      clearInterval(timerRef.current)
      setSegundos(4)

      timerRef.current = setInterval(() => {
         setSegundos((prev) => {
            if (prev <= 1) {
               clearInterval(timerRef.current)
               window.location.reload()
               return 0
            }

            return prev - 1
         })
      }, 1000)
   }

   return (
      <div
         className='fixed z-100 inset-0 flex items-center justify-center bg-verde-800/50 backdrop-blur-xs px-4'
         onClick={onClick}
      >
         {!livro ? (
            <Aviso mensagem={mensagem} />
         ) : (
            <div
               className='w-full max-w-sm bg-verde-800 border border-verde-300/20 rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.5)]'
               onClick={(e) => e.stopPropagation()}
            >
               {aviso && (
                  <div className='flex items-center justify-center gap-2.5 px-4 py-2.5'>
                     <IconAlertCircle />

                     <p className='text-xs text-light text-center flex flex-col'>
                        {aviso}

                        {segundos !== null && (
                           <span>Reiniciando em: {segundos}</span>
                        )}
                     </p>
                  </div>
               )}

               <div className='flex items-start justify-between gap-2 px-4 py-3.5 bg-preto/25 border-b border-branco/[.06]'>
                  <Titulo titulo={livro.titulo} />
                  <Estoque estoque={livro.estoque} />
               </div>

               <div className='flex flex-col gap-3 p-4'>
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

                  <div className='grid grid-cols-2 gap-2'>
                     <Botao texto='Fechar' onClick={onClick} />
                     <Botao texto='Apagar' onClick={apagar} />
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}

function Botao({ texto, onClick, type = 'button' }) {
   return (
      <button
         type={type}
         onClick={onClick}
         className='py-2.5 rounded-xl text-xs font-bold uppercase tracking-[.06em] border transition-all duration-150 active:scale-[.98] cursor-pointer bg-verde-700/40 border-verde-300/25 text-verde-300/90 hover:bg-verde-700/65 hover:text-branco'
      >
         {texto}
      </button>
   )
}
