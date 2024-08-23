import Link from 'next/link'
import Navbar from "@/components/navbar";
import Image from "next/image";
import heroImage from "@/public/hero-img.jpg";

export default function LandingPage() {


    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar/>

            <main className="flex-grow">
                <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block">Simplify Your</span>
                                    <span className="block text-indigo-600">Loan Management</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    LoanTracker provides a comprehensive solution for loan giving organizations to
                                    manage and track loans efficiently. Stay on top of payments, interest rates, and
                                    more with our intuitive platform.
                                </p>
                                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                                    <Link href={"/signup"}
                                          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
                                        Get started for free
                                    </Link>
                                </div>
                            </div>
                            <div
                                className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                                    <Image
                                        className="w-full rounded-xl"
                                        src={heroImage}
                                        alt="Loan management dashboard"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:text-center">
                            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                Everything you need to manage loans
                            </p>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                                LoanTracker offers a comprehensive set of features to streamline your loan management
                                process.
                            </p>
                        </div>

                        <div className="mt-10">
                            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                                {[
                                    {
                                        name: 'Loan Portfolio Overview',
                                        description: 'Get a bird\'s-eye view of your entire loan portfolio with our intuitive dashboard.',
                                    },
                                    {
                                        name: 'Automated Payment Tracking',
                                        description: 'Never miss a payment with our automated tracking and reminder system.',
                                    },
                                    {
                                        name: 'Customizable Reports',
                                        description: 'Generate detailed reports tailored to your organization\'s needs.',
                                    },
                                    {
                                        name: 'Secure Document Management',
                                        description: 'Store and manage loan documents securely in our cloud-based system.',
                                    },
                                ].map((feature) => (
                                    <div key={feature.name} className="relative">
                                        <dt>
                                            <div
                                                className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M5 13l4 4L19 7"/>
                                                </svg>
                                            </div>
                                            <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                                        </dt>
                                        <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </section>

                <section id="testimonials" className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                            What our customers are saying
                        </h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    name: 'Sarah Johnson',
                                    role: 'CFO, LoanPro Inc.',
                                    content: 'LoanTracker has revolutionized our loan management process. It\'s intuitive, efficient, and has saved us countless hours.',
                                },
                                {
                                    name: 'Michael Chen',
                                    role: 'CEO, MicroFinance Solutions',
                                    content: 'The reporting features in LoanTracker are unparalleled. We can now make data-driven decisions with ease.',
                                },
                                {
                                    name: 'Emily Rodriguez',
                                    role: 'Loan Officer, Community First',
                                    content: 'I love how user-friendly LoanTracker is. It has made my job so much easier and more efficient.',
                                },
                            ].map((testimonial) => (
                                <div key={testimonial.name} className="bg-white shadow-lg rounded-lg p-6">
                                    <div className="text-gray-600 mb-4">{testimonial.content}</div>
                                    <div className="font-semibold">{testimonial.name}</div>
                                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="faq" className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-8">
                            {[
                                {
                                    question: 'How secure is LoanTracker?',
                                    answer: 'LoanTracker uses bank-level encryption and security measures to ensure your data is always protected.',
                                },
                                {
                                    question: 'Can I integrate LoanTracker with my existing systems?',
                                    answer: 'Yes, LoanTracker offers API integration capabilities to connect with your existing financial and CRM systems.',
                                },
                                {
                                    question: 'Is there a free trial available?',
                                    answer: 'We offer a 14-day free trial so you can experience the full capabilities of LoanTracker before committing.',
                                },
                            ].map((faq) => (
                                <div key={faq.question} className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800 text-white">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">LoanTracker</h3>
                            <p className="text-sm text-gray-400">Simplifying loan management for organizations
                                worldwide.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><Link href={"/"} className="text-sm text-gray-400 hover:text-white">Home</Link></li>
                                <li><Link href={"/features"}
                                          className="text-sm text-gray-400 hover:text-white">Features</Link></li>
                                <li><Link href={"faq"} className="text-sm text-gray-400 hover:text-white">FAQ</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                            <p className="text-sm text-gray-400">Email: support@loantracker.com</p>
                            <p className="text-sm text-gray-400">Phone: (123) 456-7890</p>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gray-700 pt-8 text-center">
                        <p className="text-sm text-gray-400">&copy; 2023 LoanTracker. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}