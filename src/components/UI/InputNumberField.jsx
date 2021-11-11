import React from "react";
import PropTypes from 'prop-types';

const InputNumberField = ({ value, validate, placeholder, id, pattern, min, max, setValue }) => {
	return (
		<div class="field">
			<input
				type="text"
				autocomplete="off"
				id={id}
				value={value}
				pattern={pattern}
				onChange={(e) => validate(e, min, max, setValue, value)}
			/>
			<label for={id} title={placeholder} data-title={placeholder}></label>
		</div>
	)
}

InputNumberField.propTypes = {
	value: PropTypes.string,
	validate: PropTypes.func,
	placeholder: PropTypes.string,
	id: PropTypes.string,
	pattern: PropTypes.string,
	min: PropTypes.number,
	max: PropTypes.number,
	setValue: PropTypes.func,
}

export default InputNumberField;