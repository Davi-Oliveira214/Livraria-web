import banner from '../../../assets/img/banner.png'

export default function Banner() {
   return (
      <div className='w-full h-110 relative flex items-center justify-center'>
         <img src={banner} alt='' className='w-full h-full object-cover' />
         <h1 className='absolute text-4xl font-bold text-light italic'>
            Sistema Livraria
         </h1>
         <div className='absolute w-full h-full bg-verde-800/35'></div>

         <MarcaDAgua />
      </div>
   )
}

function MarcaDAgua() {
   return (
      <p className='flex flex-col text-center absolute bottom-4 right-4 font-bold text-lg italic text-verde-200/50'>
         <span>Spring</span>&<span>React</span>
      </p>
   )
}
