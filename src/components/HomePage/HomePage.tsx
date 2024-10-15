import Navbar from '../shared/navbar/navbar'
import Events from '../shared/events/events'
import Categories from '../shared/categories/categories'
import Footer from '../shared/footer/eventsFooter'


export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Events />
      <Categories />
      <Footer />
    </div>
  )
}
