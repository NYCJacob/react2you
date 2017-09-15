import React, {Children} from 'react';



export const required = value => (value ? undefined : 'Required')
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
export const maxLength15 = maxLength(15)
export const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
const number = value =>
    value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined
const tooOld = value =>
    value && value > 65 ? 'You might be too old for this' : undefined
const aol = value =>
    value && /.+@aol\.com/.test(value)
        ? 'Really? You still use AOL for your email?'
        : undefined
export const alphaNumeric = value =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
        ? 'Only alphanumeric characters'
        : undefined
export const phoneNumber = value =>
    value && !/^(0|[1-9][0-9]{9})$/i.test(value)
        ? 'Invalid phone number, must be 10 digits'
        : undefined


export const renderFieldTitle = ({
                                input,
                                label,
                                type,
                                meta: { touched, error, warning }
                            }) => (
    <div>
        <div>
            <input {...input} placeholder={label} type={type} size={50}/>
            {touched &&
            ((error &&
                <span className="formError">
            {error}
          </span>) ||
                (warning &&
                    <span>
              {warning}
            </span>))}
        </div>
    </div>
)

export const renderFieldSelect = ({
                                     input,
                                     label,
                                     type,
                                    children,
                                     meta: { touched, error, warning }
                                 }) => (
    <div>
        <div>
            <select {...input} >
                {children}
            </select>
            {touched &&
            ((error &&
                <span className="formError">
            {error}
          </span>) ||
                (warning &&
                    <span>
              {warning}
            </span>))}
        </div>
    </div>
)

export const renderFieldAuthor = ({
                                     input,
                                     label,
                                     type,
                                     meta: { touched, error, warning }
                                 }) => (
    <div>
        <div>
            <input {...input} placeholder={label} type={type} size={50}/>
            {touched &&
            ((error &&
                <span className="formError">
            {error}
          </span>) ||
                (warning &&
                    <span>
              {warning}
            </span>))}
        </div>
    </div>
)

export const renderFieldBody = ({
                                           input,
                                           label,
                                           type,
                                           meta: { touched, error, warning }
                                       }) => (
    <div>

        <div>
            <textarea {...input} placeholder={label} type={type} cols={60} rows={10}/>
            {touched &&
            ((error &&
                <span className="formError">
            {error}
          </span>) ||
                (warning &&
                    <span>
              {warning}
            </span>))}
        </div>
    </div>
)

export const renderFieldcommentAuthor = ({
                                input,
                                label,
                                type,
                                meta: { touched, error, warning }
                            }) => (
    <div>
        <div>
            <input {...input} placeholder={label} type={type} size={30}/>
            {touched &&
            ((error &&
                <span className="formError">
            {error}
          </span>) ||
                (warning &&
                    <span>
              {warning}
            </span>))}
        </div>
    </div>
)

export const renderFieldcommentBody = ({
                                           input,
                                           label,
                                           type,
                                           meta: { touched, error, warning }
                                       }) => (
    <div>

        <div>
            <textarea {...input} placeholder={label} type={type} cols={50} rows={10}/>
            {touched &&
            ((error &&
                <span className="formError">
            {error}
          </span>) ||
                (warning &&
                    <span>
              {warning}
            </span>))}
        </div>
    </div>
)