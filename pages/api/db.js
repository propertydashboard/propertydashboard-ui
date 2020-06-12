import connect from '../../lib/connect'

connect('mongodb://localhost:27017/property-dashboard')
  .then(async () => {
    console.log('connected to mongodb')
  })
  .catch(e => console.error(e))
