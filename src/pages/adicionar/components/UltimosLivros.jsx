import { useEffect, useState } from 'react'
import CardLivro from './CardLivro'
import { api } from '../../../api/api'

export default function ListaLivros({ update }) {
   const [livros, setLivros] = useState([])
   const [mensagem, setMensagem] = useState('')

   useEffect(() => {
      const buscar = async () => {
         try {
            const { data } = await api.get('/historico')
            setLivros(data)
         } catch (err) {
            setMensagem('Erro ao carregar os livros.')
         }
      }
      buscar()
   }, [update])

   return (
      <div className='order-2 md:order-1 flex-1 flex flex-col gap-3 overflow-y-auto scrollbar-none max-h-[calc(100vh-6rem)] bg-verde-400/30 rounded-md px-3 py-2'>
         <div>
            <p className='text-xs font-bold uppercase text-verde-200/80'>
               Cadastros recentes
            </p>
            <h2 className='text-xl italic font-bold text-verde-400 leading-tight'>
               Últimos livros
            </h2>
         </div>

         {mensagem && (
            <p className='text-[13px] text-verde-200/60 italic'>{mensagem}</p>
         )}

         {livros.map((livro) => (
            <CardLivro key={livro.id} livro={livro} />
         ))}
      </div>
   )
}
