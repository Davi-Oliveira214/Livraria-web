import { useEffect, useRef, useState } from 'react'
import { api } from '../../../api/api'
import { Aviso } from './InfoLivro'
import { IconAlertCircle } from '@tabler/icons-react'

const CAMPOS = [
   { tipo: 'titulo', label: 'Título', input: 'text', full: true },
   { tipo: 'autor', label: 'Autor', input: 'text' },
   { tipo: 'genero', label: 'Gênero', input: 'text' },
   { tipo: 'preco', label: 'Preço', input: 'number' },
   { tipo: 'isbn', label: 'ISBN', input: 'number' },
   { tipo: 'estoque', label: 'Estoque', input: 'number' },
   { tipo: 'lancamento', label: 'Lançamento', input: 'date' },
   { tipo: 'sinopse', label: 'Sinopse', input: 'text', full: true, area: true },
]

export default function CardEditar({ id, onClick }) {
   const [livro, setLivro] = useState(null)
   const [mensagem, setMensagem] = useState('Carregando...')
   const [aviso, setAviso] = useState('')
   const [segundos, setSegundos] = useState(null)

   const timerRef = useRef(null)

   useEffect(() => {
      const buscarLivro = async () => {
         try {
            const { data } = await api.get(`/${id}`)

            setLivro({
               ...data,
               lancamento: data.lancamento
                  ? new Date(data.lancamento).toLocaleDateString('en-CA')
                  : '',
            })
         } catch {
            setMensagem('Erro ao carregar os detalhes do livro.')
         }
      }

      buscarLivro()

      return () => clearInterval(timerRef.current)
   }, [id])

   const submit = async (e) => {
      e.preventDefault()

      const formData = new FormData(e.target)

      const book = Object.fromEntries(formData.entries())

      book.preco = Number(book.preco)
      book.isbn = Number(book.isbn)
      book.estoque = Number(book.estoque)

      try {
         const { data } = await api.patch(`/${id}`, book)

         setLivro(data)
         definirAviso('Livro atualizado com sucesso')
      } catch (error) {
         const status = error.response?.status

         if (status === 409) {
            definirAviso(
               `Esse título: ${book.titulo}, desse autor: ${book.autor}, já está cadastrado`
            )
         } else {
            definirAviso('Erro ao atualizar livro')
         }
      }
   }

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
         className='fixed z-100 inset-0 flex items-center justify-center bg-verde-800/50 backdrop-blur-xs px-4 text-light/70'
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

               <div className='px-4 py-3.5 bg-preto/25 border-b border-branco/[.06]'>
                  <p className='text-[10px] font-bold uppercase tracking-[.12em] text-verde-300/55 mb-0.5'>
                     Editar livro
                  </p>

                  <h2 className='font-serif text-xl italic font-bold text-branco leading-tight'>
                     {livro.titulo}
                  </h2>
               </div>

               <form
                  onSubmit={submit}
                  className='flex flex-col gap-3 p-4 max-h-[65vh] overflow-y-auto scrollbar-none'
               >
                  <div className='grid grid-cols-2 gap-2'>
                     {CAMPOS.map(({ tipo, label, input, full, area }) => (
                        <CampoEditar
                           key={tipo}
                           name={tipo}
                           label={label}
                           tipo={input}
                           value={livro[tipo] ?? ''}
                           area={area}
                           className={full ? 'col-span-2' : ''}
                           onChange={(v) =>
                              setLivro((prev) => ({
                                 ...prev,
                                 [tipo]: v,
                              }))
                           }
                        />
                     ))}
                  </div>

                  <div className='h-px bg-branco/[.06]' aria-hidden='true' />

                  <div className='grid grid-cols-2 gap-2'>
                     <Botao texto='Fechar' onClick={onClick} />
                     <Botao texto='Salvar alterações' type='submit' />
                  </div>
               </form>
            </div>
         )}
      </div>
   )
}

function CampoEditar({
   label,
   tipo,
   name,
   value,
   onChange,
   area,
   className = '',
}) {
   const base =
      'bg-branco/[.05] border border-branco/10 rounded-lg px-2.5 py-2 text-branco text-[13px] font-medium outline-none focus:border-verde-300/40 focus:bg-branco/[.08] transition-all duration-150 w-full [color-scheme:dark]'

   return (
      <div className={`flex flex-col gap-1 ${className}`}>
         <label
            htmlFor={name}
            className='text-xs font-bold uppercase text-white/70'
         >
            {label}
         </label>

         {area ? (
            <textarea
               id={name}
               name={name}
               value={value}
               rows={3}
               onChange={(e) => onChange(e.target.value)}
               className={`${base} resize-none`}
            />
         ) : (
            <input
               id={name}
               name={name}
               type={tipo}
               value={value}
               onChange={(e) => onChange(e.target.value)}
               className={base}
            />
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
