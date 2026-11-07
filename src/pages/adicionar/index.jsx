import { useState } from 'react'
import { FormLivro } from './components/Form'
import ListaLivros from './components/UltimosLivros'

export default function Adicionar() {
   const [update, setUpdate] = useState('ok')

   return (
      <main className='w-full flex flex-col md:flex-row gap-6 px-5 py-4 min-h-full items-center justify-center'>
         <ListaLivros update={update} />
         <FormLivro onUpdate={setUpdate} />
      </main>
   )
}
