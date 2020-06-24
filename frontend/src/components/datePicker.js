import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import TextField from "@material-ui/core/TextField";

function DatePicker ({label,value,onChange}) {
    return(
        <>
                <TextField
                    id="date"
                    label={label}
                    type="date"
                    value={value}
                    onChange={onChange}
                    defaultValue="2020-06-24"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
        </>
    )
};

DatePicker.propTypes = {
};

export default DatePicker;