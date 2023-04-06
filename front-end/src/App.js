import * as React from 'react'
import { Grid } from '@material-ui/core'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import backgroundImage from './images/background.jpg'

const App = () => (
  <Grid container style={styles}>
    <Grid item xs={12} style={{ height: '7.5%' }}>
      <Header />
    </Grid>
    <Grid container style={{ height: '85%' }}>
      <Grid item xs={false} sm={2} style={{ height: '100%' }} />
      <Grid
        item
        xs={12}
        sm={8}
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Content />
      </Grid>
      <Grid item xs={false} sm={2} style={{ height: '100%' }} />
    </Grid>
    <Grid item xs={12} style={{ height: '7.5%' }}>
      <Footer />
    </Grid>
  </Grid>
)

const styles = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
}

export default App
