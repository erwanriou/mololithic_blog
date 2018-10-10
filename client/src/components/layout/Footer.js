import React from 'react'
import { withLocalize } from 'react-localize-redux'

const Footer = ({ languages, activeLanguage, setActiveLanguage }) => {
  return (
    <footer>
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
