import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import facebookIcon from '../../../assets/images/facebookIcon.png'
import googleIcon from '../../../assets/images/googleIcon.png'
import userIcon from '../../../assets/images/userIcon.png'
import passwordIcon from '../../../assets/images/passwordIcon.png'
import loginImg from '../../../assets/images/loginImg.png'
import { AuthContext } from '../../../contexts/AuthContext'
import { toast } from 'sonner'
import { loginUser } from '../../../services/user-api-service/authApi'

const Login = () => {

    const navigate = useNavigate()

    const { checkUser } = useContext(AuthContext)

    const [formData, setFormData] = useState(
        {
            email: '',
            password: ''
        }
    )

    const inputValue = (e) => {
        setFormData(previous => ({ ...previous, [e.target.name]: e.target.value }))
    }

    const formSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await loginUser(formData)
            localStorage.setItem('token', response.data.token)
            await checkUser()
            toast.success(response.data.message)
            navigate('/')
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during login.")
        }
    }

    return (
        <section>
            <div className="login_page">
                <div className="login_page-image_section">
                    <img src={loginImg} alt="" className='login_page-img' />
                    <div className="login_page-image_text">
                        <h1 className='login_page-image_title'>Welcome Back</h1>
                        <h1 className='login_page-image_description'>Glad to see you again! Access your <br /> account to explore more</h1>
                    </div>
                </div>
                <div className="login_page-create_account_section">
                    <div className="login_page-create_account">
                        <button className="login_page-create_account_google_btn"><img src={googleIcon} alt="" /> Google</button>
                        <button className="login_page-create_account_facebook_btn"><img src={facebookIcon} alt="" /> Facebook</button>
                    </div>
                    <h6 className='login_page-create_account_with_email_text'> Or sign up with email </h6>
                    <div className="login_page-create_account_details">
                        <form onSubmit={formSubmit}>
                            <div className="login_page-user_details">
                                <div className="login_page-user_input_groups">
                                    <div className="login_page-user_name_field">
                                        <img src={userIcon} alt="" />
                                        <input type="text" placeholder='Enter your Email' name='email' onChange={inputValue} />
                                    </div>
                                    <div className="login_page-user_password_field">
                                        <img src={passwordIcon} alt="" />
                                        <input type="password" placeholder='Enter your password' name='password' onChange={inputValue} />
                                    </div>
                                </div>
                                <div className="login_page-condition_box">
                                    <h6 className="login_page-forgotten_password_text">Forgot Password?</h6>
                                </div>
                            </div>
                            <button type='submit' className="login_page-btn">Login</button>
                            <h6 className='login_page-alredy_account_text'>Don’t have an account? <Link to='/signup'>Sign Up</Link> </h6>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login