import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './SignInPage.module.css';
import CustomInput from '../components/CustomInput';
import {DUMMY_CREDENTIALS, setLogin} from "../utils/auth"

function SignInPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({username: false, password: false});

  const [invalidCreds, setInvalidCreds] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setInvalidCreds(false);

    if(value.trim() !== '') {
      setErrors(prev => ({ ...prev, [name]: false }));
      setInvalidCreds(false);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      username: formData.username.trim() === '',
      password: formData.password.trim() === '',
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error);

    if(!hasErrors) {

      const isValidUser = formData.username === DUMMY_CREDENTIALS.username && formData.password === DUMMY_CREDENTIALS.password;
      if(!isValidUser) {
        console.log("Invalid credentials");
        
        setInvalidCreds(true);
      } else {
        localStorage.setItem("loggedInUser", JSON.stringify({ username: formData.username }));
        setLogin();
        navigate('/view-quotes');
      }
    }
  };



  return (
    <div className={styles.container}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className={styles.signinForm}>
        {invalidCreds && <div className={styles.invalidCreds}>Invalid username or password</div>}
        <div>
          <CustomInput
            label="Username"
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange} 
            error ={errors.username}
          />
        </div>
        <div>
          <CustomInput
            label="Password"
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
        </div>
        <button type="submit" className={styles.buttonSignin}>Sign In</button>
        </form>
        </div>
  )
}
export default SignInPage