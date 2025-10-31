import React from 'react'

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Nexus News</h1>
        <p className="text-xl text-gray-600">Your trusted source for comprehensive news coverage</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Nexus News is dedicated to delivering accurate, timely, and unbiased news coverage 
            across multiple categories including World News, Politics, Business, Health, Sports, 
            Science, and Arts. We believe in the power of informed communities and strive to 
            connect people with the stories that matter most.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Cover</h2>
          <ul className="text-gray-700 space-y-2">
            <li>• Breaking World News</li>
            <li>• Political Analysis & Updates</li>
            <li>• Business & Economic Insights</li>
            <li>• Health & Wellness</li>
            <li>• Sports Coverage</li>
            <li>• Science & Technology</li>
            <li>• Arts & Culture</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Nexus News?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">Reliable</h3>
            <p className="text-gray-600">Fact-checked content from trusted sources</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">Comprehensive</h3>
            <p className="text-gray-600">Complete coverage across all major categories</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">Interactive</h3>
            <p className="text-gray-600">Engage with content through comments and discussions</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Join Our Community</h2>
        <p className="text-gray-700 mb-6">
          Stay informed and be part of meaningful conversations. Create an account to 
          comment on articles, save your favorite stories, and contribute to our growing community.
        </p>
        <div className="space-x-4">
          <a 
            href="/signup" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </a>
          <a 
            href="/contact" 
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}

export default About