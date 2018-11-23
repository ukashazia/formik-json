import _ from 'lodash';
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import Thumb from './Thumb'
import { hasError, changeHandler, joinNames } from '../utils';

const CodeEditor = ({ config, formikProps, submitCountToValidate, containerName }) => {
    const {
        name: elementName,
        label,
        options,
        defaultValue,
        disabled,
        disabledText,
        placeholder,
        zoneActiveText,
        attributes,
        prefixContainerName = false,
        labelClass = '',
        inputClass = 'dropzone',
        formGroupClass = 'form-group',
    } = config;
    const { values, setFieldValue } = formikProps;
    const name = prefixContainerName && containerName ? joinNames(containerName, elementName) : elementName;
    const error = hasError(name, submitCountToValidate, formikProps);
    const selectedValue = _.get(values, name, defaultValue);

    return (
        <div className={ formGroupClass }>
            <Label htmlFor={ name } className={ labelClass }>{ label }</Label>
            <Dropzone
                className={ inputClass + ( error ? ' is-invalid ' : '' )}
                accept={ accept }
                disabled={ disabled }
                onDrop={ acceptedFiles => {
                    if (acceptedFiles.length === 0) {
                        return;
                    }

                    changeHandler(
                        setFieldValueWrapper(setFieldValue, name),
                        formikProps,
                        config,
                        values[name].concat(acceptedFiles)
                    )
                }}
                { ...attributes }>

                {({ isDragActive, acceptedFiles, rejectedFiles }) => {
                    if (disabled) {
                        return disabledText;
                    }

                    if (isDragActive) {
                        return zoneActiveText;
                    }

                    return acceptedFiles.length || rejectedFiles.length ?
                        <Fragment>
                            { values[name].map(file => (
                                <Thumb key={ file.name } file={ file } />
                            )) }
                        </Fragment> : placeholder;
                }}
            </Dropzone>
            <ErrorMessage name={ name } submitCountToValidate={ submitCountToValidate } />
        </div>
    );
}

export default Dropzone