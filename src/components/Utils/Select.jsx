import { useForm } from 'react-hook-form';

const Select = ({
  id,
  label,
  options,
  extraClass,
  disabled,
  required,
  register,
  errors,
  onChangeCapture,
  reference,
}) => {
  return (
    <div className='w-full'>
      <label
        className={`
            text-md
            ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
          `}>
        {label}
      </label>
      <select
        onChangeCapture={onChangeCapture}
        id={id}
        ref={reference}
        disabled={disabled}
        {...register(id, { required })}
        className={`
            mt-2
            w-full
            p-3
            font-light 
            bg-white 
            border
            rounded-md
            outline-none
            ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
            ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
            ${extraClass}
          `}>
        <option id='custom-option' value={''} key={'default'}></option>
        {options?.length &&
          options.map((option, i) => {
            if (typeof option === 'object' && option !== null) {
              return (
                <option
                  id='custom-option'
                  value={option.id ? option.id : option.value}
                  key={i}>
                  {option.value}
                </option>
              );
            } else {
              return (
                <option id='custom-option' value={option} key={i}>
                  {option}
                </option>
              );
            }
          })}
      </select>
    </div>
  );
};

export default Select;
