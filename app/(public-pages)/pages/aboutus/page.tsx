import React from "react";

const AboutUsPage = () => {
  return (
    <div>
      <div className="px-12 pb-4 min-h-screen flex flex-col">
        {/* Global Header (Optional - can be specific to each section if needed) */}
        <header className="14">
          <h1 className="py-14 text-center text-4xl font-extrabold text-gray-800 tracking-wider">
            EMPOWERING WOMEN, WORLDWIDE.
          </h1>
        </header>

        {/* Main Content Area */}

        {/* Section 1: Our Brand */}

        <div className="flex flex-col gap-10">
          <section className="px-4 bg-gray-50">
            <div className="container mx-auto grid gap-12 md:grid-cols-2 items-center">
              {/* Image Section - Our Brand */}
              <div className="order-2 md:order-1 flex justify-center">
                <img
                  src="https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg" // Place your image in public/images/
                  alt="Woman in denim outfit"
                  className="w-full max-w-lg h-auto shadow-xl object-cover"
                />
              </div>

              {/* Text Section - Our Brand */}
              <div className="order-1 md:order-2 flex flex-col items-center text-center md:text-left p-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-widest">
                  OUR BRAND
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-8">
                  We are on a mission of empowering women, around the world by
                  giving them confidence in their own sense of fashion and
                  style. Kelly Felder is a bold and progressive fashion brand
                  inspired by realistic aims and objectives. Our designs and
                  styles are inspired by our customers, diverse cultures and
                  positive global influences, creating a brand which encompasses
                  everything it means to be a woman on the go, in the dynamic
                  the world today.
                </p>
                <a
                  href="javascript:void(0);"
                  className="inline-block px-8 py-3 bg-black text-white font-semibold rounded-md shadow-lg hover:bg-gray-800 transition-colors duration-300"
                >
                  EXPLORE
                </a>
              </div>
            </div>
          </section>

          {/* Section 2: Our Product */}
          <section className=" px-4 bg-gray-50">
            {" "}
            {/* Changed background for visual separation */}
            <div className="container mx-auto grid gap-12 md:grid-cols-2 items-center">
              {/* Text Section - Our Product */}
              <div className="order-1 md:order-1 flex flex-col items-center text-center md:text-left p-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-widest">
                  OUR PRODUCT
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-8">
                  We create styles designed by our in-house talent which are
                  made to equip millennial women with outfits to conquer all
                  phases of life. We constantly provide our angels with new,
                  alluring collections and styles in the form of ready-to-go
                  outfits. Established in 2007, Kelly Felder has risen through
                  the extremely competitive ranks in the Sri Lankan fashion
                  industry to be the leading fashion brand in the island that
                  single-handedly caters to any and all fashion related
                  requirements of every woman.
                </p>
                <a
                  href="javascript:void(0);"
                  className="inline-block px-8 py-3 bg-black text-white font-semibold rounded-md shadow-lg hover:bg-gray-800 transition-colors duration-300"
                >
                  EXPLORE
                </a>
              </div>

              {/* Image Section - Our Product */}
              <div className="order-2 md:order-2 flex justify-center">
                <img
                  src="https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg" // Place your image in public/images/
                  alt="Woman in black dress"
                  className="w-full max-w-lg h-auto shadow-xl object-cover"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
      
    </div>
  );
};

export default AboutUsPage;