import React, { useContext, useEffect } from "react"
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { UsersContext } from "../context/UsersContext"

const Login = () => {

    const { login_user, loggedIn } = useContext(UsersContext)
    //define navigate
    const navigate = useNavigate()

    //navigate after login
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

    //define yup constraints
    const validationSchema = yup.object({
        email: yup.string().required().email(),
        password: yup.string().required()
    })

    //Login 
    const handleSubmit = values => {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        }
        fetch("api/login", options)
            .then(resp => {
                if(resp.status === 200) {
                    resp.json().then(data => login_user(data))
                    } 
            })
    }

    //define formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: false,
        onSubmit: handleSubmit
    })

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="text" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} />
                    <h4 style={{color: "red"}}>{ formik.errors.email }</h4>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} />
                    <h4 style={{color: "red"}}>{ formik.errors.password }</h4>
                </div>
                <input type="submit" value="login" />
            </form>
        </div>
    )
}

export default Login