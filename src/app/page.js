"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Services Data matching the poster details
const SERVICES_DATA = [
  {
    id: "ppf",
    title: "Paint Protection Film (PPF)",
    category: "detailing",
    description: "Ultra-durable, self-healing polyurethane film that shields your car's paint from scratches, stone chips, bird droppings, and road debris.",
    price: "Elite Shield",
    icon: "🛡️"
  },
  {
    id: "ceramic",
    title: "Ceramic Coating",
    category: "detailing",
    description: "High-gloss 9H nano-ceramic liquid shield that provides hydrophobic protection, chemical resistance, and long-lasting paint brilliance.",
    price: "9H Protection",
    icon: "✨"
  },
  {
    id: "restoration",
    title: "Paint Restoration",
    category: "detailing",
    description: "Multi-stage machine compounding and polishing to eliminate paint swirls, light scratches, and restore a factory showroom gloss.",
    price: "Showroom Gloss",
    icon: "🌀"
  },
  {
    id: "wraps",
    title: "Vinyl Wraps & Styling",
    category: "detailing",
    description: "Give your car a completely new custom aesthetic with our premium colored or textured vinyl wraps from industry-leading brands.",
    price: "Custom Styling",
    icon: "🚗"
  },
  {
    id: "servicing",
    title: "Car Servicing & Tuning",
    category: "mechanical",
    description: "Comprehensive multibrand car maintenance including engine oil change, filters, spark plugs, brakes check, and computerized diagnostics.",
    price: "OEM Standard",
    icon: "🔧"
  },
  {
    id: "alignment",
    title: "Wheel Alignment & Balancing",
    category: "mechanical",
    description: "Precision laser alignment and computerized balancing to ensure optimal handling, smooth drives, and extended tyre life.",
    price: "Laser Precision",
    icon: "⚙️"
  },
  {
    id: "tyres",
    title: "Tyres & Tyre Repair",
    category: "mechanical",
    description: "Top-brand tyre sales, fitment, punctures repair, and health checkups for safety across all weather conditions.",
    price: "Premium Brands",
    icon: "⭕"
  },
  {
    id: "denting",
    title: "Denting & Painting",
    category: "mechanical",
    description: "Flawless dent removal and oven-baked paint matching using imported paint booths to restore body panels to original condition.",
    price: "Factory Finish",
    icon: "🎨"
  },
  {
    id: "wash-ext",
    title: "Premium Exterior Wash",
    category: "washing",
    description: "Ph-neutral active snow foam bath, detailed alloy wheel cleaning, underbody rinse, and microfiber hand dry.",
    price: "Snow Foam Wash",
    icon: "🧽"
  },
  {
    id: "wash-int",
    title: "Premium Interior Cleaning",
    category: "washing",
    description: "Deep carpet vacuuming, dashboard restoration, steam cleaning of upholstery, and conditioning of premium leather elements.",
    price: "Deep Sanitized",
    icon: "🧹"
  },
  {
    id: "windshield",
    title: "Windshield Treatment",
    category: "washing",
    description: "Anti-glare hydrophobic coating for front windshields to ensure maximum water shedding and perfect visibility in heavy Indore rains.",
    price: "Rain Shield",
    icon: "🌧️"
  },
  {
    id: "insurance",
    title: "Insurance Assistance",
    category: "washing",
    description: "Hassle-free accidental claims support, documentation help, and tie-ups with major insurance firms for cashless workshop repairs.",
    price: "Cashless Garage",
    icon: "📄"
  }
];

// Car Brands shown on the poster badge list
const BRAND_PARTNERS = [
  { name: "Audi", symbol: "🇩🇪" },
  { name: "BMW", symbol: "🏎️" },
  { name: "Mercedes", symbol: "⭐" },
  { name: "Jaguar", symbol: "🐆" },
  { name: "Ferrari", symbol: "🐎" },
  { name: "Porsche", symbol: "🛡️" },
  { name: "Land Rover", symbol: "🏔️" },
  { name: "Honda", symbol: "🇯🇵" },
  { name: "Hyundai", symbol: "🇰🇷" },
  { name: "Mahindra", symbol: "⛰️" },
  { name: "Kia", symbol: "⚡" },
  { name: "Tata", symbol: "🇮🇳" },
  { name: "Maruti Suzuki", symbol: "🛣️" }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Slider State (Interactive PPF comparison)
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDragging = useRef(false);
  const sliderContainerRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    carBrand: "",
    service: ""
  });

  const handleSliderMove = (clientX) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    handleSliderMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    if (e.touches && e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please enter your name and phone number.");
      return;
    }

    // Compose Whatsapp Message
    const text = `Hi BM Motors! I would like to book a service appointment.%0A%0A*Customer Details:*%0A👤 Name: ${encodeURIComponent(formData.name)}%0A📞 Phone: ${encodeURIComponent(formData.phone)}%0A🚗 Vehicle Brand: ${encodeURIComponent(formData.carBrand || "Not specified")}%0A⚙️ Service Needed: ${encodeURIComponent(formData.service || "General Inquiry")}%0A%0APlease let me know the available slot. Thanks!`;
    
    // Primary number: +91 96308 09008
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919630809008&text=${text}`;
    window.open(whatsappUrl, "_blank");
  };

  const filteredServices = activeCategory === "all" 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(s => s.category === activeCategory);

  return (
    <>
      {/* Sticky Header Nav */}
      <header className="header">
        <div className="container header-container">
          <a href="#" className="logo-link">
            <div className="logo-text">
              BM<span>MOTORS</span>
              <span className="logo-badge">Multibrand</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav>
            <ul className="nav-menu">
              <li><a href="#" className="nav-link">Home</a></li>
              <li><a href="#ppf-spotlight" className="nav-link">PPF Protection</a></li>
              <li><a href="#services" className="nav-link">Services</a></li>
              <li><a href="#why-us" className="nav-link">Why Choose Us</a></li>
              <li><a href="#book" className="nav-link">Contact</a></li>
            </ul>
          </nav>

          <div className="nav-actions">
            <a href="tel:+919630809008" className="nav-phone">
              📞 +91 96308 09008
            </a>
            <a href="#book" className="btn-primary" style={{ padding: "0.6rem 1.5rem", fontSize: "0.9rem" }}>
              Book Service
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div style={{
            background: "var(--bg-secondary)",
            padding: "2rem",
            borderBottom: "1px solid var(--border-glass)",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem"
          }}>
            <a href="#" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#ppf-spotlight" className="nav-link" onClick={() => setMobileMenuOpen(false)}>PPF Protection</a>
            <a href="#services" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#why-us" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Why Choose Us</a>
            <a href="#book" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact Details</a>
            <a href="tel:+919630809008" className="btn-primary" style={{ textAlign: "center" }}>
              Call BM Motors
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content animate-fade-in">
            <div className="hero-tagline">
              Premium Car Detailing & Workshop
            </div>
            <h1 className="hero-title">
              Give Your Car A<br />
              <span>Fresh New Look!</span>
            </h1>
            <p className="hero-description">
              BM Motors Multibrand Workshop in Indore provides elite Paint Protection Film (PPF), advanced ceramic coatings, professional mechanical repairs, and detailing to make your car shine like new.
            </p>
            <div className="hero-buttons">
              <a href="#book" className="btn-primary">
                📅 Schedule Appointment
              </a>
              <a 
                href="https://api.whatsapp.com/send?phone=919630809008&text=Hi%20BM%20Motors!%20I'm%20visiting%20your%20website%20and%20want%20to%20inquire%20about%20detailing%20and%20car%20wash%20packages."
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                💬 WhatsApp Chat
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">100%<span>+</span></span>
                <span className="stat-label">Luxury Brands Handled</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">9H<span>+</span></span>
                <span className="stat-label">Ceramic Hardness</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7<span></span></span>
                <span className="stat-label">Accident Assistance</span>
              </div>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="hero-glow"></div>
            <div className="hero-image-container">
              <Image 
                src="/hero_servicing.png" 
                alt="BM Motors Premium Car Servicing & Diagnostics" 
                fill 
                style={{ objectFit: "cover" }} 
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brands Ticker */}
      <section className="ticker-section">
        <div className="container">
          <p className="ticker-title">WE CARE FOR PREMIUM AUTOMOTIVES WORLDWIDE</p>
        </div>
        <div className="ticker-wrap">
          {/* Scroll Track duplicated to ensure continuous scroll loop */}
          <div className="ticker-track">
            {BRAND_PARTNERS.map((brand, i) => (
              <div className="brand-badge" key={`brand1-${i}`}>
                <span className="brand-logo-circle">{brand.symbol}</span>
                {brand.name}
              </div>
            ))}
            {BRAND_PARTNERS.map((brand, i) => (
              <div className="brand-badge" key={`brand2-${i}`}>
                <span className="brand-logo-circle">{brand.symbol}</span>
                {brand.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight Segment: Paint Protection Film */}
      <section className="ppf-spotlight" id="ppf-spotlight">
        <div className="container ppf-grid">
          {/* Interactive slider component */}
          <div className="slider-showcase">
            <div 
              className="slider-container" 
              ref={sliderContainerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseDown={() => { isDragging.current = true; }}
              onTouchStart={() => { isDragging.current = true; }}
            >
              {/* BEFORE: Without PPF (Slightly faded / blurred) */}
              <div className="slider-image slider-before">
                <Image 
                  src="/ppf_xuv700.png" 
                  alt="Without Paint Protection Film" 
                  fill 
                  style={{ objectFit: "cover", filter: "saturate(0.5) brightness(0.65) blur(0.8px)" }} 
                />
              </div>

              {/* AFTER: With PPF (Vibrant, high-gloss) */}
              <div 
                className="slider-image slider-after" 
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <Image 
                  src="/ppf_xuv700.png" 
                  alt="With Paint Protection Film" 
                  fill 
                  style={{ objectFit: "cover" }} 
                />
              </div>

              {/* Slider boundary line */}
              <div className="slider-bar" style={{ left: `${sliderPosition}%` }}>
                <div className="slider-button">↔</div>
              </div>

              <div className="slider-label label-before">Unprotected</div>
              <div className="slider-label label-after">BM PPF Gloss Shield</div>
            </div>
            <div style={{ textAlign: "center", padding: "1rem", fontSize: "0.85rem", color: "var(--text-secondary)", background: "var(--bg-secondary)" }}>
              ← Drag slider to visualize gloss and protection enhancement →
            </div>
          </div>

          <div className="ppf-content">
            <span className="section-subtitle">Premium Styling Spotlight</span>
            <h2 className="section-title accent" style={{ textAlign: "left", marginBottom: "1.5rem" }}>
              Stunning Paint Protection<br />
              <span>Film (PPF) Shield</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
              Our ultra-premium Paint Protection Film wraps your luxury vehicle in a virtual transparent shield. It heals itself from swirl marks under direct sunlight, protects paint from environmental damage, and preserves original factory shine forever.
            </p>

            <div className="ppf-benefits">
              <div className="ppf-benefit-item">
                <span className="ppf-benefit-icon">✓</span>
                <div>
                  <h4 className="ppf-benefit-title">Self-Healing Film</h4>
                  <p className="ppf-benefit-desc">Scratches disappear with minor heat application from sunlight or water.</p>
                </div>
              </div>
              <div className="ppf-benefit-item">
                <span className="ppf-benefit-icon">✓</span>
                <div>
                  <h4 className="ppf-benefit-title">UV & Stain Shield</h4>
                  <p className="ppf-benefit-desc">Prevents chemical etching, acid rain damage, and paint fading from Indore sun.</p>
                </div>
              </div>
              <div className="ppf-benefit-item">
                <span className="ppf-benefit-icon">✓</span>
                <div>
                  <h4 className="ppf-benefit-title">Extreme Gloss Layer</h4>
                  <p className="ppf-benefit-desc">Adds a deep water-reflection shine that lasts for years, not weeks.</p>
                </div>
              </div>
              <div className="ppf-benefit-item">
                <span className="ppf-benefit-icon">✓</span>
                <div>
                  <h4 className="ppf-benefit-title">High Resale Value</h4>
                  <p className="ppf-benefit-desc">Keeps the original paint factory-fresh and free from stone chips.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="services" id="services">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">What We Do Best</span>
            <h2 className="section-title">
              Our <span>Workshop Solutions</span>
            </h2>
          </div>

          <div className="services-filter">
            <button 
              className={`filter-btn ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              All Services
            </button>
            <button 
              className={`filter-btn ${activeCategory === "detailing" ? "active" : ""}`}
              onClick={() => setActiveCategory("detailing")}
            >
              Detailing & Protection
            </button>
            <button 
              className={`filter-btn ${activeCategory === "mechanical" ? "active" : ""}`}
              onClick={() => setActiveCategory("mechanical")}
            >
              Mechanical Solutions
            </button>
            <button 
              className={`filter-btn ${activeCategory === "washing" ? "active" : ""}`}
              onClick={() => setActiveCategory("washing")}
            >
              Washing & Care
            </button>
          </div>

          <div className="services-grid">
            {filteredServices.map((service) => (
              <div className="service-card" key={service.id}>
                <div className="service-icon-box">
                  <span style={{ fontSize: "1.75rem" }}>{service.icon}</span>
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>
                <div className="service-card-footer">
                  <div className="service-price">
                    Service Tier: <span>{service.price}</span>
                  </div>
                  <a href="#book" className="service-link">
                    Book Now <span>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-us" id="why-us">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">The BM Motors Guarantee</span>
            <h2 className="section-title">
              Why Car Enthusiasts <span>Trust Us</span>
            </h2>
          </div>

          <div className="why-us-grid">
            <div className="why-card">
              <div className="why-icon">🏆</div>
              <h3 className="why-title">Multibrand Competence</h3>
              <p className="why-desc">From daily hatchbacks to exotic German sedans (BMW, Mercedes, Audi) and SUVs, our experts possess certified multibrand diagnostic expertise.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">🛡️</div>
              <h3 className="why-title">Certified detailing</h3>
              <p className="why-desc">We use premium Paint Protection Films, official 9H coatings, and imported tooling setups to ensure detailing quality matches global standards.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">💸</div>
              <h3 className="why-title">No Surprise Pricing</h3>
              <p className="why-desc">Fully transparent estimations before starting the work. Safe claims support and cashless garage options for your mental peace.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Booking & Info */}
      <section className="estimator" id="book">
        <div className="container estimator-container">
          <div className="estimator-info">
            <span className="section-subtitle">Get In Touch</span>
            <h2>
              Ready to Give Your Car<br />
              the <span>BM Motors Treatment?</span>
            </h2>
            <p>
              Fill out this quick service query form. It will formulate your booking request and connect you directly to our workshop manager over WhatsApp. Alternatively, call us directly on the numbers below.
            </p>

            <div className="info-cards">
              <div className="info-card-item">
                <div className="info-card-icon">📍</div>
                <div className="info-card-text">
                  <span>Workshop Location</span>
                  <p>Plot No. 1985, Scheme No. 114, Indore</p>
                </div>
              </div>
              <div className="info-card-item">
                <div className="info-card-icon">📞</div>
                <div className="info-card-text">
                  <span>Call to Schedule</span>
                  <p>+91 96308 09008 / +91 99074 12412</p>
                </div>
              </div>
              <a 
                href="https://www.instagram.com/_bm_motors/?hl=en" 
                target="_blank" 
                rel="noreferrer" 
                className="info-card-item" 
                style={{ cursor: "pointer", transition: "var(--transition-smooth)" }}
              >
                <div className="info-card-icon">📸</div>
                <div className="info-card-text">
                  <span>Instagram Profile</span>
                  <p style={{ color: "var(--text-primary)" }}>@_bm_motors</p>
                </div>
              </a>
            </div>
          </div>

          <div className="glass-card form-card">
            <h3 className="form-title">Service Booking Request</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Enter full name" 
                  className="form-control" 
                  value={formData.name}
                  onChange={handleFormChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number (WhatsApp preferred)</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  placeholder="Enter 10-digit number" 
                  className="form-control"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required 
                />
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="carBrand">Car Brand</label>
                  <select 
                    id="carBrand" 
                    name="carBrand" 
                    className="form-control"
                    value={formData.carBrand}
                    onChange={handleFormChange}
                  >
                    <option value="">Choose Brand</option>
                    <option value="Audi">Audi</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes">Mercedes-Benz</option>
                    <option value="Jaguar">Jaguar</option>
                    <option value="Porsche">Porsche</option>
                    <option value="Land Rover">Land Rover</option>
                    <option value="Kia">Kia</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Honda">Honda</option>
                    <option value="Tata">Tata Motors</option>
                    <option value="Mahindra">Mahindra</option>
                    <option value="Maruti Suzuki">Maruti Suzuki</option>
                    <option value="Other">Other Brand</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="service">Desired Service</label>
                  <select 
                    id="service" 
                    name="service" 
                    className="form-control"
                    value={formData.service}
                    onChange={handleFormChange}
                  >
                    <option value="">Select Service</option>
                    <option value="PPF Shield">Paint Protection Film (PPF)</option>
                    <option value="Ceramic Coating">Ceramic Coating 9H</option>
                    <option value="Paint Restoration">Paint Restoration & Polish</option>
                    <option value="Vinyl Wrap">Vinyl Color Wrapping</option>
                    <option value="General Car Servicing">Complete Car Servicing</option>
                    <option value="Wheel Alignment & Balancing">Wheel Alignment / Balancing</option>
                    <option value="Premium Exterior/Interior Clean">Premium Wash & Vacuum</option>
                    <option value="Other Repair Work">Other Services</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-primary btn-submit">
                🚀 Proceed to Book via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Segment */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <h3>BM<span>MOTORS</span></h3>
            <p>
              Premium multibrand mechanical and detailing studio in Indore, MP. Giving cars a fresh new look with Paint Protection Film, coatings, and absolute professional engineering.
            </p>
            <div className="footer-socials">
              <a 
                href="https://www.instagram.com/_bm_motors/?hl=en" 
                target="_blank" 
                rel="noreferrer" 
                className="social-icon"
                aria-label="Instagram"
              >
                📸
              </a>
              <a 
                href="https://api.whatsapp.com/send?phone=919630809008" 
                target="_blank" 
                rel="noreferrer" 
                className="social-icon"
                aria-label="WhatsApp"
              >
                💬
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#">Home Base</a></li>
              <li><a href="#ppf-spotlight">Paint Protection (PPF)</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#why-us">Why Trust Us</a></li>
              <li><a href="#book">Book Appointment</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Workshop Details</h4>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📍</span>
              <div className="footer-contact-text">
                Plot No. 1985, Scheme No. 114,<br />
                Near AP Bakers, Vijay Nagar,<br />
                Indore, Madhya Pradesh
              </div>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📞</span>
              <div className="footer-contact-text">
                +91 96308 09008<br />
                +91 99074 12412
              </div>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">⏰</span>
              <div className="footer-contact-text">
                Mon - Sat: 10:00 AM - 8:00 PM<br />
                Sunday: Closed
              </div>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Location Map</h4>
            <div className="footer-map-container" style={{ position: "relative" }}>
              {/* Simulated Map View with clean visual */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #1c202a 0%, #0d0f15 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                textAlign: "center"
              }}>
                <span style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>📍</span>
                <p style={{ fontSize: "0.75rem", margin: 0, color: "var(--text-primary)", fontWeight: 700 }}>Vijay Nagar, Indore</p>
                <p style={{ fontSize: "0.65rem", margin: "0.2rem 0 0.5rem", color: "var(--text-secondary)" }}>Near AP Bakers, Scheme 114</p>
                <a 
                  href="https://maps.google.com/?q=BM+Motors+Vijay+Nagar+Indore" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-primary" 
                  style={{ padding: "0.3rem 0.8rem", fontSize: "0.7rem", borderRadius: "4px", boxShadow: "none" }}
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} BM Motors Multibrand Workshop. All Rights Reserved.</p>
          <p>Designed with ❤️ for premium performance.</p>
        </div>
      </footer>
    </>
  );
}
