import React from "react";
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';

const TextareaField = ({ value, validate, placeholder, id, maxRows }) => {
	return (
		<div class="field">
			<TextareaAutosize
				required
				autocomplete="off"
				id={id}
				cacheMeasurements
				value={value}
				onChange={(e) => validate(e.target.value)}
				maxRows={maxRows}
			/>
			<label for={id} title={placeholder} data-title={placeholder}></label>
		</div>
	)
}

TextareaField.propTypes = {
	value: PropTypes.string,
	validate: PropTypes.func,
	placeholder: PropTypes.string,
	id: PropTypes.string,
	maxRows: PropTypes.number,
}

export default TextareaField;