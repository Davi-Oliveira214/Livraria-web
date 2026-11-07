import { useEffect, useState } from 'react'
import { api } from '../../../api/api'
import { IconAlertCircle } from '@tabler/icons-react'

const CAMPOS = [
   { id: 'titulo', texto: 'Título', type: 'text', full: true },
   { id: 'autor', texto: 'Autor', type: 'text', full: false },
   { id: 'preco', texto: 'Preço', type: 'number', full: false },
   { id: 'isbn', texto: 'ISBN', type: 'text', full: false },
   { id: 'estoque', texto: 'Estoque', type: 'number', full: false },
   { id: 'lancamento', texto: 'Lançamento', type: 'date', full: false },
]

const inputBase =
   'w-full bg-branco/6 border border-branco/10 rounded-xl px-3 py-2 text-light text-[12px] font-medium outline-none focus:border-verde-300/45 focus:bg-branco/[.08] transition-all duration-150 [color-scheme:dark]'

export function FormLivro({ onUpdate }) {
   const [mensagem, setMensagem] = useState('')
   const [sucesso, setSucesso] = useState(false)

   const adicionar = async (e) => {
      e.preventDefault()
      const livro = Object.fromEntries(new FormData(e.target).entries())
      console.log(livro)
      try {
         const resp = await api.post('', livro)
         if (resp.status === 201) {
            setSucesso(true)
            setMensagem('Livro adicionado com sucesso!')
            e.target.reset()

            onUpdate('reload')
            setTimeout(() => {
               setSucesso(false)
               setMensagem('')
               onUpdate('ok')
            }, 5000)
         }
      } catch (err) {
         const { status, message } = err.response.data
         if (status === 409) setMensagem(message)
      }
   }

   return (
      <form
         onSubmit={adicionar}
         className='order-1 md:order-2 max-w-100 bg-verde-800 border border-verde-200/15 rounded-2xl overflow-hidden'
      >
         <div className='px-4 py-3.5 bg-preto/30 border-b border-branco/6'>
            <p className='text-xs font-bold uppercase text-verde-200/55 mb-0.5'>
               Novo registro
            </p>
            <h2 className='font-serif text-xl italic font-bold text-light leading-tight'>
               Adicionar livro
            </h2>
         </div>

         <div className='flex flex-col gap-3 p-4 max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-thin'>
            {mensagem && (
               <div
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border ${sucesso ? 'bg-verde-400/20 border-verde-200/25' : 'bg-red-900/20 border-red-400/20'}`}
                  role='alert'
               >
                  <IconAlertCircle />
                  <p
                     className={`text-[11px] leading-relaxed ${sucesso ? 'text-verde-200/70' : 'text-red-300/70'}`}
                  >
                     {mensagem}
                  </p>
               </div>
            )}

            <div className='grid grid-cols-2 gap-2'>
               {CAMPOS.map(({ id, texto, type, full }) => (
                  <div
                     key={id}
                     className={`flex flex-col gap-1 ${full ? 'col-span-2' : ''}`}
                  >
                     <label
                        htmlFor={id}
                        className='text-xs font-bold uppercase text-verde-200/60'
                     >
                        {texto}
                     </label>
                     <input
                        id={id}
                        name={id}
                        type={type}
                        required
                        className={inputBase}
                     />
                  </div>
               ))}

               <InputGeneros />

               <div className='flex flex-col gap-1 col-span-2'>
                  <label
                     htmlFor='sinopse'
                     className='text-[9px] font-bold uppercase text-verde-200/60'
                  >
                     Sinopse
                  </label>
                  <textarea
                     id='sinopse'
                     name='sinopse'
                     rows={3}
                     required
                     className={`${inputBase} resize-none`}
                  />
               </div>
            </div>

            <button
               type='submit'
               className='w-full py-2.5 rounded-xl font-bold text-xs uppercase text-light bg-verde-400/45 border-light border-[1.5px] hover:opacity-88 transition-all duration-150 mt-1'
            >
               Adicionar livro
            </button>
         </div>
      </form>
   )
}

function InputGeneros() {
   const [generos, setGeneros] = useState([])

   useEffect(() => {
      api.get('/generos')
         .then(({ data }) => setGeneros(data))
         .catch(() => {})
   }, [])

   return (
      <div className='flex flex-col gap-1 col-span-2'>
         <label
            htmlFor='generos'
            className='text-[9px] font-bold uppercase text-verde-200/60'
         >
            Gênero
         </label>
         <select
            id='generos'
            name='genero'
            required
            className={`${inputBase} cursor-pointer`}
         >
            <option value='' disabled>
               Selecione...
            </option>
            {generos.map(({ codigo, nome }) => (
               <option key={codigo} value={codigo}>
                  {nome}
               </option>
            ))}
         </select>
      </div>
   )
}
