import { useState, useEffect } from "react";
import { useContext } from "react";
import Select from "react-select";

import { ThemeContext } from "../../helper/themeContext";

const SelectInput = ({options, text, onLoad}) => {

    const {isDarkTheme} = useContext(ThemeContext);

    const selectStyles = {
        
        container: (provided, state) => ({
            ...provided,
            width: 194,
        }),
        menu: (provided, state) => ({
            ...provided,
            marginTop: 0,
            backgroundColor: '#fff',
            borderRadius: 10,
            zIndex: 9999
          }),
        control: (provided, state) => ({
            ...provided,
            height: 37,
            paddingLeft: 20,
            borderRadius: 10,
            border: '0',
            backgroundColor: isDarkTheme ? '#4F4F4F' : 'rgba(71, 147, 255, 0.2);',
            color: 'dark',
            fontSize: 16,
            fontFamily: 'Montserrat, sans-serif',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '19.5px',

            boxShadow: state.isFocused ? 'none' : provided.boxShadow,
            borderColor: state.isFocused ? '#ccc' : provided.borderColor,
            '&:hover': {
            borderColor: state.isFocused ? '#ccc' : provided.borderColor,
            },
            '&:focus': {
                outline: 'none', // Убираем синюю рамку при клике
                borderColor: '#ccc', // Задаем цвет рамки при фокусе
                boxShadow: 'none', // Убираем тень при фокусе
              },
        }),

        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#fff' : null,
            color: state.isSelected ? '#333' : '#666',
            zIndex: 9999
        }),

        singleValue: (provided, state) => ({
            ...provided,
            color: isDarkTheme ? 'white' : '#000',
            width: 130,
        }),

        indicatorSeparator: (provided, state) => ({
            ...provided,
            display: 'none',
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: isDarkTheme ? 'white' : '#000',
            paddingLeft: 0,
            '&:hover': {color: '#000'}
        }),
    };

    return (
            <Select 
                className="select" 
                styles={selectStyles} 
                options={options}
                defaultValue={[{value: '0', label: `${text}`}]}
                onChange={onLoad}>
                    
            </Select>
    );
}
 
export default SelectInput;