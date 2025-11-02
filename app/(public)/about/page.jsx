'use client'
import Title from "@/components/Title";

export default function About() {
    return (
        <div className="min-h-[70vh] my-16">
            <div className="max-w-7xl mx-auto px-6">
                <Title title="About Us" />

                <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-slate-800">Welcome to GoCart</h2>
                        <p className="text-slate-600 leading-relaxed">
                            GoCart is your premier destination for smart shopping. We connect buyers with sellers
                            in a seamless, user-friendly marketplace that makes online shopping effortless and enjoyable.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Our platform empowers small businesses and entrepreneurs to reach a wider audience while
                            providing customers with access to unique, high-quality products from trusted sellers.
                        </p>
                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-green-600">10K+</h3>
                                <p className="text-slate-600">Happy Customers</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-green-600">500+</h3>
                                <p className="text-slate-600">Active Sellers</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-slate-100 p-8 rounded-2xl">
                        <h3 className="text-xl font-semibold text-slate-800 mb-4">Our Mission</h3>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            To revolutionize e-commerce by creating a platform where quality meets convenience,
                            and where every seller has the opportunity to thrive.
                        </p>
                        <h3 className="text-xl font-semibold text-slate-800 mb-4">Our Vision</h3>
                        <p className="text-slate-600 leading-relaxed">
                            To become the most trusted and preferred online marketplace globally,
                            known for our commitment to excellence and customer satisfaction.
                        </p>
                    </div>
                </div>

                <div className="mt-16">
                    <h3 className="text-2xl font-bold text-slate-800 text-center mb-8">Why Choose GoCart?</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-green-600 font-bold text-xl">✓</span>
                            </div>
                            <h4 className="font-semibold text-slate-800 mb-2">Quality Assurance</h4>
                            <p className="text-slate-600 text-sm">All products are verified and sellers are vetted for quality.</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-green-600 font-bold text-xl">🚚</span>
                            </div>
                            <h4 className="font-semibold text-slate-800 mb-2">Fast Delivery</h4>
                            <p className="text-slate-600 text-sm">Quick and reliable shipping to get your orders to you fast.</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-green-600 font-bold text-xl">💬</span>
                            </div>
                            <h4 className="font-semibold text-slate-800 mb-2">24/7 Support</h4>
                            <p className="text-slate-600 text-sm">Our customer service team is always here to help you.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
