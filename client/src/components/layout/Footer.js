import React from "react"
import { Link } from "react-router-dom"
import { withLocalize } from "react-localize-redux"

const Footer = ({
  languages,
  activeLanguage,
  setActiveLanguage,
  translate
}) => {
  return (
    <footer>
      <Link to={translate("meta.contact.url")}>Contact</Link>
      <Link to={translate("meta.privacy-policy.url")}>Privacy Policy</Link>
      <div className="languages">
        <div className="language-list">
          {languages.map(language => (
            <div key={language.code}>
              <span
                className="noselect"
                onClick={() => setActiveLanguage(language.code)}
              >
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
