import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import facebookIcon from '../../../assets/images/facebookIcon.png'
import googleIcon from '../../../assets/images/googleIcon.png'
import userIcon from '../../../assets/images/userIcon.png'
import passwordIcon from '../../../assets/images/passwordIcon.png'
import signupIcon from '../../../assets/images/signupImg.png'
import emailIcon from '../../../assets/images/emailIcon.png'
import Swal from 'sweetalert2'
// import { toast } from 'react-toastify'
import { toast } from 'sonner'
import { registerUser } from '../../../services/user-api-service/authApi'
const SignUp = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState(
        {
            name: '',
            email: '',
            password: '',
        }
    )

    const inputValue = (e) => {
        setFormData(previous => ({ ...previous, [e.target.name]: e.target.value }))
    }

    const formSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await registerUser(formData)
            toast.success(response.data.message)
            navigate('/login')
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                })
            }
           toast.error(error.response?.data?.message || "An error occurred during registration.")
        }
    }

    return (
        <>
            <section>
                <div className="sign_up_page">
                    <div className="sign_up_page-image_section">
                        <img src={signupIcon} alt="" className='sign_up_page-img' />
                        <div className="sign_up_page-image_text">
                            <h1 className='sign_up_page-image_title'>Let’s Get Started!</h1>
                            <h1 className='sign_up_page-image_description'>Create your account and unlock the <br /> full potential of Fragranzia.</h1>
                        </div>
                    </div>
                    <div className="sign_up_page-create_account_section">
                        <div className="sign_up_page-create_account">
                            <button className="sign_up_page-create_account_google_btn"><img src={googleIcon} alt="" /> Google</button>
                            <button className="sign_up_page-create_account_facebook_btn"><img src={facebookIcon} alt="" /> Facebook</button>
                        </div>
                        <h6 className='sign_up_page-create_account_with_email_text'>Or sign up with email</h6>
                        <div className="sign_up_page-create_account_details">
                            <form onSubmit={formSubmit}>
                                <div className="sign_up_page-user_details">
                                    <div className="sign_up_page-user_input_groups">
                                        <div className="sign_up_page-user_name_field">
                                            <img src={userIcon} alt="" />
                                            <input type="text" placeholder='Enter your username' name='name' value={formData.name} onChange={inputValue} required />
                                        </div>
                                        <div className="sign_up_page-user_email_field">
                                            <img src={emailIcon} alt="" />
                                            <input type="text" placeholder='Enter your E - Mail' name='email' value={formData.email} onChange={inputValue} required />
                                        </div>
                                        <div className="sign_up_page-user_password_field">
                                            <img src={passwordIcon} alt="" />
                                            <input type="password" placeholder='Enter your password' name='password' value={formData.password} onChange={inputValue} required />
                                        </div>
                                    </div>
                                    <div className="sign_up_page-condition_box">
                                        <input type="checkbox" name="" id="" />
                                        <h6 className="sign_up_page-condition_box_text">Agree with <span>Terms & Conditions</span></h6>
                                    </div>
                                </div>
                                <button type='submit' className="sign_up_page-btn">Sign up</button>
                                <h6 className='sign_up_page-alredy_account_text'>Already have an account? <Link to='/login'>Log In</Link></h6>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignUp