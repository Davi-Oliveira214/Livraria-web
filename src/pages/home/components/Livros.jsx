import { useEffect, useState } from 'react'
import CardLivro from './CardLivro'
import { api } from '../../../api/api'

export default function Livros() {
   const [livros, setLivros] = useState([])
   const [mensagem, setMensagem] = useState('carregando...')

   useEffect(() => {
      const resulte = async () => {
         const resp = await api
            .get()
            .then((data) => data.data)
            .catch(() => setMensagem('Erro ao procurar livros'))

         if (resp.length == 0) {
            setMensagem('nenhum livro cadastrado')
            return
         }

         setLivros(resp)
      }

      resulte()
   }, [])

   return (
      <section
         style={{
            gridTemplateColumns: `repeat(${livros.length},minmax(350px,355px))`,
         }}
         className='w-full px-2 py-3 border gap-2 border-verde-800 overflow-x-scroll grid scrollbar-none snap-x'
      >
         {livros.length == 0 ? (
            <Mensagem texto={mensagem} />
         ) : (
            livros.map((livro) => <CardLivro key={livro.id} livro={livro} />)
         )}
      </section>
   )
}

function Mensagem({ texto }) {
   return (
      <p className='capitalize text-center text-lg font-bold italic text-verde-300 py-10 bg-verde-800 rounded-2xl'>
         {texto}
      </p>
   )
}
