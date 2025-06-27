import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Package, Clock, Shield, Globe, Users, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { TrackingForm } from "@/components/tracking-form"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
                  Trusted Logistics Partner
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Track Your Package with <span className="text-orange-600">Coyote Logistics</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Experience seamless package tracking and logistics solutions. Enter your tracking ID below to get
                  real-time updates on your shipment.
                </p>
              </div>

              {/* Tracking Form */}
              <TrackingForm />

              <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-orange-600" />
                  <span>Secure Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span>Real-time Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-orange-600" />
                  <span>Global Coverage</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/home.jpeg?height=500&width=600"
                  alt="Logistics and shipping"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-orange-200 to-red-200 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Logistics Solutions You Can Trust</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive logistics services with cutting-edge technology and exceptional customer service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Fast Delivery</h3>
                <p className="text-gray-600">
                  Express shipping options with guaranteed delivery times across all major routes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Package className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Secure Handling</h3>
                <p className="text-gray-600">
                  Advanced packaging and handling protocols to ensure your items arrive safely.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Real-time Tracking</h3>
                <p className="text-gray-600">
                  Monitor your shipments 24/7 with our advanced tracking system and notifications.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Insurance Coverage</h3>
                <p className="text-gray-600">Comprehensive insurance options to protect your valuable shipments.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Globe className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Global Network</h3>
                <p className="text-gray-600">Extensive network coverage spanning across continents and major cities.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">24/7 Support</h3>
                <p className="text-gray-600">
                  Round-the-clock customer support to assist you with any logistics needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">10M+</div>
              <div className="text-orange-100">Packages Delivered</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">50+</div>
              <div className="text-orange-100">Countries Served</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">99.9%</div>
              <div className="text-orange-100">On-time Delivery</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">24/7</div>
              <div className="text-orange-100">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Ready to Ship with Coyote Logistics?</h2>
          <p className="text-xl text-gray-600">
            Join thousands of satisfied customers who trust us with their logistics needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              Get Started Today
            </Button>
            <Button size="lg" variant="outline">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img src="/coyote.png" alt="Coyote Logistics Logo" className="h-10 w-auto" />
              </div>
              <p className="text-gray-400">
                Your trusted partner for reliable and efficient logistics solutions worldwide.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Services</h3>
              <div className="space-y-2 text-gray-400">
                <Link href="/services" className="block hover:text-white transition-colors">
                  Express Shipping
                </Link>
                <Link href="/services" className="block hover:text-white transition-colors">
                  Freight Services
                </Link>
                <Link href="/services" className="block hover:text-white transition-colors">
                  Warehousing
                </Link>
                <Link href="/services" className="block hover:text-white transition-colors">
                  Supply Chain
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <div className="space-y-2 text-gray-400">
                <Link href="/about" className="block hover:text-white transition-colors">
                  About Us
                </Link>
                <Link href="/contact" className="block hover:text-white transition-colors">
                  Contact
                </Link>
                <Link href="#" className="block hover:text-white transition-colors">
                  Careers
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+57 325 COYOTE01</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>support@shipcoyotelogistics.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Cra. 38 #9-13 esquina segundo piso, Bogotá, Colombia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Coyote Logistics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
