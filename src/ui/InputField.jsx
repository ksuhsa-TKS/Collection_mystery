const InputField = ({
  valueLable,
  errorValue,
  errorElement,
  type = 'text',
  valueInput,
  classLable = '',
}) => {
  return (
    <label className={`flex lable form__lable ${classLable}`}>
      <span className="descr form__descr">{valueLable}:</span>
      <input className='input' type={type} defaultValue={valueInput} {...errorValue} autoComplete="off"
        autoFocus={valueLable === 'Название' && true} />
      {errorElement}
    </label>
  )
}

export default InputField
