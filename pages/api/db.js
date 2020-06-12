import connect from '../../lib/connect'

connect(
  'mongodb+srv://admin:propertydashboard@cluster0-qyav1.mongodb.net/property-dashboard?retryWrites=true&w=majority',
  { useNewUrlParser: true }
)
  .then(async () => {
    console.log('connected to mongodb')
  })
  .catch(e => console.error(e))
