import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = (props) => {
    const {title} = props;
  return (
    <Helmet>
    {/* <meta charSet="utf-8" /> */}
    <link rel="icon" type="image/png" href="https://i.pinimg.com/736x/82/c6/5b/82c65b9bb0a75026fc4c82a438b4cc9b.jpg" />
    <title>{title}</title>
</Helmet>
  )
}

export default Meta