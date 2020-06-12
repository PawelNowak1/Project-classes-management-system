import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

function CheckBox ({value,onChange,label}) {
    return(
        <>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={value}
                        onChange={onChange}
                        name="checkedB"
                        color="primary"
                    />
                }
                label={label}
            />
        </>
    )
};

CheckBox.propTypes = {
};

export default CheckBox;