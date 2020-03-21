import React from "react"
import { connect } from "react-redux"
import { getTranslate } from "react-localize-redux"
import { Helmet } from "react-helmet-async"

// IMPORT COMPONENTS
import isEmpty from "@utils/isEmpty"

// RENDER HEAD
const Head = ({ translate, component, name, element, list }) => {
  return (
    <Helmet>
      <html lang={translate(`meta.${component}.language`)} dir="ltr" />
      <title>
        {isEmpty(element)
          ? translate(`meta.${component}.title`)
          : element.name + translate(`meta.${component}.title`)}
      </title>
      <meta
        http-equiv="content-language"
        content={translate(`meta.${component}.language`)}
      />
      <meta
        name="description"
        content={
          isEmpty(element)
            ? translate(`meta.${component}.meta-desc`)
            : element.descfiption.substring(0, 200)
        }
      />
      <meta
        property="og:url"
        content={`https://${window.location.host}${window.location.pathname}`}
      />
      <link
        rel="canonical"
        href={`https://${window.location.host}${window.location.pathname}`}
      />
      <meta
        name="robots"
        content={
          window.location.host.split(".").includes("herokuapp")
            ? "noindex"
            : "index"
        }
      />
    </Helmet>
  )
}

const mapStateToProps = state => ({
  translate: getTranslate(state.localize)
})

export default connect(mapStateToProps)(Head)
