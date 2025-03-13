import React, { useEffect } from "react"
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useNavigate } from "react-router-dom"

function Signup({ login_user, loggedIn }) {
    
    //define navigate
    const navigate = useNavigate()

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
    const handleSubmit = values => {
        const options ={
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        }
        fetch("api/signup", options)
            .then(resp => {
                if(resp.status === 201) {
                    resp.json().then(data => login_user(data))
                } else {
                    resp.json().then(error => console.log(error))
                }
            })
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