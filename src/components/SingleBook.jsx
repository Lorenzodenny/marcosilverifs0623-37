import { useState } from 'react'
import { Card } from 'react-bootstrap'
// import CommentArea from './CommentArea'

const SingleBook = (props) => {
const [selected, setSelected] = useState(false)

  // ogni SingleBook riceve this.props.selectedAsin, ovvero l'asin del libro corrente selezionato
  // per fare in modo che solo UN SingleBook riceva il bordo rosso, dobbiamo comparare il proprio asin
  // con il selectedAsin.

    return (
      <>
        <Card
          onClick={() => {
            setSelected( !selected )
            props.changeAsin(props.book.asin)
          }}
          // style={{ border: this.state.selected ? '3px solid red' : 'none' }}
          style={{
            border:
              props.book.asin === props.selectedAsin
                ? '3px solid red'
                : 'none',
          }}
        >
          <Card.Img variant="top" src={props.book.img} />
          <Card.Body>
            <Card.Title style={{ color: 'black' }}>
              {props.book.title}
            </Card.Title>
          </Card.Body>
        </Card>
        {/* {this.state.selected && <CommentArea bookId={this.props.book.asin} />} */}
      </>
    )

}

export default SingleBook
