{
  /* Categories */
}
<div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
  {categories.map((category) => (
    <Link
      key={category.title}
      to={category.link}
      className="group overflow-hidden rounded-2xl border border-[#E8F5E9] bg-white shadow-[0_4px_15px_rgba(27,94,32,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(27,94,32,0.12)]"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={category.image}
          alt={category.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B5E20]/70 via-[#1B5E20]/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-['Poppins'] text-lg font-semibold text-[#1B5E20]">
              {category.title}
            </h3>

            <p className="mt-2 font-['Inter'] text-sm leading-6 text-[#607D8B]">
              {category.description}
            </p>
          </div>

          {/* Gold circle arrow */}
          <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F9C74F] font-semibold text-[#1B5E20] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#1B5E20] group-hover:text-white">
            →
          </span>
        </div>
      </div>
    </Link>
  ))}
</div>;
