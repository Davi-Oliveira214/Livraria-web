import { useEffect, useRef, useState } from 'react'
import icon from '../assets/icon/livro.png'

export default function Header() {
   const [ativo, setAtivo] = useState('home')
   const refe = useRef(null)

   useEffect(() => {
      if (refe.current) {
         const header = refe.current

         window.document.addEventListener('scroll', () => {
            const scroll = window.scrollY

            if (scroll > 0) {
               header.style.position = 'fixed'
               header.style.maxWidth = '95%'
               header.style.marginTop = '12px'
               header.style.marginRight = '10px'
               header.style.marginLeft = '10px'
               header.style.borderRadius = '30px'
            } else {
               header.style.position = 'static'
               header.style.maxWidth = '100%'
               header.style.marginTop = '0'
               header.style.borderRadius = '0'
            }
         })
      }
   }, [])

   return (
      <header
         className='z-100 flex bg-verde-800 w-full px-7 py-2 justify-between static transition-all duration-200 box-border'
         ref={refe}
      >
         <img src={icon} alt='' className='h-12' />

         <ul className='hidden gap-2.5 items-center md:flex'>
            <Item
               nome={'Home'}
               selecionado={ativo === 'home'}
               onClick={() => setAtivo('home')}
            />
            <Item
               nome={'Adicionar'}
               selecionado={ativo === 'adicionar'}
               onClick={() => setAtivo('adicionar')}
            />
            <Item
               nome={'Histórico'}
               selecionado={ativo === 'historico'}
               onClick={() => setAtivo('historico')}
            />
         </ul>
      </header>
   )
}

function Item({ nome, selecionado, onClick }) {
   return (
      <li
         onClick={onClick}
         className={`transition-all duration-300 font-bold border-2 border-verde-400 py-0.5 px-2 rounded-[15px] hover:border-verde-300 hover:cursor-pointer hover:-translate-y-1 ${
            selecionado ? 'ativo' : 'text-verde-200'
         }`}
      >
         <a href='#'>{nome}</a>
      </li>
   )
}
