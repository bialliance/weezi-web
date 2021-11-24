import React from "react";
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';

const TextareaField = ({ value, validate, placeholder, id, maxRows, onFocus, onBlur }) => {
	return (
		<div className="field">
			<TextareaAutosize
				required
				autoComplete="off"
				id={id}
				cacheMeasurements
				value={value}
				onChange={(e) => validate(e.target.value)}
				maxRows={maxRows}
				onFocus={onFocus ? onFocus : () => { }}
				onBlur={onBlur ? onBlur : () => { }}
			/>
			<label htmlFor={id} title={placeholder} data-title={placeholder}></label>
		</div>
	)
}

TextareaField.propTypes = {
	value: PropTypes.string,
	validate: PropTypes.func,
	placeholder: PropTypes.string,
	id: PropTypes.string,
	maxRows: PropTypes.number,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
}

export default TextareaField;