import React from "react";
import PropTypes from 'prop-types';

const InputNumberField = ({ value, validate, placeholder, id, pattern, min, max, setValue, onFocus, onBlur }) => {
	return (
		<div className="field">
			<input
				type="text"
				autoComplete="off"
				id={id}
				value={value}
				pattern={pattern}
				onChange={(e) => validate(e, min, max, setValue, value)}
				onFocus={onFocus ? onFocus : () => { }}
				onBlur={onBlur ? onBlur : () => { }}
			/>
			<label htmlFor={id} title={placeholder} data-title={placeholder}></label>
		</div>
	)
}

InputNumberField.propTypes = {
	value: PropTypes.number,
	validate: PropTypes.func,
	placeholder: PropTypes.string,
	id: PropTypes.string,
	pattern: PropTypes.string,
	min: PropTypes.number,
	max: PropTypes.number,
	setValue: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
}

export default InputNumberField;