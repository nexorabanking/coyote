import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Truck, Package, Warehouse, Globe, Clock, Shield, Zap, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200 mb-6">
            Our Services
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Logistics
            <span className="text-orange-600"> Solutions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            From express shipping to complex supply chain management, we offer a full suite of logistics services
            designed to meet your business needs and exceed your expectations.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <Truck className="h-8 w-8 text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Express Shipping</h2>
              <p className="text-gray-600 leading-relaxed">
                When time is critical, our express shipping service delivers. With guaranteed delivery times and
                real-time tracking, we ensure your urgent shipments reach their destination on schedule.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  Same-day and next-day delivery options
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-orange-600" />
                  Priority handling and secure transport
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-orange-600" />
                  Real-time tracking and notifications
                </li>
              </ul>
              <Button className="bg-orange-600 hover:bg-orange-700">Learn More</Button>
            </div>
            <div className="relative">
              <Image
                src="/express.jpg"
                alt="Express shipping"
                width={500}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="relative order-2 lg:order-1">
              <Image
                src="/frieght.jpg"
                alt="Freight services"
                width={500}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <Package className="h-8 w-8 text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Freight Services</h2>
              <p className="text-gray-600 leading-relaxed">
                Our comprehensive freight services handle shipments of all sizes, from small packages to full
                truckloads. We optimize routes and consolidate shipments to provide cost-effective solutions.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-orange-600" />
                  LTL and FTL shipping options
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-orange-600" />
                  Domestic and international freight
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-orange-600" />
                  Dedicated account management
                </li>
              </ul>
              <Button className="bg-orange-600 hover:bg-orange-700">Get Quote</Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <Warehouse className="h-8 w-8 text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Warehousing & Distribution</h2>
              <p className="text-gray-600 leading-relaxed">
                Our strategically located warehouses provide secure storage and efficient distribution services. From
                inventory management to order fulfillment, we handle your warehousing needs.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-orange-600" />
                  Secure, climate-controlled facilities
                </li>
                <li className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-orange-600" />
                  Inventory management systems
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-orange-600" />
                  Order fulfillment and distribution
                </li>
              </ul>
              <Button className="bg-orange-600 hover:bg-orange-700">Explore Solutions</Button>
            </div>
            <div className="relative">
              <Image
                src="/warehouse.jpg"
                alt="Warehousing"
                width={500}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Additional Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond our core offerings, we provide specialized services to meet unique logistics challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>International Shipping</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Global shipping solutions with customs clearance, documentation, and international compliance support.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>White Glove Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Premium handling for high-value, fragile, or specialized items requiring extra care and attention.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Time-Critical Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Emergency and time-sensitive shipping solutions for critical business needs and urgent deliveries.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Custom Packaging</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Specialized packaging solutions designed to protect your products during transit and storage.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Supply Chain Consulting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Expert analysis and optimization of your supply chain to improve efficiency and reduce costs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Technology Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  API integration and custom technology solutions to seamlessly connect with your existing systems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Optimize Your Logistics?</h2>
          <p className="text-xl text-orange-100">
            Let our experts help you find the perfect logistics solution for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
                Get Started Today
              </Button>
            </Link>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-orange-600 hover:bg-gray-100"
            >
              Request Quote
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
                <Truck className="h-8 w-8 text-orange-600" />
                <span className="text-xl font-bold">Coyote Logistics</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for reliable and efficient logistics solutions worldwide.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Services</h3>
              <div className="space-y-2 text-gray-400">
                <a href="/services" className="block hover:text-white transition-colors">
                  Express Shipping
                </a>
                <a href="/services" className="block hover:text-white transition-colors">
                  Freight Services
                </a>
                <a href="/services" className="block hover:text-white transition-colors">
                  Warehousing
                </a>
                <a href="/services" className="block hover:text-white transition-colors">
                  Supply Chain
                </a>
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
                <a href="#" className="block hover:text-white transition-colors">
                  Careers
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <span>1-800-COYOTE-1</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>info@coyotelogistics.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Chicago, IL</span>
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
