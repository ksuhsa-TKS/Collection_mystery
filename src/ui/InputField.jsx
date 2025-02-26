const InputField = ({
  valueLable,
  placeholder,
  errorValue,
  errorElement,
  type = 'text',
  valueInput,
}) => {
  return (
    <label className='flex lable form__lable'>
      {valueLable}:
      <span className="flex form__wrap">
        <input className='input form__input form__input--required' type={type} autoComplete="off"
          defaultValue={valueInput} placeholder={!errorElement && placeholder}
          autoFocus={valueLable === 'Название' && true} {...errorValue} />
        {errorElement}
      </span>
    </label>
  )
}

export default InputField
