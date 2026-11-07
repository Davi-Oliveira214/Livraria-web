export default function CardLivro({ livro }) {
   const { id, titulo, autor, preco, isbn, estoque, genero, lancamento } = livro

   const infos = [
      { tema: 'Autor', texto: autor },
      { tema: 'Gênero', texto: genero },
      { tema: 'Preço', texto: `R$ ${preco}` },
      { tema: 'ISBN', texto: isbn },
      {
         tema: 'Lançamento',
         texto: new Date(lancamento).toLocaleDateString('pt-BR'),
         full: true,
      },
   ]

   return (
      <article className='bg-verde-800 border border-verde-200 rounded-2xl p-3.5 flex flex-col gap-2.5 transition-all duration-150 hover:bg-verde-800/95 hover:border-verde-200/80'>
         <div className='flex items-start justify-between gap-2'>
            <h3 className='font-serif text-base italic font-bold text-light leading-tight'>
               {titulo}
            </h3>
            <span className='text-[9px] font-bold uppercase text-verde-200/80 bg-verde-400/50 border border-verde-200/20 px-2 py-1 rounded-full whitespace-nowrap'>
               {estoque} un.
            </span>
         </div>

         <div className='grid grid-cols-2 gap-1.5'>
            {infos.map(({ tema, texto, full }) => (
               <div
                  key={tema}
                  className={`flex flex-col gap-0.5 bg-branco/[.04] border border-branco/6 rounded-lg px-2 py-1.5 ${full ? 'col-span-2' : ''}`}
               >
                  <span className='text-[9px] font-bold uppercase tracking-[.09em] text-verde-200/50'>
                     {tema}
                  </span>
                  <span className='text-[12px] font-semibold text-light/75 truncate'>
                     {texto}
                  </span>
               </div>
            ))}
         </div>
      </article>
   )
}
