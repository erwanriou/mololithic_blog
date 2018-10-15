import React from 'react'
import { Link } from 'react-router-dom'
import { withLocalize } from 'react-localize-redux'

const Footer = ({ languages, activeLanguage, setActiveLanguage }) => {
  return (
    <footer>
      <Link to='/contact'>Contact</Link>
      <Link to='/privacy-policy'>Privacy Policy</Link>
      <div className="languages">
        <div className="language-list">
          {languages.map(language => (
            <div key={language.code}>
              <span onClick={() => setActiveLanguage(language.code)}>
                {language.code}
              </span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}


export default withLocalize(Footer)
