import * as React from 'react'
import { Grid } from '@material-ui/core'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import backgroundImage from './images/background.jpg'

const App = () => (
  <Grid container style={styles}>
    <Grid item xs={12}>
      <Header />
    </Grid>
    <Grid container>
      <Grid item xs={false} sm={2} style={{ height: '100%' }} />
      <Grid
        item
        xs={12}
        sm={8}
        style={{
          height: '0%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Content />
      </Grid>
      <Grid item xs={false} sm={2} style={{ height: '100%' }} />
    </Grid>
    <Grid item xs={12}>
      <Footer />
    </Grid>
  </Grid>
)

const styles = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

export default App
