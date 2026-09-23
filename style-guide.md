# Farmer's MarketLink --- Style Guide

**Fresh Produce • Local Farmers • Better Communities**

## 1. Brand Colors

Use this palette consistently across the website to create a fresh,
natural, trustworthy, and modern farming-market identity.

  -----------------------------------------------------------------------
  Color             Hex               Role              Recommended Use
  ----------------- ----------------- ----------------- -----------------
  **Deep Green**    `#1B5E20`         Primary           Navbar, footer,
                                                        headings, primary
                                                        buttons

  **Light Green**   `#A5D6A7`         Section           Feature sections,
                                      Background        category
                                                        sections, soft
                                                        panels

  **Harvest Gold**  `#F9C74F`         Secondary /       CTAs, active
                                      Accent            states, prices,
                                                        highlights

  **Cream**         `#FFFDF5`         Main Background   Page background,
                                                        cards, large
                                                        content areas

  **Dark Text**     `#263238`         Text              Headings,
                                                        paragraphs,
                                                        labels

  **Light Gray**    `#E8F5E9`         Borders / Subtle  Dividers,
                                      Background        borders, input
                                                        backgrounds,
                                                        badges

  **Success Green** `#2E7D32`         Success           Success messages,
                                                        verified badges,
                                                        confirmation
                                                        states

  **Warning         `#FFF3CD`         Warning           Alerts and
  Yellow**                                              notices
  -----------------------------------------------------------------------

### Color Hierarchy

-   **Primary:** `#1B5E20` --- dominant brand color.
-   **Section Background:** `#A5D6A7` --- creates visual separation
    between sections.
-   **Secondary:** `#F9C74F` --- use sparingly to attract attention.
-   **Background:** `#FFFDF5` --- keeps the interface warm and spacious.
-   **Text:** `#263238` --- provides readable contrast.

> **Important:** Do not make every section green. Deep Green should
> establish the brand, Light Green should support sections, and Harvest
> Gold should highlight important actions.

------------------------------------------------------------------------

## 2. Typography

### Primary Font --- Poppins

**Use for:** - H1--H3 headings - Navigation - Buttons - Section titles -
Product names - Important labels

**Recommended weights:** - Poppins SemiBold --- `600` - Poppins Bold ---
`700`

Poppins gives Farmer's MarketLink a modern, friendly, and approachable
appearance.

### Body Font --- Inter

**Use for:** - Paragraphs - Product descriptions - Form labels - Input
text - Prices - Supporting information

**Recommended weights:** - Inter Regular --- `400` - Inter Medium ---
`500` - Inter SemiBold --- `600`

Inter keeps longer text clean and easy to read.

### Recommended Type Scale

  Element          Desktop     Mobile Weight
  ------------- ---------- ---------- ------------------
  H1              40--52px   32--40px Poppins Bold
  H2              28--36px   24--30px Poppins SemiBold
  H3              20--24px   18--22px Poppins SemiBold
  Body                16px   15--16px Inter Regular
  Small Text      13--14px   12--14px Inter Regular
  Button Text     14--16px   14--15px Poppins SemiBold

### Google Fonts

``` css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');
```

``` css
body {
  font-family: 'Inter', sans-serif;
}

h1, h2, h3, h4, h5, h6,
button,
nav {
  font-family: 'Poppins', sans-serif;
}
```

------------------------------------------------------------------------

## 3. Buttons

### Primary Button

-   Background: `#1B5E20`
-   Text: `#FFFFFF`
-   Hover: slightly darker green
-   Use for major actions.

**Examples:** - Shop Now - Register - Login - View Products

### Secondary Button

-   Background: `#F9C74F`
-   Text: `#263238`
-   Use for important supporting actions.

**Examples:** - Add to Cart - Send Message - Register as Farmer

### Outline Button

-   Background: transparent
-   Border: `#1B5E20`
-   Text: `#1B5E20`
-   Use for less prominent actions.

**Examples:** - Meet Our Farmers - Learn More - View Details

### Button Style

Recommended: - Border radius: `8–12px` - Padding: `12px 20px` - Font:
Poppins SemiBold - Use subtle hover transitions.

------------------------------------------------------------------------

## 4. Navigation

### Desktop Navbar

-   Background: `#1B5E20`
-   Logo: White + Harvest Gold
-   Navigation text: White
-   Active navigation indicator: `#F9C74F`
-   Search input: `#FFFDF5`
-   Icons: White or Harvest Gold

### Mobile Navbar

-   Background: `#1B5E20`
-   Hamburger icon: White
-   Logo: White + Harvest Gold
-   Menu links: Cream / White
-   Active link: Harvest Gold

------------------------------------------------------------------------

## 5. Cards

### Product Card

**Background:** `#FFFDF5`

**Recommended elements:** - Product image - Product name - Category
badge - Price - Quantity/unit - Add to Cart button - Favorite icon where
needed

**Card styling:** - Border: `#E8F5E9` - Border radius: `12–16px` -
Minimal shadow - Comfortable internal spacing

### Category Card

Use: - Light Green background - Product/category image - Deep Green
heading - Short description - Harvest Gold CTA

### Farmer Card

Include: - Farmer image - Farmer name - Location - Main products -
Verification badge - View Profile button

------------------------------------------------------------------------

## 6. Forms

### Input

-   Background: `#FFFFFF`
-   Border: `#E8F5E9`
-   Text: `#263238`
-   Placeholder: muted gray
-   Focus border: `#2E7D32`
-   Border radius: `8px`

### Form Labels

-   Font: Inter Medium
-   Color: `#263238`
-   Size: `14px`

### Form CTA

Use **Harvest Gold** for high-attention form actions or **Deep Green**
for primary account actions.

------------------------------------------------------------------------

## 7. Search & Filters

### Search Bar

-   Background: `#FFFDF5`
-   Border: `#E8F5E9`
-   Search icon/button: `#2E7D32`
-   Focus border: `#2E7D32`

### Category Filter

Recommended categories:

-   All Products
-   Fruits
-   Vegetables
-   Livestock
-   Grains
-   Dairy
-   Others

Active category: - Background: `#1B5E20` - Text: White

Inactive category: - Background: `#E8F5E9` - Text: `#263238`

------------------------------------------------------------------------

## 8. Badges

### Fresh Produce

-   Background: `#E8F5E9`
-   Text: `#2E7D32`

### New

-   Background: `#1B5E20`
-   Text: White

### Verified Farmer

-   Background: `#A5D6A7`
-   Text: `#1B5E20`

### Warning

-   Background: `#FFF3CD`
-   Text: `#263238`

------------------------------------------------------------------------

## 9. Icons

Use simple, clean icons that communicate:

-   🌱 Farming
-   🛒 Shopping
-   🚚 Delivery
-   👨‍🌾 Farmers
-   📍 Location
-   📞 Phone
-   ✉️ Email
-   ❤️ Favorites
-   🔍 Search
-   👤 Account

### Icon Style

Prefer: - Outline icons - Rounded icons - Simple agricultural symbols -
Consistent stroke weight

Avoid mixing many different icon styles on the same page.

------------------------------------------------------------------------

## 10. Imagery

### Photography Style

Use bright, natural, authentic photography featuring:

-   Local farmers
-   Fresh fruits
-   Vegetables
-   Livestock
-   Farms and fields
-   Harvesting
-   Farmers' markets
-   Fresh produce baskets

### Product Images

Product images should ideally be:

-   Clean
-   Well-lit
-   High quality
-   Centered
-   Easy to recognize
-   On light or neutral backgrounds

### Avoid

-   Low-resolution images
-   Excessive filters
-   Heavy artificial effects
-   Unrelated stock images
-   Dark product photography

------------------------------------------------------------------------

## 11. Page Design

### Home Page

Recommended structure:

1.  Navbar
2.  Hero section
3.  Market categories
4.  Featured products
5.  How it works
6.  Featured farmers
7.  Benefits / trust section
8.  Call to action
9.  Footer

### About Us

Recommended structure:

1.  Page hero
2.  Who We Are
3.  Our Mission
4.  Our Story
5.  Our Values
6.  Farmer/community section
7.  Call to action
8.  Footer

### Contact Us

Recommended structure:

1.  Page hero
2.  Contact information
3.  Contact form
4.  Location/map section
5.  Working hours
6.  Social media
7.  Footer

### Products

Recommended structure:

1.  Page header
2.  Search
3.  Category filters
4.  Sort dropdown
5.  Product grid
6.  Pagination / Load More
7.  Footer

### Market Categories

Main categories:

-   **Fruits**
-   **Vegetables**
-   **Livestock**

Optional categories:

-   Grains
-   Dairy
-   Herbs
-   Other Farm Products

------------------------------------------------------------------------

## 12. Spacing

Use a consistent spacing system.

  Size     Value Use
  ------ ------- -----------------------
  XS         4px Small gaps
  SM         8px Icon/text spacing
  MD        16px Card/internal spacing
  LG        24px Component spacing
  XL        32px Section spacing
  2XL       48px Large section spacing
  3XL       64px Hero/major sections

Recommended desktop page width:

``` text
max-width: 1200px
```

Recommended mobile side padding:

``` text
16px
```

Recommended desktop side padding:

``` text
24px–40px
```

------------------------------------------------------------------------

## 13. Border Radius

Use consistent rounded corners:

-   Inputs: `8px`
-   Buttons: `8–12px`
-   Cards: `12–16px`
-   Large feature sections: `16–24px`
-   Images: `12–16px`

Avoid excessive pill-shaped components unless they are badges or tags.

------------------------------------------------------------------------

## 14. Shadows

Keep shadows subtle.

Recommended:

``` css
box-shadow: 0 4px 15px rgba(27, 94, 32, 0.08);
```

Use shadows mainly for: - Product cards - Dropdowns - Modals - Floating
elements

Avoid heavy shadows across the entire website.

------------------------------------------------------------------------

## 15. Brand Personality

Farmer's MarketLink should feel:

-   🌱 Fresh
-   👨‍🌾 Local
-   🤝 Trustworthy
-   🛒 Convenient
-   🌾 Natural
-   💚 Community-focused
-   ✨ Modern but approachable

The overall design should communicate:

> **Fresh Produce • Local Farmers • Better Communities**

------------------------------------------------------------------------

## 16. Quick Reference

``` text
PRIMARY
#1B5E20  Deep Green

SECTION BACKGROUND
#A5D6A7  Light Green

SECONDARY / ACCENT
#F9C74F  Harvest Gold

BACKGROUND
#FFFDF5  Cream

TEXT
#263238  Dark Text

BORDER / SOFT BACKGROUND
#E8F5E9  Light Gray

SUCCESS
#2E7D32  Success Green

WARNING
#FFF3CD  Warning Yellow
```

### Fonts

``` text
Headings: Poppins 600 / 700
Body:     Inter 400 / 500
Buttons:  Poppins 600
Labels:   Inter 500
```

### Design Direction

**Clean • Fresh • Natural • Modern • Friendly • Agricultural**
