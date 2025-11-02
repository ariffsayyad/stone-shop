'use client'
import Title from "@/components/Title";
import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        toast.success("Thank you for your message! We'll get back to you soon.");
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div className="min-h-[70vh] my-16">
            <div className="max-w-7xl mx-auto px-6">
                <Title title="Contact Us" />

                <div className="grid lg:grid-cols-2 gap-12 mt-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-800 mb-4">Get In Touch</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Have questions about our products or services? We're here to help!
                                Reach out to us through any of the channels below or send us a message.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Mail className="text-green-600" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Email</h3>
                                    <p className="text-slate-600">support@gocart.com</p>
                                    <p className="text-slate-600">business@gocart.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Phone className="text-green-600" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Phone</h3>
                                    <p className="text-slate-600">+1 (555) 123-4567</p>
                                    <p className="text-slate-600">+1 (555) 987-6543</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <MapPin className="text-green-600" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Address</h3>
                                    <p className="text-slate-600">123 Commerce Street</p>
                                    <p className="text-slate-600">Business District, NY 10001</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Clock className="text-green-600" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Business Hours</h3>
                                    <p className="text-slate-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                    <p className="text-slate-600">Saturday: 10:00 AM - 4:00 PM</p>
                                    <p className="text-slate-600">Sunday: Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-sm border">
                        <h3 className="text-xl font-semibold text-slate-800 mb-6">Send us a Message</h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                        placeholder="Your full name"
                                        suppressHydrationWarning={true}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                        placeholder="your@email.com"
                                        suppressHydrationWarning={true}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                    placeholder="How can we help you?"
                                    suppressHydrationWarning={true}
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition resize-none"
                                    placeholder="Please describe your inquiry in detail..."
                                    suppressHydrationWarning={true}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
