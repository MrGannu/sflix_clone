import React from 'react'
import "../styles/footer.css"

const Footer = () => {
  return (
    <div className='footer_div'>
      <div className="footer_div_card">
        <div className="footer_nav_links">
          <ul>
            <li>Android App</li>
            <li>Terms of service</li>
            <li>Contact</li>
            <li>Sitemap</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="footer_content">
          <p>SFlix is a Free Movies streaming site with zero ads. We let you watch movies online without having to register or paying, with over 10000 movies and TV-Series. You can also Download full movies from MoviesCloud and watch it later if you want.</p>
        </div>
        <div className="footer_copyrignt">
          <p>© SFlix</p>
        </div>
      </div>
    </div>
  )
}

export default Footer