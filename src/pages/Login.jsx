import React from 'react'
import { Link } from 'react-router-dom';

const marketHighlights = [
  {
    title: 'Fresh weekly stock',
    description: 'See what local farmers have available before you travel.',
  },
  {
    title: 'Reserve ahead',
    description: 'Save your favorite produce and pickup details in advance.',
  },
  {
    title: 'Local trust',
    description: 'Support nearby growers and discover quality produce close to home.',
  },
  {
    title: 'Friendly community',
    description: 'Connect with farmers, browse reviews, and discover new favorites.',
  },
];

function Login() {
  return (
    <div className="min-h-screen hidden sm-block bg-[#FFFDF5] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-[#E8F5E9] bg-white shadow-[0_25px_80px_rgba(27,94,32,0.08)]">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <section className="bg-[#A5D6A7] p-6 sm:p-8 lg:p-12">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1B5E20] text-lg font-bold text-white shadow-sm">
                M
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1B5E20]">
                  MarketLink
                </p>
                <h2 className="text-xl font-bold text-[#1B5E20]">Farmers market made simple</h2>
              </div>
            </div>

            <div className="mt-10 max-w-md">
              <span className="inline-flex rounded-full border border-[#1B5E20]/20 bg-[#FFFDF5]/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#1B5E20]">
                Fresh produce • Local farmers
              </span>
              <h1 className="mt-5 text-3xl font-bold leading-tight text-[#1B5E20] sm:text-4xl lg:text-5xl">
                Join your local market community.
              </h1>
              <p className="mt-4 text-base leading-7 text-[#263238] sm:text-lg">
                Discover nearby markets, browse weekly produce, reserve favorites for pickup, and support growers in your area.
            </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {marketHighlights.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#E8F5E9] bg-[#FFFDF5]/75 p-4 shadow-sm backdrop-blur-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#F9C74F] text-lg text-[#263238]">
                    ✓
                  </div>
                  <h3 className="text-base font-semibold text-[#1B5E20]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#263238]/80">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-6 sm:p-8 lg:p-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-[#263238]/70">Welcome back</p>
                <h2 className="mt-1 text-3xl font-bold text-[#1B5E20] sm:text-4xl">Sign in</h2>
              </div>
              <span className="inline-flex w-fit items-center rounded-full bg-[#F9C74F] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#263238]">
                Quick access
              </span>
            </div>

            <form className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#263238]">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#E8F5E9] bg-white px-4 py-3 text-base text-[#263238] placeholder:text-[#263238]/45 focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#263238]">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-[#E8F5E9] bg-white px-4 py-3 text-base text-[#263238] placeholder:text-[#263238]/45 focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input id="remember" type="checkbox" className="h-4 w-4 rounded border-[#2E7D32] text-[#1B5E20] focus:ring-[#2E7D32]" />
                  <label htmlFor="remember" className="text-sm font-medium text-[#2632=38]">
                    Remember me
                  </label>
          </div>
                <a href="#" className="text-sm font-semibold text-[#1B5E20] hover:text-[#154a1a]">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#1B5E20] px-5 py-3.5 text-base font-semibold text-white transition hover:bg-[#154a1a] focus:outline-none focus:ring-4 focus:ring-[#1B5E20]/20"
              >
                Sign in
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#263238]/70">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-[#1B5E20] hover:text-[#154a1a]">
                Sign up
              </Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Login