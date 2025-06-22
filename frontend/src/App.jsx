import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Carousel from './Components/Carousel/Carousel'
import Offers from './Components/Offers/Offers'
import Pricing from './Components/Pricing/Pricing'
import Support from './Components/Support/Support'
import PaymentMethods from './Components/PaymentMethods/PaymentMethods'

function App() {

  return (
    <>
      <Navbar />
      <Carousel />
      <Offers />
      <Pricing />
      <PaymentMethods />
      <Support />
    </>
  )
}

export default App
