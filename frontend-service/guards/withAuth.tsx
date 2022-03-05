import Router from 'next/router';
import Login from '../pages/login';

const withAuth = (Component) => {
  const Auth = (props) => {
    const token = window.localStorage.getItem('token');

    if (!token) {
      return <Login />;
    }

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
