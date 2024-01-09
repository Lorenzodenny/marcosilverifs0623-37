import { useState, useEffect } from 'react'
import CommentsList from './CommentsList'
import AddComment from './AddComment'

const CommentArea = (props) => {

  const [comments, setComments ] = useState ([])

  useEffect(() => (
    getComments()
  ), [props.bookId])


 const aggiornaCommenti = () => {
    getComments()
  }

  const getComments = () => {
    fetch(
      'https://striveschool-api.herokuapp.com/api/comments/' +
        props.bookId,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczNzg5YmZlMDMxZTAwMTliYTFjNzkiLCJpYXQiOjE3MDQ4MDY2OTEsImV4cCI6MTcwNjAxNjI5MX0.11C0IO75d_FrHrNyQvZQ8zCGBdJp5K401T2byD0qAzA',
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('errore nel recupero dei commenti')
        }
      })
      .then((arrayOfComments) => {
        console.log(arrayOfComments)
        setComments(arrayOfComments)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }


    return (
      <div>
        <div>
          <CommentsList reviews={comments} />
        </div>
        <div>
          <AddComment commento={props.bookId} aggiornaCommenti={aggiornaCommenti} />
        </div>
      </div>
    )
  }


export default CommentArea