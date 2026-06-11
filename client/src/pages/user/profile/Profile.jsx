import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { toast } from "sonner";
import { fetchUserProfile, updateUserProfile } from "../../../services/user-api-service/profileApi";

function Profile() {

    const [isEdit, setIsEdit] = useState(false)

    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        dob: '',
        gender: ''

    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleEdit = async () => {
        if (isEdit) {
            try {
                await updateUserProfile(user)
                setIsEdit(false)
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to update profile")
            }
        } else {
            setIsEdit(true)
        }
    };

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await fetchUserProfile();
                setUser(data);
            } catch (error) {
                navigate('/signup')
            }
        };
        loadProfile();
    }, []);


    return (
        <div>
            <div className="profile-input-section">
                <div className="profile-input-groups">
                    <div className="profile-inputs">
                        <label >Full Name *</label>
                        <input type="text" name="name" onChange={handleChange} value={user?.name || ''} disabled={!isEdit} />
                    </div>
                    <div className="profile-inputs">
                        <label htmlFor="">Email *</label>
                        <input type="email" name="email" onChange={handleChange} value={user?.email || ''} disabled={!isEdit} />
                    </div>
                    <div className="profile-inputs">
                        <label htmlFor="">Phone number *</label>
                        <input type="text" name="phone" onChange={handleChange} value={user?.phone || ''} disabled={!isEdit} />
                    </div>
                </div>
                <div className="profile-input-groups">
                    <div className="profile-inputs">
                        <label >Date of Birth *</label>
                        <input type="date" name="dob" onChange={handleChange} value={user?.dob || ''} disabled={!isEdit} />
                    </div>
                    <div className="profile-inputs">
                        <label htmlFor="">Gender *</label>
                        <select name="gender" value={user?.gender || ''} id="" onChange={handleChange} disabled={!isEdit}>
                            {/* <option >Gender</option> */}
                            <option >Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    {/* <div className="profile-inputs">
                        <label htmlFor="">Phone number *</label>
                        <input type="text" name="phone" onChange={handleChange} value={user?.phone || ''} disabled={!isEdit} />
                    </div> */}
                </div>
                <button className="profile-edit-btn" onClick={handleEdit}>{isEdit ? 'Save' : 'Edit'}</button>
            </div>
        </div>
    );
}

export default Profile;