import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './SignInPage.module.css';
import CustomInput from '../components/CustomInput';
import { setLogin } from "../utils/auth";
import { logInWithEmailAndPassword } from '../firebase/auth.js'; 

function SignInPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '', // Changed to email to match Firebase
    password: '',
  });

  const [errors, setErrors] = useState({ email: false, password: false }); 
  const [invalidCreds, setInvalidCreds] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setInvalidCreds(false);

    if (value.trim() !== '') {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: formData.email.trim() === '',
      password: formData.password.trim() === '',
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error);

    if (!hasErrors) {
      try {
        const user = await logInWithEmailAndPassword(formData.email, formData.password);
        
        if (user) {
          localStorage.setItem("loggedInUser", JSON.stringify({ email: user.email }));
          setLogin();
          navigate('/view-quotes');
        }
      } catch (error) {
        console.error("Login failed:", error.message);
        setInvalidCreds(true);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className={styles.signinForm}>
        {invalidCreds && <div className={styles.invalidCreds}>Invalid email or password</div>}
        <div>
          <CustomInput
            label="Email"
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
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
  );
}

export default SignInPage;
