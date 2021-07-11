import { useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

const ToppingOptions = ({ name, updateItemCount, imagePath }) => {
  const [checked, setChecked] = useState(true);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      updateItemCount(name, 1);
    } else {
      updateItemCount(name, 0);
    }
  };

  const handleChange = (event) => {
    if (!checked) {
      updateItemCount(name, 0);
    } else {
      updateItemCount(name, event.target.value);
    }
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <input
        onClick={handleCheck}
        defaultChecked={checked}
        type="checkbox"
        name={name}
        id={name}
      />
      <label htmlFor={name}>{name}</label>
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} Scoop`} />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type={"number"}
            defaultValue={0}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ToppingOptions;
