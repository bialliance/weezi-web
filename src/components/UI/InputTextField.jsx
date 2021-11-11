import React from "react";
import PropTypes from 'prop-types';

const InputTextField = ({ value, validate, placeholder, id }) => {
	return (
		<div class="field">
			<input
				type="text"
				required
				autocomplete="off"
				id={id}
				value={value}
				onChange={(e) => validate(e.target.value)}
			/>
			<label for={id} title={placeholder} data-title={placeholder}></label>
		</div>
	)
}

InputTextField.propTypes = {
	value: PropTypes.string,
	validate: PropTypes.func,
	placeholder: PropTypes.string,
	id: PropTypes.string,
}

export default InputTextField;