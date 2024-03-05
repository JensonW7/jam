import React, { useState, useEffect } from 'react';
/*import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Col, Card } from 'react-bootstrap';
*/
const Profile = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/login")
      .then(res => {
        return res.json()
      }) 
      .then((data) => {
        console.log(data)
      })
  }, []);
};

export default Profile;