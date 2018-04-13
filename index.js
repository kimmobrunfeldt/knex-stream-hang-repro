const knex = require('knex')({
  client: 'pg',
  version: '9.6',
  connection: {
    host: '127.0.0.1',
    database: 'knex_pg_stream_repro'
  }
})

main()

async function main() {
  await knex('articles').truncate()
  await Promise.all([
    knex('articles').insert({ title: 'Title A' }),
    knex('articles').insert({ title: 'Title B' }),
    knex('articles').insert({ title: 'Title C' }),
  ])

  try {
    require.resolve('pg-query-stream')
    console.log('pg-query-stream installed. All should be good')
  } catch (e) {
    console.log('pg-query-stream NOT installed. Should throw error, but is going to hang.')
  }

  const articles = await new Promise((resolve, reject) => {
    console.log('Now we are waiting for the stream to finish or error...')

    let articles = []
    knex('articles')
      .stream()
      .on('data', data => {
        articles.push(data)
      })
      .on('finish', () => {
        resolve(articles)
      })
      .on('error', (error) => {
        reject(error)
      })
  })

  console.log('The stream finished!', articles)
  knex.destroy()
}
