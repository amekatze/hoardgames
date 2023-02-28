import { useState } from 'react';
import '../styles/login.scss';

function SignUp(props) {
  const [user, setUser] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/user/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          name='username'
          onChange={handleChange}
          placeholder='Username'
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          onChange={handleChange}
          placeholder='Password'
          required
        />
        <button type='submit'>SignUp</button>
        <button
          onClick={() => {
            props.setLoggedOutView('login');
          }}
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}

export default SignUp;
