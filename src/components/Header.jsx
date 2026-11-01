import { useEffect, useState } from 'react'
import icon from '../assets/icon/livro.png'

const ITENS = [
   { id: 'home', nome: 'Home' },
   { id: 'adicionar', nome: 'Adicionar' },
   { id: 'historico', nome: 'Histórico' },
]

export default function Header() {
   const [ativo, setAtivo] = useState('home')
   const [menuAberto, setMenuAberto] = useState(false)
   const [scrollado, setScrollado] = useState(false)

   useEffect(() => {
      const onScroll = () => setScrollado(window.scrollY > 10)
      window.addEventListener('scroll', onScroll)
      return () => window.removeEventListener('scroll', onScroll)
   }, [])

   const fecharMenu = () => setMenuAberto(false)
   const alternarMenu = () => setMenuAberto((prev) => !prev)

   const selecionar = (id) => {
      setAtivo(id)
      fecharMenu()
   }

   return (
      <>
         <header
            className={`z-80 flex items-center bg-verde-800 w-full px-4 md:px-7 py-2 justify-between transition-all duration-200
                ${scrollado ? 'fixed max-w-[95%] top-3 rounded-[30px]' : 'static'}
            `}
         >
            <img src={icon} alt='Logo' className='h-12' />

            <nav className='hidden md:flex' aria-label='Navegação principal'>
               <ul className='flex items-center gap-2'>
                  {ITENS.map((item) => (
                     <ItemMenu
                        key={item.id}
                        nome={item.nome}
                        selecionado={ativo === item.id}
                        onClick={() => selecionar(item.id)}
                     />
                  ))}
               </ul>
            </nav>

            <button
               type='button'
               aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
               aria-expanded={menuAberto}
               onClick={alternarMenu}
               className='flex md:hidden flex-col gap-1.5 p-1 cursor-pointer'
            >
               <Barra aberto={menuAberto} index={0} />
               <Barra aberto={menuAberto} index={1} />
               <Barra aberto={menuAberto} index={2} />
            </button>
         </header>

         {menuAberto && (
            <div
               className='fixed inset-0 z-70 bg-verde-800/50'
               onClick={fecharMenu}
               aria-hidden='true'
            />
         )}

         <nav
            className={`fixed z-80 top-0 right-0 h-full w-36 bg-verde-400 py-10 px-2 flex flex-col gap-2.5 items-center transition-transform duration-300 md:hidden
                    ${menuAberto ? 'translate-x-0' : 'translate-x-full'}
                `}
            aria-label='Menu mobile'
         >
            {ITENS.map((item) => (
               <ItemMenu
                  key={item.id}
                  nome={item.nome}
                  selecionado={ativo === item.id}
                  onClick={() => selecionar(item.id)}
               />
            ))}
         </nav>
      </>
   )
}

function Barra({ aberto, index }) {
   return (
      <div
         className={`w-7 h-0.5 bg-verde-200 rounded-full transition-all duration-300
            ${aberto && index === 0 ? 'translate-y-2 rotate-45' : ''}
            ${aberto && index === 1 ? 'opacity-0 scale-x-0' : ''}
            ${aberto && index === 2 ? '-translate-y-2 -rotate-45' : ''}
        `}
      />
   )
}

function ItemMenu({ nome, selecionado, onClick }) {
   return (
      <li
         className={`cursor-pointer list-none w-full text-center font-bold border-2 py-0.5 px-3 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:cursor-pointer
                    ${
                       selecionado
                          ? 'border-verde-200 text-verde-200 bg-verde-700/40'
                          : 'border-verde-400 text-verde-200 hover:border-verde-300'
                    }`}
      >
         <button type='button' onClick={onClick}>
            {nome}
         </button>
      </li>
   )
}
