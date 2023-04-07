import * as React from 'react'
import { Grid } from '@material-ui/core'
import Header from './components/Header'
import Signuppage from './components/Signuppage'
import Footer from './components/Footer'
import backgroundImage from './images/image1.jpg'

const App = () => (
  <div style={root}>
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid container>
        <Grid item xs={false} sm={2} />
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            height: '0%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Signuppage />
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  </div>
)

const root = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

export default App
