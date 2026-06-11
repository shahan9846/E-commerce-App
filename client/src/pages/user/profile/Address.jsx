import React, { useEffect, useState } from 'react'
import { addAddress, deleteAddress, editAddress, fetchAddress, setPrimary } from '../../../services/user-api-service/addressApi'
import { toast } from 'sonner'
import Swal from 'sweetalert2'
const Address = () => {

    const [addresses, setAddresses] = useState([])
    const [editId, setEditId] = useState(null)
    const [edit, setEdit] = useState(false)
    const [open, setOpen] = useState(false)

    const [formData, setFormData] = useState(
        {
            address: '',
            street: '',
            city: '',
            state: '',
            country: '',
        }
    )

    const inputValue = (e) => {
        setFormData(previous => ({ ...previous, [e.target.name]: e.target.value }))
    }

    const handleEdit = (address) => {
        setFormData(address)
        setEditId(address._id)
        setEdit(true)
        setOpen(true)
    }

    const handleSetPrimary = async (id) => {
        try {
            const data = await setPrimary(id)
            setAddresses(data.addresses);
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete?")) return;
        try {
            const data = await deleteAddress(id)
            setAddresses(data.addresses);
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    };

    const formSubmit = async (e) => {
        e.preventDefault()
        try {
            if (edit) {
                const data = await editAddress(editId, formData)
                alert(data.message)
                setAddresses(data.addresses)
                setFormData({
                    address: '',
                    street: '',
                    city: '',
                    state: '',
                    country: '',
                })
                setOpen(false)
            }
            else {
                const data = await addAddress(formData)
                toast.success(data.message)
                setAddresses(data.addresses);
                setFormData({
                    address: '',
                    street: '',
                    city: '',
                    state: '',
                    country: '',
                })
                setOpen(false)
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred while saving the address.")
        }
    }

    useEffect(() => {
        const loadAddress = async () => {
            try {
                const data = await fetchAddress()
                setAddresses(data)
            } catch (error) {
                // alert(error.response.data.message)
            }
        }
        loadAddress()
    }, [])

    return (
        <>
            <div className="profile-address-btn">
                <button onClick={() => setOpen(true)}>Add Address</button>
            </div>
            <div className="profile-address-section">
                <div className="profile-addresses">

                    {addresses.length > 0 ? (

                        addresses.map((data, index) => (
                            <div className="address-box" key={data._id}>
                                <div className="address-options">
                                    <p className='address-count'>Address {index + 1}</p>
                                    <div className="address-options-right">
                                        <button onClick={() => handleSetPrimary(data._id)}>{data.isDefault ? "Primary" : "Set as Primary"}</button>
                                        <button onClick={() => handleEdit(data)}>Edit</button>
                                        <button onClick={() => handleDelete(data._id)}>Delete</button>
                                    </div>
                                </div>
                                <div className="address-details">
                                    <p>{data.address},</p>
                                    <p>{data.street},</p>
                                    <p>{data.city},</p>
                                    <p>{data.state},</p>
                                    <p>{data.country}</p>
                                </div>
                            </div>
                        ))
                    )
                        : (
                            <p style={{ color: '#919191ff' }}>No Address added...</p>
                        )}

                    {open &&
                        <div className="modal-overlay" >
                            <div className="modal-box">
                                <form onSubmit={formSubmit} >
                                    <div className="address-form">
                                        <div className="address-textarea">
                                            <label htmlFor="">Address *</label>
                                            <textarea placeholder='Enter Your Address' name="address" value={formData.address} onChange={inputValue} cols="" rows="5" required></textarea>
                                        </div>
                                        <div className="address-input-groups">
                                            <div className="address-input-group">
                                                <label htmlFor="">Street *</label>
                                                <input placeholder="street" name='street' value={formData.street} onChange={inputValue} required />
                                            </div>
                                            <div className="address-input-group">
                                                <label htmlFor="">City *</label>
                                                <input placeholder="city" name='city' value={formData.city} onChange={inputValue} required />
                                            </div>
                                        </div>
                                        <div className="address-input-groups">
                                            <div className="address-input-group">
                                                <label htmlFor="">State *</label>
                                                <input placeholder="state" name='state' value={formData.state} onChange={inputValue} required />
                                            </div>
                                            <div className="address-input-group">
                                                <label htmlFor="">Country *</label>
                                                <input placeholder="country" name='country' value={formData.country} onChange={inputValue} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="address-form-btns">
                                        <button onClick={() => setOpen(false)}>cancel</button>
                                        <button type='submit'>save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Address