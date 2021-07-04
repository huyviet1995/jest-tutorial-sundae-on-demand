import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Popover, { Header, Body } from 'react-bootstrap/Popover'
import Form from 'react-bootstrap/Form'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const PopoverComponent = (
  <Popover id="popover-basic">
    <Popover.Content>
      No ice cream will actually be delivered
    </Popover.Content>
  </Popover>
);


const checkboxLabel = (
    <label htmlFor="checkbox">
      I agree to the 
      <OverlayTrigger placement="bottom" overlay={PopoverComponent}>
        <a href="#">
          Terms and Conditions
        </a>
      </OverlayTrigger>
    </label>
)


function SummaryForm(props) {
  const [isChecked, setIsChecked] = useState(false)

  const handleChange = e => {
    setIsChecked(e.target.checked)
  }

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          id={'checkbox'}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          label={checkboxLabel} />
        <Button
          disabled={!isChecked}
          type="button"
          variant="primary"
        >
          Confirm order
        </Button>
      </Form.Group>
    </Form>
  )
}

export default SummaryForm