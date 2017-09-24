import React from 'react';



export const required = value => (value ? undefined : 'Required')
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
export const maxLength15 = maxLength(15)
export const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)

export const alphaNumeric = value =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
        ? 'Only alphanumeric characters'
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