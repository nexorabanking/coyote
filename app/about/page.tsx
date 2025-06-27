import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Globe, Truck, Target, Heart } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
              About Coyote Logistics
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Connecting Commerce Through
              <span className="text-orange-600"> Smart Logistics</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              For over a decade, Coyote Logistics has been at the forefront of transportation and logistics innovation,
              helping businesses move their products efficiently and reliably across the globe.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                Founded in 2006, Coyote Logistics began with a simple mission: to revolutionize the way businesses
                approach transportation and logistics. What started as a small team with big dreams has grown into one
                of the most trusted names in the logistics industry.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we leverage cutting-edge technology, data analytics, and a vast network of carriers to provide
                comprehensive logistics solutions that help our clients optimize their supply chains and reduce costs
                while maintaining the highest standards of service.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/about.jpeg?height=400&width=500"
                alt="Coyote Logistics team"
                width={500}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're driven by core values that guide everything we do, from how we serve our customers to how we support
              our communities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Innovation</h3>
                <p className="text-gray-600">
                  We continuously invest in technology and processes to stay ahead of industry trends and provide
                  cutting-edge solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Integrity</h3>
                <p className="text-gray-600">
                  We build trust through transparency, honesty, and ethical business practices in every interaction and
                  decision.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Partnership</h3>
                <p className="text-gray-600">
                  We view our clients as partners, working collaboratively to achieve mutual success and long-term
                  growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact by the Numbers</h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              These numbers represent more than statistics—they represent the trust our clients place in us and the
              dedication of our team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold">10M+</div>
              <div className="text-orange-100">Shipments Delivered</div>
            </div>

            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold">50+</div>
              <div className="text-orange-100">Countries Served</div>
            </div>

            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold">5,000+</div>
              <div className="text-orange-100">Happy Clients</div>
            </div>

            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold">15+</div>
              <div className="text-orange-100">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced leadership team brings decades of combined expertise in logistics, technology, and
              business strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8 space-y-4">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="CEO"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Sarah Johnson</h3>
                  <p className="text-orange-600 font-medium">Chief Executive Officer</p>
                  <p className="text-gray-600 text-sm mt-2">
                    20+ years of experience in logistics and supply chain management, leading strategic initiatives
                    across global markets.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8 space-y-4">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="CTO"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Michael Chen</h3>
                  <p className="text-orange-600 font-medium">Chief Technology Officer</p>
                  <p className="text-gray-600 text-sm mt-2">
                    Expert in logistics technology and data analytics, driving innovation in transportation solutions.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8 space-y-4">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="COO"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Emily Rodriguez</h3>
                  <p className="text-orange-600 font-medium">Chief Operations Officer</p>
                  <p className="text-gray-600 text-sm mt-2">
                    Operational excellence leader with expertise in scaling logistics operations and customer service.
                  </p>
                </div>
              </CardContent>
            </Card>
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
                <a href="/about" className="block hover:text-white transition-colors">
                  About Us
                </a>
                <a href="/contact" className="block hover:text-white transition-colors">
                  Contact
                </a>
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
