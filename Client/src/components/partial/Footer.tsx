import { Facebook, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-100 border-t">
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-700">
                {/* About Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">About Us</h3>
                    <p>
                        We are a platform that helps you easily book sports fields — from football,
                        badminton, to tennis and more. Fast, reliable, and community-friendly.
                    </p>
                </div>

                {/* Contact Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact</h3>
                    <ul className="space-y-2">
                        <li>Phone: 084 333 4838</li>
                        <li>Email: huynhqui6425@gmail.com</li>
                        <li>Address: Cai Be, Tien Giang</li>
                    </ul>
                </div>

                {/* Support Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Support</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="/#" className="hover:underline">
                                Help Center
                            </a>
                        </li>
                        <li>
                            <a href="/#" className="hover:underline">
                                FAQs
                            </a>
                        </li>
                        <li>
                            <a href="/#" className="hover:underline">
                                Terms of Service
                            </a>
                        </li>
                        <li>
                            <a href="/#" className="hover:underline">
                                Privacy Policy
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Social or Logo Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
                    <ul className="flex flex-col gap-2 space-x-4">
                        <li>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                className="hover:underline flex justify-start items-center gap-2">
                                <Facebook/> Facebook
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                className="hover:underline flex justify-start items-center gap-2">
                                <Instagram/> Instagram
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-xs text-gray-500 pb-6">
                © {new Date().getFullYear()} EasySport. All rights reserved.
            </div>
        </footer>
    );
}
