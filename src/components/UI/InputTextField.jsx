import React from "react";
import PropTypes from 'prop-types';

const InputTextField = ({ value, validate, placeholder, id, onFocus, onBlur }) => {
	return (
		<div className="field">
			<input
				type="text"
				required
				autoComplete="off"
				id={id}
				value={value}
				onChange={(e) => validate(e.target.value)}
				onFocus={onFocus ? onFocus : () => { }}
				onBlur={onBlur ? onBlur : () => { }}
			/>
			<label htmlFor={id} title={placeholder} data-title={placeholder}></label>
		</div>
	)
}

InputTextField.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	validate: PropTypes.func,
	placeholder: PropTypes.string,
	id: PropTypes.string,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
}

export default InputTextField;