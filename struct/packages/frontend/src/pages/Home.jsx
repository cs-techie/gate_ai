import React from 'react';

const FeatureCard = ({ icon, title, description, delay }) => (
  <div 
    className="card p-8 text-center"
    style={{ animation: `fadeInUp 0.8s ease-out ${delay}s forwards`, opacity: 0 }}
  >
    <div className="feature-icon mx-auto">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-text-dark mb-3">{title}</h3>
    <p className="text-text-light leading-relaxed">{description}</p>
  </div>
);

const CourseCard = ({ title, lessons, duration, students, image, delay }) => (
  <div 
    className="card overflow-hidden"
    style={{ animation: `fadeInUp 0.8s ease-out ${delay}s forwards`, opacity: 0 }}
  >
    <div className="h-48 bg-gradient-to-br from-primary-light to-primary overflow-hidden flex items-center justify-center">
      {image ? (
        <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-primary-light to-primary" />
      )}
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-text-dark mb-3">{title}</h3>
      <div className="flex items-center gap-4 text-sm text-text-light mb-4">
        <span>📚 {lessons} Lessons</span>
        <span>⏱️ {duration}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-text-light text-sm">{students} Students</span>
        <button className="btn-sm text-sm px-4 py-2">Enroll Now</button>
      </div>
    </div>
  </div>
);

const TestimonialCard = ({ name, role, content, delay }) => (
  <div 
    className="card p-6"
    style={{ animation: `fadeInUp 0.8s ease-out ${delay}s forwards`, opacity: 0 }}
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-light to-primary flex items-center justify-center text-white font-bold">
        {name.charAt(0)}
      </div>
      <div>
        <h4 className="font-semibold text-text-dark">{name}</h4>
        <p className="text-sm text-text-light">{role}</p>
      </div>
    </div>
    <p className="text-text-light italic">"{content}"</p>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0fdf8 0%, #fdf2f8 50%, #f0fdf8 100%)' }}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">

        {/* Background scattered decorations */}
        {/* Top-left green trefoil knot shape */}
        <div className="absolute top-28 left-8 w-14 h-14 opacity-70 animate-float" style={{ animationDelay: '0s' }}>
          <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 10 C20 10, 10 18, 10 28 C10 38, 20 44, 30 44 C40 44, 50 38, 50 28 C50 18, 40 10, 30 10 Z" fill="#22C58B" opacity="0.8"/>
            <circle cx="20" cy="32" r="8" fill="#22C58B" opacity="0.6"/>
            <circle cx="40" cy="32" r="8" fill="#22C58B" opacity="0.6"/>
            <circle cx="30" cy="18" r="8" fill="#22C58B" opacity="0.6"/>
          </svg>
        </div>

        {/* Left squiggly arrow */}
        <div className="absolute top-64 left-6 opacity-60 animate-float" style={{ animationDelay: '1s' }}>
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
            <path d="M5 35 Q15 20 25 30 Q35 40 45 20" stroke="#22C58B" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <path d="M38 14 L45 20 L37 24" stroke="#22C58B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>

        {/* Top-center small green leaf/arrow */}
        <div className="absolute top-24 left-1/2 -translate-x-16 opacity-70 animate-float" style={{ animationDelay: '0.5s' }}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M8 22 Q4 14 12 8 Q20 2 22 12 Q24 22 14 26 Q10 28 8 22Z" fill="#22C58B"/>
            <path d="M14 26 L10 30" stroke="#22C58B" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Right dots grid */}
        <div className="absolute top-36 right-8 opacity-40">
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22C58B' }}></div>
            ))}
          </div>
        </div>

        {/* Bottom-right small dots */}
        <div className="absolute bottom-16 right-16 opacity-30">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22C58B' }}></div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left Text */}
            <div style={{ animation: 'slideInLeft 0.8s ease-out forwards' }}>
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-sm font-medium" style={{ color: '#22C58B' }}>AI-Powered GATE Platform</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: '#1F2937' }}>
                Master GATE with{' '}
                <span style={{ color: '#22C58B' }}>AI-Powered</span>{' '}
                Learning
              </h1>
              <p className="text-lg md:text-xl mb-8" style={{ color: '#6B7280' }}>
                Personalized study plans, comprehensive mock tests, and expert guidance to help you achieve your dream rank.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <button
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  style={{ background: 'linear-gradient(135deg, #4FD1A5, #22C58B)' }}
                >
                  Get Started Free
                </button>
                <button
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold border-2 transition-all duration-300 hover:-translate-y-1"
                  style={{ borderColor: '#22C58B', color: '#22C58B', background: 'white' }}
                >
                  ▶ Watch Demo
                </button>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 mt-10">
                <div>
                  <p className="text-2xl font-bold" style={{ color: '#1F2937' }}>50K+</p>
                  <p className="text-sm" style={{ color: '#6B7280' }}>Students</p>
                </div>
                <div className="w-px bg-gray-200 hidden sm:block"></div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: '#1F2937' }}>130+</p>
                  <p className="text-sm" style={{ color: '#6B7280' }}>AI Tools</p>
                </div>
                <div className="w-px bg-gray-200 hidden sm:block"></div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: '#1F2937' }}>95%</p>
                  <p className="text-sm" style={{ color: '#6B7280' }}>Success Rate</p>
                </div>
              </div>
            </div>

            {/* Right Image with green card background like the reference */}
            <div className="hidden md:block" style={{ animation: 'slideInRight 0.8s ease-out forwards' }}>
              <div className="relative flex justify-center">

                {/* Green rounded card behind image */}
                <div
                  className="relative rounded-[3rem] overflow-visible"
                  style={{
                    background: 'linear-gradient(160deg, #22C58B 0%, #4FD1A5 60%, #a7f3d0 100%)',
                    width: '380px',
                    height: '420px',
                    borderRadius: '40% 40% 40% 40% / 30% 30% 50% 50%',
                  }}
                >
                  {/* Student image sitting on top of the card */}
                  <img
                    src="/images/a1.png"
                    alt="AI Robot girl with holographic display"
                    className="absolute bottom-0 left-1/2 object-contain"
                    style={{
                      transform: 'translateX(-50%)',
                      height: '490px',
                      maxWidth: 'none',
                      filter: 'drop-shadow(0 20px 40px rgba(34,197,139,0.3))',
                    }}
                  />
                </div>

                {/* Floating instructor badge - bottom left */}
                <div
                  className="absolute bottom-6 -left-6 bg-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 animate-float"
                  style={{ animationDelay: '0.5s', zIndex: 20 }}
                >
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">A</div>
                    <div className="w-8 h-8 rounded-full bg-orange-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">B</div>
                    <div className="w-8 h-8 rounded-full bg-teal-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">C</div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm leading-tight">130 +</p>
                    <p className="text-xs text-gray-500">Expert Instructor</p>
                  </div>
                </div>

                {/* Floating top-right rating badge */}
                <div
                  className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-xl animate-float"
                  style={{ animationDelay: '1s', zIndex: 20 }}
                >
                  <p className="font-bold text-gray-800 text-sm">⭐ 4.9 Rating</p>
                  <p className="text-xs text-gray-500">50K+ Reviews</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose GATEXpress AI?</h2>
            <p className="section-subtitle">Everything you need to ace the GATE exam in one platform</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🧠"
              title="AI-Powered Learning"
              description="Get personalized study recommendations based on your performance and learning patterns."
              delay={0.1}
            />
            <FeatureCard
              icon="📊"
              title="Performance Analytics"
              description="Track your progress with detailed analytics and insights to improve weak areas."
              delay={0.2}
            />
            <FeatureCard
              icon="🎯"
              title="Mock Test Series"
              description="Practice with our extensive collection of mock tests that simulate real exam conditions."
              delay={0.3}
            />
            <FeatureCard
              icon="🤖"
              title="AI Doubt Solver"
              description="Get instant answers to your doubts 24/7 — our AI is always ready to help you learn faster."
              delay={0.4}
            />
            <FeatureCard
              icon="📱"
              title="Learn Anywhere"
              description="Access courses on any device - desktop, tablet, or mobile. Study on the go."
              delay={0.5}
            />
            <FeatureCard
              icon="🏆"
              title="Proven Results"
              description="Join thousands of successful students who achieved their dream ranks with us."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary to-secondary">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div>
              <div className="text-3xl md:text-5xl font-bold mb-2">10,000+</div>
              <div className="text-white/80 text-sm md:text-base">Active Students</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-white/80 text-sm md:text-base">Hours of Content</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-bold mb-2">100+</div>
              <div className="text-white/80 text-sm md:text-base">Mock Tests</div>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-bold mb-2">98%</div>
              <div className="text-white/80 text-sm md:text-base">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="section-title">Popular Courses</h2>
            <p className="section-subtitle">Start learning with our comprehensive course catalog</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <CourseCard
              title="Computer Science & IT"
              lessons="120"
              duration="6 months"
              students="5,234"
              image="/images/CSE.png"
              delay={0.1}
            />
            <CourseCard
              title="Electronics & Communication"
              lessons="110"
              duration="6 months"
              students="4,891"
              image="/images/ECE.png"
              delay={0.2}
            />
            <CourseCard
              title="Mechanical Engineering"
              lessons="115"
              duration="6 months"
              students="3,567"
              image="/images/MECH.png"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-light-green">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="section-title">Student Success Stories</h2>
            <p className="section-subtitle">Hear from our successful students</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Rahul Kumar"
              role="AIR 45, CS"
              content="GATEXpress AI helped me achieve my dream rank. The mock tests and personalized study plan were game-changers!"
              delay={0.1}
            />
            <TestimonialCard
              name="Priya Sharma"
              role="AIR 78, ECE"
              content="The AI-powered recommendations identified my weak areas and helped me improve significantly. Highly recommended!"
              delay={0.2}
            />
            <TestimonialCard
              name="Amit Patel"
              role="AIR 120, ME"
              content="Best platform for GATE preparation. The faculty is excellent and the content is comprehensive and easy to understand."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="card p-6 sm:p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Text Content */}
              <div className="text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-dark mb-4">
                  Ready to Start Your GATE Journey?
                </h2>
                <p className="text-base md:text-xl text-text-light mb-8">
                  Join thousands of students and start preparing with India's best GATE platform
                </p>
                <button className="btn-primary w-full sm:w-auto">
                  Start Learning Today - It's Free!
                </button>
              </div>
              
              {/* Image */}
              <div className="relative flex justify-center">
                <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-float p-2 bg-white">
                  <img 
                    src="https://img.freepik.com/premium-photo/3d-cartoon-cute-robot-girl-with-book-hologram-background-studying-school-ai-generative_1003463-549.jpg"
                    alt="AI Robot girl student"
                    className="w-full h-auto object-cover rounded-2xl"
                    style={{ maxHeight: '350px' }}
                  />
                  {/* Decorative elements */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-xl z-[-1]"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-light-green rounded-full blur-2xl z-[-1]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'linear-gradient(135deg, #111827, #0b1220)' }} className="text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          
          {/* Newsletter Section */}
          <div className="bg-[#1F2937] rounded-3xl p-8 md:p-10 mb-12 shadow-2xl">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-[#F9FAFB]">Subscribe for GATE Updates</h3>
              <p className="text-[#9CA3AF] mb-6">Get the latest study materials, exam tips, and exclusive content delivered to your inbox</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full bg-[#0f172a] border border-[#1F2937] text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#22C58B] transition-colors"
                />
                <button 
                  className="px-8 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#22C58B]/30"
                  style={{ background: 'linear-gradient(135deg, #4FD1A5, #22C58B)' }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            
            {/* Column 1 - About */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-2xl font-bold mb-4 text-[#22C58B]">GATExpress AI</h3>
              <p className="text-[#9CA3AF] mb-6 leading-relaxed">
                AI powered platform for GATE preparation with mock tests, PYQs, notes, and smart planner.
              </p>
              <div className="space-y-3 text-[#9CA3AF]">
                <div className="flex items-center gap-3">
                  <span className="text-[#22C58B]">📞</span>
                  <span>+91 1800-123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#22C58B]">✉️</span>
                  <span>support@gatexpress.ai</span>
                </div>
              </div>
            </div>

            {/* Column 2 - Preparation */}
            <div>
              <h4 className="font-bold mb-5 text-[#F9FAFB] text-lg">Preparation</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-[#9CA3AF] hover:text-[#22C58B] transition-colors duration-200 block">
                    Subjects
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#9CA3AF] hover:text-[#22C58B] transition-colors duration-200 block">
                    Mock Tests
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#9CA3AF] hover:text-[#22C58B] transition-colors duration-200 block">
                    PYQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#9CA3AF] hover:text-[#22C58B] transition-colors duration-200 block">
                    Notes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#9CA3AF] hover:text-[#22C58B] transition-colors duration-200 block">
                    Daily Quiz
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 - AI Tools */}
            <div>
              <h4 className="font-bold mb-5 text-[#F9FAFB] text-lg">AI Tools</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-[#9CA3AF] hover:text-[#22C58B] transition-colors duration-200 block">
                    AI Planner
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#9CA3AF] hover:text-[#22C58B] transition-colors duration-200 block">
                    AI Timetable
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#9CA3AF] hover:text-[#22C58B] transition-colors duration-200 block">
                    AI Analysis
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#9CA3AF] hover:text-[#22C58B] transition-colors duration-200 block">
                    Weak Topics
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#9CA3AF] hover:text-[#22C58B] transition-colors duration-200 block">
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4 - Quick Links */}
            <div>
              <h4 className="font-bold mb-5 text-[#F9FAFB] text-lg">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-[#9CA3AF] hover:text-[#22C58B] transition-colors duration-200 block">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#9CA3AF] hover:text-[#22C58B] transition-colors duration-200 block">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#9CA3AF] hover:text-[#22C58B] transition-colors duration-200 block">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#9CA3AF] hover:text-[#22C58B] transition-colors duration-200 block">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#9CA3AF] hover:text-[#22C58B] transition-colors duration-200 block">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-[#1F2937] pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[#9CA3AF] text-sm text-center md:text-left">
                © 2026 GATExpress AI – AI Powered GATE Preparation Platform
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#1F2937] flex items-center justify-center text-[#9CA3AF] hover:bg-[#22C58B] hover:text-white transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#1F2937] flex items-center justify-center text-[#9CA3AF] hover:bg-[#22C58B] hover:text-white transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#1F2937] flex items-center justify-center text-[#9CA3AF] hover:bg-[#22C58B] hover:text-white transition-all duration-300"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#1F2937] flex items-center justify-center text-[#9CA3AF] hover:bg-[#22C58B] hover:text-white transition-all duration-300"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Home;
