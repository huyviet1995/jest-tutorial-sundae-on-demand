import { fireEvent, render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm'

describe('test initial conditions', () => {
  test('initial conditions of checkbox and button', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i})
    const button = screen.getByRole('button', { name: /confirm order/i })
    // Checkbox is unchecked by default
    expect(checkbox).not.toBeChecked()
    expect(button).toBeDisabled()
  })


  test('Check checkbox should enable button and vice versa', () => {
    // Checking checkbox enabled button
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i})
    const button = screen.getByRole('button', { name: /confirm order/i })

    fireEvent.click(checkbox)
    expect(button).toBeEnabled()

    // Unchecking checkbox again disables button
    fireEvent.click(checkbox)
    expect(button).toBeDisabled()
  });
})
