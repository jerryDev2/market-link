import React from 'react'

const features = [
  {
    icon: '🌾',
    title: 'Direct from Farmers',
    description:
      'Connect with trusted local growers and shop fresh produce harvested close to home.',
    image: '/images/why choose us/local-farmer 2.jfif',
  },
  {
    icon: '📍',
    title: 'Find Nearby Markets',
    description:
      'Discover the best farm markets and stalls near you with location-based convenience.',
    image: '/images/why choose us/market-stall.jfif',
  },
  {
    icon: '📱',
    title: 'Pre-Order Easily',
    description:
      'Reserve your favorite foods in advance and pick them up without the stress of last-minute queues.',
    image: '/images/why choose us/farmer-phone.jfif',
  },
  {
    icon: '🤝',
    title: 'Support the Community',
    description:
      'Build stronger local relationships while helping farmers and families thrive together.',
    image: '/images/why choose us/community 2.jfif',
  },
]

function WhyChooseUs() {
  return (
    <section className="bg-[#FFFDF5] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1B5E20]">
            Why choose us
          </p>
          <h2 className="mt-4 text-3xl font-bold text-[#1B5E20] sm:text-4xl lg:text-5xl">
            A better way to buy local
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#263238]/80 sm:text-lg">
            MarketLink makes it easier for families to shop fresh, local food while helping farmers grow sustainable businesses.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map(({ icon, title, description, image }) => (
            <article
              key={title}
              className="group overflow-hidden rounded-[26px] border border-[#E8F5E9] bg-white shadow-[0_20px_40px_rgba(27,94,32,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_48px_rgba(27,94,32,0.12)]"
            >
              <div className="relative h-52 overflow-hidden bg-[#A5D6A7]">
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#FFFDF5]/90 text-2xl shadow-sm">
                  {icon}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-[#1B5E20]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#263238]/80">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs