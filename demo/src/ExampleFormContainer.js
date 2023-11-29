import React from 'react';
import {Form} from '../../src';

const ExampleFormContainer = ({title, className, id, formProps}) =>
    <div id={id} className="form-container">
        <h5 className="card-title">{title}</h5>
        <Form {...formProps} />
    </div>

export default ExampleFormContainer;
