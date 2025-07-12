import React from 'react'

const ContactUsPage = () => {
  return (
    <div>
       <div className="min-h-screen bg-white text-gray-800">
      <div>
        <title>Contact Us - Kelly Felder</title>
        <meta name="description" content="Get in touch with Kelly Felder. Send us a message or find our contact details." />
        <link rel="icon" href="/favicon.ico" />
      </div>

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-10 text-gray-900">CONTACT</h1>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column: Contact Form */}
          <div>
            <p className="text-gray-700 mb-8 max-w-lg">Use the form below to send us a message or contact us by mail at:</p>

            <form>
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder=""
                />
              </div>

              <div className="mb-6">
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder=""
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder=""
                />
              </div>

              <div className="mb-8">
                <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">
                  Comment <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={6}
                  required
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-y"
                  placeholder=""
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-black text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors duration-300 shadow-md"
              >
                SUBMIT CONTACT
              </button>
            </form>
          </div>

          {/* Right Column: Contact Details */}
          <div className="lg:pl-10 flex flex-col h-1/2">
            <p className="text-gray-700 mb-8">
              We&apos;d love to hear from you - please use the form to send us your message or ideas.
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                {/* For production, consider using a proper icon library like react-icons (e.g., <FaPhone /> or <MdEmail />) */}
                <span className="mr-3 text-2xl">💬</span> {/* Placeholder icon */}
                <p className="text-gray-700">TEXT: +94 71 7 255 255</p>
              </div>

              <div className="flex items-center">
                <span className="mr-3 text-2xl">📧</span> {/* Placeholder icon */}
                <p className="text-gray-700">online@kellyfelder.com</p>
              </div>
            </div>

            <div className="border-b border-gray-300 py-6 my-6"></div> {/* Divider */}

            <div className="space-y-2">
              <p className="text-gray-700">345 Galle Rd,</p>
              <p className="text-gray-700">Colombo 00300,</p>
              <p className="text-gray-700">Sri Lanka.</p>
            </div>

            <div className="border-b border-gray-300 py-6 my-6"></div> {/* Divider */}

            <div className="space-y-2">
              <h3 className="font-bold text-gray-900 mb-2">Opening Hours:</h3>
              <p className="text-gray-700">MON to SAT: 10:00AM – 8:00PM</p>
              <p className="text-gray-700">SUN: 10:00AM – 8:00PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}

export default ContactUsPage;