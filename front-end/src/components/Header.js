import { AppBar, Toolbar, Typography } from '@material-ui/core'

const Header = () => {
  return (
    <div>
      <AppBar position='static' color='inherit'>
        <Toolbar>
          <Typography variant='h5'>Board Maker </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
