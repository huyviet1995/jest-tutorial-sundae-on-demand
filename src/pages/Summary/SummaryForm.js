import React, {useState} from 'react'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

const SummaryForm = props => {
  const [isChecked, setIsChecked] = useState(false)

  const checkboxLabel = (
    <label htmlFor="checkbox">
      I agree to the <a href="#">Terms and Conditions</a>
    </label>
  )

  const handleChange = e => {
    setIsChecked(e.target.checked)
  }

  console.log({ isChecked })

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          id={'checkbox'}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          label={checkboxLabel}
        />
        <Button 
          disabled={!isChecked}
          type="submit"
          variant="primary"
        >
          Confirm order
        </Button>
      </Form.Group>
    </Form>
  )
}

export default SummaryForm