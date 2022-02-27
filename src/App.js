import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignInPage from "./views/SignInPage";
import SignUpPage from "./views/SignUpPage";
import HomePage from "./views/HomePage";
import ForgotPasswordPage from "./views/ForgotPassword";
import LoadingPage from "./views/LoadingPage";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { islogin: false };
  }
  componentDidMount() {
    const email = localStorage.getItem('data');
    if (email != null) {
      this.setState({
        islogin: true
      });
    }
  }
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={this.state.islogin ? <HomePage /> : <SignInPage />} />
          <Route path="/signup" element={this.state.islogin ? <HomePage /> : <SignUpPage />} />
          <Route path="/forgotpassword" element={this.state.islogin ? <HomePage /> : <ForgotPasswordPage />} />
          <Route path="/loading" element={<LoadingPage />} />
        </Routes>
      </div>
    );
  }

}


export default App;





