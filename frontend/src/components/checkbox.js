import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function CheckBox({ value, onChange, label, name }) {
    return (
        <>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={value}
                        onChange={onChange}
                        name={name}
                        color="primary"
                    />
                }
                label={label}
                name="dupsko"
            />
        </>
    );
}

CheckBox.propTypes = {};

export default CheckBox;
