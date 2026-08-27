import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import logo from '../assets/logo.png'

function CheckoutPage() {
  return (
    <div className="max-w-lg mx-auto py-16">
      <Card>
        <CardContent className="flex flex-col items-center text-center gap-6 py-4 px-8">

            <div>
                <h1 className="text-2xl font-bold text-gray-800 -mb-4">
                Thank you for trying Obolus!
                </h1>
            </div>

            <img src={logo} alt="Obolus" className="h-30 w-auto "/>

            <div>
                <p className="text-gray-500 text-lg -mt-3">
                I really appreciate your interest in my website 🙌
                </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-sm text-blue-600 text-left w-full -mt-4">
                <p className="font-medium mb-1 border-b border-blue-200 text-center text-red-500">
                    Important notice:
                </p>
                <p className="text-justify">
                    Obolus is an educational project built to demonstrate full stack
                    development skills. It is not intended for commercial use and does
                    not process real purchases or money transactions.
                </p>
            </div>

          

          <div className="flex flex-col gap-2 w-full text-sm text-gray-600">
            <p className="font-medium text-gray-800">Want to learn more about the developer?</p>

            <a
              href="https://linkedin.com/in/emiliano-padilla-robles"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition-colors"
            >
              LinkedIn
            </a>

            <a
              href="https://github.com/EmilianoPadilla"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gray-800 text-white rounded-lg py-2 hover:bg-gray-700 transition-colors"
            >
              GitHub 
            </a>
          </div>

          <Link to="/products">
            <Button className="cursor-pointer bg-yellow-300 text-black hover:bg-yellow-400">
                Continue Browsing
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

export default CheckoutPage