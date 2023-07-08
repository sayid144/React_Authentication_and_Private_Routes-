import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRegisterMutation } from '../store/api/AuthSlice'

const Register = () => {

    const [register] = useRegisterMutation();

    const initialValues = {
        name: '',
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Email is required'),
    });

    const handleSubmit = (values, { resetForm }) => {
        // Send the data to the server (localhost:9000/create_note)
        console.log(values);
        register({
            name: values.name,
            email: values.email,
            password: values.password
        });

        console.log("data ", values)
        // Reset the form after submission
        resetForm();
    };

    return (
        <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="mb-5">
                        <Field
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            className="border border-gray-300 shadow p-3 w-full rounded mb-"
                        />
                        <ErrorMessage name="name" component="div" className="text-red-500" />
                    </div>

                    <div className="mb-5">
                        <Field
                            type="text"
                            id="name"
                            name="email"
                            placeholder="Email"
                            className="border border-gray-300 shadow p-3 w-full rounded mb-"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500" />
                    </div>
                    <div className="mb-5">
                        <Field
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="border border-gray-300 shadow p-3 w-full rounded mb-"
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500" />
                    </div>

                    <button
                        type="submit"
                        className="block w-full bg-slate-300 text-black font-bold p-4 rounded-lg hover:bg-yellow-500"
                    >
                        Register
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default Register;
