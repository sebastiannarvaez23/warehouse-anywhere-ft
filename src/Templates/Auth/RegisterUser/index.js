import React, { Fragment } from "react";
import { RegisterTitle } from './RegisterTitle';
import { RegisterForm } from './RegisterForm';
import { SignUp } from "./SignUp";
import './Register.css';

export const RegisterUser = () => {
    return (
        <Fragment>
            <SignUp>
                <RegisterTitle />
                <RegisterForm />
            </SignUp>
        </Fragment>
    )
}