import React from 'react'

const categories = [
  {
    title: 'Crop & Grain Farms',
    badge: 'Staple Harvest',
    image: '/images/Crop%20and%20Grain%20Farms/crop%20and%20grain.jfif',
    description:
      'Maize, wheat, rice, and sorghum grown for reliable food supply and daily nutrition.',
  },
  {
    title: 'Horticulture & Vegetable Farms',
    badge: 'Fresh Produce',
    image:
      '/images/Horticulture%20and%20Vegetable%20Farms/Horticulture%20and%20Vegetable%20Farms.jfif',
    description:
      'Fresh fruits, greens, and vegetables grown for taste, health, and local variety.',
  },
  {
    title: 'Livestock & Dairy Farms',
    badge: 'Healthy Living',
    image: '/images/Livestock%20and%20Dairy%20Farms/Livestock%20and%20Dairy%20Farms.jfif',
    description:
      'Milk, meat, and livestock products from farms focused on quality and care.',
  },
  {
    title: 'Poultry & Egg Farms',
    badge: 'Protein Source',
    image: '/images/Poultry%20and%20Egg%20Farms/Poultry%20and%20Egg%20Farms.jfif',
    description:
      'Eggs and poultry raised with care for everyday nutrition and freshness.',
  },
]

function Categories() {
  return (
    <section className="category-section" id="categories">
      <div className="section-shell">
        <div className="section-header">
          <span className="section-kicker">Farm Categories</span>
          <h2>Explore the diversity of farming</h2>
          <p>
            Local producers powering food, health, and growth in every community.
          </p>
        </div>

        <div className="category-grid">
          {categories.map(({ title, badge, image, description }) => (
            <article className="category-card" key={title}>
              <div className="category-image-wrap">
                <img src={image} alt={title} className="category-image" />
              </div>

              <div className="category-content">
                <span className="category-badge">{badge}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <button type="button" className="category-button">
                  View
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories