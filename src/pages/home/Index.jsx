import Banner from './components/Banner'
import Livros from './components/Livros'

export default function Index() {
   return (
      <section className='w-full h-full flex flex-col'>
         <Banner />
         <Livros />
      </section>
   )
}
