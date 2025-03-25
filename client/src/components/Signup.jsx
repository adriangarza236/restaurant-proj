import React, { useContext, useEffect } from "react"
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useNavigate } from "react-router-dom"
import { CartsContext } from "../context/CartsContext"
import { UsersContext } from "../context/UsersContext"

const Signup = () => {

    const { loggedIn, login_user } = useContext(UsersContext)
    
    //define navigate
    const navigate = useNavigate()

    const { createCart } = useContext(CartsContext)

    //navigate after signup
    useEffect(() => {
        if(loggedIn) {
            navigate("/menu")
        }
    }, [loggedIn])

    //define initial values for formik
    const initialValues = {
        "email": "",
        "password": ""
    }

    //define yup validations
    const validationSchema = yup.object({
        email: yup.string().required().email(),
        password: yup.string().required().min(8).max(10)
    })

    //handle creating a user
    const handleSubmit = async values => {
        const options ={
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        }
        const resp = await fetch("api/signup", options)
        if(resp.status === 201) {
            const user = await resp.json()
            login_user(user)
            await createCart(user.id)
        } 
  
}

    //defining formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: false,
        onSubmit: handleSubmit
    })

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="text" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} />
                    <h4 style={{color: "red"}}>{ formik.errors.email }</h4>
                </div>
                <div>
                    <label htmlFor="password">Create Password: </label>
                    <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} />
                    <h4 style={{color: "red"}}>{ formik.errors.password }</h4>
                </div>
                <input type="submit" value="Signup" />
            </form>
        </div>
    )
}

export default Signup