import { useNavigate } from 'react-router-dom';
import styles from './SignInPage.module.css';
import CustomInput from '../components/CustomInput';

function SignInPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/view-quotes");
  };


  return (
    <div className={styles.container}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className={styles.signinForm}>
        <div>
          <CustomInput
            label="Username"
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div>
          <CustomInput
            label="Passowrd"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <button type="submit" className={styles.buttonSignin}>Sign In</button>
        </form>
        </div>
  )
}
export default SignInPage