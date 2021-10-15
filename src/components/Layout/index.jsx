import {useState} from 'react';
import {
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import Core from '../Core';
import CoreMaths from '../CoreMaths'
import { Helmet } from 'react-helmet';

/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Container, Heading, Paragraph } from 'theme-ui'

const Header = () => {
  const location = useLocation()
  
  const generateHeading = () => {
    // Changing header suffix
    var headingCore = 'Tarsia Maker'
    var headingSuffix
    if (location.pathname === '/') {
      headingSuffix = ''
    } else if (location.pathname === '/maths') {
      headingSuffix = 'Maths'
    }
    if (headingSuffix) {
      return headingCore + ' | ' + headingSuffix
    }
    return headingCore
  } 
  
  return (
    <Container>
      <Container variant='header'>
        <Heading>{generateHeading()}</Heading>
      </Container>
      <nav>
        <Link to='/' sx={{ variant: 'links.nav' }}>Home</Link>
        <Link to='/maths' sx={{ variant: 'links.nav' }}>Maths</Link>
      </nav>
    </Container>
  )
}

const Footer = () => {
  return (
    <Container variant='footer'>
      <Container variant='body'>
          <Paragraph mb={2}>Feedback or ideas? Reach out to me on twitter at <a href='https://twitter.com/mrgraham__'>@mrgraham__</a>.</Paragraph>
          <Paragraph mb={2}>A more comprehensive editor is available online (not created or supported by me), links to it and ideas on how to use Tarsia Puzzles are available from <a href='http://mrbartonmaths.com/teachers/rich-tasks/tarsia-jigsaw.html'>Mr Barton Maths</a>.</Paragraph>
          <Paragraph mb={2}><a href='https://github.com/PeterGrahamJersey/tarsia-generator'>Source code</a></Paragraph>
      </Container>
    </Container>
  )
}
const Layout = () => {
  const location = useLocation();
  console.log(location.pathname)
  return (
    <div>
      <Helmet>
        <meta property='theme-color' content="#607d86" />
        <meta property='og:type' content='website' />
        <meta property='og:image' content='https://i.postimg.cc/MTnhLVH3/preview-image.png' />
      </Helmet>
      <Header/>      
      {/* Body */}
      <Switch>
        <Route exact path="/" component={Core} />
        <Route path="/maths" component={CoreMaths} />
      </Switch>
      <Footer/>
    </div>
  );
}

export { Layout } 